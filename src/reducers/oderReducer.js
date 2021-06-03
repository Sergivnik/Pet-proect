import update from "react-addons-update";
import { initialStore } from "./dataStore.js";
import {
  ADD_ODER,
  DEL_ODER,
  EDIT_ODER,
  SET_PROXY,
} from "../actions/oderActions.js";
import {
  GET_DATA_SUCCESS,
  GET_DATA_REQUEST,
  GET_DATA_FAILURE,
  GET_FILTER_SUCCESS,
  GET_FILTER_FAILURE,
} from "../middlewares/initialState.js";

export const oderReducer = (store = initialStore, action) => {
  switch (action.type) {
    case ADD_ODER: {
      const oderId = store.odersList[store.odersList.length - 1]._id + 1;
      return update(store, {
        odersList: {
          $merge: {
            [store.odersList.length]: {
              _id: oderId,
              date: action.data.date,
              idDriver: action.data.driver,
              idCustomer: action.data.oder,
              idLoadingPoint: action.data.loadingPoint,
              idUnloadingPoint: action.data.unloadingPoint,
              customerPrice: action.data.oderPrice,
              driverPrice: action.data.driverPrice,
            },
          },
        },
      });
    }
    case EDIT_ODER: {
      let index = store.odersList.findIndex((item) => item._id == action.id);
      let newOder = store.odersList[index];
      switch (action.field) {
        case "date":
          newOder.date = action.newValue;
          break;
        case "driver":
          newOder.idDriver = action.newValue;
          break;
        case "oders":
          newOder.idCustomer = action.newValue;
          break;
        case "loadingPoint":
          newOder.idLoadingPoint = action.newValue;
          break;
        case "unloadingPoint":
          newOder.idUnloadingPoint = action.newValue;
          break;
        case "oderPrice":
          newOder.customerPrice = action.newValue;
          break;
        case "driverPrice":
          newOder.driverPrice = action.newValue;
          break;
        case "proxy":
          newOder.proxy = action.newValue;
          break;
        case "complited":
          newOder.complited = action.newValue;
          break;
        case "document":
          switch (action.newValue) {
            case 1:
              newOder.document = "Ок";
              break;
            case 2:
              newOder.document = "Нет";
              break;
            case 3:
              newOder.document = "Факс";
              break;
            default:
              break;
          }
          break;
        case "customerPayment":
          let newValue = store.statusCustomerPay.find(
            (item) => item._id == action.newValue
          );
          newOder.customerPayment = newValue.value;
          break;
        case "driverPayment":
          switch (action.newValue) {
            case 1:
              newOder.driverPayment = "Ок";
              break;
            case 2:
              newOder.driverPayment = "нет";
              break;
            default:
              break;
          }
          break;
        case "accountNumber":
          newOder.accountNumber = action.newValue;
          break;

        default:
          break;
      }
      return update(store, {
        odersList: {
          $merge: {
            [index]: newOder,
          },
        },
      });
    }

    case SET_PROXY: {
      return store;
    }
    case DEL_ODER: {
      let arrOders = store.odersList.filter((item) => item._id != action.id);
      return { ...store, odersList: [...arrOders] };
    }

    case GET_FILTER_SUCCESS: {
      console.log(action.dataServer);
      function compareObj(a, b) {
        if (a.value > b.value) return 1;
        if (a.value == b.value) return 0;
        if (a.value < b.value) return -1;
      }
      let filteredDriverlist = [];
      action.dataServer.driver.forEach((item) => {
        if (item.idDriver)
          filteredDriverlist.push(
            store.driverlist.find((elem) => elem._id == item.idDriver)
          );
      });
      filteredDriverlist.sort(compareObj);
      let filteredCustomerlist = [];
      action.dataServer.customer.forEach((item) => {
        if (item.idCustomer)
          filteredCustomerlist.push(
            store.clientList.find((elem) => elem._id == item.idCustomer)
          );
      });
      filteredCustomerlist.sort(compareObj);
      let filteredLoadinglist = [];
      action.dataServer.loadingPoint.forEach((item) => {
        if (item.idLoadingPoint != null && item.idLoadingPoint.length === 1) {
          filteredLoadinglist.push(
            store.citieslist.find((elem) => elem._id == item.idLoadingPoint[0])
          );
        }
      });
      filteredLoadinglist.sort(compareObj);
      let filteredUnloadinglist = [];
      action.dataServer.unloadingPoint.forEach((item) => {
        if (
          item.idUnloadingPoint != null &&
          item.idUnloadingPoint.length === 1
        ) {
          filteredUnloadinglist.push(
            store.citieslist.find(
              (elem) => elem._id == item.idUnloadingPoint[0]
            )
          );
        }
      });
      filteredUnloadinglist.sort(compareObj);
      let filteredCustomerpayment = [];
      action.dataServer.customerPayment.forEach((item) => {
        if (item.customerPayment)
          filteredCustomerpayment.push(
            store.statusCustomerPay.find(
              (elem) => elem.value == item.customerPayment
            )
          );
      });
      let filteredAccountNumber = [];
      action.dataServer.filterAccount.forEach((item) => {
        if (item.accountNumber)
          filteredAccountNumber.push(
            store.accountList.find((elem) => elem.value == item.accountNumber)
          );
      });
      return {
        ...store,
        odersList: action.dataServer.odersList,
        filteredDateList: action.dataServer.date,
        filteredLoading: filteredLoadinglist,
        filteredUnloading: filteredUnloadinglist,
        filteredDrivers: filteredDriverlist,
        filteredClients: filteredCustomerlist,
        filteredCustomerPrice: action.dataServer.filteredCustomerPrice,
        filteredDriverPrice: action.dataServer.filteredDriverPrice,
        filteredStatusCustomerPayment: filteredCustomerpayment,
        filteredAccountList: filteredAccountNumber,
        request: {
          status: "SUCCESS",
          error: null,
        },
      };
    }
    case GET_FILTER_FAILURE: {
      return {
        ...store,
        request: {
          status: "FAILURE",
          error: true,
        },
      };
    }

    case GET_DATA_SUCCESS: {
      let accountList = [];
      let i = 1;
      action.dataServer.accountList.forEach((item) => {
        if (item.accountNumber) {
          accountList.push({ _id: i, value: item.accountNumber });
        }
        i++;
      });
      return {
        ...store,
        dateList: action.dataServer.date,
        filteredDateList: action.dataServer.date,
        citieslist: action.dataServer.citieslist,
        filteredLoading: action.dataServer.citieslist,
        filteredUnloading: action.dataServer.citieslist,
        driverlist: action.dataServer.driverlist,
        filteredDrivers: action.dataServer.driverlist,
        clientList: action.dataServer.clientList,
        filteredClients: action.dataServer.clientList,
        odersList: action.dataServer.odersList,
        filteredCustomerPrice: [
          Number(action.dataServer.minCustomerPrice),
          Number(action.dataServer.maxCustomerPrice),
        ],
        filteredDriverPrice: [
          Number(action.dataServer.minDriverPrice),
          Number(action.dataServer.maxDriverPrice),
        ],
        filteredStatusCustomerPayment: store.statusCustomerPay,
        accountList: accountList,
        filteredAccountList: accountList,
        request: {
          status: "SUCCESS",
          error: null,
        },
      };
    }
    case GET_DATA_FAILURE: {
      return {
        ...store,
        request: {
          status: "FAILURE",
          error: true,
        },
      };
    }
    case GET_DATA_REQUEST: {
      return {
        ...store,
        request: {
          status: "LOADING",
          error: null,
        },
      };
    }
    default:
      return store;
  }
};

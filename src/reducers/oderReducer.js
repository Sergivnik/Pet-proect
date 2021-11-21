import update from "react-addons-update";
import { initialStore } from "./dataStore.js";
import {
  ADD_ODER_SUCCESS,
  DEL_ODER,
  EDIT_ODER,
  EDIT_ODER_NEW_SUCCESS,
  EDIT_ODER_NEW_FAILURE,
  SET_PROXY,
  MAKE_PAYMENT_CUSTOMER_SUCCESS,
} from "../actions/oderActions.js";
import {
  GET_DATA_SUCCESS,
  GET_DATA_REQUEST,
  GET_DATA_FAILURE,
  GET_FILTER_SUCCESS,
  GET_FILTER_FAILURE,
  GET_PAYMENTS_DATA_SUCCESS,
  GET_PAYMENTS_DATA_FAILURE,
  DELETE_PAYMENT_DATA_SUCCESS,
  DELETE_PAYMENT_DATA_FAILURE,
} from "../middlewares/initialState.js";
import {
  GET_DATA_DRIVER_DEBT_SUCCESS,
  GET_DATA_DRIVER_DEBT_FAILURE,
  ADD_DATA_DRIVER_DEBT_SUCCESS,
  DEL_DATA_DRIVER_DEBT_SUCCESS,
  EDIT_DATA_DRIVER_DEBT_SUCCESS,
  MAKE_PAYMENT_DRIVER_SUCCESS,
} from "../actions/driverActions.js";
import {
  GET_DATA_CONTRACTORS_SUCCESS,
  GET_DATA_CONTRACTORS_FAILURE,
  ADD_DATA_CONTRACTORS_SUCCESS,
  ADD_DATA_CONTRACTORS_FAILURE,
} from "../actions/contractorActions.js";
import {
  EDIT_DATA_SUCCESS,
  EDIT_DATA_FAILURE,
  ADD_DATA_SUCCESS,
  ADD_DATA_FAILURE,
  DEL_DATA_SUCCESS,
  DEL_DATA_FAILURE,
} from "../actions/editDataAction.js";

export const oderReducer = (store = initialStore, action) => {
  switch (action.type) {
    case ADD_ODER_SUCCESS: {
      console.log(action);
      return update(store, {
        odersList: {
          $merge: {
            [store.odersList.length]: {
              _id: action.dataServer.insertId,
              date: action.data.date,
              idDriver: action.data.idDriver,
              idCustomer: action.data.idCustomer,
              idLoadingPoint: action.data.idLoadingPoint,
              idUnloadingPoint: action.data.idUnloadingPoint,
              customerPrice: action.data.customerPrice,
              driverPrice: action.data.driverPrice,
              idTrackDriver: action.data.idTrackDriver,
              idTrack: action.data.idTrack,
              idManager: action.data.idManager,
              loadingInfo: action.data.loadingInfo,
              unloadingInfo: action.data.unloadingInfo,
            },
          },
        },
      });
    }
    case EDIT_ODER_NEW_SUCCESS: {
      let index = store.odersList.findIndex(
        (item) => item._id == action.data._id
      );
      console.log(index);
      return update(store, {
        odersList: {
          $merge: { [index]: action.data },
        },
        originOdersList: {
          $merge: { [index]: action.data },
        },
      });
    }
    case EDIT_ODER: {
      let index = store.odersList.findIndex((item) => item._id == action.id);
      let originIndex = store.originOdersList.findIndex(
        (item) => item._id == action.id
      );
      let newOder = store.odersList[index];
      let newIncome = store.income;
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
        case "completed":
          newOder.completed = action.newValue;
          break;
        case "document":
          let now = new Date();
          switch (action.newValue) {
            case 1:
              newOder.document = "Ок";
              newOder.dateOfSubmission = now;
              break;
            case 2:
              newOder.document = "Нет";
              newOder.dateOfSubmission = null;
              break;
            case 3:
              newOder.document = "Факс";
              newOder.dateOfSubmission = now;
              break;
            default:
              break;
          }
          break;
        case "customerPayment":
          let newValue = store.statusCustomerPay.find(
            (item) => item._id == action.newValue
          );

          if (
            store.odersList[index].customerPayment == "Ок" &&
            action.newValue != 1
          ) {
            newIncome =
              Number(store.income) -
              Number(store.odersList[index].customerPrice);
          }
          if (store.odersList[index].customerPayment == "Частично оплачен") {
            if (action.newValue == 1) {
              newIncome =
                Number(store.income) -
                Number(store.odersList[index].partialPaymentAmount) +
                Number(store.odersList[index].customerPrice);
            } else {
              newIncome =
                Number(store.income) -
                Number(store.odersList[index].partialPaymentAmount);
            }
            newOder.partialPaymentAmount = null;
          }
          if (action.newValue == 1) {
            if (
              store.odersList[index].customerPayment != "Частично оплачен" &&
              store.odersList[index].customerPayment != "Ок"
            ) {
              newIncome =
                Number(store.income) +
                Number(store.odersList[index].customerPrice);
            }
          }
          if (
            action.newValue == 1 ||
            action.newValue == 2 ||
            action.newValue == 6 ||
            action.newValue == 8
          ) {
            newOder.dateOfPromise = null;
          }
          if (
            action.newValue == 3 ||
            action.newValue == 4 ||
            action.newValue == 5 ||
            action.newValue == 7
          ) {
            let now = new Date();
            newOder.dateOfPromise = now;
          }
          newOder.customerPayment = newValue.value;
          break;
        case "dateOfPromise":
          newOder.dateOfPromise = action.newValue;
          break;
        case "driverPayment":
          if (
            store.odersList[index].driverPayment == "Ок" &&
            action.newValue != 1
          ) {
            newIncome =
              Number(store.income) + Number(store.odersList[index].driverPrice);
          }
          if (
            store.odersList[index].driverPayment != "Ок" &&
            action.newValue == 1
          ) {
            newIncome =
              Number(store.income) - Number(store.odersList[index].driverPrice);
          }
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
        case "sumPartPay":
          newOder.partialPaymentAmount = action.newValue;
          newIncome =
            Number(store.income) +
            Number(store.odersList[index].partialPaymentAmount);
          break;
        default:
          break;
      }
      return update(store, {
        odersList: {
          $merge: { [index]: newOder },
        },
        originOdersList: {
          $merge: { [originIndex]: newOder },
        },
        income: { $set: newIncome },
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
      let clone = [];
      action.dataServer.odersList.forEach((elem) => {
        clone.push(Object.assign({}, elem));
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
        clientmanager: action.dataServer.clientmanager,
        trackdrivers: action.dataServer.trackdrivers,
        tracklist: action.dataServer.tracklist,
        originOdersList: clone,
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
        income: action.dataServer.income,
        expenses: action.dataServer.expenses,
        customerWithoutPayment: action.dataServer.customerWithoutPayment,
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
    case MAKE_PAYMENT_CUSTOMER_SUCCESS: {
      let extraPayments;
      let customerId = action.dataServer[0].idCustomer;
      let [...arrCustomer] = store.clientList;
      let indexCustomer = arrCustomer.findIndex(
        (item) => item._id == customerId
      );
      let sumChosenOders = action.arr.reduce(
        (sumCustumerPrice, item) => sumCustumerPrice + item.customerPrice,
        0
      );
      if (sumChosenOders == action.sumCustomerPayment + action.extraPayments) {
        extraPayments = null;
      } else {
        extraPayments =
          action.extraPayments +
          Number(action.sumCustomerPayment) -
          sumChosenOders;
      }
      let sum =
        store.income +
        Number(action.sumCustomerPayment) +
        action.extraPayments -
        extraPayments;
      let [...arr] = store.odersList;
      action.dataServer.forEach((elem) => {
        let index = arr.findIndex((item) => item._id == elem._id);
        arr[index] = elem;
      });
      arrCustomer[indexCustomer].extraPayments = extraPayments;
      return {
        ...store,
        odersList: arr,
        originOdersList: arr,
        income: sum,
        clientList: arrCustomer,
      };
    }
    case GET_PAYMENTS_DATA_SUCCESS: {
      return {
        ...store,
        customerPaymentsList: action.dataServer,
      };
    }
    case GET_PAYMENTS_DATA_FAILURE: {
      return {
        ...store,
        request: {
          status: "FAILURE",
          error: true,
        },
      };
    }
    case DELETE_PAYMENT_DATA_SUCCESS: {
      let [...newCustomerPaymentList] = store.customerPaymentsList;
      let delPaymentIndex = newCustomerPaymentList.findIndex(
        (elem) => elem.id == action.id
      );
      let delPayment = newCustomerPaymentList[delPaymentIndex];
      let [...newOderList] = store.odersList;
      let [...newClientList] = store.clientList;
      let client = newClientList.find(
        (elem) => elem._id == delPayment.idCustomer
      );
      let newIncome = store.income;
      let sum = 0;
      delPayment.listOfOders.forEach((elem) => {
        let oder = newOderList.find((item) => item._id == elem.id);
        sum = sum + elem.customerPrice;
        if (elem.customerPrice == oder.customerPrice) {
          oder.customerPayment = "Нет";
          newIncome = newIncome - oder.customerPrice;
        } else {
          if (oder.customerPayment == "Ок") {
            oder.customerPayment = "Частично оплачен";
            oder.partialPaymentAmount = oder.customerPrice - elem.customerPrice;
            newIncome = newIncome - elem.customerPrice;
          } else {
            if (oder.partialPaymentAmoun == elem.customerPrice) {
              oder.customerPayment = "Нет";
              oder.partialPaymentAmoun = null;
              newIncome = newIncome - elem.customerPrice;
            } else {
              oder.partialPaymentAmount =
                oder.partialPaymentAmount - elem.customerPrice;
              newIncome = newIncome - elem.customerPrice;
            }
          }
        }
      });
      console.log(newIncome);
      let diff = sum - delPayment.sumOfPayment;
      client.extraPayments = client.extraPayments + diff;
      newCustomerPaymentList.splice(delPaymentIndex, 1);
      return {
        ...store,
        customerPaymentsList: newCustomerPaymentList,
        odersList: newOderList,
        originOdersList: newOderList,
        clientList: newClientList,
        filteredClients: newClientList,
        income: newIncome,
      };
    }
    case DELETE_PAYMENT_DATA_FAILURE: {
      return {
        ...store,
        request: {
          status: "FAILURE",
          error: true,
        },
      };
    }

    case GET_DATA_DRIVER_DEBT_SUCCESS: {
      return {
        ...store,
        driverDebtList: action.dataServer,
      };
    }

    case ADD_DATA_DRIVER_DEBT_SUCCESS: {
      let [...arr] = store.driverDebtList;
      arr.push({
        id: action.dataServer,
        date: action.data.date,
        idDriver: action.data.idDriver,
        category: action.data.categoryValue,
        sumOfDebt: action.data.sumOfDebt,
        debtClosed: action.data.debtClosedValue,
        addInfo: action.data.addInfo,
      });
      return {
        ...store,
        driverDebtList: arr,
      };
    }

    case EDIT_DATA_DRIVER_DEBT_SUCCESS: {
      let [...arr] = store.driverDebtList;
      let index = arr.findIndex((elem) => elem.id == action.data.id);
      if (action.data.editField == "date") {
        arr[index].date = action.data.newValue;
      }
      if (action.data.editField == "idDriver") {
        arr[index].idDriver = action.data.newValue;
      }
      if (action.data.editField == "category") {
        arr[index].category = action.data.newValue;
      }
      if (action.data.editField == "sumOfDebt") {
        arr[index].sumOfDebt = action.data.newValue;
      }
      if (action.data.editField == "addInfo") {
        arr[index].addInfo = action.data.newValue;
      }
      if (action.data.editField == "debtClosed") {
        arr[index].debtClosed = action.data.newValue;
      }
      return {
        ...store,
        driverDebtList: arr,
      };
    }

    case DEL_DATA_DRIVER_DEBT_SUCCESS: {
      let [...arr] = store.driverDebtList;
      let index = arr.findIndex((elem) => elem.id == action.id);
      arr.splice(index, 1);
      return { ...store, driverDebtList: arr };
    }

    case MAKE_PAYMENT_DRIVER_SUCCESS: {
      let [...arrOriginOders] = store.originOdersList;
      let [...arrOders] = store.odersList;
      let [...arrDebts] = store.driverDebtList;
      let expenses = Number(store.expenses);
      let sum = 0;
      action.chosenOders.forEach((elem) => {
        let index = arrOriginOders.findIndex((oder) => oder._id == elem);
        arrOriginOders[index].driverPayment = "Ок";
        index = arrOders.findIndex((oder) => oder._id == elem);
        arrOders[index].driverPayment = "Ок";
      });
      action.chosenDebts.forEach((elem) => {
        let index = arrDebts.findIndex((debt) => debt.id == elem.id);
        let sumOfDebt = Number(arrDebts[index].sumOfDebt);
        let paidPartOfDebt = Number(arrDebts[index].paidPartOfDebt);
        sum = sum + elem.sum;
        if (sumOfDebt > paidPartOfDebt + elem.sum) {
          arrDebts[index].paidPartOfDebt = paidPartOfDebt + elem.sum;
          arrDebts[index].debtClosed = "частично";
        } else {
          arrDebts[index].paidPartOfDebt = 0;
          arrDebts[index].debtClosed = "Ок";
        }
      });
      expenses = expenses + action.currentDriverSumOfOders - sum;
      return {
        ...store,
        originOdersList: arrOriginOders,
        odersList: arrOders,
        driverDebtList: arrDebts,
        expenses: expenses,
      };
    }
    case GET_DATA_CONTRACTORS_SUCCESS: {
      return {
        ...store,
        contractorsList: action.dataServer.contractors,
        contractorsPayments: action.dataServer.contractorsPayments,
      };
    }
    case ADD_DATA_CONTRACTORS_SUCCESS:
      console.log(action.dataServer, action.data);
      let expenses = Number(store.expenses);
      let [...arrContractorsPayment] = store.contractorsPayments;
      let { ...contractorPayment } = action.data;
      contractorPayment.id = action.dataServer;
      expenses = Number(expenses) + Number(action.data.sum);
      arrContractorsPayment.push(contractorPayment);
      return {
        ...store,
        expenses: expenses,
        contractorsPayments: arrContractorsPayment,
      };
    case EDIT_DATA_SUCCESS:
      console.log(action.dataServer, action.newData, action.editTable);
      switch (action.editTable) {
        case "drivers":
          let [...arrDrivers] = store.driverlist;
          let indexDriver = arrDrivers.findIndex(
            (elem) => elem._id == action.newData._id
          );
          arrDrivers[indexDriver] = action.newData;
          return { ...store, driverlist: arrDrivers };
        case "trackdrivers":
          let [...arrTrackDrivers] = store.trackdrivers;
          let indexTrackDriver = arrTrackDrivers.findIndex(
            (elem) => elem._id == action.newData._id
          );
          arrTrackDrivers[indexTrackDriver] = action.newData;
          return { ...store, trackdrivers: arrTrackDrivers };
        case "tracklist":
          let [...arrTrack] = store.tracklist;
          let indexTrack = arrTrack.findIndex(
            (elem) => elem._id == action.newData._id
          );
          arrTrack[indexTrack] = action.newData;
          return { ...store, tracklist: arrTrack };
        case "cities":
          let [...arrPoints] = store.citieslist;
          let indexPoint = arrPoints.findIndex(
            (elem) => elem._id == action.newData._id
          );
          arrPoints[indexPoint] = action.newData;
          return { ...store, citieslist: arrPoints };
        default:
          break;
      }
    case ADD_DATA_SUCCESS:
      console.log(action.dataServer, action.data, action.editTable);
      switch (action.editTable) {
        case "drivers":
          let [...arrDrivers] = store.driverlist;
          action.data._id = action.dataServer.insertId;
          arrDrivers.push(action.data);
          return { ...store, driverlist: arrDrivers };
        case "trackdrivers":
          let [...arrTrackDrivers] = store.trackdrivers;
          action.data._id = action.dataServer.insertId;
          arrTrackDrivers.push(action.data);
          return { ...store, trackdrivers: arrTrackDrivers };
        case "tracklist":
          let [...arrTrack] = store.tracklist;
          action.data._id = action.dataServer.insertId;
          arrTrack.push(action.data);
          return { ...store, tracklist: arrTrack };
        case "cities":
          let [...arrPoints] = store.citieslist;
          action.data._id = action.dataServer.insertId;
          arrPoints.push(action.data);
          return { ...store, citieslist: arrPoints };
        default:
          break;
      }

    case ADD_DATA_FAILURE:
      console.log(action.message);
      return { ...store, message: "err" };

    case DEL_DATA_SUCCESS:
      switch (action.editTable) {
        case "drivers":
          let [...arrDrivers] = store.driverlist;
          let indexDriver = arrDrivers.findIndex(
            (elem) => elem._id == action.id
          );
          arrDrivers.splice(indexDriver, 1);
          return { ...store, driverlist: arrDrivers };
        case "trackdrivers":
          let [...arrTrackDrivers] = store.trackdrivers;
          let indexTrackDriver = arrTrackDrivers.findIndex(
            (elem) => elem._id == action.id
          );
          arrTrackDrivers.splice(indexTrackDriver, 1);
          return { ...store, trackdrivers: arrTrackDrivers };
        case "tracklist":
          let [...arrTrack] = store.tracklist;
          let indexTrack = arrTrack.findIndex((elem) => elem._id == action.id);
          arrTrack.splice(indexTrack, 1);
          return { ...store, tracklist: arrTrack };
        case "cities":
          let [...arrPoints] = store.citieslist;
          let indexPoint = arrPoints.findIndex((elem) => elem._id == action.id);
          arrPoints.splice(indexPoint, 1);
          return { ...store, citieslist: arrPoints };
        default:
          break;
      }

    case DEL_DATA_FAILURE:
      console.log(action.message);
      return { ...store, message: action.message };
    default:
      return store;
  }
};

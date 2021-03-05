import update from "react-addons-update";
import { initialStore } from "./dataStore.js";
import { ADD_ODER, DEL_ODER } from "../actions/oderActions.js";
import {
  GET_DATA_SUCCESS,
  GET_DATA_REQUEST,
  GET_DATA_FAILURE,
} from "../middlewares/initialState.js";

export const oderReducer = (store = initialStore, action) => {
  switch (action.type) {
    case ADD_ODER: {
      const oderId = store.odersList[store.odersList.length - 1].id + 1;
      return update(store, {
        odersList: {
          $merge: {
            [oderId - 1]: {
              id: oderId,
              date: action.data.date,
              idDriver: action.data.driver,
              idOder: action.data.oder,
              idLoadingPoint: action.data.loadingPoint,
              idUnloadingPoint: action.data.unloadingPoint,
              customerPrice: action.data.oderPrice,
              driverPrice: action.data.driverPrice,
            },
          },
        },
      });
    }
    case DEL_ODER: {
      let arrOders = store.odersList.filter((item) => item.id != action.id);
      return { ...store, odersList: [...arrOders] };
    }

    case GET_DATA_SUCCESS: {
      return {
        ...store,
        citieslist: action.dataServer.citieslist,
        driverlist: action.dataServer.driverlist,
        clientList: action.dataServer.clientList,
        odersList: action.dataServer.odersList,
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

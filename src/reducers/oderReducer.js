import { initialStore } from "./dataStore.js";
import {
  GET_DATA_SUCCESS,
  GET_DATA_REQUEST,
  GET_DATA_FAILURE,
} from "../middlewares/initialState.js";

export const oderReducer = (store = initialStore, action) => {
  switch (action.type) {
    case GET_DATA_SUCCESS: {
      return {
        ...store,
        citieslist: action.dataServer.citieslist,
        driverlist: action.dataServer.driverlist,
        oderlist: action.dataServer.oderlist,
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

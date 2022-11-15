import update from "react-addons-update";
import { customerStore } from "./customerStore.js";
import {
  GET_CUSTOMER_DATA_SUCCESS,
  GET_CUSTOMER_DATA_FAILURE,
} from "../actions/customerOrderAction.js";

export const customerReducer = (store = customerStore, action) => {
  switch (action.type) {
    case GET_CUSTOMER_DATA_SUCCESS: {
      return {
        ...store,
        ordersList: action.dataServer.ordersList,
        customerData: action.dataServer.customerData,
        managerList: action.dataServer.managerList,
        driversList: action.dataServer.driversList,
        trackList: action.dataServer.trackList,
        userList: action.dataServer.userList,
        citiesList: action.dataServer.citiesList,
        storelist: action.dataServer.storelist,
        customerOrders: action.dataServer.customerOrders,
        customerclients: action.dataServer.customerclients,
      };
    }
    default:
      return store;
  }
};

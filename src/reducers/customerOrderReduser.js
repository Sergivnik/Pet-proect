import update from "react-addons-update";
import { customerStore } from "./customerStore.js";
import {
  GET_CUSTOMER_DATA_SUCCESS,
  GET_CUSTOMER_DATA_FAILURE,
} from "../actions/customerOrderAdtion.js";

export const customerReducer = (store = customerStore, action) => {
  switch (action.type) {
   case GET_CUSTOMER_DATA_SUCCESS:{

   }
   default:
      return store;
  }
};

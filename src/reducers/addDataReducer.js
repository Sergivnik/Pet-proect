import { initialStore } from "./dataStore.js";
import update from "react-addons-update";
import {
  EDIT_ADDDATA_SUCCESS,
  EDIT_ADDDATA_FAILURE,
} from "../actions/specialAction.js";

export const addDataReducer = (store = initialStore, action) => {
  switch (action.type) {
    case EDIT_ADDDATA_SUCCESS: {
      console.log(action);
      let index = store.addtable.findIndex((elem) => elem.id == action.data.id);
      return update(store, {
        addtable: { $merge: { [index]: action.data } },
        request: { $merge: { status: "SUCCESS", error: null } },
      });
    }
    case EDIT_ADDDATA_FAILURE: {
      console.log(action, store.request);
      alert("Shit happens!")
      return {
        ...store,
        request: {
          status: "FAILURE",
          error: true,
        },
      };
    }
    default:
      return store;
  }
};

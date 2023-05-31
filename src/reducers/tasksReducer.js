import { tasksDataStore } from "./tasksStore.js";
import {
  GET_NEW_TASKS_SUCCESS,
  GET_NEW_TASKS_FAILURE,
} from "../actions/tasksActions";

export const tasksReducer = (store = tasksDataStore, action) => {
  switch (action.type) {
    case GET_NEW_TASKS_SUCCESS: {
      console.log(action.dataServer);
      return { ...store, tasksNumber: action.dataServer };
    }
    default:
      return store;
  }
};

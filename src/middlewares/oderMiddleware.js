import axios from "axios";
import {
  ADD_ODER,
  EDIT_ODER,
  DEL_ODER,
  SET_PROXY,
} from "../actions/oderActions.js";
import { URL } from "./initialState";

export default (store) => (next) => (action) => {
  switch (action.type) {
    case ADD_ODER:
      axios
        .post(URL + "/addOder", {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(action.data),
        })
        .then((res) => {})
        .catch((e) => {
          console.log(e.message);
        });
      break;
    case EDIT_ODER:
      axios
        .patch(URL + "/edit", {
          headers: {
            "Content-Type": "application/json",
          },
          body: action,
        })
        .then((res) => {})
        .catch((e) => {
          console.log(e.message);
        });
      break;
    case DEL_ODER:
      axios
        .delete(`${URL}/${action.id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(action.id),
        })
        .then((res) => {})
        .catch((e) => {
          console.log(e.message);
        });
      break;
    case SET_PROXY:
      axios.post(`${URL}/proxy/${action.id}`);
      break;
  }

  return next(action);
};

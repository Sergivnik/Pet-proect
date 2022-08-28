import axios from "axios";
import { DEL_ODER, SET_PROXY } from "../actions/oderActions.js";
import { URL } from "./initialState";

export default () => (next) => (action) => {
  switch (action.type) {
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

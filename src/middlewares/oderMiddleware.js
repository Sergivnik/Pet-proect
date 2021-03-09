import axios from "axios";
import { ADD_ODER, EDIT_ODER, DEL_ODER } from "../actions/oderActions.js";

export default (store) => (next) => (action) => {
  switch (action.type) {
    case ADD_ODER:
      axios
        .post("http://192.168.1.103:3000/API/addOder", {
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
        .patch("http://192.168.1.103:3000/API/edit", {
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
        .delete(`http://192.168.1.103:3000/API/${action.id}`, {
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
  }
  return next(action);
};

import axios from "axios";
import { DOMENNAME } from "../middlewares/initialState";

export const EDIT_ADDDATA_SUCCESS = "EDIT_ADDDATA_SUCCESS";
export const EDIT_ADDDATA_FAILURE = "EDIT_ADDDATA_FAILURE";
export const DELETE_ADDDATE_SUCCESS = "DELETE_ADDDATE_SUCCESS";
export const DELETE_ADDDATE_FAILURE = "DELETE_ADDDATE_FAILURE";

export const editAddData = (data) => {
  return (dispatch) => {
    axios
      .post(DOMENNAME + "/API/editAddData", { body: data })
      .then((res) => {
        return dispatch(editAddDataSuccess(data));
      })
      .catch((e) => {
        console.log(e.message);
        return dispatch(editAddDataFailure());
      });
  };
};
export const editAddDataSuccess = (data) => ({
  type: EDIT_ADDDATA_SUCCESS,
  data,
});
export const editAddDataFailure = () => ({
  type: EDIT_ADDDATA_FAILURE,
});

export const deleteAddData = (id) => {
  return (dispatch) => {
    axios
      .delete(DOMENNAME + "/API/deleteAddData/" + id)
      .then((res) => {
        console.log(res.data);
        return dispatch(deleteAddDataSuccess(id));
      })
      .catch((e) => {
        console.log(e.message);
        return dispatch(deleteAddDataFailure());
      });
  };
};
export const deleteAddDataSuccess = (id) => ({
  type: DELETE_ADDDATE_SUCCESS,
  id,
});
export const deleteAddDataFailure = () => ({
  type: DELETE_ADDDATE_FAILURE,
});

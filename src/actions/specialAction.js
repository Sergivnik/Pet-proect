import axios from "axios";
import { DOMENNAME } from "../middlewares/initialState";

export const EDIT_ADDDATA_SUCCESS = "EDIT_ADDDATA_SUCCESS";
export const EDIT_ADDDATA_FAILURE = "EDIT_ADDDATA_FAILURE";

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

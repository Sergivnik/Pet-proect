import axios from "axios";
import { URL } from "../middlewares/initialState";

export const EDIT_DATA_SUCCESS = "EDIT_DATA_SUCCESS";
export const EDIT_DATA_FAILURE = "EDIT_DATA_FAILURE";
export const ADD_DATA_SUCCESS = "ADD_DATA_SUCCESS";
export const ADD_DATA_FAILURE = "ADD_DATA_FAILURE";

export const editDataSuccess = (dataServer, newData, editTable) => ({
  type: EDIT_DATA_SUCCESS,
  dataServer,
  newData,
  editTable,
});
export const editDataFailure = () => ({
  type: EDIT_DATA_FAILURE,
});
export const editData = (newData, editTable) => {
  return (dispatch) => {
    axios
      .patch(URL + "/editData", {
        headers: {
          "Content-Type": "application/json",
        },
        body: { newData: newData, editTable: editTable },
      })
      .then((res) => {
        return dispatch(editDataSuccess(res.data, newData, editTable));
      })
      .catch((e) => {
        console.log(e.message);
        return dispatch(editDataFailure());
      });
  };
};

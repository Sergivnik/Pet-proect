import axios from "axios";
import { URL } from "../middlewares/initialState";

export const EDIT_DATA_SUCCESS = "EDIT_DATA_SUCCESS";
export const EDIT_DATA_FAILURE = "EDIT_DATA_FAILURE";
export const ADD_DATA_SUCCESS = "ADD_DATA_SUCCESS";
export const ADD_DATA_FAILURE = "ADD_DATA_FAILURE";
export const DEL_DATA_SUCCESS = "DEL_DATA_SUCCESS";
export const DEL_DATA_FAILURE = "DEL_DATA_FAILURE";

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
export const addDataSuccess = (dataServer, data, editTable) => ({
  type: ADD_DATA_SUCCESS,
  dataServer,
  data,
  editTable,
});
export const addDataFailure = (message) => ({
  type: ADD_DATA_FAILURE,
  message,
});
export const addData = (newData, editTable) => {
  return (dispatch) => {
    axios
      .post(URL + "/addData", {
        headers: {
          "Content-Type": "application/json",
        },
        body: { newData: newData, editTable: editTable },
      })
      .then((res) => {
        return dispatch(addDataSuccess(res.data, newData, editTable));
      })
      .catch((e) => {
        return dispatch(addDataFailure(e.response.data));
      });
  };
};
export const delDataSuccess = (id, editTable) => ({
  type: DEL_DATA_SUCCESS,
  id,
  editTable,
});
export const delDataFailure = (message) => ({
  type: DEL_DATA_FAILURE,
  message,
});
export const delData = (id, editTable) => {
  return (dispatch) => {
    axios
      .delete(URL + "/deleteData" + "/" + id, {
        headers: {
          "Content-Type": "application/json",
        },
        data: { editTable: editTable },
      })
      .then((res) => {
        return dispatch(delDataSuccess(id));
      })
      .catch((e) => {
        return dispatch(delDataFailure(e.response.data));
      });
  };
};

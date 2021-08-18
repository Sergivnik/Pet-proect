import axios from "axios";
import { URL } from "../middlewares/initialState";

export const GET_DATA_DRIVER_DEBT_SUCCESS =
  "DATA::GET_DATA_DRIVER_DEBT_SUCCESS";
export const GET_DATA_DRIVER_DEBT_FAILURE =
  "DATA::GET_DATA_DRIVER_DEBT_FAILURE";
export const ADD_DATA_DRIVER_DEBT_SUCCESS =
  "DATA::ADD_DATA_DRIVER_DEBT_SUCCESS";
export const ADD_DATA_DRIVER_DEBT_FAILURE =
  "DATA::ADD_DATA_DRIVER_DEBT_FAILURE";
export const DEL_DATA_DRIVER_DEBT_SUCCESS =
  "DATA::DEL_DATA_DRIVER_DEBT_SUCCESS";
export const DEL_DATA_DRIVER_DEBT_FAILURE =
  "DATA::DEL_DATA_DRIVER_DEBT_FAILURE";

export const getDataDriverDebtSuccess = (dataServer) => ({
  type: GET_DATA_DRIVER_DEBT_SUCCESS,
  dataServer,
});
export const getDataDriverDebtFailure = () => ({
  type: GET_DATA_DRIVER_DEBT_FAILURE,
});
export const getDataDriverDebt = () => {
  return (dispatch) => {
    axios
      .get(URL + "/dataDriverDebt")
      .then((res) => {
        return dispatch(getDataDriverDebtSuccess(res.data));
      })
      .catch((e) => {
        console.log(e.message);
        return dispatch(getDataDriverDebtFailure());
      });
  };
};
export const addDataDriverDebtSuccess = (dataServer, data) => ({
  type: ADD_DATA_DRIVER_DEBT_SUCCESS,
  dataServer,
  data,
});
export const addDataDriverDebtFailure = () => ({
  type: ADD_DATA_DRIVER_DEBT_FAILURE,
});
export const addDataDriverDebt = (data) => {
  return (dispatch) => {
    axios
      .patch(URL + "/addDataDriverDebt", {
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      })
      .then((res) => {
        return dispatch(addDataDriverDebtSuccess(res.data, data));
      })
      .catch((e) => {
        console.log(e.message);
        return dispatch(addDataDriverDebtFailure());
      });
  };
};
export const delDataDriverDebtSuccess = (id) => ({
  type: DEL_DATA_DRIVER_DEBT_SUCCESS,
  id,
});
export const delDataDriverDebtFailure = () => ({
  type: DEL_DATA_DRIVER_DEBT_FAILURE,
});
export const delDataDriverDebt = (id) => {
  return (dispatch) => {
    axios
      .delete(URL + "/deletedriverDebt" + "/" + id)
      .then((res) => {
        return dispatch(delDataDriverDebtSuccess(id));
      })
      .catch((e) => {
        console.log(e.message);
        return dispatch(delDataDriverDebtFailure());
      });
  };
};

import axios from "axios";
import { URL } from "../middlewares/initialState";

export const GET_DATA_DRIVER_DEBT_SUCCESS = "DATA::GET_DATA_DRIVER_DEBT_SUCCESS";
export const GET_DATA_DRIVER_DEBT_FAILURE = "DATA::GET_DATA_DRIVER_DEBT_FAILURE";

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
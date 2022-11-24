import axios from "axios";
import { URL } from "../middlewares/initialState";

export const GET_CUSTOMER_DATA_SUCCESS = "GET_CUSTOMER_DATA_SUCCESS";
export const GET_CUSTOMER_DATA_FAILURE = "GET_CUSTOMER_DATA_FAILURE";
export const ADD_CUSTOMER_APP_SUCCESS = "ADD_CUSTOMER_APP_SUCCESS";
export const ADD_CUSTOMER_APP_FAILURE = "ADD_CUSTOMER_APP_FAILURE";

export const getCustomerData = () => {
  return (dispatch) => {
    axios
      .create({ withCredentials: true })
      .get(URL + "/getCustomerData")
      .then((res) => {
        console.log(res.data);
        return dispatch(getCustomerDataSuccess(res.data));
      })
      .catch((e) => {
        console.log(e);
        return dispatch(getCustomerDataFailure());
      });
  };
};
export const getCustomerDataSuccess = (dataServer) => ({
  type: GET_CUSTOMER_DATA_SUCCESS,
  dataServer,
});
export const getCustomerDataFailure = () => ({
  type: GET_CUSTOMER_DATA_FAILURE,
});
export const addCustomerApp = (appData) => {
  return (dispatch) => {
    axios
      .create({ withCredentials: true })
      .post(URL + "/addCustomerApp", appData)
      .then((res) => {
        console.log(res.data.insertId);
        return dispatch(addCustomerAppSuccess(res.data.insertId, appData));
      })
      .catch((e) => {
        console.log(e);
        return dispatch(addCstomerAppFailure());
      });
  };
};
export const addCustomerAppSuccess = (id, appData) => ({
  type: ADD_CUSTOMER_APP_SUCCESS,
  id,
  appData,
});
export const addCstomerAppFailure = () => ({
  type: ADD_CUSTOMER_APP_FAILURE,
});

import axios from "axios";
import { URL } from "../middlewares/initialState";

export const GET_CUSTOMER_DATA_SUCCESS = "GET_CUSTOMER_DATA_SUCCESS";
export const GET_CUSTOMER_DATA_FAILURE = "GET_CUSTOMER_DATA_FAILURE";
export const ADD_CUSTOMER_APP_SUCCESS = "ADD_CUSTOMER_APP_SUCCESS";
export const ADD_CUSTOMER_APP_FAILURE = "ADD_CUSTOMER_APP_FAILURE";
export const EDIT_CUSTOMER_APP_SUCCESS = "EDIT_CUSTOMER_APP_SUCCESS";
export const EDIT_CUSTOMER_APP_FAILURE = "EDIT_CUSTOMER_APP_FAILURE";
export const DEL_CUSTOMER_APP_SUCCESS = "DEL_CUSTOMER_APP_SUCCESS";
export const DEL_CUSTOMER_APP_FAILURE = "DEL_CUSTOMER_APP_FAILURE";

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
export const editCustomerApp = (id, appData) => {
  return (dispatch) => {
    axios
      .create({ withCredentials: true })
      .post(URL + "/editCustomerApp", { appData: appData, id: id })
      .then((res) => {
        console.log(res.data);
        return dispatch(editCustomerAppSuccess(id, appData));
      })
      .catch((e) => {
        console.log(e);
        return dispatch(editCustomerAppFailure());
      });
  };
};
export const editCustomerAppSuccess = (id, appData) => ({
  type: EDIT_CUSTOMER_APP_SUCCESS,
  id,
  appData,
});
export const editCustomerAppFailure = () => ({
  type: EDIT_CUSTOMER_APP_FAILURE,
});
export const delCustomerApp = (id) => {
  return (dispatch) => {
    axios
      .create({ withCredentials: true })
      .delete(URL + "/deleteCustomerApp/" + id)
      .then((res) => {
        console.log(res.data);
        return dispatch(delCustomerAppSuccess(id));
      })
      .catch((e) => {
        console.log(e);
        return dispatch(delCustomerAppFailure());
      });
  };
};
export const delCustomerAppSuccess = (id) => ({
  type: DEL_CUSTOMER_APP_SUCCESS,
  id,
});
export const delCustomerAppFailure = () => ({
  type: DEL_CUSTOMER_APP_FAILURE,
});

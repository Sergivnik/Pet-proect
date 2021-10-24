import axios from "axios";
import { URL } from "../middlewares/initialState";
export const ADD_ODER = "ADD_ODER";
export const ADD_ODER_SUCCESS = "ADD_ODER_SUCCESS";
export const ADD_ODER_FAILURE = "ADD_ODER_FAILURE";
export const DEL_ODER = "DEL_ODER";
export const EDIT_ODER = "EDIT_ODER";
export const EDIT_ODER_NEW = "EDIT_ODER_NEW";
export const EDIT_ODER_NEW_SUCCESS = "EDIT_ODER_NEW_SUCCESS";
export const EDIT_ODER_NEW_FAILURE = "EDIT_ODER_NEW_FAILURE";
export const SET_PROXY = "SET_PROXY";
export const MAKE_PAYMENT_CUSTOMER = "MAKE_PAYMENT_CUSTOMER";
export const MAKE_PAYMENT_CUSTOMER_SUCCESS =
  "DATA::MAKE_PAYMENT_CUSTOMER_SUCCESS";
export const MAKE_PAYMENT_CUSTOMER_FAILURE =
  "DATA::MAKE_PAYMENT_CUSTOMER_SUCCESS";

export const addOder = (data) => {
  return (dispatch) =>
    axios
      .post(URL + "/addOder", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      .then((res) => {
        return dispatch(addOderSuccess(res.data, data));
      })
      .catch((e) => {
        console.log(e.message);
      });
};
export const addOderSuccess = (dataServer, data) => ({
  type: ADD_ODER_SUCCESS,
  dataServer,
  data,
});
export const addOderFailure = () => ({
  type: ADD_ODER_FAILURE,
});

export const editOder = (id, field, newValue) => ({
  type: EDIT_ODER,
  id,
  field,
  newValue,
});

export const editOderNew = (data) => {
  return (dispatch) =>
    axios
      .patch(URL + "/editOderNew", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((res) => {
        return dispatch(editOderNewSuccess(data));
      })
      .catch((e) => {
        console.log(e.message);
      });
};
export const editOderNewSuccess = (data) => ({
  type: EDIT_ODER_NEW_SUCCESS,
  data,
});
export const editOderNewFailure = ()=>({
  type: EDIT_ODER_NEW_FAILURE
})

export const setProxy = (id) => ({
  type: SET_PROXY,
  id,
});

export const delOder = (id) => ({
  type: DEL_ODER,
  id,
});

export const makePaymentCustomer = (
  arr,
  sumCustomerPayment,
  extraPayments,
  date
) => {
  return (dispatch) =>
    axios
      .patch(URL + "/makePaymentCustomer", {
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          arr: arr,
          sumCustomerPayment: sumCustomerPayment,
          extraPayments: extraPayments,
          date: date,
        },
      })
      .then((res) => {
        return dispatch(
          makePaymentCustomerSuccess(
            res.data,
            sumCustomerPayment,
            extraPayments,
            arr
          )
        );
      })
      .catch((e) => {
        console.log(e.message);
      });
};

export const makePaymentCustomerSuccess = (
  dataServer,
  sumCustomerPayment,
  extraPayments,
  arr
) => ({
  type: MAKE_PAYMENT_CUSTOMER_SUCCESS,
  dataServer,
  sumCustomerPayment,
  extraPayments,
  arr,
});

export const makePaymentCustomerFailure = () => ({
  type: MAKE_PAYMENT_CUSTOMER_FAILURE,
});

import axios from "axios";
import { URL } from "../middlewares/initialState";
export const ADD_ODER = "ADD_ODER";
export const DEL_ODER = "DEL_ODER";
export const EDIT_ODER = "EDIT_ODER";
export const SET_PROXY = "SET_PROXY";
export const MAKE_PAYMENT_CUSTOMER = "MAKE_PAYMENT_CUSTOMER";
export const MAKE_PAYMENT_CUSTOMER_SUCCESS =
  "DATA::MAKE_PAYMENT_CUSTOMER_SUCCESS";
export const MAKE_PAYMENT_CUSTOMER_FAILURE =
  "DATA::MAKE_PAYMENT_CUSTOMER_SUCCESS";

export const addOder = (data) => ({
  type: ADD_ODER,
  data,
});

export const editOder = (id, field, newValue) => ({
  type: EDIT_ODER,
  id,
  field,
  newValue,
});

export const setProxy = (id) => ({
  type: SET_PROXY,
  id,
});

export const delOder = (id) => ({
  type: DEL_ODER,
  id,
});

export const makePaymentCustomer = (arr, sumCustomerPayment, extraPayments) => {
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

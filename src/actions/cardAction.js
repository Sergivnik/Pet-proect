import axios from "axios";
import { URL } from "../middlewares/initialState";

export const MAKE_CARD_PAYMENT_SUCCESS = "MAKE_CARD_PAYMENT_SUCCESS";
export const MAKE_CARD_PAYMENT_REQUEST = "MAKE_CARD_PAYMENT_REQUEST";
export const MAKE_CARD_PAYMENT_FAILURE = "MAKE_CARD_PAYMENT_FAILURE";

export const makeCardPayment = (data) => {
  return (dispatch) => {
    dispatch(makeCardPaymentRequest());
    axios
      .create({ withCredentials: true })
      .post(URL + "/makeCardPayment", data)
      .then((res) => {
        console.log(res.data);
        dispatch(makeCardPaymentSuccess(data, res.data));
      })
      .catch((e) => {
        console.log(e, data);
        dispatch(makeCardPaymentFailure());
      });
  };
};
export const makeCardPaymentRequest = () => ({
  type: MAKE_CARD_PAYMENT_REQUEST,
});
export const makeCardPaymentSuccess = (data, dataServer) => ({
  type: MAKE_CARD_PAYMENT_SUCCESS,
  data,
  dataServer,
});
export const makeCardPaymentFailure = () => ({
  type: MAKE_CARD_PAYMENT_FAILURE,
});

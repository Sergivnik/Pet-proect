import axios from "axios";
import { URL } from "../middlewares/initialState";

export const AUTH_SIGN_UP_SUCCESS = "AUTH_SIGN_UP_SUCCESS";
export const AUTH_SIGN_UP_FAILURE = "AUTH_SIGN_UP_FAILURE";
export const AUTH_SIGN_IN_SUCCESS = "AUTH_SIGN_IN_SUCCESS";
export const AUTH_SIGN_IN_FAILURE = "AUTH_SIGN_IN_FAILURE";

export const authSignUp = (data) => {
  return (dispatch) => {
    axios
      .post(URL + "/signUp", {
        Headers: { "Content-Type": "application/json" },
        body: data,
      })
      .then((res) => {
        return dispatch(authSignUpSucces(res.data));
      })
      .catch((e) => {
        console.log(e.message);
        return dispatch(authSignUpFailure(e));
      });
  };
};
export const authSignUpSucces = (dataServer) => ({
  type: AUTH_SIGN_UP_SUCCESS,
  dataServer,
});
export const authSignUpFailure = (e) => ({
  type: AUTH_SIGN_UP_FAILURE,
  e,
});

export const authSignIn = (data) => {
  return (dispatch) => {
    axios
      .create({ withCredentials: true })
      .post(URL + "/signIn", data)
      .then((res) => {
        console.log(res.data);
        return dispatch(authSignInSuccess(res.data));
      })
      .catch((e) => {
        console.log(e.message);
        return dispatch(authSignInFailure(e));
      });
  };
};
export const authSignInSuccess = (dataServer) => ({
  type: AUTH_SIGN_IN_SUCCESS,
  dataServer,
});
export const authSignInFailure = (e) => ({
  type: AUTH_SIGN_IN_FAILURE,
  e,
});

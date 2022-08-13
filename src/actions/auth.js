import axios from "axios";
import { URL } from "../middlewares/initialState";

export const AUTH_SIGN_UP_SUCCESS = "AUTH_SIGN_UP_SUCCESS";
export const AUTH_SIGN_UP_FAILURE = "AUTH_SIGN_UP_FAILURE";

export const authSignUp = (data) => {
  return (dispatch) => {
    axios
      .post(URL + "/signUp", {
        headers: { "Content-Type": "application/json" },
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
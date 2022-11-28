import axios from "axios";
import { URL } from "../middlewares/initialState";

export const GET_NEW_APP_SUCCESS = "GET_NEW_APP_SUCCESS";
export const GET_NEW_APP_FAILURE = "GET_NEW_APP_FAILURE";
export const GET_APPS_SUCCESS = "GET_APPS_SUCCESS";
export const GET_APPS_FAILURE = "GET_APPS_FAILURE";

export const getNewApp = () => {
  return (dispatch) => {
    axios
      .create({ withCredentials: true })
      .get(URL + "/getNewApp")
      .then((res) => {
        let date = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let sec = date.getSeconds();
        console.log(res.data, `${hour}-${minute}-${sec}`);
        dispatch(getNewAppSuccess(res.data));
      })
      .catch((e) => {
        console.log(e);
        dispatch(getNewAppFailure());
      });
  };
};
export const getNewAppSuccess = (data) => ({
  type: GET_NEW_APP_SUCCESS,
  data,
});
export const getNewAppFailure = () => ({ type: GET_NEW_APP_FAILURE });
export const getApps = () => {
  return (dispatch) => {
    axios
      .create({ withCredentials: true })
      .get(URL + "/getApps")
      .then((res) => {
        console.log(res.data);
        dispatch(getAppsSuccess(res.data));
      })
      .catch((e) => {
        console.log(e);
        dispatch(getAppsFailure());
      });
  };
};
export const getAppsSuccess = (data) => ({
  type: GET_APPS_SUCCESS,
  data,
});
export const getAppsFailure = () => ({ type: GET_APPS_FAILURE });

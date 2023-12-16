import axios from "axios";
import { URL } from "../middlewares/initialState";

export const ADD_POST_TRACK_SUCCESS = "ADD_POST_TRACK_SUCCESS";
export const ADD_POST_TRACK_REQUEST = "ADD_POST_TRACK_REQUEST";
export const ADD_POST_TRACK_FAILURE = "ADD_POST_TRACK_FAILURE";

export const addPostTrack = (data) => {
  return (dispatch) => {
    dispatch(addPostTrackRequest());
    axios
      .create({ withCredentials: true })
      .post(URL + "/addPostTrack", data)
      .then((res) => {
        console.log(res.data);
        dispatch(addPostTrackSuccess(data));
      })
      .catch((e) => {
        console.log(e, res.data);
        dispatch(addPostTrackFailure());
      });
  };
};
export const addPostTrackRequest = () => ({
  type: ADD_POST_TRACK_REQUEST,
});
export const addPostTrackSuccess = (data) => ({
  type: ADD_POST_TRACK_SUCCESS,
  data,
});
export const addPostTrackFailure = () => ({
  type: ADD_POST_TRACK_FAILURE,
});

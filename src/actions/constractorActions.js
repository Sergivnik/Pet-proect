import axios from "axios";
import { URL } from "../middlewares/initialState";

export const GET_DATA_CONSTRACTORS_SUCCESS = "DATA::GET_DATA_CONSTRACTORS_SUCCESS";
export const GET_DATA_CONSTRACTORS_FAILURE = "DATA::GET_DATA_CONSTRACTORS_FAILURE";

export const getDataConstractorstSuccess = (dataServer) => ({
  type: GET_DATA_CONSTRACTORS_SUCCESS,
  dataServer,
});
export const getDataConstractorsFailure = () => ({
  type: GET_DATA_CONSTRACTORS_FAILURE,
});
export const getDataConstractorst = ()=>{
   return (dispatch) => {
      axios
        .get(URL + "/dataConstractors")
        .then((res) => {
          return dispatch(getDataConstractorstSuccess(res.data));
        })
        .catch((e) => {
          console.log(e.message);
          return dispatch(getDataConstractorsFailure());
        });
    };
}
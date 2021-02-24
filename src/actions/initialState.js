import axios from "axios";

export const GET_DATA = "DATA::GET_DATA";
export const GET_DATA_REQUEST = "DATA::GET_DATA_REQUEST";
export const GET_DATA_SUCCESS = "DATA::GET_DATA_SUCCESS";
export const GET_DATA_FAILURE = "DATA::GET_DATA_FAILURE";

export const getDataRequest = () => ({
  type: GET_DATA_REQUEST,
});

export const getDataSuccess = (dataServer) => ({
  type: GET_DATA_SUCCESS,
  dataServer,
});

export const getDataFailure = () => ({
  type: GET_DATA_FAILURE,
});

export const getData = () => {
  return (dispatch) => {
    dispatch(getDataRequest());
    axios
      .get("http://localhost:3000/API/data")
      .then((res) => dispatch(getDataSuccess(res.data)))
      .catch(() => dispatch(getDataFailure()));
  };
};

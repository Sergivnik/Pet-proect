import axios from "axios";
export const URL = "http://localhost:3000/API";
//export const URL = "http://192.168.0.106:3000/API";
export const GET_DATA = "DATA::GET_DATA";
export const GET_DATA_REQUEST = "DATA::GET_DATA_REQUEST";
export const GET_DATA_SUCCESS = "DATA::GET_DATA_SUCCESS";
export const GET_DATA_FAILURE = "DATA::GET_DATA_FAILURE";
export const GET_FILTER_SUCCESS = "DATA::GET_FILTER_FAILURE";
export const GET_FILTER_FAILURE = "DATA::GET_FILTER_FAILURE";
export const FILTER_DATA = "FILTER_DATA";

export const filterData = (filterObj) => {
  if (
    filterObj.date.length == 0 &&
    filterObj.driver.length == 0 &&
    filterObj.oder.length == 0 &&
    filterObj.cityLoading.length == 0 &&
    filterObj.cityUnloading.length == 0 &&
    filterObj.customerPrice.length == 0 &&
    filterObj.driverPrice.length == 0 &&
    filterObj.proxy.length == 0 &&
    filterObj.complited.length == 0 &&
    filterObj.documents.length == 0
  ) {
    return (dispatch) => {
      dispatch(getDataRequest());
      axios
        .get(URL + "/data")
        .then((res) => {
          return dispatch(getDataSuccess(res.data));
        })
        .catch((e) => {
          console.log(e.message);
          return dispatch(getDataFailure());
        });
    };
  } else
    return (dispatch) => {
      axios
        .post(URL + "/filter", { body: filterObj })
        .then((res) => {
          dispatch(getFilterSuccess(res.data));
        })
        .catch((e) => {
          console.log(e.message);
          dispatch(getFilterFailure());
        });
    };
};

export const getFilterSuccess = (dataServer) => ({
  type: GET_FILTER_SUCCESS,
  dataServer,
});

export const getFilterFailure = () => ({
  type: GET_FILTER_FAILURE,
});

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
      .get(URL + "/data")
      .then((res) => {
        return dispatch(getDataSuccess(res.data));
      })
      .catch((e) => {
        console.log(e.message);
        return dispatch(getDataFailure());
      });
  };
};

import axios from "axios";
//export const DOMENNAME="http://localhost:3000"
//export const DOMENNAME = "http://192.168.0.101:3000";//work
//export const DOMENNAME = "http://192.168.0.106:3000";//home
export const DOMENNAME = "http://31.31.203.198:3000";//vps
//export const GET_DATA = "DATA::GET_DATA";
export const URL = DOMENNAME+"/API";//develop 
export const GET_DATA_REQUEST = "DATA::GET_DATA_REQUEST";
export const GET_DATA_SUCCESS = "DATA::GET_DATA_SUCCESS";
export const GET_DATA_FAILURE = "DATA::GET_DATA_FAILURE";
export const GET_FILTER_SUCCESS = "DATA::GET_FILTER_FAILURE";
export const GET_FILTER_FAILURE = "DATA::GET_FILTER_FAILURE";
export const FILTER_DATA = "FILTER_DATA";
//export const GET_PAYMENTS_DATA = "DATA::GET_PAYMENTS_DATA";
export const GET_PAYMENTS_DATA_SUCCESS = "DATA::GET_PAYMENTS_DATA_SUCCESS";
export const GET_PAYMENTS_DATA_FAILURE = "DATA::GET_PAYMENTS_DATA_FAILURE";
export const DELETE_PAYMENT_DATA = "DATA::DELETE_PAYMENT_DATA";
export const DELETE_PAYMENT_DATA_SUCCESS = "DATA::DELETE_PAYMENT_DATA_SUCCESS";
export const DELETE_PAYMENT_DATA_FAILURE = "DATA::DELETE_PAYMENT_DATA_FAILURE";

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
    filterObj.completed.length == 0 &&
    filterObj.documents.length == 0 &&
    filterObj.customerPayment.length == 0 &&
    filterObj.driverPayment.length == 0 &&
    filterObj.accountList.length == 0
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
    //dispatch(getDataRequest());
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
export const getDataPaymentsSuccess = (dataServer) => ({
  type: GET_PAYMENTS_DATA_SUCCESS,
  dataServer,
});
export const getDataPaymentsFailure = () => ({
  type: GET_PAYMENTS_DATA_FAILURE,
});
export const getPaymentsData = () => {
  return (dispatch) => {
    axios
      .get(URL + "/dataPayments")
      .then((res) => {
        return dispatch(getDataPaymentsSuccess(res.data));
      })
      .catch((e) => {
        console.log(e.message);
        return dispatch(getDataPaymentsFailure());
      });
  };
};
export const deletePaymentDataSuccess = (dataServer,id) => ({
  type: DELETE_PAYMENT_DATA_SUCCESS,
  dataServer,
  id,
});
export const deletePaymentDataFailure = () => ({
  type: DELETE_PAYMENT_DATA_FAILURE,
});
export const deletePaymentData = (id) => {
  return (dispatch) => {
    axios
      .delete(URL + "/deleteDataPatmenrs" + "/" + id)
      .then((res) => {
        return dispatch(deletePaymentDataSuccess(res.data, id));
      })
      .catch((e) => {
        console.log(e.message);
        return dispatch(deletePaymentDataFailure());
      });
  };
};

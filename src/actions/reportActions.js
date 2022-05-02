import axios from "axios";
import { URL } from "../middlewares/initialState";

export const GET_REPORT_DATA_SUCCESS = "GET_REPORT_DATA_SUCCESS";
export const GET_REPORT_DATA_FAILURE = "GET_REPORT_DATA_FAILURE";

export const getReportData = (data) => {
  console.log(data);
  return (dispatch) => {
    axios
      .post(URL + "/getReportData", { body: data })
      .then((res) => {
        return dispatch(getReportDataSuccess(res.data, data));
      })
      .catch((e) => {
        console.log(e.message);
        return dispatch(getReportDataFailure());
      });
  };
};
export const getReportDataSuccess = (dataServer, data) => ({
  type: GET_REPORT_DATA_SUCCESS,
  dataServer,
  data,
});
export const getReportDataFailure = () => ({
  type: GET_REPORT_DATA_FAILURE,
});

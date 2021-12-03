import axios from "axios";
import { DOMENNAME } from "../middlewares/initialState";

export const GET_PDF_SUCCESS = "GET_PDF_SUCCESS";
export const GET_PDF_FAILURE = "GET_PDF_FAILURE";

export const getPdfSuccess = (dataServer) => ({
  type: GET_PDF_SUCCESS,
  dataServer,
});
export const getPdfFailure = () => ({
  type: GET_PDF_FAILURE,
});
export const getPdf = (id) => {
  return (dispatch) => {
    axios
      .get(DOMENNAME + "/API/getPdf" + "/" + id, {
        responseType: "blob",
      })
      .then((res) => {
        let blob = new Blob([res.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        let newWin = window.open();
        newWin.location.href = url;
      })
      .catch((e) => {
        console.log(e.message);
        dispatch(getPdfFailure());
      });
  };
};

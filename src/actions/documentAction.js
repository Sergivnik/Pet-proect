import axios from "axios";
import { DOMENNAME } from "../middlewares/initialState";

export const GET_PDF_SUCCESS = "GET_PDF_SUCCESS";
export const GET_PDF_FAILURE = "GET_PDF_FAILURE";

export const getPdfSuccess = (dataServer) => ({
    type: GET_PDF_SUCCESS,
    dataServer,
})
export const getPdfFailure = () => ({
    type: GET_PDF_FAILURE,
});
export const getPdf = (id) => {
    return (dispatch) => {
        axios
            .post(DOMENNAME + "/API/getPdf", { responseType: 'blob', body: id })
            .then((res) => {
                const url = window.URL.createObjectURL(new Blob([res.data],{type: "application/pdf"}));
                //let blob = new Blob([res.data],{type: "application/pdf"});
                //let href = URL.createObjectURL(blob);
                window.open(url);
            })
            .catch((e) => {
                console.log(e.message);
                dispatch(getPdfFailure());
            });
    }
}
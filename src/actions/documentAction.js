import axios from "axios";
import { URL } from "../middlewares/initialState";

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
            .post(URL + "/getPdf", { responseType: 'arraybuffer', body: id })
            .then((res) => {
                let link = document.createElement('a');
                let blob = new Blob([res.data],{type: "application/pdf"});
                link.href = URL.createObjectURL(blob);
                link.click();
            })
            .catch((e) => {
                console.log(e.message);
                dispatch(getPdfFailure());
            });
    }
}
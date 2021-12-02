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
      .post(DOMENNAME + "/API/getPdf", {
        responseType: "application/pdf",
        body: id,
      })
      .then((res) => {
        var arrrayBuffer = base64ToArrayBuffer(res.data); 
        function base64ToArrayBuffer(base64) {
            var binaryString = atob(base64);
            var binaryLen = binaryString.length;
            var bytes = new Uint8Array(binaryLen);
            for (var i = 0; i < binaryLen; i++) {
                var ascii = binaryString.charCodeAt(i);
                bytes[i] = ascii;
            }
            return bytes;
        }
        var blob = new Blob([arrrayBuffer], {type: "application/pdf"});
        var link = window.URL.createObjectURL(blob);
        window.open(link,'', 'height=650,width=840');
        //let blob = new File([res.data],  "result38555.pdf");
        //const url = URL.createObjectURL(blob);
        //let newWin = window.open([res.data]);
        //let embed = newWin.document.createElement('embed');
        //embed.setAttribute('src',blob);
        //newWin.document.body.append(url);
      })
      .catch((e) => {
        console.log(e.message);
        dispatch(getPdfFailure());
      });
  };
};

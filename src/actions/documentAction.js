import axios from "axios";
import { DOMENNAME } from "../middlewares/initialState";

export const GET_PDF_SUCCESS = "GET_PDF_SUCCESS";
export const GET_PDF_FAILURE = "GET_PDF_FAILURE";
export const ADD_PDF_DOC_SUCCESS = "ADD_PDF_DOC_SUCCESS";
export const ADD_PDF_DOC_FAILURE = "ADD_PDF_DOC_FAILURE";
export const CREATE_NEW_INVOICE_SUCCESS = "CREATE_NEW_INVOICE_SUCCESS";
export const CREATE_NEW_INVOICE_FAILURE = "CREATE_NEW_INVOICE_FAILURE";

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
export const addPdfDocSuccess = () => ({
  type: ADD_PDF_DOC_SUCCESS,
});
export const addPdfDocFailure = () => ({
  type: ADD_PDF_DOC_FAILURE,
});
export const addPdfDoc = (docHtml, id) => {
  return (dispatch) => {
    axios
      .post(DOMENNAME + "/API/addPdf" + "/" + id, {
        body: docHtml,
      })
      .then((res) => {
        return dispatch(addPdfDocSuccess());
      })
      .catch((e) => {
        console.log(e.message);
        dispatch(addPdfDocFailure());
      });
  };
};

export const createNewInvoiceSuccess = (invoiceNumber) => ({
  type: CREATE_NEW_INVOICE_SUCCESS,
  invoiceNumber,
});
export const createNewInvoiceFailure = () => ({
  type: CREATE_NEW_INVOICE_FAILURE,
});
export const createNewInvoice = (docHtml, invoiceNumber, year, customer) => {
  return (dispatch) => {
    axios
      .post(DOMENNAME + "/API/createDoc", {
        body: {
          html: docHtml,
          year: year,
          invoiceNumber: invoiceNumber,
          customer: customer,
        },
      })
      .then((res) => {
        return dispatch(createNewInvoiceSuccess(invoiceNumber));
      })
      .catch((e) => {
        console.log(e.message);
        dispatch(createNewInvoiceFailure());
      });
  };
};

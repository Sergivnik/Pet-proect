import axios from "axios";
import { DOMENNAME } from "../middlewares/initialState";

export const GET_PDF_SUCCESS = "GET_PDF_SUCCESS";
export const GET_PDF_FAILURE = "GET_PDF_FAILURE";
export const ADD_PDF_DOC_SUCCESS = "ADD_PDF_DOC_SUCCESS";
export const ADD_PDF_DOC_FAILURE = "ADD_PDF_DOC_FAILURE";
export const CREATE_NEW_INVOICE_SUCCESS = "CREATE_NEW_INVOICE_SUCCESS";
export const CREATE_NEW_INVOICE_FAILURE = "CREATE_NEW_INVOICE_FAILURE";
export const ADD_ACT_TO_DOC_SUCCESS = "ADD_ACT_TO_DOC_SUCCESS";
export const ADD_ACT_TO_DOC_FAILURE = "ADD_ACT_TO_DOC_FAILURE";
export const ADD_CONSIGNMENT_NOTE_SUCCESS = "ADD_CONSIGNMENT_NOTE_SUCCESS";
export const ADD_CONSIGNMENT_NOTE_FAILURE = "ADD_CONSIGNMENT_NOTE_FAILURE";
export const SEND_EMAIL_SUCCESS = "SEND_EMAIL_SUCCESS";
export const SEND_EMAIL_FAILURE = "SEND_EMAIL_FAILURE";
export const CREATE_DOC_WITHOUT_STAMP_SUCCESS =
  "CREATE_DOC_WITHOUT_STAMP_SUCCESS";
export const CREATE_DOC_WITHOUT_STAMP_FAILURE =
  "CREATE_DOC_WITHOUT_STAMP_FAILURE";
export const GET_PDF_WITHOUT_STAMP_SUCCESS = "GET_PDF_WITHOUT_STAMP_SUCCESS";
export const GET_PDF_WITHOUT_STAMP_FAILURE = "GET_PDF_WITHOUT_STAMP_FAILURE";

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
export const getPdfWithoutStampSuccess = (dataServer) => ({
  type: GET_PDF_WITHOUT_STAMP_SUCCESS,
  dataServer,
});
export const getPdfWithoutStampFailure = () => ({
  type: GET_PDF_WITHOUT_STAMP_FAILURE,
});
export const getWithoutStampPdf = (id) => {
  return (dispatch) => {
    axios
      .get(DOMENNAME + "/API/getPdfWithoutStamp" + "/" + id, {
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
        dispatch(getPdfWithoutStampFailure());
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

export const createNewInvoiceSuccess = (invoiceNumber, arrOrderId) => ({
  type: CREATE_NEW_INVOICE_SUCCESS,
  invoiceNumber,
  arrOrderId,
});
export const createNewInvoiceFailure = () => ({
  type: CREATE_NEW_INVOICE_FAILURE,
});
export const createNewInvoice = (
  docHtml,
  invoiceNumber,
  year,
  customer,
  arrOrderId
) => {
  return (dispatch) => {
    axios
      .post(DOMENNAME + "/API/createDoc", {
        body: {
          html: docHtml,
          year: year,
          invoiceNumber: invoiceNumber,
          customer: customer,
          arrOrderId: arrOrderId,
        },
      })
      .then((res) => {
        return dispatch(createNewInvoiceSuccess(invoiceNumber, arrOrderId));
      })
      .catch((e) => {
        console.log(e.message);
        dispatch(createNewInvoiceFailure());
      });
  };
};

export const addActToDocSuccess = (invoiceNumber, arrOrderId) => ({
  type: ADD_ACT_TO_DOC_SUCCESS,
  invoiceNumber,
  arrOrderId,
});
export const addActToDocFailure = () => ({
  type: ADD_ACT_TO_DOC_FAILURE,
});
export const addActToDoc = (
  docHtml,
  invoiceNumber,
  year,
  customer,
  arrOrderId
) => {
  return (dispatch) => {
    axios
      .post(DOMENNAME + "/API/addActToDoc", {
        body: {
          html: docHtml,
          year: year,
          invoiceNumber: invoiceNumber,
          customer: customer,
          arrOrderId: arrOrderId,
        },
      })
      .then((res) => {
        return dispatch(addActToDocSuccess(invoiceNumber, arrOrderId));
      })
      .catch((e) => {
        console.log(e.message);
        dispatch(addActToDocFailure());
      });
  };
};

export const addConsignmentNoteSuccess = () => ({
  type: ADD_CONSIGNMENT_NOTE_SUCCESS,
});
export const addConsignmentNoteFailure = () => ({
  type: ADD_CONSIGNMENT_NOTE_FAILURE,
});
export const addConsignmentNote = (id, file) => {
  var formData = new FormData();
  formData.set("fileData", file, "fileData");
  return (dispatch) => {
    axios
      .post(DOMENNAME + "/API/addConsignmentNote" + "/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        return dispatch(addConsignmentNoteSuccess());
      })
      .catch((e) => {
        console.log(e.message);
        dispatch(addConsignmentNoteFailure());
      });
  };
};
export const sendEmailSuccess = (id) => ({
  type: SEND_EMAIL_SUCCESS,
  id,
});
export const sendEmailFailure = () => ({
  type: SEND_EMAIL_FAILURE,
});
export const sendEmail = (id) => {
  return (dispatch) => {
    axios
      .get(DOMENNAME + "/API/sendEmail" + "/" + id)
      .then((res) => {
        console.log(res.data);
        return dispatch(sendEmailSuccess(id));
      })
      .catch((e) => {
        console.log(e.message);
        dispatch(addPdfDocFailure());
      });
  };
};
export const createDocWithoutStampSuccess = (invoiceNumber) => ({
  type: CREATE_DOC_WITHOUT_STAMP_SUCCESS,
  invoiceNumber,
});
export const createDocWithoutStampFailure = () => ({
  type: CREATE_DOC_WITHOUT_STAMP_FAILURE,
});
export const createDocWithoutStamp = (
  docHtml,
  invoiceNumber,
  year,
  customer
) => {
  return (dispatch) => {
    axios
      .post(DOMENNAME + "/API/createDocWithoutStamp", {
        body: {
          html: docHtml,
          year: year,
          invoiceNumber: invoiceNumber,
          customer: customer,
        },
      })
      .then((res) => {
        return dispatch(createDocWithoutStampSuccess(invoiceNumber));
      })
      .catch((e) => {
        console.log(e.message);
        dispatch(createDocWithoutStampFailure());
      });
  };
};

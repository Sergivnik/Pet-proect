const express = require("express");
const router = express.Router();
const path = require("path");
const API = require("../controlers/API.js");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./API/Bills/");
  },
  filename: function (req, file, cb) {
    cb(null, "tempDoc.pdf");
  },
});
const upload = multer({ storage: storage });

router.get("/data", API.taskGet);
router.get("/dataPayments", API.taskGetPayments);
router.get("/dataDriverDebt", API.taskGetDebts);
router.get("/dataContractors", API.taskGetContractors);
router.get("/getPdf/:id/:typeDoc", API.taskGetPdf);
router.get("/getPdfWithoutStamp/:id", API.taskGetPdfWithoutStamp);
router.get("/sendEmail/:id", API.taskSendEmail);

router.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});
router.post("/filter", API.taskGetFilter);
router.post("/addOder", API.taskAdd);
router.post("/proxy/:id", API.taskProxy);
router.post("/addData", API.taskAddData);
router.post("/addPdf/:id", API.taskAddPdfDoc);
router.post("/createDoc", API.taskCreateDoc);
router.post("/createDocWithoutStamp", API.taskCreateDocWithoutStamp);
router.post(
  "/addConsignmentNote/:id",
  upload.single("fileData"),
  API.taskAddConsignmentNote
);

router.patch("/edit", API.taskEdit);
router.patch("/editOderNew", API.taskEditNew);
router.patch("/makePaymentCustomer", API.makePaymentCustomer);
router.patch("/addDataDriverDebt", API.makeDriverDebt);
router.patch("/editDriverDebt", API.editDriverDebt);
router.patch("/makePaymentDriver", API.makePaymentDriver);
router.patch("/addDataContractorPayment", API.addDataContractorPayment);
router.patch("/editData", API.taskEditData);

router.delete("/:id", API.taskDel);
router.delete("/deleteDataPatmenrs/:id", API.taskDeletePayments);
router.delete("/deletedriverDebt/:id", API.taskDeleteDebt);
router.delete("/deleteData/:id", API.taskDeleteData);

module.exports = router;

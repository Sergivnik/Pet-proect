const express = require("express");
const router = express.Router();
const path = require("path");
const API = require("../controlers/API.js");

router.get("/data", API.taskGet);
router.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});
router.post("/filter", API.taskGetFilter);
router.post("/addOder", API.taskAdd);
router.post("/proxy/:id", API.taskProxy);
router.patch("/edit", API.taskEdit);
router.patch("/makePaymentCustomer", API.makePaymentCustomer);
router.delete("/:id", API.taskDel);

module.exports = router;

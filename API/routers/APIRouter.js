const express = require("express");
const router = express.Router();
const API = require("../controlers/API.js");

router.get("/data", API.taskGet);
router.post("/addOder",API.taskAdd)

module.exports = router;

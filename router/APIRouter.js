const express = require("express");
const router = express.Router();
const API = require("../controllers/API.js");

router.get("/getDATA", API.taskGet);

module.exports = router;

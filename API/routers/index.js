const express = require("express");
const router = express.Router();

const APIRouter = require("./APIRouter.js");

router.use("/API", APIRouter);

module.exports = router;

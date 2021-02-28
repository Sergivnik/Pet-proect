const express = require("express");
const router = express.Router();

const APIRouter = require("./APIRouter.js");

router.options("*", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.send("ok");
});
router.use("/API", APIRouter);

module.exports = router;

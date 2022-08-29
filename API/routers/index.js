const express = require("express");
const router = express.Router();

const APIRouter = require("./APIRouter.js");
//const APIMongoDBRouter = require("./APIMongoDBRouter.js");

router.options("*", (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:8080");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", "DELETE, PATCH, POST");
  res.set("Access-Control-Allow-Credentials", "true");
  res.send("ok");
});
router.use("/oders", APIRouter);
router.use("/API", APIRouter);
//router.use("/API_MONGODB", APIMongoDBRouter);

module.exports = router;

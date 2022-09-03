const express = require("express");
const router = express.Router();

const APIRouter = require("./APIRouter.js");
//const APIMongoDBRouter = require("./APIMongoDBRouter.js");

router.options("*", (req, res) => {
  if (req.headers.origin == "http://localhost:8080") {
    res.set("Access-Control-Allow-Origin", "http://localhost:8080");
  }
  if (req.headers.origin == "http://atpivanova.ru:3000") {
    res.set("Access-Control-Allow-Origin", "http://atpivanova.ru:3000");
  }
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", "DELETE, PATCH, POST");
  res.set("Access-Control-Allow-Credentials", "true");
  res.send("ok");
});
router.use("*", (req, res, next) => {
  if (req.headers.origin == "http://localhost:8080") {
    res.set("Access-Control-Allow-Origin", "http://localhost:8080");
  }
  if (req.headers.origin == "http://atpivanova.ru:3000") {
    res.set("Access-Control-Allow-Origin", "http://atpivanova.ru:3000");
  }
  next();
});
router.use("/oders", APIRouter);
router.use("/API", APIRouter);
//router.use("/API_MONGODB", APIMongoDBRouter);

module.exports = router;

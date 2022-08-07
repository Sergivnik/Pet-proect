const express = require("express");
const router = express.Router();

const APIRouter = require("./APIRouter.js");
//const APIMongoDBRouter = require("./APIMongoDBRouter.js");

router.options("*", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", "DELETE, PATCH");
  res.send("ok");
});
// router.use("/API", (req, res, next) => {
//   console.log(req.originalUrl);
//   console.log(req.body.body);
//   return res.redirect(301,"/auth");
// });
// router.use("/auth", (req, res) => {
//   res.send("<h1>password</h1>");
// });
router.use("/oders", APIRouter);
router.use("/API", APIRouter);
//router.use("/API_MONGODB", APIMongoDBRouter);

module.exports = router;

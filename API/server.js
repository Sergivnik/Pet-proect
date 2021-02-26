const express = require("express");
var data = require("./data.json");
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/API/data", function (req, res, next) {
  res.send(data);
});

app.listen(3000, () => console.log("Example app listening on port 5000!"));

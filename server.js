const express = require("express");
const path = require("path");
const app = express();
//const router = require("./router");
var data = require("./API/data.json");

app.use(express.static(path.join(__dirname, "./dist")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//app.use(router);

app.get("/API/data", function (req, res, next) {
  res.send(data);
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));

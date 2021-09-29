const express = require("express");
const path = require("path");
const router = require("./routers");

const app = express();
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, "documents")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

var loadData = require("./DB/loadData");
// loadData.getData();


app.listen(3000, () => console.log("Example app listening on port 3000!"));

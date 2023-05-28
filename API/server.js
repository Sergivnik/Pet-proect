const express = require("express");
var mysql2 = require("mysql2/promise");
const path = require("path");
const router = require("./routers");
const config = require("./models/config.js");

const app = express();

// Функция блокировки CORS нужна для режима разработки
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // Замените на соответствующий домен вашего приложения
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// Функция блокировки CORS нужна для режима разработки

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, "documents")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
var connection = mysql2.createPool(config.sql);
var sessionStore = new MySQLStore({}, connection);
let sessionOption = config.session;
sessionOption.store = sessionStore;
app.use(session(sessionOption));
app.use(router);

// var loadData = require("./DB/loadData");
// loadData.getData();
// loadData.getCities();
// loadData.getDrivers();
// loadData.getCustomers();
// loadData.getExpenses();
// loadData.getTrackDrivers();

app.listen(80, () => console.log("Example app listening on port 80!"));

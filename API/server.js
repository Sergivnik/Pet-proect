const express = require("express");
const path = require("path");
const router = require("./routers");

const app = express();
app.use(express.static(path.join(__dirname, "./public")));
//app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.static(path.join(__dirname, "documents")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const OderSchema = new Schema({
//   _id: Number,
//   date: String,
//   driverId: Number,
//   customerId: Number,
//   idLoadingPoint: Number,
//   idUnloadingPoint: Number,
//   customerPrice: Number,
//   driverPrice: Number,
//   proxy: Boolean,
// });
// const DriverSchema = new Schema({
//   _id: Number,
//   value: String,
// });
// const CustomerSchema = new Schema({
//   _id: Number,
//   value: String,
// });
// const CitiesSchema = new Schema({
//   _id: Number,
//   value: String,
// });
// var XLSX = require("xlsx");
// var workbook = XLSX.readFile("./DB/Колдовство.xlsb");
// var sheet_name_list = workbook.SheetNames;
// var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
// console.log(xlData);
// mongoose.connect("mongodb://localhost:27017/pet_proect", {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// });
// const Oder = mongoose.model("Oder", OderSchema);
// const Driver = mongoose.model("Driver", DriverSchema);
// const Customer = mongoose.model("Customer", CustomerSchema);
// const City = mongoose.model("Citie", CitiesSchema);
// const getData = async function (callback) {
//   let data = {};
//   await Driver.find({}, function (err, res) {
//     if (err) return console.log(err);
//     console.log(res);
//     data.driver = res;
//   });
//   await Customer.find({}, function (err, res) {
//     if (err) return console.log(err);
//     console.log(res);
//     data.customer = res;
//   });
//   await City.find({}, function (err, res) {
//     if (err) return console.log(err);
//     console.log(res);
//     data.cities = res;
//   });
//   callback(data);
// };
// getData((dataList) => {
//   console.log(dataList);
//   (async () => {
//     let i = 1;
//     for (const elem of xlData) {
//       i = elem.id;
//       dateOd = new Date(1900, 0, 1);
//       dateOd.setDate(dateOd.getDate() + elem.Дата - 2);
//       dateOd = dateOd.toLocaleDateString();
//       res = dataList.driver.find((item) => item.value == elem.Колдун);
//       if (res) {
//         idDr = res.id;
//       } else {
//         idDr = null;
//       }
//       res = dataList.customer.find((item) => item.value == elem.Заказчик);
//       if (res) {
//         idOd = res.id;
//       } else {
//         idOd = null;
//       }
//       res = dataList.cities.find((item) => item.value == elem.пзагрузки);
//       if (res) {
//         idLP = res.id;
//       } else {
//         idLP = null;
//       }
//       res = dataList.cities.find((item) => item.value == elem.пвыгрузки);
//       if (res) {
//         idUP = res.id;
//       } else {
//         idUP = null;
//       }
//       CuPr = elem.Ставказаказчика;
//       DrPr = elem.Ставкаколдуна;

//       const oder = await new Oder({
//         _id: i,
//         date: dateOd,
//         driverId: idDr,
//         customerId: idOd,
//         idLoadingPoint: idLP,
//         idUnloadingPoint: idUP,
//         customerPrice: CuPr,
//         driverPrice: DrPr,
//         proxy: false,
//       }).save();
//     }
//   })();
// });

// const mysql = require("mysql2");
// const options = require("./models/config.js");

// var XLSX = require("xlsx");
// var workbook = XLSX.readFile("./DB/Колдовство.xlsb");
// var sheet_name_list = workbook.SheetNames;
// var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[3]]);
// console.log(xlData);
// let i = 0;
// const getDATA = async function (callback) {
//   let allData = {};
//   const db = mysql.createPool(options).promise();
//   try {
//     let [data] = await db.query("SELECT * FROM cities");
//     allData.citieslist = data;
//     [data] = await db.query("SELECT * FROM drivers");
//     allData.driverlist = data;
//     [data] = await db.query("SELECT * FROM oders");
//     allData.clientList = data;
//     [data] = await db.query("SELECT * FROM oderslist");
//     allData.odersList = data;
//     callback(allData);
//   } catch (err) {
//     return { error: err };
//   }
// };
// getDATA((datalists) => {
//   console.log(datalists);
//   let oder = {};
//   const db = mysql.createPool(options).promise();
//   (async () => {
//     for (const elem of xlData) {
//       i = elem.id;
//       dateOd = new Date(1900, 0, 1);
//       dateOd.setDate(dateOd.getDate() + elem.Дата);
//       dateOd = dateOd.toLocaleDateString();
//       res = datalists.driverlist.find((item) => item.value == elem.Колдун);
//       if (res) {
//         idDr = res.id;
//       } else {
//         idDr = null;
//       }
//       res = datalists.clientList.find((item) => item.value == elem.Заказчик);
//       if (res) {
//         idOd = res.id;
//       } else {
//         idOd = null;
//       }
//       res = datalists.citieslist.find((item) => item.value == elem.погрузка);
//       if (res) {
//         idLP = res.id;
//       } else {
//         idLP = null;
//       }
//       res = datalists.citieslist.find((item) => item.value == elem.выгрузки);
//       if (res) {
//         idUP = res.id;
//       } else {
//         idUP = null;
//       }
//       CuPr = elem.Ставказаказчика;
//       DrPr = elem.Ставкаколдуна;
//       oder = {
//         id: i,
//         date: dateOd,
//         idDriver: idDr,
//         idOder: idOd,
//         idLoadingPoint: idLP,
//         idUnloadingPoint: idUP,
//         customerPrice: CuPr,
//         driverPrice: DrPr,
//       };
//       try {
//         [data] = await db.query("INSERT INTO oderslist SET ?", oder);
//         console.log(data);
//       } catch (err) {
//         console.log({ error: err });
//       }
//     }
//   })();
// });
app.listen(3000, () => console.log("Example app listening on port 3000!"));

const express = require("express");
const path = require("path");
const router = require("./routers");
var tasks = require("./models/tasks.js");

const app = express();
app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

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

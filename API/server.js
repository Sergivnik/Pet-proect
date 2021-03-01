const express = require("express");
const path = require("path");
const router = require("./routers");

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
// var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]);
// const db = mysql.createConnection(options).promise();
// xlData.forEach(async (elem) => {
//   try {
//     let [data] = await db.query("INSERT INTO drivers SET ?", {
//       id: null,
//       value: elem.ФИО,
//     });
//   } catch (err) {
//     callback({ error: err });
//   }
// });

app.listen(3000, () => console.log("Example app listening on port 3000!"));

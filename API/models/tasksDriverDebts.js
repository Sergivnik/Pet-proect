const mysql = require("mysql2");
const options = require("./config.js");

var TaskDebts = {
  list: async function (callback) {
    const db = mysql.createPool(options).promise();
    try {
      let [data] = await db.query("SELECT * FROM driverdebts order by date");
      callback(data);
      db.end();
    } catch (err) {
      callback({ error: err });
    }
  },
  makeDriverDebt: async function (data, callback) {
    console.log(data);
    let debt = {
      date: data.date,
      idDriver: data.idDriver,
      category: data.idCategory,
      sumOfDebt: data.sumOfDebt,
      debtClosed: data.idDebtClosed,
      addInfo: data.addInfo,
    };
    const db = mysql.createPool(options).promise();
    try {
      let [debtData] = await db.query("INSERT INTO driverdebts SET ?", debt);
      console.log(debtData.insertId);
      callback(debtData.insertId);
    } catch (err) {
      callback({ error: err });
    }
    db.end();
  },
};
module.exports = TaskDebts;

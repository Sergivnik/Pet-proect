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
  edit: async function (data, callback) {
    console.log(
      `UPDATE driverdebts SET ${data.editField}=${data.newValue} WHERE id=${data.id}`
    );
    const db = mysql.createPool(options).promise();
    try {
      await db.query(
        `UPDATE driverdebts SET ${data.editField}="${data.newValue}" WHERE id=${data.id}`
      );
      callback("success");
    } catch (err) {
      callback({ error: err });
    }
  },
  del: async function (id, callback) {
    console.log(id);
    const db = mysql.createPool(options).promise();
    try {
      await db.query(`DELETE FROM driverdebts WHERE id=${id}`);
      callback("success");
    } catch (err) {
      callback({ error: err });
    }
    db.end();
  },
};
module.exports = TaskDebts;

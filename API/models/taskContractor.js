const mysql = require("mysql2");
const options = require("./config.js");

var TasksContractors = {
  list: async function (callback) {
    let dataObj = {};
    const db = mysql.createPool(options.sql).promise();
    try {
      let [data] = await db.query("SELECT * FROM contractors order by value");
      dataObj.contractors = data;
      [data] = await db.query(
        "SELECT * FROM contractorspayments order by date"
      );
      dataObj.contractorsPayments = data;
      callback(dataObj);
    } catch (err) {
      callback({ error: err });
    }
    db.end();
  },
  add: async function (data, callback) {
    console.log(data);
    const db = mysql.createPool(options.sql).promise();
    try {
      let [contractorPayment] = await db.query(
        "INSERT INTO contractorspayments SET ?",
        data
      );
      callback(contractorPayment.insertId);
    } catch (err) {
      console.log(err);
      callback({ error: err });
    }
    db.end();
  },
  delete: async function (id, callback) {
    console.log(id);
    const db = mysql.createPool(options.sql).promise();
    try {
      let [data] = await db.query(
        `DELETE FROM contractorspayments WHERE id=${id}`
      );
      callback("success!");
    } catch (err) {
      console.log(err);
      callback({ error: err });
    }
    db.end();
  },
};

module.exports = TasksContractors;

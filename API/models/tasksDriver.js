const mysql = require("mysql2");
const options = require("./config.js");
const { getDriverPayments } = require("../controlers/driverAPI.js");

let TasksDriver = {
  getDriverPayments: async (callBack) => {
    console.log("dataDriverPayment");
    const db = mysql.createPool(options.sql).promise();
    try {
      let [data] = await db.query(`SELECT * FROM driverpayment`);
      callBack(data);
    } catch (err) {
      callBack({ error: err });
    } finally {
      db.end();
    }
  },
};

module.exports = TasksDriver;

const mysql = require("mysql2");
const options = require("./config.js");

var TasksPayments = {
  list: async function (callback) {
    const db = mysql.createPool(options).promise();
    try {
      let [data] = await db.query("SELECT * FROM customerpayment");
      callback(data);
      db.end();
    } catch (err) {
      callback({ error: err });
    }
  },
};

module.exports = TasksPayments;

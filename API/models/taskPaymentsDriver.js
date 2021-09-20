const mysql = require("mysql2");
const options = require("./config.js");

var TaskPaymentsDriver = {
  add: async function (data, callback) {
    const db = mysql.createPool(options).promise();
    console.log(data);
    callback(data);
  },
};
module.exports = TaskPaymentsDriver;

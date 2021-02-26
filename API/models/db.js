const mysql = require("mysql2");
const options = require("./config.js");

const pool = mysql.createPool(options).promise();

module.exports = pool;

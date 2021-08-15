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
};
module.exports = TaskDebts;

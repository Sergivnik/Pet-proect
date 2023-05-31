const mysql = require("mysql2");
const options = require("./config.js");

let tasksTasks = {
  getTasksNumber: async (userId, callBack) => {
    console.log(userId);
    const db = mysql.createPool(options.sql).promise();
    try {
      let [data] = await db.query(
        `SELECT * FROM taskstable where statusOfTask="Новое" and userId=${userId}`
      );
      callBack(data.length);
    } catch (err) {
      console.log(err);
      callBack({ error: err, message: "failure" });
    }
    db.end();
  },
};
module.exports = tasksTasks;

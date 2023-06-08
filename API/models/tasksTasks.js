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
  getTasksData: async (userId, callBack) => {
    console.log(`Getting tasks data of user ${userId}`);
    let setData = {};
    const db = mysql.createPool(options.sql).promise();
    try {
      let [data] = await db.query(
        `SELECT * FROM taskstable where userId=${userId} or senderId=${userId}`
      );
      setData.taskstable = data;
      [data] = await db.query(
        `SELECT customerId FROM users where _id=${userId}`
      );
      let customerId = data[0].customerId;
      console.log(customerId);
      if (customerId != null) {
        [data] = await db.query(
          `SELECT _id, name, customerId FROM users where customerId=${customerId} or customerId is null`
        );
      } else {
        [data] = await db.query(`SELECT _id, name, customerId FROM users`);
      }
      setData.users = data;
      callBack(setData);
    } catch (err) {
      console.log(err);
      callBack({ error: err, message: "failure" });
    }
    db.end();
  },
  addNewTask: async (task, callBack) => {
    const db = mysql.createPool(options.sql).promise();
    console.log(`adding task data:`, task);
    try {
      let [data] = await db.query(`INSERT INTO taskstable set ?`, task);
      callBack(data);
    } catch (err) {
      callBack({ error: err });
    }
    db.end();
  },
  editTask: async (data, callBack) => {
    console.log(`edit task data:`, data);
    const db = mysql.createPool(options.sql).promise();
    try {
      await db.query(
        `UPDATE taskstable SET ${data.editField} = ? WHERE _id=?`,
        [data.newValue, data.id]
      );
      callBack("Success!");
    } catch (err) {
      callBack({ error: err });
    }
    db.end();
  },
};
module.exports = tasksTasks;

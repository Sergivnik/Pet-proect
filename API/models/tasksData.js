const mysql = require("mysql2");
const options = require("./config.js");

let TasksDada = {
  editData: async function (newData, callback) {
    console.log(newData);
    const db = mysql.createPool(options).promise();
    try {
      await db.query(`UPDATE ${newData.editTable} SET ? WHERE _id=?`, [
        newData.newData,
        newData.newData._id,
      ]);
      callback("success!");
    } catch (err) {
      console.log(err);
      callback({ error: err });
    }
    db.end();
  },
  addData: async function (newData, callback) {},
};
module.exports = TasksDada;

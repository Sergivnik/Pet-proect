const mysql = require("mysql2");
const options = require("./config.js");
const dateToSqlString = (dateSomeFormate) => {
  let date = new Date(dateSomeFormate);
  let Year = date.getFullYear();
  let Month = date.getMonth() + 1;
  let Day = date.getDate();
  return `${Year}-${Month}-${Day}`;
};

let TasksAddData = {
  editData: async (newData, callBack) => {
    if (newData.date != null) newData.date = dateToSqlString(newData.date);
    console.log(newData);
    const db = mysql.createPool(options).promise();
    try {
      await db.query(`UPDATE addtable SET ? WHERE id=?`, [newData, newData.id]);
      callBack("Success!");
    } catch (err) {
      console.log(err);
      callBack({ error: err });
    }
    db.end();
  },
};
module.exports = TasksAddData;

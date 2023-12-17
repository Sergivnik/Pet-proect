const mysql = require("mysql2");
const options = require("./config.js");

let TasksPostTrack = {
  addPostTrack: async (data, callBack) => {
    console.log(data);
    const db = mysql.createPool(options.sql).promise();

    try {
      console.log(
        `UPDATE oderslist set postTracker=${data.postTrackNumber} where _id in (${data.orderList})`
      );
      await db.query(
        `UPDATE oderslist set postTracker=${data.postTrackNumber} where _id in (${data.orderList})`
      );
      callBack("success!");
    } catch (err) {
      callBack({ error: err });
    }
    db.end();
  },
};

module.exports = TasksPostTrack;

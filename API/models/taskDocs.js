const mysql = require("mysql2");
const options = require("./config.js");

var TaskDocs = {
  add: async function (listId, docNumber, callback) {
    if (!isNaN(docNumber)) {
      if (docNumber < 10 && docNumber > 0) docNumber = "000" + docNumber;
      if (docNumber < 100 && docNumber > 9) docNumber = "00" + docNumber;
      if (docNumber < 1000 && docNumber > 99) docNumber = "0" + docNumber;
      if (docNumber < 10000 && docNumber > 999) docNumber = "" + docNumber;
    }
    const db = mysql.createPool(options.sql).promise();
    try {
      for (const id of listId) {
        await db.query(
          `UPDATE oderslist SET accountNumber="${docNumber}" WHERE _id=${id}`
        );
      }
      callback("success");
    } catch (err) {
      callback({ error: err });
    }
    db.end();
  },
};

module.exports = TaskDocs;

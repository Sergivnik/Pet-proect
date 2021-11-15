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
  addData: async function (newData, callback) {
    console.log(newData);
    const db = mysql.createPool(options).promise();
    try {
      let [data] = await db.query(
        `INSERT INTO ${newData.editTable} SET ?`,
        newData.newData
      );
      callback(data);
    } catch (err) {
      callback({ error: err });
    }
    db.end();
  },
  delData: async function (id, editTable, callback) {
    console.log(id, editTable);
    const db = mysql.createPool(options).promise();
    try {
      let [data] = await db.query(
        `SELECT * FROM driverdebts where idDriver=${id};`
      );
      let check = data.length;
      [data] = await db.query(
        `SELECT * FROM driverpayment where idDriver=${id};`
      );
      check = check + data.length;
      [data] = await db.query(`SELECT * FROM oderslist where idDriver=${id};`);
      check = check + data.length;
      [data] = await db.query(
        `SELECT * FROM trackdrivers where idOwner=${id};`
      );
      check = check + data.length;
      [data] = await db.query(`SELECT * FROM tracklist where idOwner=${id};`);
      check = check + data.length;
      console.log(check);
      if (check == 0) {
        await db.query(`DELETE FROM drivers WHERE _id=${id}`);
        callback("success!");
      } else {
        callback({
          error: "Данного перевозчика нельхя удалить",
          NoErr: "userErr1",
        });
      }
    } catch (err) {
      console.log(err);
      callback({ error: err });
    }
    db.end();
  },
};
module.exports = TasksDada;

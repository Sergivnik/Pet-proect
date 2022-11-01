const mysql = require("mysql2");
const options = require("./config.js");

let customerTasks = {
  getData: async (userId, callBack) => {
    console.log(userId);
    let allData = {};
    const db = mysql.createPool(options.sql).promise();
    try {
      let user = await db.query(`SELECT * FROM users WHERE _id="${userId}"`);
      user = user[0];
      console.log(user[0].customerId);
      let listOfColumns =
        "_id, date, idLoadingPoint, idUnloadingPoint, customerPrice, document, customerPayment, accountNumber, idTrackDriver, idTrack, idManager, loadingInfo, unloadingInfo, applicationNumber";
      let data = [];
      if (user[0].role == "customerBoss") {
        [data] = await db.query(
          `(SELECT ${listOfColumns} FROM oderslist WHERE idCustomer=${user[0].customerId} ORDER BY _id DESC LIMIT 1000) ORDER BY date, accountNumber, _id`
        );
      } else {
        [data] = await db.query(
          `(SELECT ${listOfColumns} FROM oderslist WHERE idCustomer=${user[0].customerId} and idManager=${user[0].managerID} ORDER BY _id DESC LIMIT 1000) ORDER BY date, accountNumber, _id`
        );
      }
      allData.ordersList = data;
      if (user[0].role == "customerBoss") {
        [data] = await db.query(
          `SELECT * FROM trackdrivers WHERE _id in (SELECT distinct idTrackDriver FROM oderslist WHERE idCustomer=${user[0].customerId})`
        );
      } else {
        [data] = await db.query(
          `SELECT * FROM trackdrivers WHERE _id in (SELECT distinct idTrackDriver FROM oderslist WHERE idCustomer=${user[0].customerId} and idManager=${user[0].managerID})`
        );
      }
      allData.driversList = data;
      if (user[0].role == "customerBoss") {
        [data] = await db.query(
          `SELECT * FROM tracklist WHERE _id in (SELECT distinct idTrack FROM oderslist WHERE idCustomer=${user[0].customerId})`
        );
      } else {
        [data] = await db.query(
          `SELECT * FROM tracklist WHERE _id in (SELECT distinct idTrack FROM oderslist WHERE idCustomer=${user[0].customerId} and idManager=${user[0].managerID})`
        );
      }
      allData.trackList = data;
      [data] = await db.query(
        `SELECT * FROM oders WHERE _id="${user[0].customerId}"`
      );
      allData.customerData = data[0];
      [data] = await db.query(
        `SELECT * FROM clientmanager WHERE odersId="${user[0].customerId}"`
      );
      allData.managerList = data;
      [data] = await db.query(
        `SELECT _id, name, role FROM users WHERE customerId="${user[0].customerId}"`
      );
      allData.userList = data;
      [data] = await db.query(`SELECT * FROM cities`);
      allData.citiesList = data;
      [data] = await db.query(`SELECT * FROM storelist`);
      allData.storelist = data;
      callBack(allData);
    } catch (err) {
      callBack({ error: err });
    }
    db.end();
  },
};
module.exports = customerTasks;

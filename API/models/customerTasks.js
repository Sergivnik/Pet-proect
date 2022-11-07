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
      let whereCondition = `WHERE idCustomer=${user[0].customerId}`;
      if (user[0].role == "admin") whereCondition = "";
      let listOfColumns =
        "oderslist._id, date, idLoadingPoint, idUnloadingPoint, customerPrice, document, customerPayment, accountNumber, idTrackDriver, idTrack, idManager, loadingInfo, unloadingInfo, applicationNumber,customerClientId,textInfo";
      let data = [];
      if (user[0].role == "customerBoss" || user[0].role == "admin") {
        [data] = await db.query(
          `(SELECT ${listOfColumns} FROM oderslist left join customerorders on customerorders.orderId=oderslist._id ${whereCondition} ORDER BY _id DESC LIMIT 1000) ORDER BY date, accountNumber, _id`
        );
      } else {
        [data] = await db.query(
          `(SELECT ${listOfColumns} FROM oderslist left join customerorders on customerorders.orderId=oderslist._id WHERE idCustomer=${user[0].customerId} and idManager=${user[0].managerID} ORDER BY _id DESC LIMIT 1000) ORDER BY date, accountNumber, _id`
        );
      }
      allData.ordersList = data;
      if (user[0].role == "customerBoss" || user[0].role == "admin") {
        [data] = await db.query(
          `SELECT * FROM trackdrivers WHERE _id in (SELECT distinct idTrackDriver FROM oderslist ${whereCondition})`
        );
      } else {
        [data] = await db.query(
          `SELECT * FROM trackdrivers WHERE _id in (SELECT distinct idTrackDriver FROM oderslist WHERE idCustomer=${user[0].customerId} and idManager=${user[0].managerID})`
        );
      }
      allData.driversList = data;
      if (user[0].role == "customerBoss" || user[0].role == "admin") {
        [data] = await db.query(
          `SELECT * FROM tracklist WHERE _id in (SELECT distinct idTrack FROM oderslist ${whereCondition})`
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
      console.log(data);
      if (user[0].role != "admin") {
        allData.customerData = data[0];
      } else {
        allData.customerData = {
          _id: 5000,
          value: "Админстратор",
          companyName: "Админстратор",
        };
      }
      if (user[0].role != "admin") {
        [data] = await db.query(
          `SELECT * FROM clientmanager WHERE odersId="${user[0].customerId}"`
        );
      } else {
        [data] = await db.query(`SELECT * FROM clientmanager`);
      }
      allData.managerList = data;
      if (user[0].role != "admin") {
        [data] = await db.query(
          `SELECT _id, name, role FROM users WHERE customerId="${user[0].customerId}"`
        );
      } else {
        [data] = await db.query(`SELECT _id, name, role FROM users`);
      }
      allData.userList = data;
      [data] = await db.query(`SELECT * FROM cities`);
      allData.citiesList = data;
      [data] = await db.query(`SELECT * FROM storelist`);
      allData.storelist = data;
      // [data] = await db.query(
      //   `SELECT * FROM customerorders WHERE customerId="${user[0].customerId}" `
      // );
      // allData.customerOrders = data;
      if (user[0].role != "admin") {
        [data] = await db.query(
          `SELECT * FROM customerclients WHERE orderId="${user[0].customerId}" `
        )
      }else{
        [data] = await db.query(
          `SELECT * FROM customerclients `
        )
      }
      allData.customerclients = data;
      callBack(allData);
    } catch (err) {
      callBack({ error: err });
    }
    db.end();
  },
};
module.exports = customerTasks;

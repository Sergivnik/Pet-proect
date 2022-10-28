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
      let [data] = await db.query(
        `(SELECT ${listOfColumns} FROM oderslist WHERE idCustomer="${user[0].customerId}" ORDER BY _id DESC LIMIT 1000) ORDER BY date, accountNumber, _id`
      );
      allData.ordersList = data;
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
      callBack(allData);
    } catch (err) {
      callBack({ error: err });
    }
  },
};
module.exports = customerTasks;

const mysql = require("mysql2");
const options = require("./config.js");

var Tasks = {
  list: async function (callback) {
    let allData = {};
    const db = mysql.createPool(options).promise();
    try {
      let [data] = await db.query("SELECT * FROM cities");
      allData.citieslist = data;
      [data] = await db.query("SELECT * FROM drivers");
      allData.driverlist = data;
      [data] = await db.query("SELECT * FROM oders");
      allData.clientList = data;
      [data] = await db.query("SELECT * FROM oderslist");
      allData.odersList = data;
      callback(allData);
      db.end();
    } catch (err) {
      callback({ error: err });
    }
  },
  add: async function (data, callback) {
    data = JSON.parse(data);
    let oder = {
      id: data.id,
      date: data.date,
      idDriver: data.driver,
      idOder: data.oder,
      idLoadingPoint: data.loadingPoint,
      idUnloadingPoint: data.unloadingPoint,
      customerPrice: data.oderPrice,
      driverPrice: data.driverPrice,
    };
    if (oder.customerPrice === "") oder.customerPrice = null;
    if (oder.driverPrice === "") oder.driverPrice = null;
    const db = mysql.createPool(options).promise();
    try {
      let [data] = await db.query("INSERT INTO oderslist SET ?", oder);
      callback(data);
    } catch (err) {
      callback({ error: err });
    }
    db.end();
  },
};
module.exports = Tasks;

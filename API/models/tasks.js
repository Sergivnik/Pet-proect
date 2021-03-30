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
      _id: data._id,
      date: data.date,
      idDriver: data.driver,
      idCustomer: data.oder,
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
  edit: async function (newdata, callback) {
    switch (newdata.field) {
      case "date":
        change = { date: newdata.newValue };
        break;
      case "driver":
        change = { idDriver: newdata.newValue };
        break;
      case "oders":
        change = { idCustomer: newdata.newValue };
        break;
      case "loadingPoint":
        change = { idLoadingPoint: newdata.newValue };
        break;
      case "unloadingPoint":
        change = { idUnloadingPoint: newdata.newValue };
        break;
      case "oderPrice":
        change = { customerPrice: newdata.newValue };
        break;
      case "driverPrice":
        change = { driverPrice: newdata.newValue };
        break;
      case "proxy":
        change = { proxy: newdata.newValue };
        break;
      default:
        break;
    }
    const db = mysql.createPool(options).promise();
    try {
      let [data] = await db.query(`UPDATE oderslist SET ? WHERE _id=?`, [
        change,
        newdata.id,
      ]);
      callback(data);
    } catch (err) {
      console.log(err);
      callback({ error: err });
    }
    db.end();
  },
  getDataById: async function (id, table, callback) {
    const db = mysql.createPool(options).promise();
    let dataById = {};
    try {
      let [data] = await db.query(`select * FROM ${table} WHERE _id=${id}`);
      [dataById.customer] = await db.query(
        `select * FROM oders WHERE _id=${data[0].idCustomer}`
      );
      [dataById.driver] = await db.query(
        `select * FROM drivers WHERE _id=${data[0].idDriver}`
      );

      callback(dataById);
    } catch (err) {
      callback({ error: err });
    }
    db.end();
  },
  del: async function (id, callback) {
    const db = mysql.createPool(options).promise();
    try {
      let [data] = await db.query(`DELETE FROM oderslist WHERE _id=${id}`);
    } catch (err) {
      callback({ error: err });
    }
    db.end();
  },
};
module.exports = Tasks;

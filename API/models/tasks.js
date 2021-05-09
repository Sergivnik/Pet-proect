const mysql = require("mysql2");
const options = require("./config.js");

var Tasks = {
  list: async function (callback) {
    let allData = {};
    const db = mysql.createPool(options).promise();
    try {
      let [data] = await db.query("SELECT DISTINCT date FROM oderslist");
      allData.date = data;
      [data] = await db.query("SELECT * FROM cities");
      allData.citieslist = data;
      [data] = await db.query("SELECT * FROM drivers");
      allData.driverlist = data;
      [data] = await db.query("SELECT * FROM oders");
      allData.clientList = data;
      [data] = await db.query(
        `(SELECT * FROM oderslist ORDER BY _id DESC LIMIT 5000) ORDER BY _id`
      );
      allData.odersList = data;
      [data] = await db.query(
        `select max(customerPrice) as 'maxCustomerPrice' FROM oderslist where date > DATE_ADD(SYSDATE(),INTERVAL -5 YEAR);`
      );
      allData.maxCustomerPrice = data[0].maxCustomerPrice;
      [data] = await db.query(
        `select min(customerPrice) as 'minCustomerPrice' FROM oderslist where date > DATE_ADD(SYSDATE(),INTERVAL -5 YEAR);`
      );
      allData.minCustomerPrice = data[0].minCustomerPrice;
      [data] = await db.query(
        `select max(driverPrice) as 'maxDriverPrice' FROM oderslist where date > DATE_ADD(SYSDATE(),INTERVAL -5 YEAR);`
      );
      allData.maxDriverPrice = data[0].maxDriverPrice;
      [data] = await db.query(
        `select min(driverPrice) as 'minDriverPrice' FROM oderslist where date > DATE_ADD(SYSDATE(),INTERVAL -5 YEAR);`
      );
      allData.minDriverPrice = data[0].minDriverPrice;
      callback(allData);
      db.end();
    } catch (err) {
      callback({ error: err });
    }
  },

  filter: async function (datafilter, callback) {
    let filterStr = null;
    let filterDate = null;
    let filterDriver = null;
    let filterOder = null;
    let filterLoad = null;
    let filterUnload = null;
    let setData = {};
    if (datafilter.date) {
      let felterDateStr = "";
      datafilter.date.forEach((element) => {
        if (felterDateStr) {
          felterDateStr = felterDateStr + "," + `'${element}'`;
        } else {
          felterDateStr = `'${element}'`;
        }
      });
      filterStr
        ? (filterStr = filterStr + `date in (${felterDateStr})`)
        : (filterStr = `date in (${felterDateStr})`);
      filterDriver
        ? (filterDriver = filterDriver + `date in (${felterDateStr})`)
        : (filterDriver = `date in (${felterDateStr})`);
      filterOder
        ? (filterOder = filterOder + `date in (${felterDateStr})`)
        : (filterOder = `date in (${felterDateStr})`);
      filterLoad
        ? (filterLoad = filterLoad + `date in (${felterDateStr})`)
        : (filterLoad = `date in (${felterDateStr})`);
      filterUnload
        ? (filterUnload = filterUnload + `date in (${felterDateStr})`)
        : (filterUnload = `date in (${felterDateStr})`);
    }
    if (datafilter.driver) {
      filterStr
        ? (filterStr = filterStr + `and idDriver in (${datafilter.driver})`)
        : (filterStr = `idDriver in (${datafilter.driver})`);
      filterDate
        ? (filterDate = filterDate + `and idDriver in (${datafilter.driver})`)
        : (filterDate = `idDriver in (${datafilter.driver})`);
      filterOder
        ? (filterOder = filterOder + `and idDriver in (${datafilter.driver})`)
        : (filterOder = `idDriver in (${datafilter.driver})`);
      filterLoad
        ? (filterLoad = filterLoad + `and idDriver in (${datafilter.driver})`)
        : (filterLoad = `idDriver in (${datafilter.driver})`);
      filterUnload
        ? (filterUnload =
            filterUnload + `and idDriver in (${datafilter.driver})`)
        : (filterUnload = `idDriver in (${datafilter.driver})`);
    }
    if (datafilter.oder) {
      filterStr
        ? (filterStr = filterStr + ` and idCustomer in(${datafilter.oder})`)
        : (filterStr = `idCustomer in(${datafilter.oder})`);
      filterDate
        ? (filterDate = filterDate + ` and idCustomer in(${datafilter.oder})`)
        : (filterDate = `idCustomer in(${datafilter.oder})`);
      filterDriver
        ? (filterDriver =
            filterDriver + ` and idCustomer in(${datafilter.oder})`)
        : (filterDriver = `idCustomer in(${datafilter.oder})`);
      filterLoad
        ? (filterLoad = filterLoad + ` and idCustomer in(${datafilter.oder})`)
        : (filterLoad = `idCustomer in(${datafilter.oder})`);
      filterUnload
        ? (filterUnload =
            filterUnload + ` and idCustomer in(${datafilter.oder})`)
        : (filterUnload = `idCustomer in(${datafilter.oder})`);
    }
    if (datafilter.cityLoading) {
      let str = "";
      let cityLoadingStr = null;
      datafilter.cityLoading.forEach((elem) => {
        str = `JSON_CONTAINS(idLoadingPoint, '${elem}')`;
        cityLoadingStr
          ? (cityLoadingStr = cityLoadingStr + " or " + str)
          : (cityLoadingStr = str);
      });
      filterStr
        ? (filterStr = filterStr + " and " + "(" + cityLoadingStr + ")")
        : (filterStr = "(" + cityLoadingStr + ")");
      filterDate
        ? (filterDate = filterDate + " and " + "(" + cityLoadingStr + ")")
        : (filterDate = "(" + cityLoadingStr + ")");
      filterDriver
        ? (filterDriver = filterDriver + " and " + "(" + cityLoadingStr + ")")
        : (filterDriver = "(" + cityLoadingStr + ")");
      filterOder
        ? (filterOder = filterOder + " and " + "(" + cityLoadingStr + ")")
        : (filterOder = "(" + cityLoadingStr + ")");
      filterUnload
        ? (filterUnload = filterUnload + " and " + "(" + cityLoadingStr + ")")
        : (filterUnload = "(" + cityLoadingStr + ")");
    }
    if (datafilter.cityUnloading) {
      let str = "";
      let cityUnloadingStr = null;
      datafilter.cityUnloading.forEach((elem) => {
        str = `JSON_CONTAINS(idUnloadingPoint, '${elem}')`;
        cityUnloadingStr
          ? (cityUnloadingStr = cityUnloadingStr + " or " + str)
          : (cityUnloadingStr = str);
      });
      filterStr
        ? (filterStr = filterStr + " and " + "(" + cityUnloadingStr + ")")
        : (filterStr = "(" + cityUnloadingStr + ")");
      filterDate
        ? (filterDate = filterDate + " and " + "(" + cityUnloadingStr + ")")
        : (filterDate = "(" + cityUnloadingStr + ")");
      filterDriver
        ? (filterDriver = filterDriver + " and " + "(" + cityUnloadingStr + ")")
        : (filterDriver = "(" + cityUnloadingStr + ")");
      filterOder
        ? (filterOder = filterOder + " and " + "(" + cityUnloadingStr + ")")
        : (filterOder = "(" + cityUnloadingStr + ")");
      filterLoad
        ? (filterLoad = filterLoad + " and " + "(" + cityUnloadingStr + ")")
        : (filterLoad = "(" + cityUnloadingStr + ")");
    }

    const db = mysql.createPool(options).promise();
    try {
      if (filterDate) {
        [data] = await db.query(
          `SELECT DISTINCT date FROM oderslist where ${filterDate}`
        );
      } else [data] = await db.query(`SELECT DISTINCT date FROM oderslist`);
      setData.date = data;
      if (filterDriver) {
        [data] = await db.query(
          `SELECT DISTINCT idDriver FROM oderslist where ${filterDriver}`
        );
      } else [data] = await db.query(`SELECT DISTINCT idDriver FROM oderslist`);
      setData.driver = data;
      if (filterDriver) {
        [data] = await db.query(
          `SELECT DISTINCT idDriver FROM oderslist where ${filterDriver}`
        );
      } else [data] = await db.query(`SELECT DISTINCT idDriver FROM oderslist`);
      setData.driver = data;
      if (filterOder) {
        [data] = await db.query(
          `SELECT DISTINCT idCustomer FROM oderslist where ${filterOder}`
        );
      } else
        [data] = await db.query(`SELECT DISTINCT idCustomer FROM oderslist`);
      setData.customer = data;
      if (filterLoad) {
        [data] = await db.query(
          `SELECT DISTINCT idLoadingPoint FROM oderslist where ${filterLoad}`
        );
      } else
        [data] = await db.query(
          `SELECT DISTINCT idLoadingPoint FROM oderslist`
        );
      setData.loadingPoint = data;
      if (filterUnload) {
        [data] = await db.query(
          `SELECT DISTINCT idUnloadingPoint FROM oderslist where ${filterUnload}`
        );
      } else
        [data] = await db.query(
          `SELECT DISTINCT idUnloadingPoint FROM oderslist`
        );
      setData.unloadingPoint = data;
      [data] = await db.query(
        `(SELECT * FROM oderslist where ${filterStr} ORDER BY _id DESC LIMIT 50000) ORDER BY _id`
      );
      setData.odersList = data;
      callback(setData);
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
      idLoadingPoint: JSON.stringify(data.loadingPoint),
      idUnloadingPoint: JSON.stringify(data.unloadingPoint),
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
        change = { idLoadingPoint: JSON.stringify(newdata.newValue) };
        break;
      case "unloadingPoint":
        change = { idUnloadingPoint: JSON.stringify(newdata.newValue) };
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

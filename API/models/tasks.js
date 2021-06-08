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
      [data] = await db.query(
        `SELECT distinct accountNumber from oderslist order by accountNumber;`
      );
      allData.accountList = data;
      [data] = await db.query(
        `SELECT sum(customerPrice) as income FROM pet_proect.oderslist where customerPayment='Ок';`
      );
      allData.income = data[0].income;
      [data] = await db.query(
        `SELECT sum(driverPrice) as expenses FROM pet_proect.oderslist where driverPayment='Ок';`
      );
      allData.expenses = data[0].expenses;
      callback(allData);
      db.end();
    } catch (err) {
      callback({ error: err });
    }
  },

  filter: async function (datafilter, callback) {
    let filterStr = "";
    let filterDate = "";
    let filterDriver = "";
    let filterOder = "";
    let filterLoad = "";
    let filterUnload = "";
    let filterCustomerPrice = "";
    let filterDriverPrice = "";
    let filterProxy = "";
    let filterComplited = "";
    let filterDocuments = "";
    let filterCustomerPayment = "";
    let filterDriverPayment = "";
    let filterAccount = "";
    let filterArr = [];
    let setData = {};
    if (datafilter.date.length) {
      let felterDateStr = null;
      datafilter.date.forEach((element) => {
        if (felterDateStr) {
          felterDateStr = felterDateStr + "," + `'${element}'`;
        } else {
          felterDateStr = `'${element}'`;
        }
      });
      filterArr[0] = `date in (${felterDateStr}) `;
    }
    if (datafilter.driver.length) {
      filterArr[1] = `idDriver in (${datafilter.driver})`;
    }
    if (datafilter.oder.length) {
      filterArr[2] = `idCustomer in (${datafilter.oder})`;
    }
    if (datafilter.cityLoading.length) {
      let str = "";
      let cityLoadingStr = null;
      datafilter.cityLoading.forEach((elem) => {
        str = `JSON_CONTAINS(idLoadingPoint, '${elem}')`;
        cityLoadingStr
          ? (cityLoadingStr = cityLoadingStr + " or " + str)
          : (cityLoadingStr = str);
      });
      filterArr[3] = "(" + cityLoadingStr + ")";
    }
    if (datafilter.cityUnloading.length) {
      let str = "";
      let cityUnloadingStr = null;
      datafilter.cityUnloading.forEach((elem) => {
        str = `JSON_CONTAINS(idUnloadingPoint, '${elem}')`;
        cityUnloadingStr
          ? (cityUnloadingStr = cityUnloadingStr + " or " + str)
          : (cityUnloadingStr = str);
      });
      filterArr[4] = "(" + cityUnloadingStr + ")";
    }
    if (datafilter.customerPrice.length) {
      filterArr[5] = ` customerPrice between ${datafilter.customerPrice[0]} and ${datafilter.customerPrice[1]}`;
    }
    if (datafilter.driverPrice.length) {
      filterArr[6] = ` driverPrice between ${datafilter.driverPrice[0]} and ${datafilter.driverPrice[1]}`;
    }
    if (datafilter.proxy.length) {
      filterArr[7] = `proxy in (${datafilter.proxy})`;
    }
    if (datafilter.complited.length) {
      filterArr[8] = `complited in (${datafilter.complited})`;
    }
    if (datafilter.documents.length) {
      filterArr[9] = `document in (${datafilter.documents})`;
    }
    if (datafilter.customerPayment.length) {
      filterArr[10] = `customerPayment in (${datafilter.customerPayment})`;
    }
    if (datafilter.driverPayment.length) {
      filterArr[11] = `driverPayment in (${datafilter.driverPayment})`;
    }
    if (datafilter.accountList.length) {
      filterArr[12] = `accountNumber in (${datafilter.accountList})`;
    }

    filterArr.forEach((str, index) => {
      if (str) {
        filterStr ? (filterStr = filterStr + " and " + str) : (filterStr = str);
        if (index != 0) {
          filterDate
            ? (filterDate = filterDate + " and " + str)
            : (filterDate = str);
        }
        if (index != 1) {
          filterDriver
            ? (filterDriver = filterDriver + " and " + str)
            : (filterDriver = str);
        }
        if (index != 2) {
          filterOder
            ? (filterOder = filterOder + " and " + str)
            : (filterOder = str);
        }
        if (index != 3) {
          filterLoad
            ? (filterLoad = filterLoad + " and " + str)
            : (filterLoad = str);
        }
        if (index != 4) {
          filterUnload
            ? (filterUnload = filterUnload + " and " + str)
            : (filterUnload = str);
        }
        if (index != 5) {
          filterCustomerPrice
            ? (filterCustomerPrice = filterCustomerPrice + " and " + str)
            : (filterCustomerPrice = str);
        }
        if (index != 6) {
          filterDriverPrice
            ? (filterDriverPrice = filterDriverPrice + " and " + str)
            : (filterDriverPrice = str);
        }
        if (index != 7) {
          filterProxy
            ? (filterProxy = filterProxy + " and " + str)
            : (filterProxy = str);
        }
        if (index != 8) {
          filterComplited
            ? (filterComplited = filterComplited + " and " + str)
            : (filterComplited = str);
        }
        if (index != 9) {
          filterDocuments
            ? (filterDocuments = filterDocuments + " and " + str)
            : (filterDocuments = str);
        }
        if (index != 10) {
          filterCustomerPayment
            ? (filterCustomerPayment = filterCustomerPayment + " and " + str)
            : (filterCustomerPayment = str);
        }
        if (index != 11) {
          filterDriverPayment
            ? (filterDriverPayment = filterDriverPayment + " and " + str)
            : (filterDriverPayment = str);
        }
        if (index != 12) {
          filterAccount
            ? (filterAccount = filterAccount + " and " + str)
            : (filterAccount = str);
        }
      }
    });

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
      setData.filteredCustomerPrice = [];
      if (filterCustomerPrice) {
        [data] = await db.query(
          `select min(customerPrice) as 'minCustomerPrice' FROM oderslist where ${filterCustomerPrice}`
        );
      } else {
        [data] = await db.query(
          `select min(customerPrice) as 'minCustomerPrice' FROM oderslist where date > DATE_ADD(SYSDATE(),INTERVAL -5 YEAR);`
        );
      }
      setData.filteredCustomerPrice[0] = data[0].minCustomerPrice;
      if (filterCustomerPrice) {
        [data] = await db.query(
          `select max(customerPrice) as 'maxCustomerPrice' FROM oderslist where ${filterCustomerPrice}`
        );
      } else {
        [data] = await db.query(
          `select max(customerPrice) as 'maxCustomerPrice' FROM oderslist where date > DATE_ADD(SYSDATE(),INTERVAL -5 YEAR);`
        );
      }
      setData.filteredCustomerPrice[1] = data[0].maxCustomerPrice;
      setData.filteredDriverPrice = [];
      if (filterDriverPrice) {
        [data] = await db.query(
          `select min(driverPrice) as 'minDriverPrice' FROM oderslist where ${filterDriverPrice}`
        );
      } else {
        [data] = await db.query(
          `select min(driverPrice) as 'minDriverPrice' FROM oderslist where date > DATE_ADD(SYSDATE(),INTERVAL -5 YEAR);`
        );
      }
      setData.filteredDriverPrice[0] = data[0].minDriverPrice;
      if (filterDriverPrice) {
        [data] = await db.query(
          `select max(driverPrice) as 'maxDriverPrice' FROM oderslist where ${filterDriverPrice}`
        );
      } else {
        [data] = await db.query(
          `select max(driverPrice) as 'maxDriverPrice' FROM oderslist where date > DATE_ADD(SYSDATE(),INTERVAL -5 YEAR);`
        );
      }
      setData.filteredDriverPrice[1] = data[0].maxDriverPrice;
      if (filterProxy) {
        [data] = await db.query(
          `SELECT DISTINCT proxy FROM oderslist where ${filterProxy}`
        );
      } else [data] = await db.query(`SELECT DISTINCT proxy FROM oderslist`);
      setData.proxy = data;
      if (filterComplited) {
        [data] = await db.query(
          `SELECT DISTINCT complited FROM oderslist where ${filterComplited}`
        );
      } else
        [data] = await db.query(`SELECT DISTINCT complited FROM oderslist`);
      setData.proxy = data;
      if (filterDocuments) {
        [data] = await db.query(
          `SELECT DISTINCT document FROM oderslist where ${filterDocuments}`
        );
      } else [data] = await db.query(`SELECT DISTINCT document FROM oderslist`);
      setData.documents = data;
      if (filterCustomerPayment) {
        [data] = await db.query(
          `SELECT DISTINCT customerPayment FROM oderslist where ${filterCustomerPayment}`
        );
      } else
        [data] = await db.query(
          `SELECT DISTINCT customerPayment FROM oderslist`
        );
      setData.customerPayment = data;
      if (filterDriverPayment) {
        [data] = await db.query(
          `SELECT DISTINCT driverPayment FROM oderslist where ${filterDriverPayment}`
        );
      } else
        [data] = await db.query(`SELECT DISTINCT driverPayment FROM oderslist`);
      setData.driverPayment = data;
      if (filterAccount) {
        [data] = await db.query(
          `SELECT DISTINCT accountNumber FROM oderslist where ${filterAccount}`
        );
      } else
        [data] = await db.query(`SELECT DISTINCT accountNumber FROM oderslist`);
      setData.filterAccount = data;

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
      case "complited":
        change = { complited: newdata.newValue };
        break;
      case "document":
        change = { document: newdata.newValue };
        break;
      case "customerPayment":
        change = { customerPayment: newdata.newValue };
        break;
      case "driverPayment":
        change = { driverPayment: newdata.newValue };
        break;
      case "accountNumber":
        change = { accountNumber: newdata.newValue };
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

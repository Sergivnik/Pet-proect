const mysql = require("mysql2");
const options = require("./config.js");
const dateToSqlString = (dateSomeFormate) => {
  let date = new Date(dateSomeFormate);
  let Year = date.getFullYear();
  let Month = date.getMonth() + 1;
  let Day = date.getDate();
  return `${Year}-${Month}-${Day}`;
};
var Tasks = {
  list: async function (callback) {
    let allData = {};
    const db = mysql.createPool(options).promise();
    try {
      let [data] = await db.query("SELECT DISTINCT date FROM oderslist");
      allData.date = data;
      [data] = await db.query("SELECT * FROM cities order by value");
      allData.citieslist = data;
      [data] = await db.query("SELECT * FROM drivers order by value");
      allData.driverlist = data;
      [data] = await db.query("SELECT * FROM oders order by value");
      allData.clientList = data;
      [data] = await db.query(
        `(SELECT * FROM oderslist ORDER BY _id DESC LIMIT 5000) ORDER BY date, accountNumber, _id`
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
      let incomeOk = Number(data[0].income);
      [data] = await db.query(
        `SELECT sum(partialPaymentAmount) as income FROM pet_proect.oderslist where customerPayment='Частично оплачен';`
      );
      let incomePartReal = Number(data[0].income);
      allData.income = incomeOk + incomePartReal;
      [data] = await db.query(
        `SELECT sum(driverPrice) as expenses FROM pet_proect.oderslist where driverPayment='Ок';`
      );
      let driverPayment = data[0].expenses;
      [data] = await db.query(
        `SELECT sum(sumOfDebts) as debt FROM driverpayment`
      );
      let driverDebtReturn = data[0].debt;

      [data] = await db.query(
        `SELECT sum(sum) as contractorsPayments FROM contractorspayments`
      );
      let contractorsPayments = data[0].contractorsPayments;
      allData.expenses =
        Number(driverPayment) -
        Number(driverDebtReturn) +
        Number(contractorsPayments);
      [data] = await db.query(
        `SELECT distinct idCustomer FROM oderslist where customerPayment !="Ок"`
      );
      allData.customerWithoutPayment = data;
      [data] = await db.query(`SELECT * FROM clientmanager order by value`);
      allData.clientmanager = data;
      [data] = await db.query(`SELECT * FROM trackdrivers order by value`);
      allData.trackdrivers = data;
      [data] = await db.query(`SELECT * FROM tracklist order by value`);
      allData.tracklist = data;
      [data] = await db.query(`SELECT * FROM addtable order by orderId`);
      allData.addtable = data;
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
    let filterCompleted = "";
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
    if (datafilter.completed.length) {
      filterArr[8] = `completed in (${datafilter.completed})`;
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
      let accountStr = "";
      datafilter.accountList.forEach((elem) => {
        if (accountStr == "") {
          accountStr = `"${elem.value}"`;
        } else {
          accountStr = accountStr + `, "${elem.value}"`;
        }
      });
      filterArr[12] = `accountNumber in (${accountStr})`;
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
          filterCompleted
            ? (filterCompleted = filterCompleted + " and " + str)
            : (filterCompleted = str);
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
      if (filterCompleted) {
        [data] = await db.query(
          `SELECT DISTINCT completed FROM oderslist where ${filterCompleted}`
        );
      } else
        [data] = await db.query(`SELECT DISTINCT completed FROM oderslist`);
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
    db.end();
  },
  add: async function (data, callback) {
    data = JSON.parse(data);
    let oder = {
      date: data.date,
      idDriver: data.idDriver,
      idCustomer: data.idCustomer,
      idLoadingPoint: JSON.stringify(data.idLoadingPoint),
      idUnloadingPoint: JSON.stringify(data.idUnloadingPoint),
      customerPrice: data.customerPrice,
      driverPrice: data.driverPrice,
      idManager: data.idManager,
      idTrackDriver: data.idTrackDriver,
      idTrack: data.idTrack,
      loadingInfo: JSON.stringify(data.loadingInfo),
      unloadingInfo: JSON.stringify(data.unloadingInfo),
      completed: data.completed,
      applicationNumber: data.applicationNumber,
      colorTR: data.colorTR,
    };
    let addData = {
      customerId: data.idCustomer,
      sum: data.price,
      interest: data.interest,
      orderId: null,
    };
    if (oder.customerPrice === "") oder.customerPrice = null;
    if (oder.driverPrice === "") oder.driverPrice = null;
    const db = mysql.createPool(options).promise();
    try {
      let [data] = await db.query("INSERT INTO oderslist SET ?", oder);
      addData.orderId = data.insertId;
      await db.query(`INSERT INTO addtable SET ?`, addData);
      callback(data);
    } catch (err) {
      callback({ error: err });
    }
    db.end();
  },
  editNew: async function (data, callback) {
    dateToSqlString(data.dateOfSubmission);
    console.log(data);
    let addData;
    let newData = {
      date: dateToSqlString(data.date),
      idDriver: data.idDriver,
      idCustomer: data.idCustomer,
      idLoadingPoint: JSON.stringify(data.idLoadingPoint),
      idUnloadingPoint: JSON.stringify(data.idUnloadingPoint),
      customerPrice: data.customerPrice,
      driverPrice: data.driverPrice,
      proxy: data.proxy,
      document: data.document,
      dateOfSubmission: dateToSqlString(data.dateOfSubmission),
      customerPayment: data.customerPayment,
      dateOfPromise: dateToSqlString(data.dateOfPromise),
      driverPayment: data.driverPayment,
      accountNumber: data.accountNumber,
      partialPaymentAmount: data.partialPaymentAmount,
      idTrackDriver: data.idTrackDriver,
      idTrack: data.idTrack,
      idManager: data.idManager,
      applicationNumber: data.applicationNumber,
      colorTR: data.colorTR,
      loadingInfo: JSON.stringify(data.loadingInfo),
      unloadingInfo: JSON.stringify(data.unloadingInfo),
    };
    console.log(newData);
    if (data.colorTR == "hotpink") {
      addData = {
        customerId: data.idCustomer,
        sum: data.price,
        interest: data.interest,
        orderId: data._id,
      };
    }

    const db = mysql.createPool(options).promise();
    try {
      await db.query(`UPDATE oderslist SET ? WHERE _id=?`, [newData, data._id]);
      if (data.colorTR == "hotpink") {
        let [q] = await db.query(
          `SELECT * FROM addtable where orderId=${data._id}`
        );
        if (q.length) {
          await db.query(`UPDATE addtable SET ? WHERE orderId=?`, [
            addData,
            data._id,
          ]);
        } else {
          await db.query(`INSERT INTO addtable SET ?`, addData);
        }
      }
      callback(data);
    } catch (err) {
      console.log(err);
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
      case "completed":
        change = { completed: newdata.newValue };
        break;
      case "document":
        let now = new Date();
        if (newdata.newValue == 2) now = null;
        change = { document: newdata.newValue, dateOfSubmission: now };
        break;
      case "customerPayment":
        if (newdata.newValue == 1 || newdata.newValue == 2) {
          change = {
            customerPayment: newdata.newValue,
            dateOfPromise: null,
            partialPaymentAmount: null,
          };
        }
        if (
          newdata.newValue == 3 ||
          newdata.newValue == 4 ||
          newdata.newValue == 5 ||
          newdata.newValue == 7
        ) {
          let now = new Date();
          change = {
            customerPayment: newdata.newValue,
            dateOfPromise: now,
            partialPaymentAmount: null,
          };
        }
        if (newdata.newValue == 6 || newdata.newValue == 8) {
          change = {
            customerPayment: newdata.newValue,
            dateOfPromise: null,
            partialPaymentAmount: null,
          };
        }
        break;
      case "driverPayment":
        change = { driverPayment: newdata.newValue };
        break;
      case "accountNumber":
        change = { accountNumber: newdata.newValue };
        break;
      case "dateOfPromise":
        change = { dateOfPromise: newdata.newValue };
        break;
      case "sumPartPay":
        change = { partialPaymentAmount: newdata.newValue };
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

  makePaymentCustomer: async function (data, callback) {
    console.log(data);
    let sumChosenOders = data.arr.reduce(
      (sum, item) => sum + item.customerPrice,
      0
    );

    let idList = "";
    data.arr.forEach((elem) => {
      if (idList == "") {
        idList = elem.id;
      } else {
        idList = idList + "," + elem.id;
      }
    });
    const db = mysql.createPool(options).promise();

    try {
      let [dataelem] = await db.query(
        `select * FROM pet_proect.oderslist where _id in (${idList})`
      );
      for (const elem of dataelem) {
        if (elem.customerPayment == "Ок")
          throw new Error("Некоторые заказы уже оплачены обновите страницу");
      }
      let [dataOder] = await db.query(
        `select * FROM pet_proect.oderslist where _id=${data.arr[0].id}`
      );
      let customerId = dataOder[0].idCustomer;
      if (sumChosenOders == data.sumCustomerPayment + data.extraPayments) {
        await db.query(
          `UPDATE oders SET extraPayments=${Null} WHERE _id=${customerId}`
        );
      } else {
        await db.query(
          `UPDATE oders SET extraPayments=${
            data.extraPayments +
            Number(data.sumCustomerPayment) -
            sumChosenOders
          } WHERE _id=${customerId}`
        );
      }
      for (let i = 0; i < data.arr.length; i++) {
        let index = data.arr.findIndex(
          (element) => element.id == dataelem[i]._id
        );
        console.log(dataelem[i]._id, data.arr[index]);
        if (dataelem[i].customerPrice == data.arr[index].customerPrice) {
          await db.query(
            `UPDATE oderslist SET customerPayment="Ок" WHERE _id=${data.arr[index].id}`
          );
        } else {
          if (
            dataelem[i].customerPayment == "Частично оплачен" &&
            dataelem[i].customerPrice - dataelem[i].partialPaymentAmount ==
              data.arr[index].customerPrice
          ) {
            await db.query(
              `UPDATE oderslist SET customerPayment="Ок", partialPaymentAmount=Null WHERE _id=${data.arr[index].id}`
            );
          }
          if (
            dataelem[i].customerPayment == "Частично оплачен" &&
            dataelem[i].customerPrice - dataelem[i].partialPaymentAmount !=
              data.arr[index].customerPrice
          ) {
            await db.query(
              `UPDATE oderslist SET customerPayment="Частично оплачен", partialPaymentAmount=${
                Number(data.arr[index].customerPrice) +
                Number(dataelem[i].partialPaymentAmount)
              } WHERE _id=${data.arr[index].id}`
            );
          }
          if (dataelem[i].customerPayment != "Частично оплачен") {
            await db.query(
              `UPDATE oderslist SET customerPayment="Частично оплачен", partialPaymentAmount=${Number(
                data.arr[index].customerPrice
              )} WHERE _id=${data.arr[index].id}`
            );
          }
        }
      }
      let paymentString = {
        date: new Date(data.date),
        idCustomer: customerId,
        sumOfPayment: Number(data.sumCustomerPayment),
        sumExtraPayment: data.extraPayments,
        listOfOders: JSON.stringify(data.arr),
      };
      console.log(paymentString);
      await db.query("INSERT INTO customerpayment SET ?", paymentString);
      let [dataChanged] = await db.query(
        `select * FROM pet_proect.oderslist where _id in (${idList})`
      );
      callback(dataChanged);
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
      dataById.date = data[0].date;
      dataById.accountNumber = data[0].accountNumber;
      [dataById.customer] = await db.query(
        `select * FROM oders WHERE _id=${data[0].idCustomer}`
      );
      [dataById.driver] = await db.query(
        `select * FROM trackdrivers WHERE _id=${data[0].idTrackDriver}`
      );
      if (data[0].idManager != null && data[0].idManager != "") {
        [dataById.manager] = await db.query(
          `select * FROM clientmanager WHERE _id=${data[0].idManager}`
        );
      }

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

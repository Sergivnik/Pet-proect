const mysql = require("mysql2");
const options = require("./config.js");

let TasksReports = {
  reconciliation: async function (data, callBack) {
    console.log(data);
    let obj = {};
    let idFilter = null;
    let tableName = "";
    if (data.name == "customer") {
      tableName = "customerpayment";
      idFilter = `idCustomer=${data.id}`;
    }
    if (data.name == "driver") {
      tableName = "driverpayment";
      idFilter = `idDriver=${data.id}`;
    }
    let dateBegin = data.dateBegin.slice(0, 10);
    console.log(dateBegin);
    const db = mysql.createPool(options).promise();
    try {
      let [dataPayment] = await db.query(
        `SELECT * FROM ${tableName} where ${idFilter} and date>="${dateBegin}"`
      );
      obj.payments = dataPayment;
      let [dataOrder] = await db.query(
        `SELECT * FROM oderslist where ${idFilter} and date>="${dateBegin}"`
      );
      obj.orders = dataOrder;
      if (data.name == "customer") {
        let [debt] = await db.query(
          `SELECT SUM(customerPrice) as "debt" FROM oderslist where ${idFilter} and customerPayment!="Ок"`
        );
        obj.clearDebt = debt;
        [debt] = await db.query(
          `SELECT SUM(partialPaymentAmount) as "debt" FROM oderslist where ${idFilter} and customerPayment="Частично оплачен"`
        );
        obj.partDebt = debt;
      }
      if (data.name == "driver") {
        let [debt] = await db.query(
          `SELECT SUM(driverPrice) as "debt" FROM oderslist where ${idFilter} and driverPayment!="Ок"`
        );
        obj.clearDebt = debt;
      }
      callBack(obj);
    } catch (err) {
      callback({ error: err });
    }
    db.end();
  },
};

module.exports = TasksReports;

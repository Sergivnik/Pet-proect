const mysql = require("mysql2");
const options = require("./config.js");

let TascsCard = {
  makeCardPayment: async (data, callBack) => {
    console.log(data);
    let sumOfDriverDebts = 0;
    let sumOfCustomerDebts = 0;
    let driverPaymentId, customerPaymentId;
    const db = mysql.createPool(options.sql).promise();
    try {
      if (data.driverDebtsId.length > 0) {
        let [listDriverDebts] = await db.query(
          `SELECT * FROM driverdebts where id in (${data.driverDebtsId});`
        );
        sumOfDriverDebts = listDriverDebts.reduce(
          (sum, debt) => sum + Number(debt.sumOfDebt),
          0
        );
        console.log(sumOfDriverDebts);
      }
      if (data.customerDebtsId.length > 0) {
        let [listOfCustomerDebts] = await db.query(
          `SELECT sum,interest,customerPrice FROM addtable, oderslist where _id=orderId and id in (${data.customerDebtsId})`
        );
        sumOfCustomerDebts = listOfCustomerDebts.reduce(
          (sum, debt) =>
            sum +
            ((Number(debt.customerPrice) - debt.sum) * (100 - debt.interest)) /
              100,
          0
        );
        console.log(sumOfCustomerDebts);
      }
      let now = new Date();
      let Year = String(now.getFullYear());
      let Month = String(now.getMonth() + 1);
      let Day = String(now.getDate());
      let cardPayment = {
        date:
          Year +
          "-" +
          (Month <= 9 ? "0" + Month : Month) +
          "-" +
          (Day <= 9 ? "0" + Day : Day),
        sumOfPayment: sumOfDriverDebts + sumOfCustomerDebts,
        listOfDebts: JSON.stringify(data),
      };
      if (data.driverDebtsId.length > 0 || data.customerDebtsId.length > 0) {
        console.log(
          cardPayment.date,
          cardPayment.sumOfPayment,
          "${cardPayment.listOfDebts}"
        );
        await db.query(`INSERT INTO cardpayment set ?`, cardPayment);
      }
      if (data.driverDebtsId.length > 0) {
        await db.query(
          `UPDATE driverdebts set card=1 where id in (${data.driverDebtsId})`
        );
        let [dataId] = await db.query(
          `INSERT contractorspayments(idContractor,date,sum,category) VALUES (5,'${cardPayment.date}',${sumOfDriverDebts},2)`
        );
        driverPaymentId = dataId.insertId;
      }
      if (data.customerDebtsId.length > 0) {
        await db.query(
          `UPDATE addtable set card=1 where id in (${data.customerDebtsId})`
        );
        let [dataId] = await db.query(
          `INSERT contractorspayments(idContractor,date,sum,category) VALUES (5,'${cardPayment.date}',${sumOfCustomerDebts},3)`
        );
        customerPaymentId = dataId.insertId;
      }
      callBack({
        sumOfDriverDebts: sumOfDriverDebts,
        sumOfCustomerDebts: sumOfCustomerDebts,
        driverPaymentId: driverPaymentId,
        customerPaymentId: customerPaymentId,
      });
    } catch (err) {
      callBack({ error: err });
    }
    db.end();
  },
};

module.exports = TascsCard;

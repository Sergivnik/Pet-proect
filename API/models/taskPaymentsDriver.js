const mysql = require("mysql2");
const options = require("./config.js");

var TaskPaymentsDriver = {
  add: async function (data, callback) {
    console.log(data);
    let listOfOders = JSON.stringify(data.chosenOders);
    let listOfDebts = JSON.stringify(data.chosenDebts);
    let sumChosenDebts = data.chosenDebts.reduce(
      (sum, item) => sum + item.sum,
      0
    );
    let paymentString = {
      date: new Date(),
      idDriver: data.id,
      sumOfPayment: data.currentDriverSumOfOders,
      listOfOders: listOfOders,
      sumOfDebts: sumChosenDebts,
      listOfDebts: listOfDebts,
    };
    const db = mysql.createPool(options).promise();
    console.log(paymentString);
    try {
      await db.query("INSERT INTO driverpayment SET ?", paymentString);
      for (let oderId of data.chosenOders) {
        await db.query(
          `UPDATE oderslist SET driverPayment="Ок" WHERE _id=${oderId}`
        );
      }
      for (let debt of data.chosenDebts) {
        let [chosenDebt] = await db.query(
          `SELECT sumOfDebt, paidPartOfDebt from driverdebts WHERE id=${debt.id} `
        );
        let sumOfDebt = Number(chosenDebt[0].sumOfDebt);
        let paidPart = Number(chosenDebt[0].paidPartOfDebt);
        if (sumOfDebt - paidPart == debt.sum) {
          await db.query(
            `UPDATE driverdebts SET paidPartOfDebt=0, debtClosed="Ок" WHERE id=${debt.id}`
          );
        } else {
          await db.query(
            `UPDATE driverdebts SET paidPartOfDebt=${
              paidPart + debt.sum
            }, debtClosed="частично" WHERE id=${debt.id}`
          );
        }
        console.log(chosenDebt[0], debt.sum);
      }
      callback(data);
    } catch (err) {
      console.log(err);
      callback({ error: err });
    }
    db.end();
  },
};
module.exports = TaskPaymentsDriver;

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
      callback(data);
    } catch (err) {
      console.log(err);
      callback({ error: err });
    }
    db.end();
  },
};
module.exports = TaskPaymentsDriver;

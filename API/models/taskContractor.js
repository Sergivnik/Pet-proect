const mysql = require("mysql2");
const options = require("./config.js");

var TasksContractors = {
  list: async function (callback) {
      let dataObj={};
      const db = mysql.createPool(options).promise();
      try {
        let [data] = await db.query("SELECT * FROM contractors order by value");
        dataObj.contractors = data;
        [data] = await db.query(
          "SELECT * FROM contractorspayments order by date"
        );
        dataObj.contractorsPayments = data;
        callback(dataObj);
      } catch (err) {
        callback({ error: err });
      }
  },
};

module.exports = TasksContractors;
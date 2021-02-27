const db = require("./db.js");

var Tasks = {
  list: async function (callback) {
    let allData = {};
    try {
      let [data] = await db.query("SELECT * FROM cities");
      allData.citieslist = data;
      [data] = await db.query("SELECT * FROM drivers");
      allData.driverlist = data;
      [data] = await db.query("SELECT * FROM oders");
      allData.clientList = data;
      callback(allData);
      db.end();
    } catch (err) {
      callback({ error: err });
    }
    // .finally(() => {
    //   pool.end();
    // });
  },
};
module.exports = Tasks;

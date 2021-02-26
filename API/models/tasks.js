const db = require("./db.js");

var Tasks = {
  list: function (callback) {
    db.query("SELECT * FROM listtodo")
      .then(([data, fields]) => {
        callback(data);
      })
      .catch((err) => {
        callback({ error: err });
      });
    // .finally(() => {
    //   pool.end();
    // });
  },
  
};
module.exports = Tasks;

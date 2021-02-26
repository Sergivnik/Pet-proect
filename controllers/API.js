const db = require("../models/db.js");
var tasks = require("../models/tasks.js");

module.exports.taskGet = (req, res) => {
  tasks.list((data) => {
    if (data.error) {
    } else {
      res.send(data);
    }
  });
};

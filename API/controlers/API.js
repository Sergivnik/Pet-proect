
var tasks = require("../models/tasks.js");

module.exports.taskGet = (req, res) => {
  tasks.list((data) => {
    if (data.error) {
      res.render("errorPage.hbs", { err: data.error.errno });
    } else {
      res.json(data);
    }
  });
};
var tasks = require("../models/customerTasks.js");

const callBack = (data, res) => {
  if (data.error) {
    console.log(data);
    res.status(500);
    res.json({ message: data.error });
  } else {
    res.json(data);
  }
};

module.exports.taskGet = (req, res) => {
  res.set("Access-Control-Allow-Credentials", "true");
  console.log(req.sessionID, req.session.userId);
  tasks.getData(req.session.userId, (data) => callBack(data, res));
};
module.exports.taskAddCustomerApp = (req, res) => {
  res.set("Access-Control-Allow-Credentials", "true");
  tasks.addCustomerApp(req.body, (data) => callBack(data, res));
};

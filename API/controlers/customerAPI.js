var tasks = require("../models/customerTasks.js");

const callBack = (data, res) => {
  if (data.error) {
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

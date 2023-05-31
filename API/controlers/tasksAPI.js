var tasks = require("../models/tasksTasks.js");

const callBack = (data, res) => {
  if (data.error) {
    console.log(data);
    res.status(500);
    res.json({ message: data.error });
  } else {
    res.json(data);
  }
};

module.exports.tasksGetNew = (req, res) => {
  res.set("Access-Control-Allow-Credentials", "true");
  console.log(req.sessionID, req.session.userId);
  tasks.getTasksNumber(req.session.userId, (data) => callBack(data, res));
};

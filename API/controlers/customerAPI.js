var tasks = require("../models/customerTasks.js");
var fs = require("fs");

const callBack = (data, res) => {
  if (data.error) {
    console.log(data);
    res.status(500);
    res.json({ message: data.error });
  } else {
    res.json(data);
  }
};
const writeLogToFile = (logData) => {
  const logFilePath = "./API/Bills/logfile.txt"; // Путь к файлу логов
  const logString = `[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}] ${logData}\n`;

  fs.appendFile(logFilePath, logString, (err) => {
    if (err) {
      console.error("Ошибка при записи лога:", err);
    }
  });
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
module.exports.taskEditCustomerApp = (req, res) => {
  res.set("Access-Control-Allow-Credentials", "true");
  tasks.editCustomerApp(req.body, (data) => callBack(data, res));
};
module.exports.taskDelCustomerApp = (req, res) => {
  res.set("Access-Control-Allow-Credentials", "true");
  tasks.delCustomerApp(req.params.id, (data) => callBack(data, res));
};
module.exports.taskGetNewApp = (req, res) => {
  res.set("Access-Control-Allow-Credentials", "true");
  writeLogToFile(req.session.name);
  console.log(req.sessionID, req.session.userId);
  tasks.getNewApp((data) => callBack(data, res));
};
module.exports.taskGetApps = (req, res) => {
  res.set("Access-Control-Allow-Credentials", "true");
  console.log(req.sessionID, req.session.userId);
  tasks.getApps((data) => callBack(data, res));
};

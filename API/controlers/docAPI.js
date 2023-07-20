var tasks = require("../models/taskDocs.js");
var fs = require("fs");
const writeLogToFile = (logData) => {
  const logFilePath = "./API/Bills/logfile.txt"; // Путь к файлу логов
  const logString = `[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}] ${logData}\n`;

  fs.appendFile(logFilePath, logString, (err) => {
    if (err) {
      console.error("Ошибка при записи лога:", err);
    }
  });
};

const callBack = (data, res) => {
  if (data.error) {
    console.log(data);
    writeLogToFile(data);
    res.status(500);
    res.json({ message: data.error });
  } else {
    res.json(data);
  }
};

module.exports.taskCreateContract = (req, res) => {
  res.set("Access-Control-Allow-Credentials", "true");
  console.log("hi", req.sessionID, req.body);
  tasks.createContract(req.body.customer, req.body.html, req.body.css, (data) =>
    callBack(data, res)
  );
};
module.exports.taskGetPdfContract = (req, res) => {
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  const { customer } = req.query;
  console.log(customer);
  const path = require("path");
  let pathBills = path.join(__dirname, "..", `contracts/${customer}`);
  res.sendFile(`${pathBills}/contract.pdf`);
};

let tasks = require("../models/postTask.js");

const callBack = (data, res) => {
  if (data.error) {
    console.log(data);
    res.status(500);
    res.json({ message: data.error });
  } else {
    res.json(data);
  }
};

module.exports.addPostTrack = (req, res) => {
  res.set("Access-Control-Allow-Credentials", "true");
  console.log(req.sessionID, req.session.userId);
  tasks.addPostTrack(req.body, (data) => callBack(data, res));
};

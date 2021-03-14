var tasks = require("../models/tasks.js");

module.exports.taskGet = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  tasks.list((data) => {
    if (data.error) {
      res.status(500);
      res.json({ message: data.error });
    } else {
      res.json(data);
    }
  });
};
module.exports.taskAdd = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  tasks.add(req.body.body, (data) => {
    if (data.error) {
      res.status(500);
      res.json({ message: data.error });
    } else {
      res.json(data);
    }
  });
};
module.exports.taskEdit = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS, PATCH");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  tasks.edit(req.body.body, (data) => {
    if (data.error) {
      res.status(500);
      res.json({ message: data.error });
    } else {
      res.json(data);
    }
  });
};
module.exports.taskDel = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  tasks.del(req.params.id, (data) => {
    if (data.error) {
      res.status(500);
      res.json({ message: data.error });
    } else {
      res.json(data);
    }
  });
};

const pdfTemplate = require("../documents/powerOfAttorney.js");
const pdf = require("html-pdf");
module.exports.taskProxy = (req, res) => {
  console.log(req.params.id);
  pdf.create(pdfTemplate(req.params.id), {}).toFile("result.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
};

const express = require("express");
const path = require("path");
const tasks = require("./models/tasks");

const app = express();
app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/API/data", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  tasks.list((data) => {
    if (data.error) {
      console.log(data.error.errno);
      res.send("errorPage.hbs", { err: data.error.errno });
    } else {
      res.send(data);
    }
  });
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));

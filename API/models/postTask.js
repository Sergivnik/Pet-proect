const mysql = require("mysql2");
const options = require("./config.js");

let TasksPostTrack = {
  addPostTrack: async (data, callBack) => {
    console.log(data);
  },
};

module.exports = TasksPostTrack;

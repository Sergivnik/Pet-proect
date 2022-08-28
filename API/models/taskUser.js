const mysql = require("mysql2");
const options = require("./config.js");
const bcryptjs = require("bcryptjs");

let TasksUser = {
  addNewUser: async (data, callback) => {
    const db = mysql.createPool(options.sql).promise();
    const salt = bcryptjs.genSaltSync(options.saltRounds);
    let password = bcryptjs.hashSync(data.password, salt);
    let user = {
      login: data.login,
      password: password,
      name: data.name,
    };
    try {
      await db.query("INSERT INTO users SET ?", user);
      callback("success!");
    } catch (err) {
      console.log(err);
      callback({ error: err });
    }
    db.end();
  },
  checkUser: async (data, callback) => {
    const db = mysql.createPool(options.sql).promise();
    try {
      let user = await db.query(
        `SELECT * FROM users WHERE login="${data.login}"`
      );
      user = user[0];
      if (user.length > 0) {
        let check = bcryptjs.compareSync(data.password, user[0].password);
        callback(check, user[0]._id);
      }
    } catch (err) {
      callback({ error: err });
    }
    db.end();
  },
};
module.exports = TasksUser;

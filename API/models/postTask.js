const mysql = require("mysql2");
const options = require("./config.js");

let TasksPostTrack = {
  addPostTrack: async (data, callBack) => {
    console.log(data);
    const db = mysql.createPool(options.sql).promise();

    try {
      const query = `
        UPDATE oderslist 
        SET postTracker = ?, 
            customerPayment = CASE 
                              WHEN customerPayment NOT IN ('Ок', 'Частично оплачен') THEN ? 
                              ELSE customerPayment 
                              END 
        WHERE _id IN (?);
      `;
      const values = [data.postTrackNumber, 'Почта', data.orderList];
      
      console.log("Executing query with values:", values);
      await db.query(query, values);
      callBack("success!");
    } catch (err) {
      console.error("Error updating database:", err);
      callBack({ error: err });
    } finally {
      db.end();
    }
  },
};

module.exports = TasksPostTrack;

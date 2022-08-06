const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "store",
  },
  console.log("connected to the store database")
);

module.exports = db.promise();

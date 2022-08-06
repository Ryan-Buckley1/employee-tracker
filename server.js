// const express = require("express");
const inquirer = require("inquirer");

const db = require("./db/connection");
// const apiRoutes = require("./routes/apiRoutes");
//
// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use("/api", apiRoutes);

// db.connect((err) => {
//   if (err) throw err;
//   console.log("Database Connected");
//   app.listen(PORT, () => {
//     console.log(`Example app listening at http://localhost:${PORT}`);
//   });
// });
const init = () => {
  const openingQuest = () => {
    inquirer
      .prompt({
        name: "openingQ",
        message: "What would you like to do?",
        type: "list",
        choices: [
          "View all Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      })
      .then((res) => {
        switch (res.openingQ) {
          case "View all Employees":
            viewAllEmployees();
            break;
          case "Add Employee":
            addEmployee();
            break;
          case "Update Employee Role":
            updateEmployee();
            break;
          case "View All Roles":
            viewAllRoles();
            break;
          case "Add Role":
            addRole();
            break;
          case "View All Departments":
            viewAllDepartments();
            break;
          case "Add Department":
            addDepartment();
            break;
          case "Quit":
            db.end();
            break;
        }
      });
  };

  openingQuest();

  const viewAllEmployees = () => {
    const sql = `SELECT * FROM employees`;

    db.query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);
      openingQuest();
    });
  };

  const viewAllDepartments = () => {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);
      openingQuest();
    });
  };

  const viewAllRoles = () => {
    const sql = `SELECT * FROM roles`;

    db.query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);
      openingQuest();
    });
  };

  const updateEmployee = () => {};

  const addEmployee = () => {};

  const addDepartment = () => {};

  const addRole = () => {};
};

init();

// const inquirer = require("inquirer");
const db = require("../db/connection");
const firstQuestion = [
  {
    name: "openingQuest",
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
  },
];

const viewEmployeeQuest = [
  {
    name: "employeeQuest",
    message: "What role of employee would you like to view?",
    type: "list",
    choices: getEmployeeRoles,
  },
];

function getEmployeeRoles() {
  let currentEmployeeRoles = [];
  const sql = `SELECT name FROM roles`;
  db.query(sql, (err, rows) => {
    if (err) {
      return "unable to find roles";
    }
    currentEmployeeRoles = JSON.stringify(rows);
    return currentEmployeeRoles;
  });
}

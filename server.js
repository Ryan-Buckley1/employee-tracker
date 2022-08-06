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

  const viewAllEmployees = async () => {
    const sql = `SELECT * FROM employees`;

    const rows = await db.query(sql);
    console.table(rows[0]);
    openingQuest();
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

  const updateEmployee = async () => {
    const sql = `SELECT * FROM employees`;
    const rows = await db.query(sql);

    // => {
    //   if (err) throw err;
    //   return rows;
    // });
    // console.log(
    //   rows[0].map((employee) => {
    //     return employee.first_name;
    //   })
    // );
    // const sql2 = `UPDATE employee SET first_name = ?, last_name = ?  role_id = ?, manager_id = ?`;
    const answers = await inquirer.prompt([
      {
        name: "chosenEmployee",
        message: "Which employee would you like to update?",
        type: "list",
        choices: rows[0].map((employee) => {
          return { name: employee.first_name, value: employee.id };
        }),
      },
      {
        name: "changeChoice",
        message: "What would you like to change?",
        type: "list",
        choices: [
          { name: "Update role", value: "0" },
          { name: "Update employee manager", value: "1" },
        ],
      },
    ]);

    if (answers.changeChoice == 1) {
      const sql = `SELECT * FROM employees WHERE manager_id IS NULL`;
      const managers = await db.query(sql);
      const allManagers = await inquirer.prompt([
        {
          name: "selectedManager",
          message: "What manager would you like the employee to have?",
          type: "list",
          choices: managers[0].map((manager) => {
            return {
              name: manager.first_name + " " + manager.last_name,
              value: manager.id,
            };
          }),
        },
      ]);
      const sql2 = `UPDATE employees SET manager_id = ? WHERE id = ?`;
      await db.query(sql2, [
        allManagers.selectedManager,
        answers.chosenEmployee,
      ]);
    } else if (answers.changeChoice == 0) {
      const sql = `SELECT * FROM roles`;
      const roles = await db.query(sql);
      const allRoles = await inquirer.prompt([
        {
          name: "selectedRole",
          message: "What is their new role?",
          type: "list",
          choices: roles[0].map((role) => {
            return {
              name: role.title,
              value: role.id,
            };
          }),
        },
      ]);
      console.log(allRoles.selectedRole, answers.chosenEmployee);
      const sql2 = `UPDATE employees SET role_id = ? WHERE id = ?`;
      await db.query(sql2, [allRoles.selectedRole, answers.chosenEmployee]);
    }
    openingQuest();
    // console.log(answers);
  };

  const addEmployee = () => {
    const answers = await inquirer.prompt([
        {
          name: "first_name",
          message: "What is your new employee's first name?",
          type: "input", 
        },
        {
            name: "last_name",
            message: "What is your new employee's last name?",
            type: "input", 
        },
        {
            name: "first_name",
            message: "What is your new employee's first name?",
            type: "input", 
        },
        {
            name: "role",
            message: "What is your new employee's first name?",
            type: "input", 
            choices: roles[0].map((role) => {
                return {
                  name: role.title,
                  value: role.id,
                };
              }),
        },

    ]);
    
    };

  const addDepartment = () => {};

  const addRole = () => {};
}
init();

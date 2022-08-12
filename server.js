const inquirer = require("inquirer");

const db = require("./db/connection");

//First question upon opening the app, asks user what they would like to do with the database
const openingQuest = () => {
  inquirer
    .prompt({
      name: "openingQ",
      message: "What would you like to do?",
      type: "list",
      choices: [
        "View all Employees",
        "View All Roles",
        "View All Departments",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Update Employee Role",
        "View Employees By Manager",
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
        case "View Employees By Manager":
          viewEmployeesByManager();
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

//Lets the user view the employees by who their manager is
const viewEmployeesByManager = async () => {
  const sql = `SELECT * FROM employees WHERE manager_id IS NULL`;
  const managers = await db.query(sql);
  const allManagers = await inquirer.prompt([
    {
      name: "selectedManager",
      message: "What manager's employees would you like to see?",
      type: "list",
      choices: managers[0].map((manager) => {
        return {
          name: manager.first_name + " " + manager.last_name,
          value: manager.id,
        };
      }),
    },
  ]);
  const sql2 = `SELECT first_name, last_name FROM employees WHERE manager_id = ?`;
  const rows = await db.query(sql2, allManagers.selectedManager);
  console.table(rows[0]);
  openingQuest();
};

//Lets user view all employees
const viewAllEmployees = async () => {
  const sql = `SELECT employees.first_name AS First, employees.last_name AS Last, title ,managers.first_name AS Manager FROM employees 
  LEFT JOIN employees managers
  ON employees.manager_id = managers.id
  JOIN roles 
  ON  roles.id = employees.role_id;`;

  const rows = await db.query(sql);
  console.table(rows[0]);
  openingQuest();
};

//Lets user view all departments
const viewAllDepartments = async () => {
  const sql = `SELECT departments.name, departments.id FROM departments`;

  const rows = await db.query(sql);
  console.table(rows[0]);
  openingQuest();
};

//Lets user view all roles
const viewAllRoles = async () => {
  const sql = `SELECT roles.id ,roles.title, name AS department, roles.salary FROM roles
  JOIN departments 
  ON departments.id = roles.department_id`;

  const rows = await db.query(sql);
  console.table(rows[0]);
  openingQuest();
};

//lets user update an individual employee's role or manager
const updateEmployee = async () => {
  const sql = `SELECT * FROM employees`;
  const rows = await db.query(sql);

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
    await db.query(sql2, [allManagers.selectedManager, answers.chosenEmployee]);
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
    const sql2 = `UPDATE employees SET role_id = ? WHERE id = ?`;
    await db.query(sql2, [allRoles.selectedRole, answers.chosenEmployee]);
  }
  openingQuest();
};

//Lets user add employee
const addEmployee = async () => {
  const sql1 = `SELECT * FROM employees WHERE manager_id IS NULL`;
  const managers = await db.query(sql1);
  const sql2 = `SELECT * FROM roles`;
  const roles = await db.query(sql2);
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
      name: "role_id",
      message: "What is your new employee's role?",
      type: "list",
      choices: roles[0].map((role) => {
        return {
          name: role.title,
          value: role.id,
        };
      }),
    },
    {
      name: "manager_id",
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
  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?) `;
  await db.query(sql, [
    answers.first_name,
    answers.last_name,
    answers.role_id,
    answers.manager_id,
  ]);
  openingQuest();
};

//Lets user add a department
const addDepartment = async () => {
  const newDepartment = await inquirer.prompt([
    {
      name: "addedDepartment",
      type: "input",
      message: "Enter your new Department name.",
    },
  ]);
  const sql = `INSERT INTO departments (name) VALUES (?)`;
  await db.query(sql, newDepartment.addedDepartment);
  openingQuest();
};

//Lets user add a role
const addRole = async () => {
  const sql1 = `SELECT * FROM departments`;
  const departments = await db.query(sql1);
  const newRole = await inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "What is the new role name?",
    },
    {
      name: "salary",
      type: "input",
      message: "What salary do you want this role to have?",
    },
    {
      name: "department",
      type: "list",
      message: "What department will this role work in?",
      choices: departments[0].map((department) => {
        return {
          name: department.name,
          value: department.id,
        };
      }),
    },
  ]);
  const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
  await db.query(sql, [newRole.name, newRole.salary, newRole.department]);
  openingQuest();
};

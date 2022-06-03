const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const { response } = require("express");

//Set PORT variable and call express so we use it
const PORT = process.env.PORT || 3001;
const app = express();
//boiler plate
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "eggmanwalrus1@3",
    database: "tracker_db",
  },
  console.log(`Connected to the tracker_db database.`)
);

const prompts = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((response) => {
      switch (response.choice) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateRole();
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
          console.log("See you later!");
          return;
      }
    });
};

// View all employees in the employee tracker database
const viewAllEmployees = () => {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.department_name AS department, CONCAT(man.first_name, " ", man.last_name) AS manager FROM employee INNER JOIN roles ON roles.id = employee.role_id INNER JOIN department ON department.id = roles.department_id LEFT JOIN employee man ON employee.manager_id = man.id;`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    prompts();
  });
};

const viewAllDepartments = () => {
  const sql = `SELECT department.id, department.department_name FROM department;`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    prompts();
  });
};

const viewAllRoles = () => {
  const sql = `SELECT roles.id, roles.title, roles.salary, department.department_name FROM roles INNER JOIN department ON department.id = roles.department_id;`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    prompts();
  });
};

const addEmployee = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the employee's first name?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the employee's last name?",
    },
    {
      type: "list",
      name: "role",
      message: "What is the employee's role?",
      choices: [
        "Sales Lead",
        "Salesperson",
        "Lead Engineer",
        "Software Engineer",
        "Account Manager",
        "Accountant",
        "Legal Team Lead",
        "Lawyer",
      ],
    },
    {
      type: "input",
      name: "manager",
      message: "Who is the employee's manager?",
      choices: [
        "John Doe",
        "Billy Failing",
        "Jarrod Walker",
        "Royal Masat",
        "Evan Hall",
        "Zack Levine",
        "Billy Strings",
        "Scott Mescudi",
      ],
    },
  ]);
};

const addDepartment = () => {
  return inquirer.prompt({
    type: "input",
    name: "departmentName",
    message: "What is the name of the department?",
  }).then((response) => {
    const sql = 'INSERT INTO department (department_name) VALUES (department_name)';
    db.query(sql, (err, res) => {
      if (err) throw err;
      console.table(res);
      prompts();
    });
  });
};

const addRole = () => {};

app.listen(PORT);

prompts();
const express = require("express");
const mysql = require("mysql2");
const cTable = require("console.table");

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
    password: "",
    database: "tracker_db",
  },
  console.log(`Connected to the tracker_db database.`)
);

const prompts = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do? (Use arrow keys",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
      ],
    }.then((response) => {
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
          quit();
          break;
      }
    }),
  ]);
};

// View all employees in the employee tracker database
app.get('/api/employees', (req, res) => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.department_name AS department, CONCAT(man.first_name, " ", man.last_name) AS manager FROM employee INNER JOIN roles ON roles.id = employee.role_id INNER JOIN department ON department.id = roles.department_id LEFT JOIN employee man ON employee.manager_id = man.id;`;
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows,
      });
    });
  });





// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

//listener for PORT / local host website
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

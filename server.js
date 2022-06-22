const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'tyleromoto1',
      database: 'employeetrackerDB'
    },
    console.log(`Connected to the employeetrackerDB database.`)
  );

function startOptions(){
    inquirer.prompt([
        {
            type: "list",
            message: "Please select an option",
            name: "choice",
            choices: ["View All Departments", "View All Employees", "View All Roles", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Exit Now"]
        }
    ]) .then(function(userInput){
        console.log(userInput);
        switch(userInput.choice){
            case "View All Departments":
                viewAllDepartments();
                break;
            case "View All Employees":
                viewAllEmployees();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add a Department":
                addDepartment();
                break;
            case "Add a Role":
                addRole();
                break;
            case "Add an Employee":
                addEmployee();
                break;
            case "Update an Employee Role":
                updateEmployeeRole();
                break;
            case "Exit Now":
                db.end();
                break;
        }
    });
}
// Function set up to view All departments in database
function viewAllDepartments() {
    db.query("SELECT department_name AS Departments FROM department;", function (err, res){
        if (err) throw err
        console.table(res);
        startOptions();
    })
}
// Function set up to view all employees
function viewAllEmployees() {
    db.query("SELECT employee.first_name, employee.last_name, employee_role.title as Title, employee_role.salary as Salary, department.department_name as Department, CONCAT(e.first_name, ' ',e.last_name) AS Manager FROM employee INNER JOIN employee_role on employee_role.id = employee.role_id INNER JOIN department on department.id = employee_role.department_id left join employee e on employee.manager_id = e.id;",
    function (err, res) {
        if (err) throw err
        console.table(res);
        startOptions();
    })
}

// function set up to view all roles
function viewAllRoles() {
    db.query("SELECT title as Title, salary as Salary FROM employee_role",
    function (err, res) {
        if (err) throw err
        console.table(res);
        startOptions();
    })
}

// Function to add new department
function addDepartment() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Which department do you want to add?"
        }
    ]).then(function(res) {
        db.query("INSERT INTO department SET ?",
        {
            department_name: res.name
        }, function (err){
            if (err) throw err
            console.table(res);
            startOptions();
        }
        )
    })
}

// function addRole()
function addRole() {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the role title you want to add?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary for the role?"  
        },
        {
            name: "department_id",
            type: "input",
            message: "What is the department id for this role?"
        },
    ]).then(function(res) {
        db.query("INSERT INTO employee_role SET ?", 
        {
            title: res.title,
            salary: res.salary,
            department_id: res.department_id
        }, function (err){
            if (err) throw err;
            console.table(res);
            startOptions();
            }
        )}
    )  
}
// function addEmployee()

// function updateEmployeeRole()

startOptions();
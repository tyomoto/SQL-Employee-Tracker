const mysql = require('mysql');
const inquirer = require('inquirer');
const { exit } = require('process');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'tyleromoto1',
      database: 'employeetrackerDB'
    },
    console.log(`Connected to the employeetrackerDB database.`)
  );

function startApp(){
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

function viewAllDepartments()

function viewAllEmployees()

function viewAllRoles()

function addDepartment()

function addRole()

function addEmployee()

function updateEmployeeRole()
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

// Function to add a new role with title, salary and department id
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
// Function to display the list of roles for the addEmployee function
var roleArray = [];
function pickRole() {
    db.query("SELECT * FROM employee_role", 
    function(err, res){
        if (err) throw err;
        for (var i = 0; i <res.length; i++){
            roleArray.push(res[i].title);
        }
    })
    return roleArray;
}
// Function set up to add an employee 
function addEmployee() {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the first name of the employee you are adding?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the last name of the employee you are adding?"
        },
        {
            name: "manager_id",
            type: "input",
            message: "What is the employees' manager id? (Leave blank if unknown)"
        },
        {
            name: "role_id",
            type: "list",
            message: "What is the role of the employee you are adding?",
            choices: pickRole()
        },
    ]).then(function(res) {
        var roleId = pickRole().indexOf(res.role_id) + 1
        db.query("INSERT INTO employee SET ?",
        {
            first_name: res.first_name,
            last_name: res.last_name,
            manager_id: res.manager_id,
            role_id: roleId
        }, function(err){
            if (err) throw err;
            console.table(res);
            startOptions();
        })
    })
}

function updateEmployeeRole() {
    db.query('SELECT * FROM employee', 
    function (err, res){
        if (err) throw err;
        inquirer.prompt([
            {
                name: "employeeUpdate",
                type: "list",
                message: "Pick the employee whose role you wish to update.",
                choices: res.map(employee => employee.first_name)
            },
        ])
        .then(function(res){
            const updateEmployee = (res.employeeUpdate)
            db.query('SELECT * FROM employee_role', 
            function (err, res){
                if (err) throw err;
                inquirer.prompt([
                    {
                        name: "role_id",
                        type: "list",
                        message: "Select the new role of the employee.",
                        choices: res.map(employee_role => employee_role.title)
                    },
                ])
                .then(function(answer){
                    const rolePicked = res.find(employee_role => employee_role.title === answer.role_id)
                    db.query("UPDATE employee SET ? WHERE first_name = " + "'" + updateEmployee + "'", {
                        role_id: "" + rolePicked.id + "",
                    },
                    function(err){
                        if (err) throw err;
                        console.log("Updated " + updateEmployee + "'s role to " + answer.role_id);
                        startOptions();
                    })
                })
            })
        })
    })
}

startOptions();
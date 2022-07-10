# 12 SQL: Employee Tracker
## Module 12 Challenge

## Description
The goal of this challenge was to create a Employee Tracker, where the user interacts with a command-line application that will take in information about employees and managers. The data collected from the users inputs will then be stored in a database which will hold data on employees (name, role, manager), as well as employee roles(role name, salary, department).

## User Story
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

## Acceptance Criteria
GIVEN a command-line application that accepts user input
* WHEN I start the application
    - THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
* WHEN I choose to view all departments
    - THEN I am presented with a formatted table showing department names and department ids
* WHEN I choose to view all roles
    - THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
* WHEN I choose to view all employees
    - THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
* WHEN I choose to add a department
    - THEN I am prompted to enter the name of the department and that department is added to the database
* WHEN I choose to add a role
    - THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
* WHEN I choose to add an employee
    - THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
* WHEN I choose to update an employee role
    - THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

## Installation
First install all dependencies:
```
npm install
```
Start the Application with:
```
npm start
```


## Video Walkthrough
This link will take you to the video walkthrough and demonstration in how to use this team generator as well as the npm tests passing.
[README Walkthrough](https://drive.google.com/file/d/14hRFWc6kAAi_LvLx1l0q7RsH0Un0ixY7/view)

## Website
This [link](https://github.com/tyomoto/shiny-spork) will take you to the code repository on github.





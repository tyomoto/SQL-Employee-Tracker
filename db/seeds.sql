USE employeetrackerDB;

INSERT INTO department (name)
VALUES ("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Salesperson", 70000, 1),
("Sales Lead", 100000, 1),
("Software Engineer", 110000, 2),
("Lead Engineer", 130000, 2),
("Accountant", 90000, 3),
("Account Manager", 120000, 3),
("Lawyer", 140000, 4),
("Legal Team Lead", 180000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ian", "Porter", 1, 2),
("Damon", "Barlow", 2, NULL ),
("Seth", "Abner", 3, 4),
("Matt", "Piper", 4, NULL),
("Carrie", "Underwood", 5, 6),
("Sarah", "Smith", 6, NULL),
("Mike", "Riley", 7, 8),
("Patricia", "Price", 8, NULL),
("Josh", "Sinclair", 1, 2),
("Emma", "Watson", 3, 4);
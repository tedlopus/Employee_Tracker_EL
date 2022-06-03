INSERT INTO department (department_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
       ("Salesperson", 80000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2),
       ("Account Manager", 160000, 3),
       ("Accountant", 125000, 3),
       ("Legal Team Lead", 250000, 4),
       ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
       ("Billy", "Strings", 7, NULL),
       ("Billy", "Failing", 2, 1),
       ("Jarrod", "Walker", 3, NULL),
       ("Royal", "Masat", 4, 4),
       ("Evan", "Hall", 5, NULL),
       ("Zack", "Levine", 6, 6),
       ("Scott", "Mescudi", 8, 2);
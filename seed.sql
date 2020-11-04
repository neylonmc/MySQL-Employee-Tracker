USE employee_DB;

INSERT INTO departments (name)
VALUES ("Sales"), ("Legal"), ("Engineering"), ("Finance");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 70000, 1),
("Lawyer", 150000, 2),
("Salesperson", 80000, 1),
("Software Engineer", 15000, 3),
("Accountant", 100000, 4),
("Junior Developer", 80000, 3), 
("Legal Team Lead", 200000, 2);

INSERT INTO employee (first_name, last_name, role_id) 
VALUES ("David", "Rose", 1),
("Stevie", "Budd", 2),
("Twyla", "Sands", 3),
("Ronnie", "SLee", 4),
("Alexis", "Rose", 5),
("Patrick", "Brewer", 6),
("Ray", "Butani", 7);

UPDATE `employee_db`.`employee` SET `manager_id` = '1' WHERE (`id` > '1');
INSERT INTO departments (department)
VALUES ("Sales"), ("Legal"), ("Engineering"), ("Finance");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 70000, 1),
("Lawyer", 150000, 2),
("Salesperson", 80000, 1),
("Software Engineer", 15000, 3),
("Accountant", 100000, 4),
("Junior Developer", 80000, 3), 
("Legal Team Lead", 200000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("David", "Rose", 1, 1),
("Stevie", "Budd", 2, 1),
("Twyla", "Sands", 3, 2),
("Ronnie", "SLee", 4, 3),
("Alexis", "Rose", 5, 2),
("Patrick", "Brewer", 6, 1),
("Ray", "Butani", 7, 3);
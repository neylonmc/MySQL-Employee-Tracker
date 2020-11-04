DROP DATABASE IF EXISTS employee_DB

CREATE DATABASE employee_DB;

USE DATABASE employee_DB; 

CREATE TABLE departments (
    id INT NOT NULL,
    name VARCHAR (100) NULL, 
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT, 
    FOREIGN KEY (department_id),
    PRIMARY KEY (id)     
);

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    PRIMARY KEY (id)
    role_id INT NOT NULL,
    manager_role INT NULL,
    FOREIGN KEY (role_id),
    FOREIGN KEY (manager_role), 
    PRIMARY KEY (id)
);
DROP DATABASE IF EXISTS manager_db;

CREATE DATABASE manager_db;

USE manager_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) 
    REFERENCES department(id) 
    ON DELETE restrict
); 

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT, 
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE restrict,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE restrict
);
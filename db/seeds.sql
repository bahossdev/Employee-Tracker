-- Department
INSERT INTO department (name) 
VALUES
("Engineering"),
("Marketing and Sales"),
("Finance"),
("Human Resource");

-- Role
INSERT INTO role (title, salary, department_id)
VALUES
("CEO", 250000, null),
("Enigineering Manager", 190000, 1),
("Software Architect", 140000, 1),
("Hardware Engineer", 130000, 1),
("Software Engineer", 120000, 1),
("Marketing Director", 150000, 2),
("Salesperson", 100000, 2),
("Chief Financial Officer", 160000, 3),
("Accountant", 90000, 3),
("Human Resource Specialist", 120000, 4);


-- Employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES
("Alexander", "Johnson", 1, null),
("Emma", "Smith", 2, 1),
("Amir", "Patel", 3, 2),
("Sophie", "Schmidt", 4, 2),
("Charlie", "Wong", 4, 2),
("Grace", "Miller", 3, 2),
("Parsa", "Kousha", 5, 2),
("Arianna", "De Luca", 5, 2),
("Oliver", "Anderson", 6, 1),
("Nora", "Williams", 7, 9),
("Henry", "Moore", 7, 9),
("Kim", "Yang", 8, 1),
("Leo", "Clark", 9, 12),
("Mia", "Walker", 9, 12),
("Ava", "Parker", 10, 1),
("Lucas", "Carter", 10, 15)


-- Department
INSERT INTO department (name) 
VALUES
("Research and Development"),
("Product Design"),
("Software Engineering"),
("Marketing");

-- Role
INSERT INTO role (title, salary, department_id)
VALUES
("Chief Technology Officer", 180000, 1),
("Product Design Lead", 120000, 2),
("Software Architect", 140000, 3),
("Marketing Director", 110000, 4),
("Hardware Engineer", 130000, 1),
("UX/UI Designer", 100000, 2),
("Full Stack Developer", 120000, 3),
("Content Strategist", 90000, 4),
("Innovation Specialist", 150000, 1);


-- Employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES
("Alexander", "Johnson", 1, null),
("Emma", "Smith", 2, 1),
("Amir", "Patel", 3, 1),
("Sophie", "Schmidt", 4, null),
("Charlie", "Wong", 5, 1),
("Grace", "Miller", 6, 2),
("Kamran", "Kousha", 7, 3),
("Arianna", "De Luca", 8, null),
("Oliver", "Anderson", 9, 1),
("Nora", "Williams", 5, 1),
("Henry", "Moore", 6, 2),
("Kim", "Yang", 7, 3),
("Leo", "Clark", 8, null),
("Mia", "Walker", 9, 1),
("Ava", "Parker", 5, 1),
("Lucas", "Carter", 6, 2),
("Fang", "Li", 7, 3),
("Oliver", "Garcia", 7, 3);

INSERT INTO departments (name)
VALUES
-- department_id: 1
(Engineering),

-- department_id: 2
(Finance),

-- department_id: 3
(Legal),

-- department_id: 4
(Sales);

INSERT INTO roles (title, salary, department_id)
VALUES
-- role_id: 1 
    -- manager_id: 1
("Sales Lead", 100000, 4),
-- role_id: 2
("Salesperson", 80000, 4),

-- role_id: 3
    -- manager_id: 2
("Lead Engineer",150000, 1),
-- role_id: 4
("Software Engineer", 120000, 1),

-- role_id: 5
    -- manager_id: 3
("Account Manager", 160000, 2)
-- role_id: 6
("Accountant", 125000, 2),

-- role_id: 7
    -- manager_id: 4
("Legal Team Lead", 250000, 3),
-- role_id: 8
("Lawyer", 190000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
-- department_id: 1(Engineering)
("Forrest", "Gump", 1, 1),
("Bubba", "Buford", 2, 1),

-- department_id: 2(Finance)
("John", "Kennedy", 3, 2);
("Elvis", "Presley", 4, 2),

-- department_id: 3(Legal)
("Jenny", "Curran", 5, 3),
("Boxed", "Chocolate", 6, 3),

-- department_id: 4(Sales)
("Lietenant", "Dan" 7, 4),
("John", "Lennon", 8, 4),
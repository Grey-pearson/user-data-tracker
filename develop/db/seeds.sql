INSERT INTO department (department_name)
VALUES  ("HR"),
        ("IT"),
        ("production");

INSERT INTO role (title, salery, department_id)
VALUES  ("engineer", 75, 3),
        ("manager", 150, 1),
        ("accountant", 100, 1),
        ("janitor", 999, 2),
        ("coordinator", 1, 3);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("jean", "pants", 4, 3),
        ("cam", "shirt", 4, NULL),
        ("bob", "socks", 2, NULL),
        ("robert", "hat", 1, 2),
        ("shaq", "basketbal", 3, NULL),
        ("velma", "dog", 1, 1);
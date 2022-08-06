INSERT INTO departments (name)
VALUES 
    ('Sales'),
    ('Finance'),
    ('Customer Service'),
    ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES 
    ('Customer Service Lead', 95000, 1),
    ('Customer Service Representitive', 55000, 1),
    ('General Manager', 175000, 1),
    ('Legal Lead', 125500, 1),
    ('Lawyer', 100000, 1),
    ('Finance Lead', 115000, 1),
    ('Accountant', 75000, 1),
    ('Sales Lead', 100000, 1),
    ('SalesPerson', 65000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ('James', 'Fraser', 1, NULL),
    ('Jack', 'London', 2, 1),
    ('Robert', 'Bruce', 2, 1),
    ('Peter', 'Greenaway', 3, NULL),
    ('Derek', 'Jarman', 4, NULL),
    ('Paolo', 'Pasolini', 5, 5 ),
    ('Heathcote', 'Williams', 5, 5),
    ('Sandy', 'Powell', 6, NULL),
    ('Emil', 'Zola', 7, 8),
    ('Sissy', 'Coalpits', 7, 8),
    ('Antoinette', 'Capet', 8, NULL ),
    ('Samuel', 'Delany',9 ,11),
    ('Tony', 'Duvert', 9, NULL),
    ('Dennis', 'Cooper', 9, 13);
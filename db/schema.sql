CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, 
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    CONSTRAINT fk_departments FOREIGN KEY (department_id)
        REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    CONSTRAINT fk_employees FOREIGN KEY (manager_id)
        REFERENCES employees(id) ON DELETE SET NULL,
    CONSTRAINT fk_roles FOREIGN KEY (role_id)
        REFERENCES roles(id) ON DELETE CASCADE
    -- FOREIGN KEY (role_id) REFERENCES roles(id)
    -- FOREIGN KEY (manager_id) REFERENCES employees(id)
);
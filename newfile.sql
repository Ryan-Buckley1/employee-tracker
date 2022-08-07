SELECT employees.first_name AS First, employees.last_name AS Last, title ,managers.first_name AS Manager FROM employees 
LEFT JOIN employees managers
ON employees.manager_id = managers.id
JOIN roles 
ON  roles.id = employees.role_id;

SELECT departments.name, departments.id FROM departments

SELECT roles.id ,roles.title, name AS department, roles.salary FROM roles
JOIN departments 
ON departments.id = roles.department_id;
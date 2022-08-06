SELECT employees.first_name AS efirst, employees.last_name AS elast, title ,managers.first_name AS mfirst FROM employees 
LEFT JOIN employees managers
ON employees.manager_id = managers.id
JOIN roles 
ON  roles.id = employees.role_id;
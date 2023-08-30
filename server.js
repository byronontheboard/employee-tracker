const inquirer = require('inquirer');
const mysql = require('mysql2/promise');

mysql
    .createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employeeTracker_db',
    })
    .then((conn) => {
        connection = conn;
        return connection;
    });

const startApp = async () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ])
    .then((res) => {
        let action = res.action;
        switch (action) {
        // View
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
        // Add
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
        // Delete
            case 'Delete a department':
                deleteDepartment();
                break;
            case 'Delete a role':
                deleteRole();
                break;
            case 'Delete an employee':
                deleteEmployee();
                break;
        // Update
            case 'Update an employee':
                updateEmployee();
                break;
        // Exit
            case 'Exit':
                exitApp();
                return;
        }
    });
};

// Viewing functions
    // View all department function
const viewAllDepartments = async () => {
    const [departments] = await connection.query('SELECT * FROM departments');
        console.table(departments);
        startApp();
};

    // View all roles function
const viewAllRoles = async () => {
    const [roles] = await connection.query('SELECT * FROM roles');
        console.table(roles);
        startApp();
};

    // View all employees function
const viewAllEmployees = async () => {
    const [employees] = await connection.query('SELECT * FROM employees');
        console.table(employees);
        startApp();
};

// Add functions
    // Add a department function
const addDepartment = async () => {
  const department = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:'
        }
    ]);

    await connection.query('INSERT INTO departments (name) VALUES (?)', [department.name]);
        console.log('Department added successfully!');
        startApp();
};

    // Add a role function
const addRole = async () => {
    const role = await inquirer.prompt([
        {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the role:'
        },
        {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the role:'
        },
        {
        type: 'input',
        name: 'department_id',
        message: 'Enter the department ID for the role:'
        },
    ]);

  await connection.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', 
    [
        role.title,
        role.salary, 
        role.department_id,
    ]);
        console.log('Roles added successfully!');
        startApp();
};

    // Add a employee function
const addEmployee = async () => {
    const employee = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name of the employee:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the last name of the employee:'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the role ID for the employee:'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the manager ID for the employee:'
        },
    ]);

    await connection.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', 
    [
        employee.first_name,
        employee.last_name,
        employee.role_id,
        employee.manager_id,

    ]);
        console.log('Employee added successfully!');
        startApp();
};

// Delete functions
    // Delete a department
const deleteDepartment = async () => {
    const [departments] = await connection.query('SELECT * FROM departments');
    const departmentChoices = departments.map((department) => ({
        name: department.name,
        value: department.id,
    }));

    // Adding option to exit
    departmentChoices.push({ name: 'Exit', value: 'exit' }); 

    const departmentToDelete = await inquirer.prompt([
        {
            type: 'list',
            name: 'departmentId',
            message: 'Select a department to delete (or choose "Exit" to cancel):',
            choices: departmentChoices,
        },
    ]);

    if (departmentToDelete.departmentId === 'exit') {
        console.log('Exiting delete department...');
        startApp();
        return;
    }    

    await connection.query('DELETE FROM departments WHERE id = ?', [departmentToDelete.departmentId]);
        console.log('Department deleted successfully!');
        startApp();
};

    // Delete a role
const deleteRole = async () => {
    const [roles] = await connection.query('SELECT * FROM roles');
    const roleChoices = roles.map((role) => ({
        name: role.title,
        value: role.id,
    }));

    // Adding option to exit
    roleChoices.push({ name: 'Exit', value: 'exit' }); 

    const roleToDelete = await inquirer.prompt([
        {
            type: 'list',
            name: 'roleId',
            message: 'Select a role to delete (or choose "Exit" to cancel):',
            choices: roleChoices,
        },
    ]);

    if (roleToDelete.roleId === 'exit') {
        console.log('Exiting delete role...');
        startApp();
        return;
    }
    await connection.query('DELETE FROM roles WHERE id = ?', [roleToDelete.roleId]);
        console.log('Role deleted successfully!');
        startApp();
};

    // Delete a employee
const deleteEmployee = async () => {
    const [employees] = await connection.query('SELECT * FROM employees');
    const employeeChoices = employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
    }));

    // Adding option to exit
    employeeChoices.push({ name: 'Exit', value: 'exit' }); 

    const employeeToDelete = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Select an employee to delete (or choose "Exit" to cancel):',
            choices: employeeChoices,
        },
    ]);

    if (employeeToDelete.employeeId === 'exit') {
        console.log('Exiting delete employee...');
        startApp();
        return;
    }


    await connection.query('DELETE FROM employees WHERE id = ?', [employeeToDelete.employeeId]);
        console.log('Employee deleted successfully!');
        startApp();
};

// Update an employee function
const updateEmployee = async () => {
    // Fetch the list of employees from the database
    const [employees] = await connection.query('SELECT id, first_name, last_name FROM employees');
    
    // Prompt the user to select an employee to update
    const employeeToUpdate = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Select an employee to update:',
            choices: employees.map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
            })),
        },
    ]);
  
    // Fetch the employee's current data from the database
    const [currentEmployee] = await connection.query('SELECT * FROM employees WHERE id = ?', [employeeToUpdate.employeeId]);
  
    // Prompt the user to update employee's attributes
    const updatedEmployee = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the updated first name:',
            default: currentEmployee[0].first_name,
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the updated last name:',
            default: currentEmployee[0].last_name,
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the updated role ID:',
            default: currentEmployee[0].role_id,
        },
    ]);
  
    // Update the employee's data in the database
    await connection.query('UPDATE employees SET first_name = ?, last_name = ?, role_id = ? WHERE id = ?', [
        updatedEmployee.first_name,
        updatedEmployee.last_name,
        updatedEmployee.role_id,
        employeeToUpdate.employeeId,
    ]);
        console.log('Employee updated successfully!');
        startApp();
};

// Exit the application
const exitApp = async () => {
    console.log('Exiting the application...');
    connection.end();
    process.exit(0);
};

// Start the application
startApp().catch((error) => {
    console.error('An error occurred:', error);
});
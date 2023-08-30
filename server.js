import inquirer from 'inquirer';
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employeeTracker_db'
    }
);

const startApp = async () => {
    const action = await inquirer.prompt([
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
                'Update an employee role',
                'Exit'
            ]
        }
    ]);

    switch (action.action) {
        case 'View all departments':
            await viewAllDepartments();
                break;
        case 'View all roles':
            await viewAllRoles();
                break;
        case 'View all employees':
            await viewAllEmployees();
                break;
        case 'Add a department':
            await addDepartment();
                break;
        case 'Add a role':
            await addRole();
                break;
        case 'Add an employee':
            await addEmployee();
                break;
        case 'Update an employee':
            await updateEmployee();
                break;
        case 'Exit':
            await exitApp();
            // connection.end();
                return;
    }

    startApp();
};

// Viewing functions
    // View all department function
const viewAllDepartments = async () => {
  const [departments] = await connection.query('SELECT * FROM departments');
  console.table(departments);
};

    // View all roles function
const viewAllRoles = async () => {
  const [roles] = await connection.query('SELECT * FROM roles');
  console.table(roles);
};

    // View all employees function
const viewAllEmployees = async () => {
  const [employees] = await connection.query('SELECT * FROM employees');
  console.table(employees);
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
};

    // Add a role function
const addRole = async () => {
  const role = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the role:'
    }
  ]);

  await connection.query('INSERT INTO roles (name) VALUES (?)', [role.name]);
  console.log('Roles added successfully!');
};

    // Add a employee function
const addEmployee = async () => {
  const employee = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the employee:'
    }
  ]);

  await connection.query('INSERT INTO employees (name) VALUES (?)', [employee.name]);
  console.log('Employee added successfully!');
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
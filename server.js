const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employeeTracker_db',
    }
);
  
// Connect to the database
connection.connect((err) => {
if (err) {
    console.error('Error connecting to database:', err);
    return;
}
console.log('Connected to database');
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
                'Update an employee role',
                'Exit'
            ]
        }
    ])
    .then((res) => {
        let action = res.action;
        switch (action) {
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee':
                updateEmployee();
                break;
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
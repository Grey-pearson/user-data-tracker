// no express needed thank god
const mysql = require('mysql2');
const table = require('console.table');
const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Bugslife2',
        database: 'user_db'
    },
    console.log(`Connection success`)
);

const Options = [
    {
        type: 'list',
        name: 'options',
        message: 'what would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
    }
]

const addDepartment = [
    {
        type: 'input',
        name: 'departmentName',
        message: 'what do you want the department to be named?',
    }
]

const addRole = [
    {
        type: 'input',
        name: 'roleTitle',
        message: 'what do you want the role to be named?',
    },
    {
        type: 'input',
        name: 'roleSalery',
        message: 'whats the salery of the role?',
    },
    {
        type: 'input',
        name: 'departmentID',
        message: 'whats the id of the department that the role is in?',
    }
]

const addEmployee = [
    {
        type: 'input',
        name: 'firstName',
        message: 'whats the first name of the user?',
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'whats the last name of the user?',
    },
    {
        type: 'input',
        name: 'roleID',
        message: 'whats the id of the role user is in?',
    },
    {
        type: 'number',
        name: 'managerID',
        message: 'whats the employee id of the new uses manager? put in 0 if no manager',
    }
]
// find out how to display all users as a list? then displaying all roles is needed
const updateEmployee = [
    {
        type: 'number',
        name: 'managerID',
        message: 'whats the employee id of the new uses manager? put in 0 if no manager',
    }
]

const main = () => {
    prompt(Options).then((anwsers) => {
        // console.log(anwsers.options)
        switch (anwsers.options) {
            case 'view all departments':
                viewDatabase('department')
                break;
            case 'view all roles':
                viewDatabase('role')
                break;
            case 'view all employees':
                viewDatabase('employee')
                break;
            case 'add a department':
                console.log(4)
                break;
            case 'add a role':
                console.log(5)
                break;
            case 'add an employee':
                console.log(6)
                break;
            case 'update an employee role':
                console.log(7)
                break;
        }
    })
}

const viewDatabase = (anwser) => {
    console.log(anwser)
    db.query(
        `SELECT * FROM ${anwser};`,
        function (err, results, fields) {
            console.table(results)
            // console.log(fields)
            // console.log(err)
        }
    );
    main()
}

main()
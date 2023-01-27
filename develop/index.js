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
const upEmployeeQs = [
    {
        type: 'number',
        name: 'managerID',
        message: 'whats the employee id of the new users manager? put in 0 if no manager',
    }
]

// how do i make inquireer pretty? stacks ugly
const main = () => {
    prompt(Options).then((anwsers) => {
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
                // create adding function for each table
                console.log('add a department')
                apendDepartment()
                break;
            case 'add a role':
                console.log('add a role')
                apendToRole()
                break;
            case 'add an employee':
                console.log('add an employee')
                apendToEmployee()
                break;
            case 'update an employee role':
                console.log('update an employee role')
                updateEmployee()
                break;
        }
    })
}

const viewDatabase = (data) => {
    console.log(data)
    db.query(
        `SELECT * FROM ${data};`,
        function (err, results, fields) {
            console.table(results)
        }
    );
    main()
}

const apendDepartment = () => {
    // inquireer to ask for depart._name
    prompt(addDepartment).then((anwsers) => {
        // db.query? then just console.table(res)?
        console.log(anwsers.departmentName)
        // replicate for the other feilds
        var query = `INSERT INTO department (department_name) VALUES ('${anwsers.departmentName}');`
        db.query(query, function (err, res) {
            console.log(`new deparment ${anwsers.departmentName}`)
        })

    })
}

const apendToRole = () => {
    // inquireer to ask for title, salery, dapart._id
    prompt(addRole).then((anwsers) => {
        var query = `INSERT INTO department (department_name) VALUES ('${anwsers.departmentName}');`
        db.query(query, function (err, res) {
            console.log(`new deparment ${anwsers.departmentName}`)
        })
    })
}

const apendToEmployee = () => {
    // inquireer to ask for first_name, last_name, role_id, manager_id
    prompt(addEmployee).then((anwsers) => {
        var query = `INSERT INTO department (department_name) VALUES ('${anwsers.departmentName}');`
        db.query(query, function (err, res) {
            console.log(`new deparment ${anwsers.departmentName}`)
        })
    })
}
const updateEmployee = () => {
    // inquireer to ask for new manager_id ( 0 for no manager )
    prompt(upEmployeeQs).then((anwsers) => {
        var query = `INSERT INTO department (department_name) VALUES ('${anwsers.departmentName}');`
        db.query(query, function (err, res) {
            console.log(`new deparment ${anwsers.departmentName}`)
        })
    })
}

main()
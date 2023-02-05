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
        type: 'number',
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
        name: 'userID',
        message: 'whats the id of the employee you want to update with a new manager?',
    },
    {
        type: 'number',
        name: 'managerID',
        message: 'whats the employee id of the users manager? put in 0 if no manager?',
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
        var departQuery = `INSERT INTO department (department_name) VALUES ('${anwsers.departmentName}');`
        db.query(departQuery, function (err, res) {
            console.log(`new deparment ${anwsers.departmentName}`)
        })

    })
}

const apendToRole = () => {
    // inquireer to ask for title, salery, dapart._id
    prompt(addRole).then((anwsers) => {
        var roleQuery = `INSERT INTO role (title, salery, department_id) VALUES ('${anwsers.roleTitle}', ${anwsers.roleSalery}, ${anwsers.departmentID});`
        db.query(roleQuery, function (err, res) {
            console.log(`new role ${anwsers.roleTitle}`)
            console.log(err)
        })
    })
}

const apendToEmployee = () => {
    // inquireer to ask for first_name, last_name, role_id, manager_id
    prompt(addEmployee).then((anwsers) => {
        // null
        var roleQueryNull = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${anwsers.firstName}', '${anwsers.lastName}', ${anwsers.roleID}, NULL);`
        // not null
        var roleQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${anwsers.firstName}', '${anwsers.lastName}', ${anwsers.roleID}, ${anwsers.managerID});`

        if (anwsers.managerID <= 0) {
            // null
            db.query(roleQueryNull, function (err, res) {
                console.log(`new role ${anwsers.firstName} ${anwsers.lastName}`)
                console.log(roleQueryNull)
            })
        } else {
            // var
            console.log('not null')
            db.query(roleQuery, function (err, res) {
                console.log(`new role ${anwsers.firstName} ${anwsers.lastName}`)
                console.log(err)
            })
        }
    })
}
const updateEmployee = () => {
    // inquireer to ask for new manager_id ( 0 for no manager )


    prompt(upEmployeeQs).then((anwsers) => {
        // var
        var roleQuery = `UPDATE employee SET manager_id = ${anwsers.managerID} WHERE id = ${anwsers.userID};`
        // null
        var roleQueryNull = `UPDATE employee SET manager_id = NULL WHERE id = ${anwsers.userID};`

        if (anwsers.managerID <= 0) {
            db.query(roleQueryNull, function (err, res) {
                console.log(`new manager set`)
                console.log(err)
            })
        } else {
            db.query(roleQuery, function (err, res) {
                console.log(`new manager set`)
                console.log(err)
            })
        }
    })
}

main()
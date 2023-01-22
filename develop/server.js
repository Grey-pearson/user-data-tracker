const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Bullwort3!',
        database: 'user_db'
    },
    console.log(`Connection success`)
);


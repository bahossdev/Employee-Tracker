const Database = require('../lib/db.js');
const inquirer = require('inquirer');

class Employee {
    constructor() {
        this.db = new Database;
        this.question = [
            {
                type: "input",
                message: "What is the employee's first name?",
                name: "first-name",
            },
            {
                type: "input",
                message: "What is the employee's last name?",
                name: "last-name",
            },
            {
                type: "list",
                message: "What is the employee's role?",
                name: "employee-role",
                choices: []
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "manager",
                choices: []
            },
            {
                type: "list",
                message: "Which employee's role do you want to update?",
                name: "role-update",
                choices: []
            },
            {
                type: "list",
                message: "Which role do you want to assign the selected employee?",
                name: "employee-role",
                choices: []
            }
        ]
    }


}

module.exports = Employee;
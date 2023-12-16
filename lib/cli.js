//Importing the Inquirer Library and helpers
const inquirer = require("inquirer");


const questions = [
    {
        type: "list",
        message: "What would you like to do?",
        name: "main-menu",
        choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
    },
    {
        type: "input",
        message: "What is the name of the department?",
        name: "new-dept",
        when: (answer) => answer.main-menu === "Add Department",
    },
    {
        type: "input",
        message: "What is the name of the role?",
        name: "new-role",
        when: (answer) => answer.main-menu === "Add Role",
    },
    {
        type: "input",
        message: "What is the salary of the role?",
        name: "new-salary",
        when: (answer) => answer.new-role,
    },
    {
        type: "list",
        message: "Which department does the role belong to?",
        name: "choose-dept",
        choices: ["", "", "", ""],
        when: (answer) => answer.new-salary,

    },
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
    },

]

class CLI {
    constructor() {
        this.data = []
    }

    // Method to run the CLI application
    run() {
        return inquirer.prompt(questions)
            .then((responses) => {
                console.log('responses = ', responses);

            })
    }
}

module.exports = CLI;
//Importing the Inquirer Library and Console.Table
const inquirer = require('inquirer');
require('console.table');
const chalk = require('chalk');
const stripAnsi = require('strip-ansi');


//Importing classes
const Department = require('../classes/department.js')
const Role = require('../classes/role.js');
const Employee = require('../classes/employee.js');
const Database = require('../lib/db.js');

const question = [
    {
        type: "list",
        message: "What would you like to do?",
        name: "main-menu",
        choices: [
            new inquirer.Separator(),
            chalk.blue("View All Employees"),
            chalk.blue("Add Employee"),
            chalk.blue("Update Employee Role"),
            chalk.blue("Update Employee Manager"),
            chalk.blue("View Employees by Manager"),
            chalk.blue("View Employees by Department"),
            new inquirer.Separator(),
            chalk.yellow("View All Roles"),
            chalk.yellow("Add Role"),
            new inquirer.Separator(),
            chalk.green("View All Departments"),
            chalk.green("Add Department"),
            new inquirer.Separator(),
            chalk.red("Delete Employee"),
            chalk.red("Delete Role"),
            chalk.red("Delete Department"),
            new inquirer.Separator(),
            chalk.magenta("Quit")
        ],
    }
]

class CLI {
    constructor() {
        this.db = new Database();
    }

    // Method to run the CLI application
    async run() {
        try {
            await this.db.connect();
            const response = await inquirer.prompt(question);
            console.log('Selected option:', stripAnsi(response['main-menu']));
            const department = new Department(this.db, this.run);
            const role = new Role(this.db, this.run);
            const employee = new Employee(this.db, this.run);


            switch (stripAnsi(response['main-menu'])) {
                case 'View All Departments':
                    await department.viewAll();
                    break;
                case 'Add Department':
                    await department.addNew();
                    break;
                case 'View All Roles':
                    await role.viewAll();
                    break;
                case 'Add Role':
                    await role.addNew();
                    break;
                case 'View All Employees':
                    await employee.viewAll();
                    break;
                case 'Add Employee':
                    await employee.addNew();
                    break;
                case 'Update Employee Role':
                    await employee.update();
                    break;
                case 'Quit':
                    await this.db.endConnection();
                    break;
                default:
                    console.log('Invalid choice');
            }
        } catch (error) {
            console.error('Error in CLI:', error.message);
        }
    }
}

module.exports = CLI;
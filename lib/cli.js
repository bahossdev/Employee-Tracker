//Importing helpers and libraries
require('console.table');
const inquirer = require('inquirer');
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
            chalk.green("View All Departments"),
            chalk.green("View All Roles"),
            chalk.green("View All Employees"),
            chalk.green("View Employees by Manager"),
            chalk.green("View Employees by Department"),
            new inquirer.Separator(),
            chalk.cyan("Add New Department"),
            chalk.red("Delete Department"),
            new inquirer.Separator(),
            chalk.cyan("Add New Role"),
            chalk.red("Delete Role"),
            new inquirer.Separator(),
            chalk.cyan("Add New Employee"),
            chalk.red("Delete Employee"),
            chalk.yellow("Update Employee Role"),
            chalk.yellow("Update Employee Manager"),
            new inquirer.Separator(),
            chalk.magenta("Quit")
        ],
        paginated: true, // Enable pagination
        pageSize: 20, // Number of choices to display per page
    },
]

class CLI {
    constructor() {
        this.db = new Database();
    }

    // Method to run the CLI application
    async run() {
        try {
            await this.db.connect();
            const choice = await inquirer.prompt(question);
            const department = new Department(this.db, this.run);
            const role = new Role(this.db, this.run);
            const employee = new Employee(this.db, this.run, choice);


            switch (stripAnsi(choice['main-menu'])) {
                case 'View All Departments':
                    await department.viewAll();
                    break;
                case 'View All Roles':
                    await role.viewAll();
                    break;
                case 'View All Employees':
                    await employee.viewAll();
                    break;
                case 'View Employees by Manager':
                    await employee.viewAll();
                    break;
                case 'View Employees by Department':
                    await employee.viewAll();
                    break;
                case 'Add New Department':
                    await department.addNew();
                    break;
                case 'Delete Department':
                    await department.delete();
                    break;
                case 'Add New Role':
                    await role.addNew();
                    break;
                case 'Delete Role':
                    await role.delete();
                    break;
                case 'Add New Employee':
                    await employee.addNew();
                    break;
                case 'Delete Employee':
                    await employee.delete();
                    break;
                case 'Update Employee Role':
                    await employee.update();
                    break;
                case 'Update Employee Manager':
                    // await department.addNew();
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
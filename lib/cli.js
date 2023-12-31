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
            chalk.magenta("Department Budget"),
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
        pageSize: 20,
    },
]

class CLI {
    constructor() {
        this.db = new Database();
    }

    // Method to run the CLI application
    async run() {
        try {
            // Connect to the database and prompt the main menu
            await this.db.connect();
            const choice = await inquirer.prompt(question);

            // Initialize instances of Department, Role, and Employee classes
            const department = new Department(this.db, this.run);
            const role = new Role(this.db, this.run);
            const employee = new Employee(this.db, this.run, choice);

            // Switch statement to handle user choices from the main menu
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
                case 'Department Budget':
                    await department.budget();
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
                    await employee.update();
                    break;

                // End the database connection and exit the application
                case 'Quit':
                    await this.db.endConnection();
                    break;
                default:
                    console.log(chalk.bgRed.white(' Invalid choice! 🫤 '));
            }
        } catch (error) {
            console.error(chalk.bgRed.white('Error in CLI:', error.message));
        }
    }
}

// Export the CLI class for external use
module.exports = CLI;
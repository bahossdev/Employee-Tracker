//Importing the Inquirer Library and helpers
const inquirer = require('inquirer');
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
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit"],
    }
]

class CLI {
    constructor() {
        this.data = [];
        this.db = new Database();
    }

    // Method to run the CLI application
    async run() {
        try {
            await this.db.connect();
            const response = await inquirer.prompt(question);
            console.log('responses = ', response);
            const department = new Department(this.db);
            const role = new Role(this.db);
            const employee = new Employee(this.db);


            switch (response['main-menu']) {
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
                default:
                    console.log('Invalid choice');
            }
        } catch (error) {
            console.error('Error in CLI:', error.message);
            // } finally {
            //     await this.db.connect();
            //     const response = await inquirer.prompt(question);
        }
    }
}

module.exports = CLI;
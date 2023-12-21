const Main = require('./main.js')
const inquirer = require('inquirer');

class Employee extends Main {
    constructor(db) {
        super(db);
        this.content = 'employee';
        this.question1 = [
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
        ]
        this.question2 = [
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

    async fetchRole() {
        await this.db.connect();
        const sql = 'SELECT title FROM role';
        const [results] = await this.db.query(sql);
        return results;
    }

    async fetchEmployees() {
        await this.db.connect();
        const sql = 'SELECT first_name, last_name FROM employee';
        const [results] = await this.db.query(sql);
        return results;
    }

    async viewAll() {
        const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary 
        FROM employee JOIN role 
        ON employee.role_id = role.id
        ORDER BY employee.id`;
        await super.viewAll(sql, this.content);
    }
}

module.exports = Employee;
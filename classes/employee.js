const Main = require('./main.js')
const inquirer = require('inquirer');

class Employee extends Main {
    constructor(db, run) {
        super(db, run);
        this.content = 'employee';
        this.question1 = [
            {
                type: "input",
                message: "What is the employee's first name?",
                name: "firstName",
                validate: data => {
                    if (data.length < 2) {
                        return 'First name has to be at least 2 characters!'
                    } else {
                        return true;
                    }
                }
            },
            {
                type: "input",
                message: "What is the employee's last name?",
                name: "lastName",
                validate: data => {
                    if (data.length < 2) {
                        return 'Last name has to be at least 2 characters!'
                    } else {
                        return true;
                    }
                }
            },
            {
                type: "list",
                message: "What is the employee's role?",
                name: "employeeRole",
                choices: async () => {
                    const roles = await this.fetchRole();
                    return roles.map((role) => ({ name: role.title, value: role.id }));
                }
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "manager",
                choices: async () => {
                    const managers = await this.fetchEmployees();
                    return managers.map((manager) => ({ name: manager.first_name + ' ' + manager.last_name, value: manager.id }));
                }
            },
        ]

        this.question2 = [
            {
                type: "list",
                message: "Which employee's role do you want to update?",
                name: "employeeUpdate",
                choices: async () => {
                    const employees = await this.fetchEmployees();
                    return employees.map((employee) => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.id }))
                }
            },
            {
                type: "list",
                message: "Which role do you want to assign the selected employee?",
                name: "updateRole",
                choices: async () => {
                    const updateRole = await this.fetchRole();
                    return updateRole.map((role) => ({ name: role.title, value: role.id }))
                }
            }
        ]
    }

    async fetchRole() {
        await this.db.connect();
        const sql = 'SELECT * FROM role';
        const [results] = await this.db.query(sql);
        return results;
    }

    async fetchEmployees() {
        await this.db.connect();
        const sql = 'SELECT * FROM employee';
        const [results] = await this.db.query(sql);
        return results;
    }

    async viewAll() {
        const sql = `SELECT 
                        employee.id AS ID,
                        employee.first_name AS \`First Name\`, 
                        employee.last_name AS \`Last Name\`, 
                        role.title AS Title, 
                        role.salary AS Salary, 
                        department.name AS Department,
                        CONCAT(manager.first_name, ' ', manager.last_name) AS Manager
                    FROM employee 
                    JOIN role ON employee.role_id = role.id
                    LEFT JOIN department ON role.department_id = department.id
                    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
                    ORDER BY employee.id`
            ;
        await super.viewAll(sql, this.content);
    }

    async addNew() {
        const response = await inquirer.prompt(this.question1);
        const { firstName, lastName, employeeRole, manager } = response;

        const sql = `INSERT INTO ${this.content}
                        (first_name, last_name, role_id, manager_id)
                     VALUES (?, ?, ?, ?)`;
        await super.addNew(sql, [firstName, lastName, employeeRole, manager], this.content);

    }

    async update() {
        const response = await inquirer.prompt(this.question2);
        const { employeeUpdate, updateRole } = response;

        const sql = `UPDATE employee
                     SET role_id = ?
                     WHERE id = ?`;
        await super.update(sql, [updateRole, employeeUpdate], this.content);
    } 
}

module.exports = Employee;
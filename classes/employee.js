const Main = require('./main.js')
const inquirer = require('inquirer');
const stripAnsi = require('strip-ansi');

class Employee extends Main {
    constructor(db, run, choice) {
        super(db, run, choice);
        this.content = 'employee';
        
        const listSize = {
            type: "list",
            pageSize: 20,
        };

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
                ...listSize,
                message: "What is the employee's role?",
                name: "employeeRole",
                choices: async () => {
                    const roles = await super.fetch('role');
                    return roles.map((role) => ({ name: role.title, value: role.id }));
                }
            },
            {
                ...listSize,
                message: "Who is the employee's manager?",
                name: "manager",
                choices: async () => {
                    const managers = await super.fetch('employee');
                    const managerOptions = managers.map((manager) => ({ name: manager.first_name + ' ' + manager.last_name, value: manager.id }));
                    managerOptions.unshift({ name: 'None', value: null });
                    return managerOptions;
                },
            },
        ];

        this.question2 = [
            {
                ...listSize,
                message: "Which employee do you want to delete?",
                name: "deleteEmployee",
                choices: async () => {
                    const employees = await super.fetch('employee');
                    return employees.map((employee) => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.id }));
                },
            }
        ];

        this.question3 = [
            {
                ...listSize,
                message: "Which employee's role do you want to update?",
                name: "employeeUpdate",
                choices: async () => {
                    const employees = await super.fetch('employee');
                    return employees.map((employee) => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.id }))
                }
            },
            {
                ...listSize,
                message: "Which role do you want to assign the selected employee?",
                name: "updateRole",
                choices: async () => {
                    const updateRole = await super.fetch('role');
                    return updateRole.map((role) => ({ name: role.title, value: role.id }))
                }
            }
        ];

        this.question4 = [
            {
                ...listSize,
                message: "Which employee's manager do you want to update?",
                name: "employeeUpdate",
                choices: async () => {
                    const employees = await super.fetch('employee');
                    return employees.map((employee) => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.id }));
                }
            },
            {
                ...listSize,
                message: `Who will be the new manager?`,
                name: "updateManager",
                choices: async (answers) => {
                    const updateManager = await super.fetch('employee');
                    return updateManager
                        .filter(employee => employee.id !== answers.employeeUpdate)
                        .map((employee) => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.id }));
                }
            }
        ];
    }

    async viewAll() {
        const userChoice = stripAnsi(this.choice['main-menu']);
        if (userChoice == 'View All Employees') {
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
                    ORDER BY employee.id`;
            await super.viewAll(sql, this.content);
        }

        if (userChoice === 'View Employees by Manager') {
            const sql = `SELECT 
                            CONCAT(manager.first_name, ' ', manager.last_name) AS Manager,
                            role.title AS Title,
                            GROUP_CONCAT(' ', employee.first_name, ' ', employee.last_name) AS Employees,
                            department.name AS Department 
                        FROM employee AS manager
                        JOIN role ON manager.role_id = role.id
                        RIGHT JOIN employee ON manager.id = employee.manager_id
                        LEFT JOIN department ON role.department_id = department.id
                        WHERE manager.manager_id IS NOT NULL
                        GROUP BY manager.id`;
            await super.viewAll(sql, this.content);
        }

        if (userChoice === 'View Employees by Department') {
            const sql = `SELECT 
                            department.name AS Department,
                            GROUP_CONCAT(' ', employee.first_name, ' ', employee.last_name) AS Employees
                        FROM department
                        JOIN role ON role.department_id = department.id
                        JOIN employee ON employee.role_id = role.id
                        GROUP BY department.id`;
            await super.viewAll(sql, this.content);
        }
    }

    async addNew() {
        const response = await inquirer.prompt(this.question1);
        const { firstName, lastName, employeeRole, manager } = response;

        const sql = `INSERT INTO ${this.content}
                        (first_name, last_name, role_id, manager_id)
                     VALUES (?, ?, ?, ?)`;
        await super.addNew(sql, [firstName, lastName, employeeRole, manager], this.content);

    }

    async delete() {
        const response = await inquirer.prompt(this.question2);
        const deleteEmployee = response['deleteEmployee'];
        console.log('employee: ' + deleteEmployee);
        const sql = `DELETE FROM ${this.content} WHERE id = ?`
        await super.delete(sql, [deleteEmployee], this.content);
    }

    async update() {
        const userChoice = stripAnsi(this.choice['main-menu']);
        if (userChoice === 'Update Employee Role') {
            const response = await inquirer.prompt(this.question3);
            const { employeeUpdate, updateRole } = response;

            const sql = `UPDATE employee
                         SET role_id = ?
                         WHERE id = ?`;
            await super.update(sql, [updateRole, employeeUpdate], this.content);
        }
        if (userChoice === 'Update Employee Manager') {
            const response = await inquirer.prompt(this.question4);
            const { employeeUpdate, updateManager } = response;

            const sql = `UPDATE employee
                         SET manager_id = ?
                         WHERE id = ?`;
            await super.update(sql, [updateManager, employeeUpdate], this.content);
        }
    }
}

module.exports = Employee;
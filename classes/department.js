// Importing helpers and libraries
const Main = require('./main.js')
const inquirer = require('inquirer');
const chalk = require('chalk');

class Department extends Main {
    constructor(db, run) {
        super(db, run);
        this.content = 'department';

        // Define common properties for list-based questions
        const listSize = {
            type: "list",
            pageSize: 20,
        };

        // Questions for adding a new department
        this.question1 = [
            {
                type: "input",
                message: "What is the name of the new department?",
                name: "newDept",
            }
        ];

        // Questions for deleting a department
        this.question2 = [
            {
                ...listSize,
                message: "Which department do you want to delete?",
                name: "deleteDept",
                choices: async () => {
                    const depts = await super.fetch('department');
                    return depts.map((dept) => ({ name: dept.name, value: dept.id }));
                },
            }
        ];

        // Questions for viewing total budget of a department
        this.question3 = [
            {
                ...listSize,
                message: "Select the department to view its total budget?",
                name: "deptBudget",
                choices: async () => {
                    const depts = await super.fetch('department');
                    return depts.map((dept) => ({ name: dept.name, value: dept.id }));
                },
            }
        ];
    }

    // View all departments
    async viewAll() {
        const sql = `SELECT id AS 'No.', name AS 'Department' FROM ${this.content}`;
        await super.viewAll(sql, this.content);
    }

    // Add a new department
    async addNew() {
        const response = await inquirer.prompt(this.question1);
        const departmentName = response['newDept'];
        const sql = `INSERT INTO ${this.content} (name) VALUES (?)`;
        await super.addNew(sql, [departmentName], this.content);
    }

    // Delete a department
    async delete() {
        const response = await inquirer.prompt(this.question2);
        const deleteDept = response['deleteDept'];
        const sql = `DELETE FROM ${this.content} WHERE id = ?`
        await super.delete(sql, [deleteDept], this.content);
    }

    // View total budget of a department
    async budget() {
        const response = await inquirer.prompt(this.question3);
        const deptBudget = response['deptBudget'];
        const sql = `SELECT
                        department.id AS ID,
                        department.name AS Department,
                        SUM(role.salary) AS \`Total Budget\`
                     FROM department 
                     JOIN role
                     ON role.department_id = department.id
                     JOIN employee
                     ON employee.role_id = role.id
                     WHERE department.id = ?
                     GROUP BY
                        department.id, department.name`;
        try {
            await this.db.connect();
            const [results] = await this.db.query(sql, [deptBudget]);
            console.log(chalk.bgMagenta.white(`\n 💲 Department Total Budget: \n`));
            console.table(results);
            await this.run();
        } catch (error) {
            console.log(chalk.bgYellow(` ❌ Error accessing the ${this.content} database: `, error.message));
        }
    }
}

// Export the Department class for external use
module.exports = Department;

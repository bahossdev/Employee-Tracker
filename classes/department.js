const Main = require('./main.js')
const inquirer = require('inquirer');


class Department extends Main {
    constructor(db, run) {
        super(db, run);
        this.content = 'department';
        this.question1 = [
            {
                type: "input",
                message: "What is the name of the department?",
                name: "newDept",
            }
        ];
        this.question2 = [
            {
                type: "list",
                message: "Which department do you want to delete?",
                name: "deleteDept",
                choices: async () => {
                    const depts = await super.fetch('department');
                    return depts.map((dept) => ({ name: dept.name, value: dept.id }));
                },
            }
        ];
    }

    async viewAll() {
        const sql = `SELECT id AS 'No.', name AS 'Department' FROM ${this.content}`;
        await super.viewAll(sql, this.content);
    }

    async addNew() {
        const response = await inquirer.prompt(this.question1);

        const departmentName = response['newDept'];
        const sql = `INSERT INTO ${this.content} (name) VALUES (?)`;
        await super.addNew(sql, [departmentName], this.content);
    }

    async delete() {
        const response = await inquirer.prompt(this.question2);
        const deleteDept = response['deleteDept'];
        // console.log('dept:' + deleteDept);
        const sql = `DELETE FROM ${this.content} WHERE id = ?`
        await super.delete(sql, [deleteDept], this.content);
    }
}
module.exports = Department;
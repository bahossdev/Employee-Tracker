const Main = require('./main.js')
const inquirer = require('inquirer');


class Department extends Main {
    constructor(db, run) {
        super(db, run);
        this.content = 'department';
        this.question = [
            {
                type: "input",
                message: "What is the name of the department?",
                name: "newDept",
            }
        ];
    }

    async viewAll() {
        const sql = `SELECT id AS 'No.', name AS 'Department' FROM ${this.content}`;
        await super.viewAll(sql, this.content);
    }

    async addNew() {
        const response = await inquirer.prompt(this.question);

        const departmentName = response['newDept'];
        const sql = `INSERT INTO ${this.content} (name) VALUES (?)`;
        await super.addNew(sql, [departmentName], this.content);
    }
}
module.exports = Department;
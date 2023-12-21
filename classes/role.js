const Main = require('./main.js')
const inquirer = require('inquirer');


class Role extends Main {
    constructor(db) {
        super(db);
        this.content = 'role';
        this.question = [
            {
                type: "input",
                message: "What is the name of the role?",
                name: "newRole",
            },
            {
                type: "input",
                message: "What is the salary of the role?",
                name: "newSalary",
                when: (answer) => answer.newRole,
            },
            {
                type: "list",
                message: "Which department does the role belong to?",
                name: "choose-dept",
                choices: async () => {
                    const departmentNames = await this.fetchDeptNames();
                    return departmentNames.map((dept) => dept.name);
                },
                when: (answer) => answer.newSalary,
            },
        ]
    }

    async fetchDeptNames() {
        await this.db.connect();
        const sql = `SELECT id, name FROM department`;
        const [results] = await this.db.query(sql);
        return results;
    }

    async viewAll() {
        const sql = `SELECT role.title, role.salary, department.name AS Department
        FROM role JOIN department 
        ON role.department_id = department.id`;
        await super.viewAll(sql, this.content);
    }

    async addNew() {
        const response = await inquirer.prompt(this.question)
        console.log('response = ', response);
        const roleName = response['newRole'];
        const newSalary = response['newSalary'];
        const selectedDeptName = response['choose-dept'];
        try {
            if (!selectedDeptName) {
                console.log('A department should be selected.')
            }
            const departmentNames = await this.fetchDeptNames();
            const selectedDept = departmentNames.find(dept => dept.name === selectedDeptName);
            const sql = `INSERT INTO ${this.content} (title, salary, department_id) VALUES (?, ?, ?)`;
            await super.addNew(sql, [roleName, newSalary, selectedDept.id], this.content);
        } catch (error) {
            console.error('Error adding new role:', error.message);
        }
    }
}
module.exports = Role;
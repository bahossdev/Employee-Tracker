const Main = require('./main.js')
const inquirer = require('inquirer');


class Role extends Main {
    constructor(db, run) {
        super(db, run);
        this.content = 'role';
        this.question = [
            {
                type: "input",
                message: "What is the name of the role?",
                name: "newRole",
                validate: data => {
                    if (data.length < 2) {
                        return 'Role name has to be at least 2 characters!'
                    } else {
                        return true;
                    }
                }
            },
            {
                type: "input",
                message: "What is the salary of the role?",
                name: "newSalary",
                validate: data => {
                    if (data < 60000) {
                        return 'Minimum salary is $60,000!!'
                    } else {
                        return true;
                    }
                }
            },
            {
                type: "list",
                message: "Which department does the role belong to?",
                name: "selectedDept",
                choices: async () => {
                    const depts = await this.fetchDeptNames();
                    return depts.map((dept) => ({name: dept.name, value: dept.id}));
                },
            },
        ]
    }

    async fetchDeptNames() {
        await this.db.connect();
        const sql = `SELECT * FROM department`;
        const [results] = await this.db.query(sql);
        return results;
    }

    async viewAll() {
        const sql = `SELECT 
                        role.id AS ID, 
                        role.title AS Title, 
                        role.salary AS Salary, 
                        department.name AS Department
                     FROM role 
                     JOIN department 
                     ON role.department_id = department.id
                     ORDER BY role.id`;
        await super.viewAll(sql, this.content);
    }

    async addNew() {
        const response = await inquirer.prompt(this.question)
        const { newRole, newSalary, selectedDept } = response;

        try {
            const sql = `INSERT INTO ${this.content}
                             (title, salary, department_id) 
                         VALUES (?, ?, ?)`;
            await super.addNew(sql, [newRole, newSalary, selectedDept], this.content);
        } catch (error) {
            console.error('Error adding new role:', error.message);
        }
    }
}
module.exports = Role;
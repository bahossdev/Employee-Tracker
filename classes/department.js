const Database = require('../lib/db.js');
const inquirer = require('inquirer');

class Department {
    constructor() {
        this.db = new Database;
        this.question = [
            {
                type: "input",
                message: "What is the name of the department?",
                name: "new-dept",
            }
        ]
    }
    

}

module.exports = Department;
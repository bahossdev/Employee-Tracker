const Database = require('../lib/db.js');
// const CLI = require('../lib/cli.js');
const inquirer = require('inquirer');

class Main {
    constructor() {
        this.db = new Database();
        // this.cli = new CLI();
        this.question = [
            {
                type: 'list',
                message: 'What would you like to do next?',
                name: 'next',
                choices: ['Back to the Main Menu', 'Quit']
            }
        ]
    }
    // async next() {
    //     try {
    //         const response = await inquirer.prompt(this.question);
    //         if (response.next == 'Back to the Main Menu') {
    //             await this.cli.run();
    //         } else {
    //             this.db.endConnection();
    //         }
    //     } catch (error) {
    //         console.error('Error:', error.message);
    //     }
    // }
    async viewAll(sql, content) {
        try {
            await this.db.connect();
            const [results, fields] = await this.db.query(sql);
            console.log(`All ${content}s:`);
            console.table(results);
            // await this.next();
        } catch (error) {
            console.log(`Error accessing the ${content} database: `, error.message);
        }
    }

    async addNew(sql, values, content) {

        try {
            await this.db.query(sql, values);
            console.log(`New ${content} added successfully!`);
            // await this.next();
        } catch (error) {
            console.log(`Error adding new ${content}: `, error.message);
        }
    }
}

module.exports = Main;
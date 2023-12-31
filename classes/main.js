// Importing helpers and libraries
const chalk = require('chalk');

class Main {
    constructor(db, run, choice) {
        this.db = db;
        this.run = run;
        this.choice = choice;
    }

    // Capitalize the first letter of a string
    cap(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Fetch all records from a table
    async fetch(content) {
        await this.db.connect();
        const sql = `SELECT * FROM ${content}`;
        const [results] = await this.db.query(sql);
        return results;
    }

    // View all records of a table
    async viewAll(sql, content) {
        try {
            await this.db.connect();
            const [results] = await this.db.query(sql);
            console.log(chalk.bgGreen.white(`\n 📋 All ${this.cap(content)}s: \n`));
            console.table(results);
            await this.run();
        } catch (error) {
            console.log(chalk.bgYellow(` ❌ Error accessing the ${content} database: `, error.message));
        }
    }

    // Add a new record to a table
    async addNew(sql, values, content) {
        try {
            await this.db.query(sql, values);
            console.log(chalk.bgCyan.white(`\n New ${content} added successfully! 🙂 \n`));
            await this.run();
        } catch (error) {
            console.log(chalk.bgYellow(` ❌ Error adding new ${content}: `, error.message));
        }
    }

    // Delete a record from a table
    async delete(sql, values, content) {
        try {
            await this.db.query(sql, values);
            console.log(chalk.bgRed.white(`\n Selected ${content} was deleted successfully! ✔️ \n`));
            await this.run();
        } catch (error) {
            console.log(chalk.bgYellow(` ❌ Error deleting ${content}: `, error.message));
        }
    }

    // Update a record in a table
    async update(sql, values, content) {
        try {
            await this.db.query(sql, values);
            console.log(chalk.bgYellow(`\n ${this.cap(content)} updated successfully! ✅ \n`));
            await this.run();
        } catch (error) {
            console.log(chalk.bgYellow(` ❌ Error updating ${content}: `, error.message));
        }
    }
}

// Export the Main class for external use
module.exports = Main;

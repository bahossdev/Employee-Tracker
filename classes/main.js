const chalk = require('chalk');

class Main {
    constructor(db, run, choice) {
        this.db = db;
        this.run = run;
        this.choice = choice;
    }

    cap(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async fetch(content) {
        await this.db.connect();
        const sql = `SELECT * FROM ${content}`;
        const [results] = await this.db.query(sql);
        return results;
    }

    async viewAll(sql, content) {
        try {
            await this.db.connect();
            const [results] = await this.db.query(sql);
            console.log(chalk.bgGreen.white(`\n All ${this.cap(content)}s: `));
            console.table(results);
            await this.run();
        } catch (error) {
            console.log(chalk.bgYellow(` ❌ Error accessing the ${content} database: `, error.message));
        }
    }

    async addNew(sql, values, content) {
        try {
            await this.db.query(sql, values);
            console.log(chalk.bgCyan.white(`\n New ${content} added successfully! 🙂 \n`));
            await this.run();
        } catch (error) {
            console.log(chalk.bgYellow(` ❌ Error adding new ${content}: `, error.message));
        }
    }

    async delete(sql, values, content) {
        try {
            await this.db.query(sql, values);
            console.log(chalk.bgRed.white(`\n Selected ${content} was deleted successfully! ✔️ \n`));
            await this.run();
        } catch (error) {
            console.log(chalk.bgYellow(` ❌ Error deleting ${content}: `, error.message));
        }
    }
    
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

module.exports = Main;
class Main {
    constructor(db, run, choice) {
        this.db = db;
        this.run = run;
        this.choice = choice;
    }

    async fetch(content) {
        await this.db.connect();
        const sql = `SELECT * FROM ${content}`;
        const [results] = await this.db.query(sql);
        return results;
    }

    async viewAll(sql, content) {
        try {
            // console.log('choice; ' + this.choice);
            await this.db.connect();
            const [results] = await this.db.query(sql);
            console.log(`All ${content}s:`);
            console.table(results);
            await this.run();
        } catch (error) {
            console.log(`Error accessing the ${content} database: `, error.message);
        }
    }

    async addNew(sql, values, content) {
        try {
            await this.db.query(sql, values);
            console.log(`New ${content} added successfully!`);
            await this.run();
        } catch (error) {
            console.log(`Error adding new ${content}: `, error.message);
        }
    }

    async delete(sql, values, content) {
        try {
            await this.db.query(sql, values);
            console.log(`Selected ${content} was deleted successfully!`);
            await this.run();
        } catch (error) {
            console.log(`Error deleting ${content}: `, error.message);
        }
    }
    async update(sql, values, content) {
        try {
            await this.db.query(sql, values);
            console.log(`${content} update was successful!`);
            await this.run();
        } catch (error) {
            console.log(`Error updating ${content}: `, error.message);
        }
    }
}

module.exports = Main;
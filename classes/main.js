class Main {
    constructor(db, run) {
        this.db = db;
        this.run = run;
    }

    async viewAll(sql, content) {
        try {
            await this.db.connect();
            const [results, fields] = await this.db.query(sql);
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
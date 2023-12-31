//Importing helpers and libraries
const mysql = require('mysql2/promise');
const chalk = require('chalk');

class Database {
    constructor() {
        this.connection = null;
    }

    // Establish a connection to the database
    async connect() {
        this.connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'pass',
            database: 'manager_db',
        });
    }

    // Execute a SQL query on the connected database
    async query(sql, values) {
        if (!this.connection) {
            throw new Error(chalk.bgYellow(' ❌ Not connected to the database.  '));
        }

        return this.connection.execute(sql, values)
            .then(([results, fields]) => [results, fields])
            .catch(error => {
                throw error;
            });
    }

    // End the database connection and exit the application
    async endConnection() {
        this.connection.end();
        console.log(chalk.bgBlue.white(`  Goodbye!👋  `));
        process.exit();
    }
}

module.exports = Database;

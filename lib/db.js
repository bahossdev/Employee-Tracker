const mysql = require('mysql2/promise');
const chalk = require('chalk');

class Database {
    constructor() {
        this.connection = null;
    }

    async connect() {
        this.connection = await mysql.createConnection(
            {
                host: 'localhost',
                user: 'root',
                password: 'pass',
                database: 'manager_db',
            },
        )
    }
    
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
    
    async endConnection() {
        this.connection.end();
        console.log(chalk.bgBlue.white(`  Goodbye!👋  `));
        process.exit();
    }
}

module.exports = Database;
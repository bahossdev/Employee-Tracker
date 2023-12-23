const mysql = require('mysql2/promise');

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
            console.log('Connected to the manager_db database.')
        )
    }
    async query(sql, values) {
        if (!this.connection) {
            throw new Error('Not connected to the database');
        }

        return this.connection.execute(sql, values)
            .then(([results, fields]) => [results, fields])
            .catch(error => {
                throw error;
            });
    } async endConnection() {
        this.connection.end();
        console.log('Goodbye!');
        process.exit();
    }
}

module.exports = Database;
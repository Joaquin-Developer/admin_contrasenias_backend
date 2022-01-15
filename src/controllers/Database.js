const mysql = require("mysql")
const config = require("../environments/environment")


class Database {

    static getConnection() {
        return mysql.createConnection({
            host: (config['in_production']) ? process.env.HOST : config.database.HOST,
            user: (config['in_production']) ? process.env.USER : config.database.USER,
            password: (config['in_production']) ? process.env.PASSWORD : config.database.PASSWORD,
            database: (config['in_production']) ? process.env.NAME : config.database.NAME
        });
    }

    static connect() {
        this.getConnection().connect((error) => {
            if (error) return error
            console.log("MySQL Database connected!")
        })
    }

    static disconnect() {
        this.getConnection().end((error) => {
            if (error) return error
            console.log("DB connection end")
        })
    }
}

module.exports = Database

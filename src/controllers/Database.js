const mysql = require("mysql")
const config = require("../environments/environment")


class Database {

    static getConnection() {
        return mysql.createConnection({
            host: (config['IN_PRODUCTION']) ? process.env.HOST : config.DEVELOPMENT_DATABASE.HOST,
            user: (config['IN_PRODUCTION']) ? process.env.USER : config.DEVELOPMENT_DATABASE.USER,
            password: (config['IN_PRODUCTION']) ? process.env.PASSWORD : config.DEVELOPMENT_DATABASE.PASSWORD,
            database: (config['IN_PRODUCTION']) ? process.env.NAME : config.DEVELOPMENT_DATABASE.NAME
        })
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

// connect()

module.exports = Database

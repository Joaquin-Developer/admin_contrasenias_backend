const mysql = require("mysql")
const config = require("../environments/environment")
const mysql2 = require("mysql2/promise")


class Database {

    static async getMySql2Connection() {
        if (config["IN_PRODUCTION"]) {
            if (config["PRODUCTION_DATABASE"]) {
                return mysql2.createConnection({
                    host: config.PRODUCTION_DATABASE.HOST,
                    user: config.PRODUCTION_DATABASE.USER,
                    password: config.PRODUCTION_DATABASE.PASSWORD,
                    database: config.PRODUCTION_DATABASE.NAME
                })
            }
            return mysql2.createConnection({
                host: process.env.HOST,
                user: process.env.USER,
                password: process.env.PASSWORD,
                database: process.env.NAME
            })
        }

        return mysql2.createConnection({
            host: config.DEVELOPMENT_DATABASE.HOST,
            user: config.DEVELOPMENT_DATABASE.USER,
            password: config.DEVELOPMENT_DATABASE.PASSWORD,
            database: config.DEVELOPMENT_DATABASE.NAME
        })
    }

    static getConnection() {
        if (config["IN_PRODUCTION"]) {
            if (config["PRODUCTION_DATABASE"]) {
                return mysql.createConnection({
                    host: config.PRODUCTION_DATABASE.HOST,
                    user: config.PRODUCTION_DATABASE.USER,
                    password: config.PRODUCTION_DATABASE.PASSWORD,
                    database: config.PRODUCTION_DATABASE.NAME
                })
            }
            return mysql.createConnection({
                host: process.env.HOST,
                user: process.env.USER,
                password: process.env.PASSWORD,
                database: process.env.NAME
            })
        }

        return mysql.createConnection({
            host: config.DEVELOPMENT_DATABASE.HOST,
            user: config.DEVELOPMENT_DATABASE.USER,
            password: config.DEVELOPMENT_DATABASE.PASSWORD,
            database: config.DEVELOPMENT_DATABASE.NAME
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

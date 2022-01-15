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

    public static connect(): void {
        this.getConnection().connect((error: any) => {
            if (error) return error
            console.log("MySQL Database connected!")
        })
    }

    public static disconnect(): void {
        this.getConnection().end((error: any) => {
            if (error) return error
            console.log("DB connection end")
        })
    }
}

export default Database
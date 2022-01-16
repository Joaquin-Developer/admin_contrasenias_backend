const Database = require("./Database")

module.exports = class Query {

    constructor(query = "") {
        this.query = query
    }

    select(queryParams) {
        const promise = new Promise((resolve, reject) => {
            Database.getConnection().query(this.query, queryParams, (error, rows) => {
                if (error) return reject(error)
                return resolve(JSON.stringify(rows))
            })
        })
        // disconnect()
        return promise
    }

    genericSelect(tablename) {
        const sql = `SELECT * FROM ?`

        return new Promise((resolve, reject) => {
            Database.getConnection().query(sql, [tablename], (error, rows, fields) => {
                if (error) return reject(error)
                return resolve(JSON.stringify(rows))
            })
        })
        // disconnect()
        // return promise
    }

    insert(queryParams) {
        return new Promise((resolve, reject) => {
            Database.getConnection().query(this.query, queryParams, (error, result) => {
                if (error) return reject(error)
                return resolve(JSON.stringify(result))
            })
        })
    }

    genericInsert() {
        // seguir...
        return new Promise((resolve, reject) => null)
    }

    genericUpdate(values, tableName) {
        let stringValues = ""

        for (let value of values) {
            stringValues += ` ${value.row} = `

            if (value.typeData === "string" || value.typeData === "date") {
                stringValues += `'${value.value}',`
            } else {
                stringValues += `${value.value},`
            }
        }
        // remove last char (coma: ,)
        stringValues = stringValues.slice(0, -1)

        this.query = `
            UPDATE ${tableName}
            SET ${stringValues}
        `

        return new Promise((resolve, reject) => {

            Database.getConnection().query(this.query, (error, rows, fields) => {
                if (error) return reject(error)
                return resolve(rows)
            })
        })
    }

}
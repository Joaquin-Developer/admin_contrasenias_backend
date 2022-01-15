const Database = require("./Database")

module.exports = class Query {

    constructor(query = "") {
        this.query = query
    }

    genericSelect() {

        const promise = new Promise((resolve, reject) => {
            Database.getConnection().query(this.query, (error, rows, fields) => {
                if (error) return reject(error)
                return resolve(JSON.stringify(rows))
            })
        })
        // disconnect()
        return promise
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
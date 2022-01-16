const Database = require("./Database")
const mysql2 = require("mysql2/promise")

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

        //TODO Inseguro ante inyecciones Sql -> cambiar esto!
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

    /**
     * custom queries:
     */

    static async insertPasswRegister(idUser, siteName, siteUsername, siteMail, encryptedPassw) {

        const connection = await Database.getMySql2Connection()
        await connection.beginTransaction()

        try {

            await connection.execute("INSERT INTO PASSW_ENCRYPTED VALUES(null, ?)", [encryptedPassw])

            const select = await connection.execute(`
                SELECT id_passw_encrypted FROM PASSW_ENCRYPTED
                WHERE encrypted_passw = ?
            `, [encryptedPassw])

            const passwIdInserted = await select[0][0]["id_passw_encrypted"]

            const params = [idUser, siteName, siteUsername, siteMail, passwIdInserted]
            console.log(params)

            await connection.execute(`INSERT INTO PASSW_RECORDS VALUES(null, ?, ?, ?, ?, ${passwIdInserted})`,
                [idUser, siteName, siteUsername, siteMail]
            )

            // if not problems:
            await connection.commit()
            return { error: false, message: "OK" }

        } catch (error) {
            console.log(error)
            await connection.rollback()
            return { error: true, message: "Internal server error - Data not inserted" }
        }

    }

}
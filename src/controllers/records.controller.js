const Query = require("./Query")

class Records {

    /**
     * A partir de una key, obtiene la contraseña encriptada
     */
    static getEncryptedPassw(req, res) {
        let { idEncrypted } = req.query

        if (!idEncrypted) {
            res.status(500).json({ error: true, message: "Missing 'idEncrypted' param." })
            return
        } else if (isNaN(Number(idEncrypted))) {
            res.status(500).json({ error: true, message: "Invalid data in param request: 'idEncrypt is not valid'" })
            return
        }

        const QUERY = `
            SELECT 
                pe.id_passw_encrypted,
                pe.encrypted_passw
            FROM passw_encrypted pe
            WHERE pe.id_passw_encrypted = ?
        `
        console.log(idEncrypted)

        new Query(QUERY).select(idEncrypted)
            .then(data => {
                // console.log(data)
                res.status(200).json(JSON.parse(data))
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({ error: true, message: "Internal server error" })
            })
    }

    /**
     * obtiene los registros de contrasenias de un usuario
     * no obtiene la contraseña en sí, solo los registros 
     * de contraseñas existentes en la BD
     */
    static getAllPasswordsRecordsByUser(req, res) {
        let { idUser, username } = req.query
        username = String(username)

        if (idUser) {
            idUser = parseInt(idUser)
        } else {
            idUser = -1
        }

        const QUERY = `
            SELECT 
                au.username,
                pr.site_name,
                pr.site_username,
                pr.site_mail,
                pr.id_passw_encrypted
            FROM 
                PASSW_RECORDS pr
                JOIN ALL_USERS au ON pr.id_username = au.id_user
            WHERE
                au.username = '${username}' OR au.id_user = ${idUser}
        `

        new Query(QUERY).select()
            .then(data => {
                // console.log(data)
                res.status(200).json(JSON.parse(data))
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({ error: true, message: "Internal server error" })
            })
    }

    static async new(req, res) {
        const { idUser, siteName, siteUsername, siteMail, encryptedPassw } = req.body

        if (idUser && siteName && siteUsername && siteMail && encryptedPassw) {
            const data = await Query.insertPasswRegister(idUser, siteName, siteUsername, siteMail, encryptedPassw)

            const status = data.error ? 500 : 200
            res.status(status).json(data)

        } else {
            res.status(500).json({ error: true, message: "Missing params in Body Request" })
        }

    }

    static async update(req, res) {
        const { idUser, siteName, siteUsername, siteMail, encryptedPassw } = req.body

        if (idUser && siteName && siteUsername && siteMail && encryptedPassw) {

            const data = await Query.updatePasswRegister(idUser, siteName, siteUsername, siteMail, encryptedPassw)

            const status = data.error ? 500 : 200
            res.status(status).json(data)

        } else {
            res.status(500).json({ error: true, message: "Missing params in Body Request" })
        }
    }

    static delete() {

    }

}


module.exports = Records

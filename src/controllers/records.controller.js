const Query = require("./Query")

class Records {


    /**
     * A partir de una key, obtiene la contraseña encriptada
     */
    static getEncryptedPassw() {

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
                JOIN ALL_USERS au ON pr.id_user = au.id_user
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

    static new() {

    }

    static update() {

    }

    static delete() {

    }

}


module.exports = Records

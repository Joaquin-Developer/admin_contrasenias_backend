const Database = require("./Database")
const Query = require("./Query")



module.exports = class UsersController {

    static getAllUsers(req, res) {

        new Query("SELECT u.id_user, u.username FROM ALL_USERS u").select()
            .then(data => {
                res.status(200).json(JSON.parse(data))
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({ error: true, message: "Internal server error" })
            })
    }

    static new(req, res) {
        let { username, password } = req.body
        /* TODO: Implementar tratado de contraseñas */
        password = "key"

        if (!username) {
            res.status(500).json({ error: true, message: "Missing username param in Body Request" })
            return
        }

        new Query("INSERT INTO ALL_USERS VALUES(null, ?, ?)").insert([username, password])
            .then(data => {
                console.log("data", data)
                res.status(200).json({ error: false, message: "User added!" })
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({ error: true, message: "Internal server error" })
            })
    }

    static update() {

    }

    static delete() {

    }


}
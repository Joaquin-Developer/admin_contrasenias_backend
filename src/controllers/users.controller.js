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

    static new() {

    }

    static update() {

    }

    static delete() {

    }


}
const express = require("express")
const RecordsController = require("../controllers/records.controller")
const UsersController = require("../controllers/users.controller")

const router = express.Router()

router.get("/getAllUsers", UsersController.getAllUsers)
router.get("/getEncryptedPassw", RecordsController.getEncryptedPassw)
router.get("/getAllPasswordsRecordsByUser", RecordsController.getAllPasswordsRecordsByUser)

router.post("/insertUser", UsersController.new)
router.post("/insertPasswRecord", RecordsController.new)

router.post("/updateUser", UsersController.update)
router.post("/updatePasswRecord", RecordsController.update)

router.delete("/deleteUser", UsersController.delete)
router.delete("/deletePasswRecord", RecordsController.delete)

module.exports = router

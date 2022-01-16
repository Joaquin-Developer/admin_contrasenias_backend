const express = require("express")
const RecordsController = require("../controllers/records.controller")
const UsersController = require("../controllers/users.controller")

const router = express.Router()

router.get("/getAllUsers", UsersController.getAllUsers)
router.get("/getEncryptedPassw", RecordsController.getEncryptedPassw)
router.get("/getAllPasswordsRecordsByUser", RecordsController.getAllPasswordsRecordsByUser)

router.post("/insertUser", UsersController.new)
router.post("/newPasswRecord", RecordsController.new)

router.post("/updatePasswRecord", RecordsController.update)
router.post("/updateUser", UsersController.update)

router.delete("/deletePasswRecord", RecordsController.delete)
router.delete("/deleteUser", UsersController.delete)

module.exports = router

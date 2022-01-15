const express = require("express")
const router = express.Router()
const CryptoController = require("../controllers/Crypto")

/**
 * 
 * contraseña => JSON con campos
 * 
 * - Guardar JSON
 *      - json (a encriptar y guardar)
 *      - key (para encriptar)
 *      - Se guarda en un archivo (o en una BD)
 *        
 * - Obtener json
 *      - key
 * 
 * - Modificar JSON
 *      - key
 */


router.get("/encrypt", (req, res) => {
    const { key, text } = req.body
    if (key && text) {
        let encryptedText = CryptoController.encrypt(text, key)
        console.log("texto encriptado:", encryptedText)
        res.status(200).json({ text: "texto encryptado!" })
    } else {
        res.status(500).json({ error: true, text: "faltan datos" })
    }
})


router.get("/decrypt", (req, res) => {
    const { key, text } = req.body
    if (key && text) {
        let encryptedText = CryptoController.encrypt(text, key)
        console.log("texto encriptado:", encryptedText)
        res.status(200).json({ text: "texto encryptado!" })
    } else {
        res.status(500).json({ error: true, text: "faltan datos" })
    }
})

module.exports = router

/**
 * Esto no se usa
 * Se va a implementar del lado del cliente
 * En la app movil con ionic/angular
 */




const Crypto = require("crypto-js")

module.exports = class CryptoController {

    static encrypt = (textPlain, key) => {
        return Crypto.AES.encrypt(textPlain, key).toString()
    }

    static decrypt = (ciphertext, key) => {
        let bytes = Crypto.AES.decrypt(ciphertext, key)
        return bytes.toString(Crypto.enc.Utf8)
    }

}
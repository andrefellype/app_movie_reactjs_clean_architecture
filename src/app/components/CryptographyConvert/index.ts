import { decode, encode } from "base-64"
import md5 from "md5"

function convertMd5(value) {
    return md5(value)
}

function convertBase64(value: string, type: string) {
    if (type === "encode") {
        return encode(value)
    }
    if (type === "decode") {
        return decode(value)
    }
    return null
}

function CryptographyConvert(cryptography: string, valueSTR: string, actionCryptography: string) {
    if (cryptography === "base64") {
        return convertBase64(valueSTR, actionCryptography)
    }
    if (cryptography === "md5") {
        return convertMd5(valueSTR)
    }
    return valueSTR
}

export default CryptographyConvert
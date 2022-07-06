import { decode, encode } from "base-64"

function CryptographyConvertBase64(value: string, actionCryptography: string) {
    if (actionCryptography === "encode") {
        return encode(value)
    }
    if (actionCryptography === "decode") {
        return decode(value)
    }
    return value
}

export default CryptographyConvertBase64
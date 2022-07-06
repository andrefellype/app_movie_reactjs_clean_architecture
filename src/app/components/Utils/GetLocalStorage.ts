/* eslint-disable @typescript-eslint/no-explicit-any */
import CryptographyConvertBase64 from "../CryptographyConvert/CryptographyConvertBase64"

const GetLocalStorage = function (nameLocalStorage) {
    let dataLocal: any = localStorage.getItem(nameLocalStorage)
    if (dataLocal !== null) {
        dataLocal = CryptographyConvertBase64(dataLocal, "decode")
    }
    return dataLocal
}

export default GetLocalStorage
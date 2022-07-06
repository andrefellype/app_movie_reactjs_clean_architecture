/* eslint-disable @typescript-eslint/no-explicit-any */
import CryptographyConvertBase64 from "../CryptographyConvert/CryptographyConvertBase64"

const SetLocalStorage = function (nameLocalStorage, value: any) {
    localStorage.setItem(nameLocalStorage, CryptographyConvertBase64(value, "encode"))
}

export default SetLocalStorage
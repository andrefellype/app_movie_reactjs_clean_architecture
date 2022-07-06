/* eslint-disable no-param-reassign */

import CryptographyConvertBase64 from "../CryptographyConvert/CryptographyConvertBase64"

const UpdateHeaderToken = function (nameLocalStorage, api) {
    const token = localStorage.getItem(nameLocalStorage)
    if (token !== null)
        api.defaults.headers['x-access-token'] = token !== null ? CryptographyConvertBase64(token, "decode") : token
}

export default UpdateHeaderToken
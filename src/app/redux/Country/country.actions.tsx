import CryptographyConvert from "../../components/CryptographyConvert"
import api from "../../core/api"
import { COUNTRY_LIST_FILTER_REDUCER, COUNTRY_LIST_REDUCER, COUNTRY_SINGLE_REDUCER, TOKEN_LOCAL_STORAGE } from "../../core/consts"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deleteSeveralCountry = (_ids: string[], callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("country/delete/several", { _ids: JSON.stringify(_ids) }).then(response => {
        if (response.data.status) {
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deleteCountry = (countryIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("country/delete", { countryId: countryIdValue }).then(response => {
        if (response.data.status) {
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const approvedReviewedCountry = (countryIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("country/approved/reviewed", { countryId: countryIdValue }).then(response => {
        if (response.data.status) {
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const updateCountry = (countryIdValue: string, nameValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const objectData = { countryId: countryIdValue, name: nameValue }
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers['x-access-token'] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("country/update", objectData).then(response => {
        if (response.data.status) {
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

export const openCountryById = (countryIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("country/open", { countryId: countryIdValue }).then(response => {
        if (response.data.status) {
            const dataApi = response.data.data
            dispatch({ type: COUNTRY_SINGLE_REDUCER, countrySingle: dataApi })
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const registerCountry = (nameValue: string, reviewedStatus: number, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const objectData = { name: nameValue, reviewed: reviewedStatus }
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("country/register", objectData).then(response => {
        if (response.data.status) {
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

function orderCountriesByName(countries) {
    return countries.sort((countryA, countryB) => {
        if (countryA.name.toLowerCase() > countryB.name.toLowerCase()) {
            return 1
        }
        if (countryA.name.toLowerCase() < countryB.name.toLowerCase()) {
            return -1
        }
        return 0
    })
}

function searchCountries(countries, search: string) {
    return countries.filter(country => country.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
}

export const getCountryAllBySearch = (searchValue: string, countriesGeneral: []) => async dispatch => {
    let countriesValue = searchCountries(countriesGeneral, searchValue)
    countriesValue = orderCountriesByName(countriesValue)
    dispatch({ type: COUNTRY_LIST_FILTER_REDUCER, countries: countriesValue })
}

export const getCountryAll = (callbackSuccess: (() => void) | null, callbackError: (errorsMsg: string[]) => void, listGeneralValue: number, search = "") => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers['x-access-token'] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("country/open/all", { listGeneral: listGeneralValue }).then(response => {
        if (response.data.status) {
            const dataApi = response.data.datas
            const countriesValue = orderCountriesByName(dataApi)
            const countriesFilterValue = searchCountries(countriesValue, search)
            dispatch({ type: COUNTRY_LIST_REDUCER, countries: countriesValue, countriesFilter: countriesFilterValue })
            if (typeof callbackSuccess !== "undefined" && callbackSuccess !== null) {
                callbackSuccess()
            }
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}
import UpdateHeaderToken from "../../components/Utils/UpdateHeaderToken"
import api from "../../core/api"
import { COUNTRY_LIST_FILTER_REDUCER, COUNTRY_LIST_REDUCER, COUNTRY_SINGLE_REDUCER, TOKEN_LOCAL_STORAGE } from "../../core/consts"

export const deleteAllByIdsInCountry = (_ids: string[], callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.put("country/delete", { countryId: JSON.stringify(_ids) }).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const deleteByIdInCountry = (countryIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.delete(`country/delete/${countryIdValue}`).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const updateEnabledByIdInCountry = (countryIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get(`country/approved/${countryIdValue}`).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const updateByIdInCountry = (countryIdValue: string, initialValue: string,
    callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.put(`country/update/${countryIdValue}`, { initial: initialValue }).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const openInCountry = (countryIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get(`country/open/${countryIdValue}`).then(response => {
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

export const createInCountry = (initialValue: string, reviewedStatus: number, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        const objectData = { initial: initialValue, reviewed: reviewedStatus }
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
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

function orderListInCountry(countries) {
    return countries.sort((countryA, countryB) => {
        if (countryA.initial.toLowerCase() > countryB.initial.toLowerCase()) {
            return 1
        }
        if (countryA.initial.toLowerCase() < countryB.initial.toLowerCase()) {
            return -1
        }
        return 0
    })
}

function searchListInCountry(countries, search: string) {
    return countries.filter(country => country.initial.toLowerCase().indexOf(search.toLowerCase()) > -1)
}

export const openAllBySearchInCountry = (searchValue: string, countriesGeneral: []) => async dispatch => {
    let countriesValue = searchListInCountry(countriesGeneral, searchValue)
    countriesValue = orderListInCountry(countriesValue)
    dispatch({ type: COUNTRY_LIST_FILTER_REDUCER, countries: countriesValue })
}

export const openAllByAuthorizedInCountry = (callbackSuccess: (() => void) | null,
    callbackError: (errorsMsg: string[]) => void, search = "") => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get("country/open/authorized").then(response => {
            if (response.data.status) {
                const dataApi = response.data.datas
                const countriesValue = orderListInCountry(dataApi)
                const countriesFilterValue = searchListInCountry(countriesValue, search)
                dispatch({
                    type: COUNTRY_LIST_REDUCER, countries: countriesValue, countriesFilter: countriesFilterValue
                })
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

export const openAllInCountry = (callbackSuccess: (() => void) | null,
    callbackError: (errorsMsg: string[]) => void, search = "") => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get("country/open").then(response => {
            if (response.data.status) {
                const dataApi = response.data.datas
                const countriesValue = orderListInCountry(dataApi)
                const countriesFilterValue = searchListInCountry(countriesValue, search)
                dispatch({
                    type: COUNTRY_LIST_REDUCER, countries: countriesValue, countriesFilter: countriesFilterValue
                })
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
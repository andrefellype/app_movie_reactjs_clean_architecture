import CryptographyConvert from "../../components/CryptographyConvert"
import api from "../../core/api"
import { DIRECTOR_LIST_FILTER_REDUCER, DIRECTOR_LIST_REDUCER, DIRECTOR_SINGLE_REDUCER, TOKEN_LOCAL_STORAGE } from "../../core/consts"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deleteSeveralDirectorByIds = (_ids: string[], callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("director/delete/several", { _ids: JSON.stringify(_ids) }).then(response => {
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
export const deleteDirectorById = (directorIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("director/delete", { directorId: directorIdValue }).then(response => {
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
export const approvedReviewedDirectorById = (directorIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("director/approved/reviewed", { directorId: directorIdValue }).then(response => {
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
export const updateDirectorById = (directorIdValue: string, nameValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const objectData = { directorId: directorIdValue, name: nameValue }
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers['x-access-token'] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("director/update", objectData).then(response => {
        if (response.data.status) {
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

export const openDirectorById = (directorIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("director/open", { directorId: directorIdValue }).then(response => {
        if (response.data.status) {
            const dataApi = response.data.data
            dispatch({ type: DIRECTOR_SINGLE_REDUCER, directorSingle: dataApi })
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const registerDirector = (nameValue: string, reviewedStatus: number, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const objectData = { name: nameValue, reviewed: reviewedStatus }
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("director/register", objectData).then(response => {
        if (response.data.status) {
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

function orderDirectorsByName(directors) {
    return directors.sort((directorA, directorB) => {
        if (directorA.name.toLowerCase() > directorB.name.toLowerCase()) {
            return 1
        }
        if (directorA.name.toLowerCase() < directorB.name.toLowerCase()) {
            return -1
        }
        return 0
    })
}

function searchDirectors(directors, search: string) {
    return directors.filter(director => director.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
}

export const getDirectorAllBySearch = (searchValue: string, directorsGeneral: []) => async dispatch => {
    let directorsValue = searchDirectors(directorsGeneral, searchValue)
    directorsValue = orderDirectorsByName(directorsValue)
    dispatch({ type: DIRECTOR_LIST_FILTER_REDUCER, directors: directorsValue })
}

export const getDirectorAll = (callbackSuccess: (() => void) | null, callbackError: (errorsMsg: string[]) => void, listGeneralValue: number, search = "") => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers['x-access-token'] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("director/open/all", { listGeneral: listGeneralValue }).then(response => {
        if (response.data.status) {
            const dataApi = response.data.datas
            const directorsValue = orderDirectorsByName(dataApi)
            const directorsFilterValue = searchDirectors(directorsValue, search)
            dispatch({ type: DIRECTOR_LIST_REDUCER, directors: directorsValue, directorsFilter: directorsFilterValue })
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
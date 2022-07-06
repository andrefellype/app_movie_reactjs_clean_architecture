import UpdateHeaderToken from "../../components/Utils/UpdateHeaderToken"
import api from "../../core/api"
import { DIRECTOR_LIST_FILTER_REDUCER, DIRECTOR_LIST_REDUCER, DIRECTOR_SINGLE_REDUCER, TOKEN_LOCAL_STORAGE } from "../../core/consts"

export const deleteAllByIdsInDirector = (_ids: string[], callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.put("director/delete", { directorId: JSON.stringify(_ids) }).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const deleteByIdInDirector = (directorIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.delete(`director/delete/${directorIdValue}`).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const updateEnabledByIdInDirector = (directorIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get(`director/approved/${directorIdValue}`).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const updateByIdInDirector = (directorIdValue: string, nameValue: string,
    callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.put(`director/update/${directorIdValue}`, { name: nameValue }).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const openInDirector = (directorIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get(`director/open/${directorIdValue}`).then(response => {
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

export const createInDirector = (nameValue: string, reviewedStatus: number, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        const objectData = { name: nameValue, reviewed: reviewedStatus }
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
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

function orderListInDirector(directors) {
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

function searchListInDirector(directors, search: string) {
    return directors.filter(director => director.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
}

export const openAllBySearchInDirector = (searchValue: string, directorsGeneral: []) => async dispatch => {
    let directorsValue = searchListInDirector(directorsGeneral, searchValue)
    directorsValue = orderListInDirector(directorsValue)
    dispatch({ type: DIRECTOR_LIST_FILTER_REDUCER, directors: directorsValue })
}

export const openAllByAuthorizedInDirector = (callbackSuccess: (() => void) | null,
    callbackError: (errorsMsg: string[]) => void, search = "") => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get("director/open/authorized").then(response => {
            if (response.data.status) {
                const dataApi = response.data.datas
                const directorsValue = orderListInDirector(dataApi)
                const directorsFilterValue = searchListInDirector(directorsValue, search)
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

export const openAllInDirector = (callbackSuccess: (() => void) | null,
    callbackError: (errorsMsg: string[]) => void, search = "") => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get("director/open").then(response => {
            if (response.data.status) {
                const dataApi = response.data.datas
                const directorsValue = orderListInDirector(dataApi)
                const directorsFilterValue = searchListInDirector(directorsValue, search)
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
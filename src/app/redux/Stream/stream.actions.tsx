import UpdateHeaderToken from "../../components/Utils/UpdateHeaderToken"
import api from "../../core/api"
import {
    STREAM_LIST_FILTER_REDUCER, STREAM_LIST_REDUCER, STREAM_SINGLE_REDUCER, TOKEN_LOCAL_STORAGE
} from "../../core/consts"

export const deleteAllByIdsInStream = (_ids: string[], callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.put("stream/delete", { streamId: JSON.stringify(_ids) }).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const deleteByIdInStream = (streamIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.delete(`stream/delete/${streamIdValue}`).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const updateEnabledByIdInStream = (streamIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get(`stream/approved/${streamIdValue}`).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const updateByIdInStream = (streamIdValue: string, nameValue: string,
    callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.put(`stream/update/${streamIdValue}`, { name: nameValue }).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const openInStream = (streamIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get(`stream/open/${streamIdValue}`).then(response => {
            if (response.data.status) {
                const dataApi = response.data.data
                dispatch({ type: STREAM_SINGLE_REDUCER, streamSingle: dataApi })
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const createInStream = (nameValue: string, reviewedStatus: number,
    callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async () => {
        const objectData = { name: nameValue, reviewed: reviewedStatus }
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.post("stream/register", objectData).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

function orderListInStream(streams) {
    return streams.sort((streamA, streamB) => {
        if (streamA.name.toLowerCase() > streamB.name.toLowerCase()) {
            return 1
        }
        if (streamA.name.toLowerCase() < streamB.name.toLowerCase()) {
            return -1
        }
        return 0
    })
}

function searchListInStream(streams, search: string) {
    return streams.filter(stream => stream.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
}

export const openAllBySearchInStream = (searchValue: string, streamsGeneral: []) => async dispatch => {
    let streamsValue = searchListInStream(streamsGeneral, searchValue)
    streamsValue = orderListInStream(streamsValue)
    dispatch({ type: STREAM_LIST_FILTER_REDUCER, streams: streamsValue })
}

export const openAllByAuthorizedInStream = (callbackSuccess: (() => void) | null,
    callbackError: (errorsMsg: string[]) => void, search = "") => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get("stream/open/authorized").then(response => {
            if (response.data.status) {
                const dataApi = response.data.datas
                const streamsValue = orderListInStream(dataApi)
                const streamsFilterValue = searchListInStream(streamsValue, search)
                dispatch({ type: STREAM_LIST_REDUCER, streams: streamsValue, streamsFilter: streamsFilterValue })
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

export const openAllInStream = (callbackSuccess: (() => void) | null,
    callbackError: (errorsMsg: string[]) => void, search = "") => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get("stream/open").then(response => {
            if (response.data.status) {
                const dataApi = response.data.datas
                const streamsValue = orderListInStream(dataApi)
                const streamsFilterValue = searchListInStream(streamsValue, search)
                dispatch({ type: STREAM_LIST_REDUCER, streams: streamsValue, streamsFilter: streamsFilterValue })
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
import CryptographyConvert from "../../components/CryptographyConvert"
import api from "../../core/api"
import { STREAM_LIST_FILTER_REDUCER, STREAM_LIST_REDUCER, STREAM_SINGLE_REDUCER, TOKEN_LOCAL_STORAGE } from "../../core/consts"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deleteSeveralStreamByIds = (_ids: string[], callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("stream/delete/several", { _ids: JSON.stringify(_ids) }).then(response => {
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
export const deleteStreamById = (streamIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("stream/delete", { streamId: streamIdValue }).then(response => {
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
export const approvedReviewedStreamById = (streamIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("stream/approved/reviewed", { streamId: streamIdValue }).then(response => {
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
export const updateStreamById = (streamIdValue: string, nameValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const objectData = { streamId: streamIdValue, name: nameValue }
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers['x-access-token'] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("stream/update", objectData).then(response => {
        if (response.data.status) {
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

export const openStreamById = (streamIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("stream/open", { streamId: streamIdValue }).then(response => {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const registerStream = (nameValue: string, reviewedStatus: number, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const objectData = { name: nameValue, reviewed: reviewedStatus }
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
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

function orderStreamsByName(streams) {
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

function searchStreams(streams, search: string) {
    return streams.filter(stream => stream.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
}

export const getStreamAllBySearch = (searchValue: string, streamsGeneral: []) => async dispatch => {
    let streamsValue = searchStreams(streamsGeneral, searchValue)
    streamsValue = orderStreamsByName(streamsValue)
    dispatch({ type: STREAM_LIST_FILTER_REDUCER, streams: streamsValue })
}

export const getStreamAll = (callbackSuccess: (() => void) | null, callbackError: (errorsMsg: string[]) => void, listGeneralValue: number, search = "") => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers['x-access-token'] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("stream/open/all", { listGeneral: listGeneralValue }).then(response => {
        if (response.data.status) {
            const dataApi = response.data.datas
            const streamsValue = orderStreamsByName(dataApi)
            const streamsFilterValue = searchStreams(streamsValue, search)
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
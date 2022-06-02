import CryptographyConvert from "../../components/CryptographyConvert"
import api from "../../core/api"
import { ACTOR_LIST_FILTER_REDUCER, ACTOR_LIST_REDUCER, ACTOR_SINGLE_REDUCER, TOKEN_LOCAL_STORAGE } from "../../core/consts"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deleteSeveralActor = (_ids: string[], callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("actor/delete/several", { _ids: JSON.stringify(_ids) }).then(response => {
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
export const deleteActor = (actorIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("actor/delete", { actorId: actorIdValue }).then(response => {
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
export const approvedReviewedActor = (actorIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("actor/approved/reviewed", { actorId: actorIdValue }).then(response => {
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
export const updateActor = (actorIdValue: string, nameValue: string, callbackSuccess: () => void, callbackError: (errorsMsg) => void) => async dispatch => {
    const objectData = { actorId: actorIdValue, name: nameValue }
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers['x-access-token'] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("actor/update", objectData).then(response => {
        if (response.data.status) {
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

export const openActorById = (actorIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("actor/open", { actorId: actorIdValue }).then(response => {
        if (response.data.status) {
            const dataApi = response.data.data
            dispatch({ type: ACTOR_SINGLE_REDUCER, actorSingle: dataApi })
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const registerActor = (nameValue: string, reviewedStatus: number, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const objectData = { name: nameValue, reviewed: reviewedStatus }
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("actor/register", objectData).then(response => {
        if (response.data.status) {
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

function orderActorsByName(actors) {
    return actors.sort((actorA, actorB) => {
        if (actorA.name.toLowerCase() > actorB.name.toLowerCase()) {
            return 1
        }
        if (actorA.name.toLowerCase() < actorB.name.toLowerCase()) {
            return -1
        }
        return 0
    })
}

function searchActors(actors, search: string) {
    return actors.filter(actor => actor.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
}

export const getActorAllBySearch = (searchValue: string, actorsGeneral: []) => async dispatch => {
    let actorsValue = searchActors(actorsGeneral, searchValue)
    actorsValue = orderActorsByName(actorsValue)
    dispatch({ type: ACTOR_LIST_FILTER_REDUCER, actors: actorsValue })
}

export const getActorAll = (callbackSuccess: (() => void) | null, callbackError: (errorsMsg: string[]) => void, listGeneralValue: number, search = "") => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers['x-access-token'] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("actor/open/all", { listGeneral: listGeneralValue }).then(response => {
        if (response.data.status) {
            const dataApi = response.data.datas
            const actorsValue = orderActorsByName(dataApi)
            const actorsFilterValue = searchActors(actorsValue, search)
            dispatch({ type: ACTOR_LIST_REDUCER, actors: actorsValue, actorsFilter: actorsFilterValue })
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
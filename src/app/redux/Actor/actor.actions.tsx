import UpdateHeaderToken from "../../components/Utils/UpdateHeaderToken"
import api from "../../core/api"
import { ACTOR_LIST_FILTER_REDUCER, ACTOR_LIST_REDUCER, ACTOR_SINGLE_REDUCER, TOKEN_LOCAL_STORAGE } from "../../core/consts"

export const deleteAllByIdsInActor = (_ids: string[], callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.put("actor/delete", { actorId: JSON.stringify(_ids) }).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const deleteByIdInActor = (actorIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.delete(`actor/delete/${actorIdValue}`).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const updateEnabledByIdInActor = (actorIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get(`actor/approved/${actorIdValue}`).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const updateByIdInActor = (actorIdValue: string, nameValue: string,
    callbackSuccess: () => void, callbackError: (errorsMsg) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.put(`actor/update/${actorIdValue}`, { name: nameValue }).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const openInActor = (actorIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg) => void) => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get(`actor/open/${actorIdValue}`).then(response => {
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

export const createInActor = (nameValue: string, reviewedStatus: number,
    callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async () => {
        const objectData = { name: nameValue, reviewed: reviewedStatus }
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
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

function orderListInActor(actors) {
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

function searchListInActor(actors, search: string) {
    return actors.filter(actor => actor.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
}

export const openAllBySearchInActor = (searchValue: string, actorsGeneral: []) => async dispatch => {
    let actorsValue = searchListInActor(actorsGeneral, searchValue)
    actorsValue = orderListInActor(actorsValue)
    dispatch({ type: ACTOR_LIST_FILTER_REDUCER, actors: actorsValue })
}

export const openAllByAuthorizedInActor = (callbackSuccess: (() => void) | null, callbackError: (errorsMsg: string[]) => void,
    search = "") => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get("actor/open/authorized").then(response => {
            if (response.data.status) {
                const dataApi = response.data.datas
                const actorsValue = orderListInActor(dataApi)
                const actorsFilterValue = searchListInActor(actorsValue, search)
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

export const openAllInActor = (callbackSuccess: (() => void) | null, callbackError: (errorsMsg: string[]) => void,
    search = "") => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get("actor/open").then(response => {
            if (response.data.status) {
                const dataApi = response.data.datas
                const actorsValue = orderListInActor(dataApi)
                const actorsFilterValue = searchListInActor(actorsValue, search)
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
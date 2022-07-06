import UpdateHeaderToken from "../../components/Utils/UpdateHeaderToken"
import api from "../../core/api"
import { ABOUT_US_SINGLE_REDUCER, TOKEN_LOCAL_STORAGE } from "../../core/consts"

export const deleteAllInAboutUs = (callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.delete("aboutus/delete").then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const updateAllInAboutUs = (informationApp: string, informationWeb: string,
    callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.put("aboutus/update", { app: informationApp, web: informationWeb }).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const registerInAboutUs = (informationApp: string, informationWeb: string,
    callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.post("aboutus/register", { app: informationApp, web: informationWeb }).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const openInAboutUs = (callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) =>
    async dispatch => {
        await api.get("aboutus").then(response => {
            if (response.data.status) {
                dispatch({ type: ABOUT_US_SINGLE_REDUCER, aboutUs: response.data.data })
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }
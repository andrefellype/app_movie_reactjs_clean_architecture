/* eslint-disable @typescript-eslint/no-explicit-any */
import ConvertDate from "../../components/Utils/ConvertDate"
import api from "../../core/api"
import {
    TOKEN_LOCAL_STORAGE, URL_FAIL_PAGE, USER_ACCESS_REDUCER, USER_LIST_FILTER_REDUCER, USER_LIST_REDUCER,
    USER_LOCAL_STORAGE, USER_SINGLE_REDUCER
} from "../../core/consts"
import SetLocalStorage from "../../components/Utils/SetLocalStorage"
import UpdateHeaderToken from "../../components/Utils/UpdateHeaderToken"
import GetLocalStorage from "../../components/Utils/GetLocalStorage"

export const updatePasswordByIdInUser = (userIdValue: string, passwordValue: string,
    confirmPassword: string, callbackSuccess: () => void, callbackError: (errorMsg) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        const objectData = { password: passwordValue, password_confirm: confirmPassword }
        await api.put(`user/update/password/${userIdValue}`, objectData).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const openInUser = (userIdValue: string, callbackSuccess: () => void,
    callbackError: (errorMsg: string[]) => void, callbackUser: ((userActual) => void) | null = null) => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get(`user/open/${userIdValue}`).then(response => {
            if (response.data.status) {
                const dataApi = response.data.data
                dispatch({ type: USER_SINGLE_REDUCER, userSingle: dataApi })
                callbackSuccess()
                if (callbackUser !== null) {
                    callbackUser(dataApi)
                }
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const createInUser = (nameValue: string, birthValue: string, emailValue: string,
    cellphoneValue: string, passwordValue: string, confirmPasswordValue: string, levelValue: string,
    callbackSuccess: () => void, callbackError: (errorsMsg) => void) => async () => {
        const cellphoneNumber = cellphoneValue ? cellphoneValue.replace(/\D+/g, '') : cellphoneValue
        const birthEUA = birthValue.length > 0 ?
            `${birthValue.substring(6, 10)}-${birthValue.substring(3, 5)}-${birthValue.substring(0, 2)}` : null
        const objectData = {
            name: nameValue, birth: birthEUA, email: emailValue, cellphone: cellphoneNumber,
            password: passwordValue, password_confirm: confirmPasswordValue, level: levelValue
        }

        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.post("user/register", objectData).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const deleteAllByIdsInUser = (_ids: string[], callbackSuccess: () => void,
    callbackError: (errorMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.put("user/delete", { userId: JSON.stringify(_ids) }).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const deleteByIdInUser = (userIdValue: string, callbackSuccess: () => void,
    callbackError: (errorMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.delete(`user/delete/${userIdValue}`).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const updateEnabledByIdInUser = (userIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get(`user/update/enabled/${userIdValue}`).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

function orderListInUser(users, type: string) {
    return users.sort((userA, userB) => {
        if (type === "name") {
            if (userA.name.toLowerCase() > userB.name.toLowerCase()) {
                return 1
            }
            if (userA.name.toLowerCase() < userB.name.toLowerCase()) {
                return -1
            }
        } else if (type === "birth") {
            let birthA = new Date()
            let birthB = new Date()
            if (userA.last_access_at !== null)
                birthA = ConvertDate(userA.birth, "stringToDateTime") as Date
            if (userB.last_access_at !== null)
                birthB = ConvertDate(userB.birth, "stringToDateTime") as Date
            if (birthA !== null && birthB !== null && birthA.getTime() > birthB.getTime()) {
                return 1
            }
            if (birthA !== null && birthB !== null && birthA.getTime() < birthB.getTime()) {
                return -1
            }
        } else if (type === "cellphone") {
            const cellphoneA = userA.cellphone !== null ? userA.cellphone : "SEM NÚMERO"
            const cellphoneB = userB.cellphone !== null ? userB.cellphone : "SEM NÚMERO"
            if (cellphoneA > cellphoneB) {
                return 1
            }
            if (cellphoneA < cellphoneB) {
                return -1
            }
        } else if (type === "last_access") {
            let lastAccessA = new Date()
            let lastAccessB = new Date()
            if (userA.last_access_at)
                lastAccessA = ConvertDate(userA.last_access_at, "stringToDateTime") as Date
            if (userB.last_access_at)
                lastAccessB = ConvertDate(userB.last_access_at, "stringToDateTime") as Date
            if (lastAccessA.getTime() > lastAccessB.getTime()) {
                return 1
            }
            if (lastAccessA.getTime() < lastAccessB.getTime()) {
                return -1
            }
        }
        return 0
    })
}

function filterListInUser(users, level: string) {
    return users.filter(user => {
        if (level.length === 0 || level === user.level) {
            return true
        }
        return false
    })
}

function searchListInUser(users, search: string) {
    return users.filter(user => user.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
}

export const openAllByOrderAndSearchAndFilterInUser = (orderValue: string, searchValue: string,
    levelValue: string, usersGeneral: []) => async dispatch => {
        let usersValue = filterListInUser(usersGeneral, levelValue)
        usersValue = searchListInUser(usersValue, searchValue)
        usersValue = orderListInUser(usersValue, orderValue)
        dispatch({ type: USER_LIST_FILTER_REDUCER, users: usersValue })
    }

export const openAllInUser = (callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void,
    order = "name", search = "", level = "") => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get("user/open").then(response => {
            if (response.data.status) {
                const dataApi = response.data.datas
                const usersValue = dataApi
                let usersFilterValue = filterListInUser(usersValue, level)
                usersFilterValue = searchListInUser(usersFilterValue, search)
                usersFilterValue = orderListInUser(usersFilterValue, order)
                dispatch({ type: USER_LIST_REDUCER, users: usersValue, usersFilter: usersFilterValue })
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const updatePasswordByTokenInUser = (passwordValue: string, confirmPasswordValue: string,
    callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
        const objectData = { password: passwordValue, password_confirm: confirmPasswordValue }
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.put("user/update/password/token", objectData).then(response => {
            if (response.data.status) {
                let userLocal: any = GetLocalStorage(USER_LOCAL_STORAGE)
                if (userLocal)
                    userLocal = JSON.parse(userLocal)
                if (userLocal) {
                    const dataApi = response.data.data
                    userLocal.password = dataApi.password
                    SetLocalStorage(USER_LOCAL_STORAGE, JSON.stringify(userLocal))
                    SetLocalStorage(TOKEN_LOCAL_STORAGE, dataApi.token)
                    dispatch({ type: USER_SINGLE_REDUCER, userSingle: dataApi.user })
                    callbackSuccess()
                }
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const updateByTokenInUser = (nameValue: string, birthValue: string, emailValue: string,
    cellphoneValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
        const cellphoneNumber = cellphoneValue ? cellphoneValue.replace(/\D+/g, '') : cellphoneValue
        const birthEUA =
            birthValue.length > 0 ? `${birthValue.substring(6, 10)}-${birthValue.substring(3, 5)}-${birthValue.substring(0, 2)}` : null
        const objectData = { name: nameValue, birth: birthEUA, email: emailValue, cellphone: cellphoneNumber }
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.put("user/update/token", objectData).then(response => {
            if (response.data.status) {
                const dataApi = response.data.data
                let userLocal: any = GetLocalStorage(USER_LOCAL_STORAGE)
                if (userLocal !== null) {
                    userLocal = JSON.parse(userLocal)
                }
                if (userLocal !== null) {
                    userLocal.name = dataApi.name
                    userLocal.cellphone = dataApi.cellphone
                    userLocal.password = dataApi.password
                    userLocal.photo = dataApi.photo
                    SetLocalStorage(USER_LOCAL_STORAGE, JSON.stringify(userLocal))
                    SetLocalStorage(TOKEN_LOCAL_STORAGE, dataApi.token)
                    dispatch({ type: USER_SINGLE_REDUCER, userSingle: dataApi.user })
                    callbackSuccess()
                }
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const openByTokenInUser = (callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get("user/open/token").then(response => {
            if (response.data.status) {
                dispatch({ type: USER_SINGLE_REDUCER, userSingle: response.data.data })
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const updatePasswordByCodeRecoveryInUser = async (codeValue: string, passwordValue: string,
    confirmPasswordValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => {
    const objectData = { password: passwordValue, password_confirm: confirmPasswordValue }
    await api.put(`user/update/password/coderecovery/${codeValue}`, objectData).then(response => {
        if (response.data.status) {
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

export const openByCodeRecoveryInUser = (codeValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[] | string) => void) => async dispatch => {
        await api.get(`user/open/coderecovery/${codeValue}`).then(response => {
            if (response.data.status) {
                dispatch({ type: USER_SINGLE_REDUCER, userSingle: response.data.data })
                callbackSuccess()
            } else {
                if (response.data.errors.length === 1) {
                    callbackError(response.data.errors[0].msg)
                } else {
                    callbackError(response.data.errors.map(erro => `${erro.msg}`))
                }
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const createRecoveryPasswordInUser = async (cellphoneValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => {
    const cellphoneNumber = cellphoneValue ? cellphoneValue.replace(/\D+/g, '') : cellphoneValue
    const objectData = { cellphone: cellphoneNumber }
    await api.post("user/recovery/password", objectData).then(response => {
        if (response.data.status) {
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

export const updateTokenInUser = (callbackError: (errorsMsg: string[]) => void) => async () => {
    if (window.location.pathname.indexOf(URL_FAIL_PAGE) === -1) {
        const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
        if (token !== null) {
            UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
            await api.get("user/refresh/token").then(response => {
                if (response.data.status) {
                    const dataApi = response.data.data
                    SetLocalStorage(TOKEN_LOCAL_STORAGE, dataApi.token)
                } else {
                    callbackError(response.data.errors.map(erro => `${erro.msg}`))
                }
            }).catch(() => {
                window.location.href = "/failpage/error_api"
            })
        }
    }
}

export const signInUser = (cellphoneValue: string, passwordValue: string, callbackError: (errorsMsg: string[]) => void) =>
    async dispatch => {
        const cellphoneNumber = cellphoneValue ? cellphoneValue.replace(/\D+/g, '') : cellphoneValue
        const objectData = {
            cellphone: cellphoneNumber, password: passwordValue
        }
        await api.post("user/signin", objectData).then(response => {
            if (response.data.status) {
                const dataApi = response.data.data
                SetLocalStorage(USER_LOCAL_STORAGE, JSON.stringify(dataApi))
                SetLocalStorage(TOKEN_LOCAL_STORAGE, dataApi.token)
                dispatch({ type: USER_ACCESS_REDUCER, userAccess: dataApi.user, tokenAccess: dataApi.token })
                window.location.reload()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const signOutUser = () => async dispatch => {
    localStorage.clear()
    dispatch({ type: USER_ACCESS_REDUCER, accessUser: null, tokenUser: null })
    window.location.reload()
}

export const signUpUser = (nameValue: string, birthValue: string, cellphoneValue: string, emailValue: string,
    passwordValue: string, confirmPasswordValue: string, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
        const cellphoneNumber =
            cellphoneValue ? cellphoneValue.replace(/\D+/g, '') : cellphoneValue
        const birthEUA =
            birthValue.length > 0 ? `${birthValue.substring(6, 10)}-${birthValue.substring(3, 5)}-${birthValue.substring(0, 2)}` : null
        const objectData = {
            name: nameValue, birth: birthEUA, cellphone: cellphoneNumber, email: emailValue,
            password: passwordValue, password_confirm: confirmPasswordValue
        }
        await api.post("user/signup", objectData).then(async response => {
            if (response.data.status) {
                const dataApi = response.data.data
                SetLocalStorage(USER_LOCAL_STORAGE, JSON.stringify(dataApi))
                SetLocalStorage(TOKEN_LOCAL_STORAGE, dataApi.token)
                dispatch({ type: USER_ACCESS_REDUCER, userAccess: dataApi.user, tokenAccess: dataApi.token })
                window.location.reload()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }
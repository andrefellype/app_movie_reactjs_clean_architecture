import UpdateHeaderToken from "../../components/Utils/UpdateHeaderToken"
import api from "../../core/api"
import {
    CATEGORY_LIST_FILTER_REDUCER, CATEGORY_LIST_REDUCER, CATEGORY_SINGLE_REDUCER, TOKEN_LOCAL_STORAGE
} from "../../core/consts"

export const deleteAllByIdsInCategory = (_ids: string[], callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.put("category/delete", { categoryId: JSON.stringify(_ids) }).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const deleteByIdInCategory = (categoryIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.delete(`category/delete/${categoryIdValue}`).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const updateByIdInCategory = (categoryIdValue: string, nameValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.put(`category/update/${categoryIdValue}`, { name: nameValue }).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const openInCategory = (categoryIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get(`category/open/${categoryIdValue}`).then(response => {
            if (response.data.status) {
                const dataApi = response.data.data
                dispatch({ type: CATEGORY_SINGLE_REDUCER, categorySingle: dataApi })
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const createInCategory = (nameValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        const objectData = { name: nameValue }
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.post("category/register", objectData).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

function orderListInCategory(categories) {
    return categories.sort((categoryA, categoryB) => {
        if (categoryA.name.toLowerCase() > categoryB.name.toLowerCase()) {
            return 1
        }
        if (categoryA.name.toLowerCase() < categoryB.name.toLowerCase()) {
            return -1
        }
        return 0
    })
}

function searchListInCategory(categories, search: string) {
    return categories.filter(category => category.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
}

export const openAllBySearchInCategory = (searchValue: string, categoriesGeneral: []) => async dispatch => {
    let categoriesValue = searchListInCategory(categoriesGeneral, searchValue)
    categoriesValue = orderListInCategory(categoriesValue)
    dispatch({ type: CATEGORY_LIST_FILTER_REDUCER, categories: categoriesValue })
}

export const openAllInCategory = (callbackSuccess: (() => void) | null, callbackError: (errorsMsg: string[]) => void,
    search = "") => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get("category/open").then(response => {
            if (response.data.status) {
                const dataApi = response.data.datas
                const categoriesValue = orderListInCategory(dataApi)
                const categoriesFilterValue = searchListInCategory(categoriesValue, search)
                dispatch({
                    type: CATEGORY_LIST_REDUCER, categories: categoriesValue, categoriesFilter: categoriesFilterValue
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
import CryptographyConvert from "../../components/CryptographyConvert"
import api from "../../core/api"
import { CATEGORY_LIST_FILTER_REDUCER, CATEGORY_LIST_REDUCER, CATEGORY_SINGLE_REDUCER, TOKEN_LOCAL_STORAGE } from "../../core/consts"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const updateCategoryById = (categoryIdValue: string, nameValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const objectData = { categoryId: categoryIdValue, name: nameValue }
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers['x-access-token'] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("category/update", objectData).then(response => {
        if (response.data.status) {
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

export const openCategoryById = (categoryIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("category/open", { categoryId: categoryIdValue }).then(response => {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const registerCategory = (nameValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const objectData = { name: nameValue }
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deleteSeveralCategoryByIds = (_ids: string[], callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("category/delete/several", { _ids: JSON.stringify(_ids) }).then(response => {
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
export const deleteCategoryById = (categoryIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("category/delete", { categoryId: categoryIdValue }).then(response => {
        if (response.data.status) {
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

function orderCategoriesByName(categories) {
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

function searchCategories(categories, search: string) {
    return categories.filter(category => category.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
}

export const getCategoryAllBySearch = (searchValue: string, categoriesGeneral: []) => async dispatch => {
    let categoriesValue = searchCategories(categoriesGeneral, searchValue)
    categoriesValue = orderCategoriesByName(categoriesValue)
    dispatch({ type: CATEGORY_LIST_FILTER_REDUCER, categories: categoriesValue })
}

export const getCategoryAll = (callbackSuccess: (() => void) | null, callbackError: (errorsMsg: string[]) => void, search = "") => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers['x-access-token'] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("category/open/all").then(response => {
        if (response.data.status) {
            const dataApi = response.data.datas
            const categoriesValue = orderCategoriesByName(dataApi)
            const categoriesFilterValue = searchCategories(categoriesValue, search)
            dispatch({ type: CATEGORY_LIST_REDUCER, categories: categoriesValue, categoriesFilter: categoriesFilterValue })
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
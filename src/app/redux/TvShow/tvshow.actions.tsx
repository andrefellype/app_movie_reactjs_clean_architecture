import CryptographyConvert from "../../components/CryptographyConvert"
import api from "../../core/api"
import { TOKEN_LOCAL_STORAGE, TV_SHOW_LIST_FILTER_REDUCER, TV_SHOW_LIST_REDUCER, TV_SHOW_SINGLE_REDUCER } from "../../core/consts"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deleteSeveralTvShow = (_ids: string[], callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("tvshow/delete/several", { _ids: JSON.stringify(_ids) }).then(response => {
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
export const deleteTvShow = (tvShowIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("tvshow/delete", { tvShowId: tvShowIdValue }).then(response => {
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
export const approvedReviewedTvShow = (tvShowIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("tvshow/approved/reviewed", { tvShowId: tvShowIdValue }).then(response => {
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
export const updateTvShow = (tvShowIdValue: string, titleValue: string, releaseValue: string, categoriesValue: [], countriesValue: [], streamsValue: [], resumeValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const objectData = {
        tvShowId: tvShowIdValue, title: titleValue, release: releaseValue, categories: categoriesValue, countries: countriesValue, streams: streamsValue, resume: resumeValue
    }
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers['x-access-token'] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("tvshow/update", objectData).then(response => {
        if (response.data.status) {
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

export const openTvShowById = (tvShowIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("tvshow/open", { tvShowId: tvShowIdValue }).then(response => {
        if (response.data.status) {
            const dataApi = response.data.data
            dispatch({ type: TV_SHOW_SINGLE_REDUCER, tvShowSingle: dataApi })
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const registerTvShow = (titleValue: string, releaseValue: string, categoriesValue: [], countriesValue: [], streamsValue: [], resumeValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const objectData = { title: titleValue, release: releaseValue, categories: categoriesValue, countries: countriesValue, streams: streamsValue, resume: resumeValue }
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("tvshow/register", objectData).then(response => {
        if (response.data.status) {
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

function orderTvShows(tvShows, type: string) {
    return tvShows.sort((tvShowA, tvShowB) => {
        if (type === "title") {
            if (tvShowA.title.toLowerCase() > tvShowB.title.toLowerCase()) {
                return 1
            }
            if (tvShowA.title.toLowerCase() < tvShowB.title.toLowerCase()) {
                return -1
            }
        } else if (type === "category") {
            const categoryA = tvShowA.categories.length > 0 ? tvShowA.categories.reduce((actual, categoryObA) => `${actual.length > 0 ? `${actual}, ` : ""}${categoryObA.name}`, "") : "SEM CATEGORIA"
            const categoryB = tvShowB.categories.length > 0 ? tvShowB.categories.reduce((actual, categoryObB) => `${actual.length > 0 ? `${actual}, ` : ""}${categoryObB.name}`, "") : "SEM CATEGORIA"
            if (categoryA.toLowerCase() > categoryB.toLowerCase()) {
                return 1
            }
            if (categoryA.toLowerCase() < categoryB.toLowerCase()) {
                return -1
            }
        } else if (type === "releaseUp" || type === "releaseDown") {
            const statusOrder = type === "releaseUp"
            let yearA = tvShowA.release.length === 4 ? parseInt(tvShowA.release, 10) : 0
            let yearB = tvShowB.release.length === 4 ? parseInt(tvShowB.release, 10) : 0
            let monthA = 0
            let monthB = 0
            let dayA = 0
            let dayB = 0
            if (tvShowA.release.length === 7) {
                yearA = parseInt(tvShowA.release.substring(0, 4), 10)
                monthA = parseInt(tvShowA.release.substring(5, 7), 10)
            }
            if (tvShowB.release.length === 7) {
                yearB = parseInt(tvShowB.release.substring(0, 4), 10)
                monthB = parseInt(tvShowB.release.substring(5, 7), 10)
            }
            if (tvShowA.release.length === 10) {
                yearA = parseInt(tvShowA.release.substring(0, 4), 10)
                monthA = parseInt(tvShowA.release.substring(5, 7), 10)
                dayA = parseInt(tvShowA.release.substring(8, 10), 10)
            }
            if (tvShowB.release.length === 10) {
                yearB = parseInt(tvShowB.release.substring(0, 4), 10)
                monthB = parseInt(tvShowB.release.substring(5, 7), 10)
                dayB = parseInt(tvShowB.release.substring(8, 10), 10)
            }
            if (yearA > yearB) return statusOrder ? 1 : -1
            if (yearA < yearB) return statusOrder ? -1 : 1
            if (yearA === yearB) {
                if (monthA > monthB) return statusOrder ? 1 : -1
                if (monthA < monthB) return statusOrder ? -1 : 1
                if (monthA === monthB) {
                    if (dayA > dayB) return statusOrder ? 1 : -1
                    if (dayA < dayB) return statusOrder ? -1 : 1
                }
            }
        } else if (type === "country") {
            const countryA = tvShowA.countries.length > 0 ? tvShowA.countries.reduce((actual, countryObA) => `${actual.length > 0 ? `${actual}, ` : ""}${countryObA.name}`, "") : "SEM PAÍS DE ORIGEM"
            const countryB = tvShowB.countries.length > 0 ? tvShowB.countries.reduce((actual, countryObB) => `${actual.length > 0 ? `${actual}, ` : ""}${countryObB.name}`, "") : "SEM PAÍS DE ORIGEM"
            if (countryA.toLowerCase() > countryB.toLowerCase()) {
                return 1
            }
            if (countryA.toLowerCase() < countryB.toLowerCase()) {
                return -1
            }
        }
        return 0
    })
}

function searchTvShows(tvShows, search: string) {
    return tvShows.filter(tvShow => tvShow.title.toLowerCase().indexOf(search.toLowerCase()) > -1)
}

function filterRelease(release: string, tvShow) {
    if (release.length === 4) {
        return release === tvShow.release.substring(0, 4)
    }
    if (release.length === 7) {
        return release === tvShow.release.substring(0, 7)
    }
    if (release.length === 10) {
        return release === tvShow.release.substring(0, 10)
    }
    return false
}

function filterTvShows(tvShows, categoryId: string, release: string, countryId: string) {
    return tvShows.filter(tvShow => {
        if (
            (release.length === 0 || filterRelease(release, tvShow)) &&
            (categoryId.length === 0 || ((categoryId === "-1" && tvShow.categories_id.length === 0) || (tvShow.categories_id.filter(c => c === categoryId).length > 0))) &&
            (countryId.length === 0 || ((countryId === "-1" && tvShow.countries_id.length === 0) || (tvShow.countries_id.filter(c => c === countryId).length > 0)))
        ) {
            return true
        }
        return false
    })
}

export const getTvShowAllByNotMyTvShow = (callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void, searchTextValue = "") => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers['x-access-token'] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("tvshow/open/all/notmytvshow", { object: { category: true, country: true } }).then(response => {
        if (response.data.status) {
            const dataApi = response.data.datas
            const tvShowsValue = dataApi
            let tvShowsFilterValue = searchTvShows(tvShowsValue, searchTextValue)
            tvShowsFilterValue = orderTvShows(tvShowsFilterValue, "title")
            dispatch({ type: TV_SHOW_LIST_REDUCER, tvShows: tvShowsValue, tvShowsFilter: tvShowsFilterValue })
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

export const getTvShowAllByOrderAndSearchAndFilter = (orderValue: string, searchValue: string, categoryValue: string, releaseValue: string, countryValue: string, tvShowsGeneral: []) => async dispatch => {
    let tvShowsValue = filterTvShows(tvShowsGeneral, categoryValue, releaseValue, countryValue)
    tvShowsValue = searchTvShows(tvShowsValue, searchValue)
    tvShowsValue = orderTvShows(tvShowsValue, orderValue)
    dispatch({ type: TV_SHOW_LIST_FILTER_REDUCER, tvShows: tvShowsValue })
}

export const getTvShowAll = (callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void, orderValue = "title", searchTextValue = "", categoryValue = "", releaseValue = "", countryValue = "") => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers['x-access-token'] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("tvshow/open/all", { object: { category: true, country: true } }).then(response => {
        if (response.data.status) {
            const dataApi = response.data.datas
            const tvShowsValue = dataApi
            let tvShowsFilterValue = filterTvShows(tvShowsValue, categoryValue, releaseValue, countryValue)
            tvShowsFilterValue = searchTvShows(tvShowsFilterValue, searchTextValue)
            tvShowsFilterValue = orderTvShows(tvShowsFilterValue, orderValue)
            dispatch({ type: TV_SHOW_LIST_REDUCER, tvShows: tvShowsValue, tvShowsFilter: tvShowsFilterValue })
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}
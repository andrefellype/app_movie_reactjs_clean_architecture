/* eslint-disable no-underscore-dangle */
import UpdateHeaderToken from "../../components/Utils/UpdateHeaderToken"
import api from "../../core/api"
import {
    TOKEN_LOCAL_STORAGE, TV_SHOW_LIST_FILTER_REDUCER, TV_SHOW_LIST_REDUCER, TV_SHOW_SINGLE_REDUCER
} from "../../core/consts"

export const deleteAllByIdsInTvShow = (_ids: string[], callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.put("tvshow/delete", { tvShowId: JSON.stringify(_ids) }).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const deleteByIdInTvShow = (tvShowIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.delete(`tvshow/delete/${tvShowIdValue}`).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const updateEnabledByIdInTvShow = (tvShowIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get(`tvshow/approved/${tvShowIdValue}`).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const updateByIdInTvShow = (tvShowIdValue: string, titleValue: string, releaseValue: string,
    categoriesValue: [], countriesValue: [], streamsValue: [], resumeValue: string,
    callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async () => {
        const objectData = {
            title: titleValue, release: releaseValue, categories: categoriesValue, countries: countriesValue,
            streams: streamsValue, resume: resumeValue
        }
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.put(`tvshow/update/${tvShowIdValue}`, objectData).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const openInTvShow = (tvShowIdValue: string, callbackSuccess: (() => void) | null,
    callbackError: (errorsMsg: string[]) => void) => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get(`tvshow/open/${tvShowIdValue}`).then(response => {
            if (response.data.status) {
                const dataApi = response.data.data
                dispatch({ type: TV_SHOW_SINGLE_REDUCER, tvShowSingle: dataApi })
                if (callbackSuccess !== null)
                    callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const createInTvShow = (titleValue: string, releaseValue: string, categoriesValue: [],
    countriesValue: [], streamsValue: [], resumeValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        const objectData = {
            title: titleValue, release: releaseValue, categories: categoriesValue, countries: countriesValue,
            streams: streamsValue, resume: resumeValue
        }
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
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

function orderListInTvShow(tvShows, type: string) {
    return tvShows.sort((tvShowA, tvShowB) => {
        if (type === "title") {
            if (tvShowA.title.toLowerCase() > tvShowB.title.toLowerCase()) {
                return 1
            }
            if (tvShowA.title.toLowerCase() < tvShowB.title.toLowerCase()) {
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
        }
        return 0
    })
}

function searchListInTvShow(tvShows, search: string) {
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

function filterListInTvShow(tvShows, categoryId: string, release: string, countryId: string) {
    return tvShows.filter(tvShow => {
        if (
            (release.length === 0 || filterRelease(release, tvShow)) &&
            (categoryId.length === 0 || ((categoryId === "-1" && tvShow.categories_id.length === 0)
                || (tvShow.categories_id.filter(c => c === categoryId).length > 0))) &&
            (countryId.length === 0 || ((countryId === "-1" && tvShow.countries_id.length === 0)
                || (tvShow.countries_id.filter(c => c === countryId).length > 0)))
        ) {
            return true
        }
        return false
    })
}

export const openAllNoMyTvShowInTvShow = (callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void, searchTextValue = "") => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get("tvshow/open/all/notmytvshow").then(response => {
            if (response.data.status) {
                const dataApi = response.data.datas
                const tvShowsValue = dataApi
                let tvShowsFilterValue = searchListInTvShow(tvShowsValue, searchTextValue)
                tvShowsFilterValue = orderListInTvShow(tvShowsFilterValue, "title")
                dispatch({ type: TV_SHOW_LIST_REDUCER, tvShows: tvShowsValue, tvShowsFilter: tvShowsFilterValue })
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const openAllDetailInTvShow = (tvShowsGeneral, tvShowsPagination, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async dispatch => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const idsTvShow: any[] = []
        for (let tg = 0; tg < tvShowsGeneral.length; tg++) {
            let statusDetails = false
            for (let t = 0; t < tvShowsPagination.length; t++) {
                if (tvShowsPagination[t]._id === tvShowsGeneral[tg]._id) {
                    statusDetails = true
                }
            }
            if (statusDetails) {
                idsTvShow.push(tvShowsGeneral[tg]._id)
            }
        }
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.post("tvshow/open/details/all", { tvShowIds: idsTvShow }).then(response => {
            if (response.data.status) {
                const tvShowsData = response.data.datas
                const tvShowsNew = tvShowsGeneral.map(m => {
                    const tvShowsDataFilter = tvShowsData.filter(md => md._id === m._id)
                    if (tvShowsDataFilter.length > 0)
                        return tvShowsDataFilter[0]
                    return m
                })
                dispatch({ type: TV_SHOW_LIST_FILTER_REDUCER, tvShows: tvShowsNew })
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const openAllByOrderAndSearchAndFilterInTvShow = (orderValue: string, searchValue: string,
    categoryValue: string, releaseValue: string, countryValue: string, tvShowsGeneral: []) => async dispatch => {
        let tvShowsValue = filterListInTvShow(tvShowsGeneral, categoryValue, releaseValue, countryValue)
        tvShowsValue = searchListInTvShow(tvShowsValue, searchValue)
        tvShowsValue = orderListInTvShow(tvShowsValue, orderValue)
        dispatch({ type: TV_SHOW_LIST_FILTER_REDUCER, tvShows: tvShowsValue })
    }

export const openAllInTvShow = (callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void,
    orderValue = "title", searchTextValue = "", categoryValue = "", releaseValue = "", countryValue = "") =>
    async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get("tvshow/open").then(response => {
            if (response.data.status) {
                const dataApi = response.data.datas
                const tvShowsValue = dataApi
                let tvShowsFilterValue = filterListInTvShow(tvShowsValue, categoryValue, releaseValue, countryValue)
                tvShowsFilterValue = searchListInTvShow(tvShowsFilterValue, searchTextValue)
                tvShowsFilterValue = orderListInTvShow(tvShowsFilterValue, orderValue)
                dispatch({ type: TV_SHOW_LIST_REDUCER, tvShows: tvShowsValue, tvShowsFilter: tvShowsFilterValue })
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const clearAllInTvShow = () => async dispatch => {
    dispatch({ type: TV_SHOW_LIST_REDUCER, tvShows: [], tvShowsFilter: [] })
}
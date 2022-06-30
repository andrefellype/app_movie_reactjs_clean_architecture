/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
import CryptographyConvert from "../../components/CryptographyConvert"
import api from "../../core/api"
import { MY_TV_SHOW_LIST_FILTER_REDUCER, MY_TV_SHOW_LIST_REDUCER, TOKEN_LOCAL_STORAGE } from "../../core/consts"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deleteMyTvShowByTvShowId = (tvShowIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("mytvshow/delete", { tvShowId: tvShowIdValue }).then(response => {
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
export const registerNeverWatch = (tvShowIdValue: string, tvShowSeasonIdValue: string, tvShowEpisodeIdValue: string, typeRegisterValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const objectData = { tvShowId: tvShowIdValue, tvShowSeasonId: tvShowSeasonIdValue, tvShowEpisodeId: tvShowEpisodeIdValue, typeRegister: typeRegisterValue }
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("mytvshow/register/notwatch", objectData).then(response => {
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
export const registerMyTvShow = (episodesValue: object[], tvShowSeasonIdValue: string, tvShowIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const objectData = { episodes: episodesValue, tvShowSeasonId: tvShowSeasonIdValue, tvShowId: tvShowIdValue }
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("mytvshow/register", objectData).then(response => {
        if (response.data.status) {
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

function orderTvShows(myTvShows, type: string) {
    return myTvShows.sort((tvShowA, tvShowB) => {
        if (tvShowA.tvShow !== null && tvShowB.tvShow !== null) {
            if (type === "title") {
                if (tvShowA.tvShow.title.toLowerCase() > tvShowB.tvShow.title.toLowerCase()) {
                    return 1
                }
                if (tvShowA.tvShow.title.toLowerCase() < tvShowB.tvShow.title.toLowerCase()) {
                    return -1
                }
            } else if (type === "releaseUp" || type === "releaseDown") {
                const statusOrder = type === "releaseUp"
                let yearA = tvShowA.tvShow.release.length === 4 ? parseInt(tvShowA.tvShow.release, 10) : 0
                let yearB = tvShowB.tvShow.release.length === 4 ? parseInt(tvShowB.tvShow.release, 10) : 0
                let monthA = 0
                let monthB = 0
                let dayA = 0
                let dayB = 0
                if (tvShowA.tvShow.release.length === 7) {
                    yearA = parseInt(tvShowA.tvShow.release.substring(0, 4), 10)
                    monthA = parseInt(tvShowA.tvShow.release.substring(5, 7), 10)
                }
                if (tvShowB.tvShow.release.length === 7) {
                    yearB = parseInt(tvShowB.tvShow.release.substring(0, 4), 10)
                    monthB = parseInt(tvShowB.tvShow.release.substring(5, 7), 10)
                }
                if (tvShowA.tvShow.release.length === 10) {
                    yearA = parseInt(tvShowA.tvShow.release.substring(0, 4), 10)
                    monthA = parseInt(tvShowA.tvShow.release.substring(5, 7), 10)
                    dayA = parseInt(tvShowA.tvShow.release.substring(8, 10), 10)
                }
                if (tvShowB.tvShow.release.length === 10) {
                    yearB = parseInt(tvShowB.tvShow.release.substring(0, 4), 10)
                    monthB = parseInt(tvShowB.tvShow.release.substring(5, 7), 10)
                    dayB = parseInt(tvShowB.tvShow.release.substring(8, 10), 10)
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
        }
        return 0
    })
}

function searchTvShows(myTvShows, search: string) {
    return myTvShows.filter(myTvShow => (myTvShow.tvShow !== null && myTvShow.tvShow.title.toLowerCase().indexOf(search.toLowerCase()) > -1))
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

function filterTvShows(myTvShows, categoryId: string, release: string, countryId: string) {
    return myTvShows.filter(myTvShow => {
        if (
            (categoryId.length === 0 || ((categoryId === "-1" && myTvShow.tvShow.categories_id.length === 0) || (myTvShow.tvShow.categories_id.filter(c => c === categoryId).length > 0))) &&
            (release.length === 0 || filterRelease(release, myTvShow.tvShow)) &&
            (countryId.length === 0 || ((countryId === "-1" && myTvShow.tvShow.countries_id.length === 0) || (myTvShow.tvShow.countries_id.filter(c => c === countryId).length > 0)))
        ) {
            return true
        }
        return false
    })
}

export const getMyTvShowDetailsTvShowAll = (myTvShowsGeneral, myTvShowsPagination, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const idsTvShow: any[] = []
    for (let tg = 0; tg < myTvShowsGeneral.length; tg++) {
        let statusDetails = false
        for (let t = 0; t < myTvShowsPagination.length; t++) {
            if (myTvShowsPagination[t].tvShow._id === myTvShowsGeneral[tg].tvShow._id) {
                statusDetails = true
            }
        }
        if (statusDetails) {
            idsTvShow.push(myTvShowsGeneral[tg].tvShow._id)
        }
    }
    await api.post("tvshow/open/details/all", { tvShowIds: idsTvShow, object: { category: true, country: true } }).then(response => {
        if (response.data.status) {
            const tvShowsData = response.data.datas
            const tvShowsNew = myTvShowsGeneral.map(m => {
                const tvShowsDataFilter = tvShowsData.filter(md => md._id === m.tvShow._id)
                if (tvShowsDataFilter.length > 0)
                    m.tvShow = tvShowsDataFilter[0]
                return m
            })
            dispatch({ type: MY_TV_SHOW_LIST_FILTER_REDUCER, myTvShows: tvShowsNew })
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

export const getMyTvShowAllByOrderAndSearchAndFilter = (orderValue: string, searchValue: string, categoryValue: string, releaseValue: string, countryValue: string, myTvShowsGeneral: []) => async dispatch => {
    let myTvShowsValue = filterTvShows(myTvShowsGeneral, categoryValue, releaseValue, countryValue)
    myTvShowsValue = searchTvShows(myTvShowsValue, searchValue)
    myTvShowsValue = orderTvShows(myTvShowsValue, orderValue)
    dispatch({ type: MY_TV_SHOW_LIST_FILTER_REDUCER, myTvShows: myTvShowsValue })
}

export const getMyTvShowAll = (callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void, orderValue = "title", searchTextValue = "", categoryValue = "", releaseValue = "", countryValue = "") => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers['x-access-token'] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("mytvshow/open/all", { object: { category: true, country: true } }).then(response => {
        if (response.data.status) {
            const dataApi = response.data.datas
            const myTvShowsValue = dataApi
            let myTvShowsFilterValue = filterTvShows(myTvShowsValue, categoryValue, releaseValue, countryValue)
            myTvShowsFilterValue = searchTvShows(myTvShowsFilterValue, searchTextValue)
            myTvShowsFilterValue = orderTvShows(myTvShowsFilterValue, orderValue)
            dispatch({ type: MY_TV_SHOW_LIST_REDUCER, myTvShows: myTvShowsValue, myTvShowsFilter: myTvShowsFilterValue })
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}
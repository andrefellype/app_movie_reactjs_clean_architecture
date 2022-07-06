import UpdateHeaderToken from "../../components/Utils/UpdateHeaderToken"
import api from "../../core/api"
import {
    TOKEN_LOCAL_STORAGE, TV_SHOW_SEASON_LIST_FILTER_REDUCER, TV_SHOW_SEASON_LIST_REDUCER, TV_SHOW_SEASON_SINGLE_REDUCER
} from "../../core/consts"

export const deleteAllByIdsInTvShowSeason = (ids: string[], callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.put("tvshowseason/delete", { tvShowSeasonId: JSON.stringify(ids) }).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const deleteByIdInTvShowSeason = (tvShowSeasonIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.delete(`tvshowseason/delete/${tvShowSeasonIdValue}`).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const updateEnabledByIdInTvShowSeason = (tvShowSeasonIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get(`tvshowseason/approved/${tvShowSeasonIdValue}`).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const updateByIdInTvShowSeason = (tvShowSeasonIdValue: string, nameValue: string, tvShowIdValue: string,
    callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.put(`tvshowseason/update/${tvShowSeasonIdValue}/${tvShowIdValue}`, { name: nameValue }).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const openInTvShowSeason = (tvShowSeasonIdValue: string, callbackSuccess: (() => void) | null,
    callbackError: (errorsMsg: string[]) => void) => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get(`tvshowseason/open/${tvShowSeasonIdValue}`).then(response => {
            if (response.data.status) {
                const dataApi = response.data.data
                dispatch({ type: TV_SHOW_SEASON_SINGLE_REDUCER, seasonSingle: dataApi })
                if (callbackSuccess !== null)
                    callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const createInTvShowSeason = (tvShowIdValue: string, nameValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.post(`tvshowseason/register/${tvShowIdValue}`, { name: nameValue }).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

function orderListInTvShowSeason(seasons) {
    return seasons.sort((seasonA, seasonB) => {
        const nameSeA = seasonA.name.substring(0, seasonA.name.indexOf("°"))
        const nameSeB = seasonB.name.substring(0, seasonB.name.indexOf("°"))
        if (parseInt(nameSeA, 10) > parseInt(nameSeB, 10)) {
            return 1
        }
        if (parseInt(nameSeA, 10) < parseInt(nameSeB, 10)) {
            return -1
        }
        return 0
    })
}

function searchListInTvShowSeason(seasons, search: string) {
    return seasons.filter(season => season.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
}

export const openAllNoMyTvShowInTvShowSeason = (tvShowIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void, searchTextValue = "") => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get(`tvshowseason/open/notmytvshow/${tvShowIdValue}`).then(response => {
            if (response.data.status) {
                const dataApi = response.data.datas
                const seasonsValue = dataApi
                let seasonsFilterValue = searchListInTvShowSeason(seasonsValue, searchTextValue)
                seasonsFilterValue = orderListInTvShowSeason(seasonsValue)
                dispatch({ type: TV_SHOW_SEASON_LIST_REDUCER, seasons: seasonsValue, seasonsFilter: seasonsFilterValue })
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            // window.location.href = "/failpage/error_api"
        })
    }

export const openAllByOrderAndSearchInTvShowSeason = (searchValue: string, seasonsGeneral: []) => async dispatch => {
    let seasonsValue = searchListInTvShowSeason(seasonsGeneral, searchValue)
    seasonsValue = orderListInTvShowSeason(seasonsValue)
    dispatch({ type: TV_SHOW_SEASON_LIST_FILTER_REDUCER, seasons: seasonsValue })
}

export const openAllInTvShowSeason = (tvShowIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void, searchTextValue = "") => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get(`tvshowseason/open/all/${tvShowIdValue}`).then(response => {
            if (response.data.status) {
                const dataApi = response.data.datas
                const seasonsValue = dataApi
                let seasonsFilterValue = searchListInTvShowSeason(seasonsValue, searchTextValue)
                seasonsFilterValue = orderListInTvShowSeason(seasonsFilterValue)
                dispatch({ type: TV_SHOW_SEASON_LIST_REDUCER, seasons: seasonsValue, seasonsFilter: seasonsFilterValue })
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }
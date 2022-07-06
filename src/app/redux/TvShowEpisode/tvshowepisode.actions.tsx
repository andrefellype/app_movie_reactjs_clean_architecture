import UpdateHeaderToken from "../../components/Utils/UpdateHeaderToken"
import api from "../../core/api"
import {
    TOKEN_LOCAL_STORAGE, TV_SHOW_EPISODE_LIST_FILTER_REDUCER, TV_SHOW_EPISODE_LIST_REDUCER, TV_SHOW_EPISODE_SINGLE_REDUCER
} from "../../core/consts"

export const deleteAllByIdsInTvShowEpisode = (ids: string[], callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.put("tvshowepisode/delete", { tvShowEpisodeId: JSON.stringify(ids) }).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const deleteByIdInTvShowEpisode = (tvShowEpisodeIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.delete(`tvshowepisode/delete/${tvShowEpisodeIdValue}`).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const updateEnabledByIdInTvShowEpisode = (tvShowEpisodeIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get(`tvshowepisode/approved/${tvShowEpisodeIdValue}`).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const updateByIdInTvShowEpisode = (tvShowEpisodeIdValue: string, nameValue: string,
    tvShowSeasonIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.put(`tvshowepisode/update/${tvShowEpisodeIdValue}/${tvShowSeasonIdValue}`, { name: nameValue }).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const openInTvShowEpisode = (tvShowEpisodeIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get(`tvshowepisode/open/${tvShowEpisodeIdValue}`).then(response => {
            if (response.data.status) {
                const dataApi = response.data.data
                dispatch({ type: TV_SHOW_EPISODE_SINGLE_REDUCER, episodeSingle: dataApi })
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const createInTvShowEpisode = (tvShowSeasonIdValue: string, nameValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.post(`tvshowepisode/register/${tvShowSeasonIdValue}`, { name: nameValue }).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

function searchListInTvShowEpisode(episodes, search: string) {
    return episodes.filter(episode => episode.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
}

function orderListInTvShowEpisode(episodes) {
    return episodes.sort((episodeA, episodeB) => {
        const nameEpA = episodeA.name.substring(0, episodeA.name.indexOf("°"))
        const nameEpB = episodeB.name.substring(0, episodeB.name.indexOf("°"))
        if (parseInt(nameEpA, 10) > parseInt(nameEpB, 10)) {
            return 1
        }
        if (parseInt(nameEpA, 10) < parseInt(nameEpB, 10)) {
            return -1
        }
        return 0
    })
}

export const openAllNoMyTvShowInTvShowEpisode = (tvShowSeasonIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void, searchTextValue = "") => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get(`tvshowepisode/open/notmytvshow/${tvShowSeasonIdValue}`).then(response => {
            if (response.data.status) {
                const dataApi = response.data.datas
                const episodesValue = dataApi
                let episodesFilterValue = searchListInTvShowEpisode(episodesValue, searchTextValue)
                episodesFilterValue = orderListInTvShowEpisode(episodesFilterValue)
                dispatch({ type: TV_SHOW_EPISODE_LIST_REDUCER, episodes: episodesValue, episodesFilter: episodesFilterValue })
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const openAllBySearchInTvShowEpisode = (searchValue: string, episodesGeneral: []) => async dispatch => {
    let episodesValue = searchListInTvShowEpisode(episodesGeneral, searchValue)
    episodesValue = orderListInTvShowEpisode(episodesValue)
    dispatch({ type: TV_SHOW_EPISODE_LIST_FILTER_REDUCER, episodes: episodesValue })
}

export const openAllInTvShowEpisode = (tvShowSeasonIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void, searchTextValue = "") => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get(`tvshowepisode/open/all/${tvShowSeasonIdValue}`).then(response => {
            if (response.data.status) {
                const dataApi = response.data.datas
                const episodesValue = dataApi
                let episodesFilterValue = searchListInTvShowEpisode(episodesValue, searchTextValue)
                episodesFilterValue = orderListInTvShowEpisode(episodesFilterValue)
                dispatch({ type: TV_SHOW_EPISODE_LIST_REDUCER, episodes: episodesValue, episodesFilter: episodesFilterValue })
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }
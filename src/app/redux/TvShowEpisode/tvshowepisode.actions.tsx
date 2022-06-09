import CryptographyConvert from "../../components/CryptographyConvert"
import api from "../../core/api"
import { TOKEN_LOCAL_STORAGE, TV_SHOW_EPISODE_LIST_FILTER_REDUCER, TV_SHOW_EPISODE_LIST_REDUCER, TV_SHOW_EPISODE_SINGLE_REDUCER } from "../../core/consts"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deleteSeveralTvShowEpisode = (ids: string[], callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
        const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
        api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
        await api.post("tvshowepisode/delete/several", { _ids: JSON.stringify(ids) }).then(response => {
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
export const deleteTvShowEpisode = (tvShowEpisodeIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("tvshowepisode/delete", { tvShowEpisodeId: tvShowEpisodeIdValue }).then(response => {
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
export const approvedTvShowEpisode = (tvShowEpisodeIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("tvshowepisode/approved/reviewed", { tvShowEpisodeId: tvShowEpisodeIdValue }).then(response => {
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
export const updateTvShowEpisode = (tvShowEpisodeIdValue: string, nameValue: string, tvShowSeasonIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const objectData = { tvShowEpisodeId: tvShowEpisodeIdValue, name: nameValue, tvShowSeasonId: tvShowSeasonIdValue }
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers['x-access-token'] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("tvshowepisode/update", objectData).then(response => {
        if (response.data.status) {
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

export const openTvShowEpisodeById = (tvShowEpisodeIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("tvshowepisode/open", { tvShowEpisodeId: tvShowEpisodeIdValue }).then(response => {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const registerTvShowEpisode = (tvShowSeasonIdValue: string, nameValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const objectData = { name: nameValue, tvShowSeasonId: tvShowSeasonIdValue }
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("tvshowepisode/register", objectData).then(response => {
        if (response.data.status) {
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

function searchTvShowEpisodes(episodes, search: string) {
    return episodes.filter(episode => episode.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
}

function orderTvShowEpisodes(episodes) {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTvShowEpisodeAllByNotMyTvShow = (tvShowSeasonIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void, searchTextValue = "") => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers['x-access-token'] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("tvshowepisode/open/all/notmytvshow", { tvShowSeasonId: tvShowSeasonIdValue }).then(response => {
        if (response.data.status) {
            const dataApi = response.data.datas
            const episodesValue = dataApi
            let episodesFilterValue = searchTvShowEpisodes(episodesValue, searchTextValue)
            episodesFilterValue = orderTvShowEpisodes(episodesFilterValue)
            dispatch({ type: TV_SHOW_EPISODE_LIST_REDUCER, episodes: episodesValue, episodesFilter: episodesFilterValue })
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

export const getTvShowEpisodeAllBySearch = (searchValue: string, episodesGeneral: []) => async dispatch => {
    let episodesValue = searchTvShowEpisodes(episodesGeneral, searchValue)
    episodesValue = orderTvShowEpisodes(episodesValue)
    dispatch({ type: TV_SHOW_EPISODE_LIST_FILTER_REDUCER, episodes: episodesValue })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTvShowEpisodeAll = (tvShowSeasonIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void, searchTextValue = "") => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers['x-access-token'] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("tvshowepisode/open/all", { tvShowSeasonId: tvShowSeasonIdValue }).then(response => {
        if (response.data.status) {
            const dataApi = response.data.datas
            const episodesValue = dataApi
            let episodesFilterValue = searchTvShowEpisodes(episodesValue, searchTextValue)
            episodesFilterValue = orderTvShowEpisodes(episodesFilterValue)
            dispatch({ type: TV_SHOW_EPISODE_LIST_REDUCER, episodes: episodesValue, episodesFilter: episodesFilterValue })
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}
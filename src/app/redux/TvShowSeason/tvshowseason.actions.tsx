import CryptographyConvert from "../../components/CryptographyConvert"
import api from "../../core/api"
import { TOKEN_LOCAL_STORAGE, TV_SHOW_SEASON_LIST_FILTER_REDUCER, TV_SHOW_SEASON_LIST_REDUCER, TV_SHOW_SEASON_SINGLE_REDUCER } from "../../core/consts"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deleteSeveralTvShowSeason = (ids: string[], callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("tvshowseason/delete/several", { _ids: JSON.stringify(ids) }).then(response => {
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
export const deleteTvShowSeason = (tvShowSeasonIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("tvshowseason/delete", { tvShowSeasonId: tvShowSeasonIdValue }).then(response => {
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
export const approvedTvShowSeason = (tvShowSeasonIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("tvshowseason/approved/reviewed", { tvShowSeasonId: tvShowSeasonIdValue }).then(response => {
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
export const updateTvShowSeason = (tvShowSeasonIdValue: string, nameValue: string, tvShowIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const objectData = { tvShowSeasonId: tvShowSeasonIdValue, name: nameValue, tvShowId: tvShowIdValue }
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers['x-access-token'] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("tvshowseason/update", objectData).then(response => {
        if (response.data.status) {
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

export const openTvShowSeasonById = (tvShowSeasonIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("tvshowseason/open", { tvShowSeasonId: tvShowSeasonIdValue }).then(response => {
        if (response.data.status) {
            const dataApi = response.data.data
            dispatch({ type: TV_SHOW_SEASON_SINGLE_REDUCER, seasonSingle: dataApi })
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const registerTvShowSeason = (tvShowIdValue: string, nameValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const objectData = { name: nameValue, tvShowId: tvShowIdValue }
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("tvshowseason/register", objectData).then(response => {
        if (response.data.status) {
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

function orderTvShowSeasons(seasons) {
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

function searchTvShowSeasons(seasons, search: string) {
    return seasons.filter(season => season.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTvShowSeasonAllByNotMyTvShow = (tvShowIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void, searchTextValue = "") => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers['x-access-token'] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("tvshowseason/open/all/notmytvshow", { tvShowId: tvShowIdValue }).then(response => {
        if (response.data.status) {
            const dataApi = response.data.datas
            const seasonsValue = dataApi
            let seasonsFilterValue = searchTvShowSeasons(seasonsValue, searchTextValue)
            seasonsFilterValue = orderTvShowSeasons(seasonsValue)
            dispatch({ type: TV_SHOW_SEASON_LIST_REDUCER, seasons: seasonsValue, seasonsFilter: seasonsFilterValue })
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

export const getTvShowSeasonAllBySearch = (searchValue: string, seasonsGeneral: []) => async dispatch => {
    let seasonsValue = searchTvShowSeasons(seasonsGeneral, searchValue)
    seasonsValue = orderTvShowSeasons(seasonsValue)
    dispatch({ type: TV_SHOW_SEASON_LIST_FILTER_REDUCER, seasons: seasonsValue })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTvShowSeasonAll = (tvShowIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void, searchTextValue = "") => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers['x-access-token'] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("tvshowseason/open/all", { tvShowId: tvShowIdValue }).then(response => {
        if (response.data.status) {
            const dataApi = response.data.datas
            const seasonsValue = dataApi
            let seasonsFilterValue = searchTvShowSeasons(seasonsValue, searchTextValue)
            seasonsFilterValue = orderTvShowSeasons(seasonsFilterValue)
            dispatch({ type: TV_SHOW_SEASON_LIST_REDUCER, seasons: seasonsValue, seasonsFilter: seasonsFilterValue })
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}
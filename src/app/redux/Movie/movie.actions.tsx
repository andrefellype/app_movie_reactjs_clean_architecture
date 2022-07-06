/* eslint-disable no-underscore-dangle */
import UpdateHeaderToken from "../../components/Utils/UpdateHeaderToken"
import api from "../../core/api"
import {
    MOVIE_LIST_FILTER_REDUCER, MOVIE_LIST_REDUCER, MOVIE_SINGLE_REDUCER, TOKEN_LOCAL_STORAGE
} from "../../core/consts"

export const deleteAllByIdsInMovie = (_ids: string[], callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.put("movie/delete", { movieId: JSON.stringify(_ids) }).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const deleteByIdInMovie = (movieIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.delete(`movie/delete/${movieIdValue}`).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const updateEnabledByIdInMovie = (movieIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get(`movie/approved/${movieIdValue}`).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const updateByIdInMovie = (movieIdValue: string, titleValue: string, releaseValue: string, directorsValue: [],
    castsValue: [], durationValue: string, categoriesValue: [], countriesValue: [], streamsValue: [], movieTheaterValue: string,
    resumeValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async () => {
        const objectData = {
            title: titleValue, release: releaseValue, directors: directorsValue, casts: castsValue,
            duration: durationValue, categories: categoriesValue, countries: countriesValue,
            streams: streamsValue, movieTheater: movieTheaterValue, resume: resumeValue
        }
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.put(`movie/update/${movieIdValue}`, objectData).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const openInMovie = (movieIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get(`movie/open/${movieIdValue}`).then(response => {
            if (response.data.status) {
                const dataApi = response.data.data
                dispatch({ type: MOVIE_SINGLE_REDUCER, movieSingle: dataApi })
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const createInMovie = (titleValue: string, releaseValue: string, directorsValue: [], castsValue: [],
    durationValue: string, categoriesValue: [], countriesValue: [], streamsValue: [], movieTheaterValue: string,
    resumeValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async () => {
        const objectData = {
            title: titleValue, release: releaseValue, directors: directorsValue, casts: castsValue, duration: durationValue,
            categories: categoriesValue, countries: countriesValue, streams: streamsValue, movieTheater: movieTheaterValue,
            resume: resumeValue
        }
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.post("movie/register", objectData).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

function orderListInMovie(movies, type: string) {
    return movies.sort((movieA, movieB) => {
        if (type === "title") {
            if (movieA.title.toLowerCase() > movieB.title.toLowerCase()) {
                return 1
            }
            if (movieA.title.toLowerCase() < movieB.title.toLowerCase()) {
                return -1
            }
        } else if (type === "releaseUp" || type === "releaseDown") {
            const statusOrder = type === "releaseUp"
            let yearA = movieA.release.length === 4 ? parseInt(movieA.release, 10) : 0
            let yearB = movieB.release.length === 4 ? parseInt(movieB.release, 10) : 0
            let monthA = 0
            let monthB = 0
            let dayA = 0
            let dayB = 0
            if (movieA.release.length === 7) {
                yearA = parseInt(movieA.release.substring(0, 4), 10)
                monthA = parseInt(movieA.release.substring(5, 7), 10)
            }
            if (movieB.release.length === 7) {
                yearB = parseInt(movieB.release.substring(0, 4), 10)
                monthB = parseInt(movieB.release.substring(5, 7), 10)
            }
            if (movieA.release.length === 10) {
                yearA = parseInt(movieA.release.substring(0, 4), 10)
                monthA = parseInt(movieA.release.substring(5, 7), 10)
                dayA = parseInt(movieA.release.substring(8, 10), 10)
            }
            if (movieB.release.length === 10) {
                yearB = parseInt(movieB.release.substring(0, 4), 10)
                monthB = parseInt(movieB.release.substring(5, 7), 10)
                dayB = parseInt(movieB.release.substring(8, 10), 10)
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
        } else if (type === "durationUp" || type === "durationDown") {
            const statusOrder = type === "durationUp"
            const hourA = parseInt(movieA.duration.substring(0, 2), 10)
            const hourB = parseInt(movieB.duration.substring(0, 2), 10)
            const minuteA = parseInt(movieA.duration.substring(3, 5), 10)
            const minuteB = parseInt(movieB.duration.substring(3, 5), 10)
            if (hourA > hourB) return statusOrder ? 1 : -1
            if (hourA < hourB) return statusOrder ? -1 : 1
            if (hourA === hourB) {
                if (minuteA > minuteB) return statusOrder ? 1 : -1
                if (minuteA < minuteB) return statusOrder ? -1 : 1
            }
        }
        return 0
    })
}

function searchListInMovie(movies, search: string) {
    return movies.filter(movie => movie.title.toLowerCase().indexOf(search.toLowerCase()) > -1)
}

function filterRelease(release: string, movie) {
    if (release.length === 4) {
        return release === movie.release.substring(0, 4)
    }
    if (release.length === 7) {
        return release === movie.release.substring(0, 7)
    }
    if (release.length === 10) {
        return release === movie.release.substring(0, 10)
    }
    return false
}

function filterDuration(durationMin: string, durationMax: string, movie) {
    const hourMovie = parseInt(movie.duration.substring(0, 2), 10)
    const minuteMovie = parseInt(movie.duration.substring(3, 5), 10)

    let statusDurationMin = true
    if (durationMin.length > 0) {
        const hourMin = parseInt(durationMin.substring(0, 2), 10)
        const minuteMin = parseInt(durationMin.substring(3, 5), 10)
        statusDurationMin = (hourMovie > hourMin) || (hourMovie === hourMin && minuteMovie >= minuteMin)
    }

    let statusDurationMax = true
    if (durationMax.length > 0) {
        const hourMax = parseInt(durationMax.substring(0, 2), 10)
        const minuteMax = parseInt(durationMax.substring(3, 5), 10)
        statusDurationMax = (hourMovie < hourMax) || (hourMovie === hourMax && minuteMovie <= minuteMax)
    }
    return statusDurationMin && statusDurationMax
}

function filterListInMovie(movies, categoryId: string, release: string, durationMin: string,
    durationMax: string, countryId: string) {
    return movies.filter(movie => {
        if (
            (categoryId.length === 0 || ((categoryId === "-1" && movie.categories_id.length === 0)
                || (movie.categories_id.filter(c => c === categoryId).length > 0))) &&
            (release.length === 0 || filterRelease(release, movie)) && filterDuration(durationMin, durationMax, movie) &&
            (countryId.length === 0 || ((countryId === "-1" && movie.countries_id.length === 0)
                || (movie.countries_id.filter(c => c === countryId).length > 0)))
        ) {
            return true
        }
        return false
    })
}

export const openAllNoMyMovieInMovie = (callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void, searchTextValue = "") => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get("movie/notmymovie/open").then(response => {
            if (response.data.status) {
                const dataApi = response.data.datas
                const moviesValue = dataApi
                let moviesFilterValue = searchListInMovie(moviesValue, searchTextValue)
                moviesFilterValue = orderListInMovie(moviesFilterValue, "title")
                dispatch({ type: MOVIE_LIST_REDUCER, movies: moviesValue, moviesFilter: moviesFilterValue })
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const openAllDetailInMovie = (moviesGeneral, moviesPagination, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async dispatch => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const idsMovie: any[] = []
        for (let mg = 0; mg < moviesGeneral.length; mg++) {
            let statusDetails = false
            for (let m = 0; m < moviesPagination.length; m++) {
                if (moviesPagination[m]._id === moviesGeneral[mg]._id) {
                    statusDetails = true
                }
            }
            if (statusDetails) {
                idsMovie.push(moviesGeneral[mg]._id)
            }
        }
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.post("movie/open/details/all", { movieIds: idsMovie }).then(response => {
            if (response.data.status) {
                const moviesData = response.data.datas
                const moviesNew = moviesGeneral.map(m => {
                    const moviesDataFilter = moviesData.filter(md => md._id === m._id)
                    if (moviesDataFilter.length > 0)
                        return moviesDataFilter[0]
                    return m
                })
                dispatch({ type: MOVIE_LIST_FILTER_REDUCER, movies: moviesNew })
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const openAllByOrderAndSearchAndFilterInMovie = (orderValue: string, searchValue: string,
    categoryValue: string, releaseValue: string, durationMinValue: string, durationMaxValue: string,
    countryValue: string, moviesGeneral: []) => async dispatch => {
        let moviesValue = filterListInMovie(moviesGeneral, categoryValue, releaseValue, durationMinValue, durationMaxValue, countryValue)
        moviesValue = searchListInMovie(moviesValue, searchValue)
        moviesValue = orderListInMovie(moviesValue, orderValue)
        dispatch({ type: MOVIE_LIST_FILTER_REDUCER, movies: moviesValue })
    }

export const openAllInMovie = (callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void,
    orderValue = "title", searchTextValue = "", categoryValue = "", releaseValue = "", durationMinValue = "",
    durationMaxValue = "", countryValue = "") => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get("movie/open").then(response => {
            if (response.data.status) {
                const dataApi = response.data.datas
                const moviesValue = dataApi
                let moviesFilterValue = filterListInMovie(moviesValue, categoryValue, releaseValue, durationMinValue, durationMaxValue, countryValue)
                moviesFilterValue = searchListInMovie(moviesFilterValue, searchTextValue)
                moviesFilterValue = orderListInMovie(moviesFilterValue, orderValue)
                dispatch({ type: MOVIE_LIST_REDUCER, movies: moviesValue, moviesFilter: moviesFilterValue })
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const clearAllInMovie = () => async dispatch => {
    dispatch({ type: MOVIE_LIST_REDUCER, movies: [], moviesFilter: [] })
}
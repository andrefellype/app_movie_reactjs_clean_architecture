/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
import UpdateHeaderToken from "../../components/Utils/UpdateHeaderToken"
import api from "../../core/api"
import { MY_MOVIE_LIST_FILTER_REDUCER, MY_MOVIE_LIST_REDUCER, TOKEN_LOCAL_STORAGE } from "../../core/consts"

export const deleteByMovieIdInMyMovie = (movieIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.delete(`mymovie/delete/${movieIdValue}`).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const createInMyMovie = (movieIdValue: string, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get(`mymovie/register/${movieIdValue}`).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

function orderListInMyMovie(myMovies, type: string) {
    return myMovies.sort((myMovieA, myMovieB) => {
        if (myMovieA.movie !== null && myMovieB.movie !== null) {
            if (type === "title") {
                if (myMovieA.movie.title.toLowerCase() > myMovieB.movie.title.toLowerCase()) {
                    return 1
                }
                if (myMovieA.movie.title.toLowerCase() < myMovieB.movie.title.toLowerCase()) {
                    return -1
                }
            } else if (type === "releaseUp" || type === "releaseDown") {
                const statusOrder = type === "releaseUp"
                let yearA = myMovieA.movie.release.length === 4 ? parseInt(myMovieA.movie.release, 10) : 0
                let yearB = myMovieB.movie.release.length === 4 ? parseInt(myMovieB.movie.release, 10) : 0
                let monthA = 0
                let monthB = 0
                let dayA = 0
                let dayB = 0
                if (myMovieA.movie.release.length === 7) {
                    yearA = parseInt(myMovieA.movie.release.substring(0, 4), 10)
                    monthA = parseInt(myMovieA.movie.release.substring(5, 7), 10)
                }
                if (myMovieB.movie.release.length === 7) {
                    yearB = parseInt(myMovieB.movie.release.substring(0, 4), 10)
                    monthB = parseInt(myMovieB.movie.release.substring(5, 7), 10)
                }
                if (myMovieA.movie.release.length === 10) {
                    yearA = parseInt(myMovieA.movie.release.substring(0, 4), 10)
                    monthA = parseInt(myMovieA.movie.release.substring(5, 7), 10)
                    dayA = parseInt(myMovieA.movie.release.substring(8, 10), 10)
                }
                if (myMovieB.movie.release.length === 10) {
                    yearB = parseInt(myMovieB.movie.release.substring(0, 4), 10)
                    monthB = parseInt(myMovieB.movie.release.substring(5, 7), 10)
                    dayB = parseInt(myMovieB.movie.release.substring(8, 10), 10)
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
                const hourA = parseInt(myMovieA.movie.duration.substring(0, 2), 10)
                const hourB = parseInt(myMovieB.movie.duration.substring(0, 2), 10)
                const minuteA = parseInt(myMovieA.movie.duration.substring(3, 5), 10)
                const minuteB = parseInt(myMovieB.movie.duration.substring(3, 5), 10)
                if (hourA > hourB) return statusOrder ? 1 : -1
                if (hourA < hourB) return statusOrder ? -1 : 1
                if (hourA === hourB) {
                    if (minuteA > minuteB) return statusOrder ? 1 : -1
                    if (minuteA < minuteB) return statusOrder ? -1 : 1
                }
            }
        }
        return 0
    })
}

function searchListInMyMovie(myMovies, search: string) {
    return myMovies.filter(myMovie => (myMovie.movie !== null
        && myMovie.movie.title.toLowerCase().indexOf(search.toLowerCase()) > -1))
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

function filterListInMyMovie(myMovies, categoryId: string, release: string, durationMin: string, durationMax: string, countryId: string) {
    return myMovies.filter(myMovie => {
        if (
            (categoryId.length === 0 || ((categoryId === "-1" && myMovie.movie.categories_id.length === 0)
                || (myMovie.movie.categories_id.filter(c => c === categoryId).length > 0))) &&
            (release.length === 0 || filterRelease(release, myMovie.movie))
            && filterDuration(durationMin, durationMax, myMovie.movie) &&
            (countryId.length === 0 || ((countryId === "-1" && myMovie.movie.countries_id.length === 0) ||
                (myMovie.movie.countries_id.filter(c => c === countryId).length > 0)))
        ) {
            return true
        }
        return false
    })
}

export const openAllDetailInMyMovie = (myMoviesGeneral, myMoviesPagination, callbackSuccess: () => void,
    callbackError: (errorsMsg: string[]) => void) => async dispatch => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const idsMovie: any[] = []
        for (let mg = 0; mg < myMoviesGeneral.length; mg++) {
            let statusDetails = false
            for (let m = 0; m < myMoviesPagination.length; m++) {
                if (myMoviesPagination[m].movie_id === myMoviesGeneral[mg].movie_id) {
                    statusDetails = true
                }
            }
            if (statusDetails) {
                idsMovie.push(myMoviesGeneral[mg].movie_id)
            }
        }
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.post("movie/open/details/all", { movieIds: idsMovie }).then(response => {
            if (response.data.status) {
                const moviesData = response.data.datas
                const moviesNew = myMoviesGeneral.map(m => {
                    const moviesDataFilter = moviesData.filter(md => md._id === m.movie_id)
                    if (moviesDataFilter.length > 0)
                        m.movie = moviesDataFilter[0]
                    return m
                })
                dispatch({ type: MY_MOVIE_LIST_FILTER_REDUCER, myMovies: moviesNew })
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const openAllByOrderAndSearchAndFilterInMyMovie = (orderValue: string, searchValue: string, categoryValue: string,
    releaseValue: string, durationMinValue: string, durationMaxValue: string, countryValue: string, myMoviesGeneral: []) => async dispatch => {
        let myMoviesValue = filterListInMyMovie(myMoviesGeneral, categoryValue, releaseValue, durationMinValue, durationMaxValue, countryValue)
        myMoviesValue = searchListInMyMovie(myMoviesValue, searchValue)
        myMoviesValue = orderListInMyMovie(myMoviesValue, orderValue)
        dispatch({ type: MY_MOVIE_LIST_FILTER_REDUCER, myMovies: myMoviesValue })
    }

export const openAllInMyMovie = (callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void, orderValue = "title",
    searchTextValue = "", categoryValue = "", releaseValue = "", durationMinValue = "", durationMaxValue = "", countryValue = "") => async dispatch => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get("mymovie/open").then(response => {
            if (response.data.status) {
                const dataApi = response.data.datas
                const myMoviesValue = dataApi
                let myMoviesFilterValue = filterListInMyMovie(myMoviesValue, categoryValue, releaseValue, durationMinValue, durationMaxValue, countryValue)
                myMoviesFilterValue = searchListInMyMovie(myMoviesFilterValue, searchTextValue)
                myMoviesFilterValue = orderListInMyMovie(myMoviesValue, orderValue)
                dispatch({ type: MY_MOVIE_LIST_REDUCER, myMovies: myMoviesValue, myMoviesFilter: myMoviesFilterValue })
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }

export const clearAllInMyMovie = () => async dispatch => {
    dispatch({ type: MY_MOVIE_LIST_REDUCER, myMovies: [], myMoviesFilter: [] })
}
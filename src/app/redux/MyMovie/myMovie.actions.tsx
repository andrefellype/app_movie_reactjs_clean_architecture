import CryptographyConvert from "../../components/CryptographyConvert"
import api from "../../core/api"
import { MY_MOVIE_LIST_FILTER_REDUCER, MY_MOVIE_LIST_REDUCER, TOKEN_LOCAL_STORAGE } from "../../core/consts"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deleteMyMovie = (movieIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("mymovie/delete", { movieId: movieIdValue }).then(response => {
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
export const registerNeverWatchMovie = (movieIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const objectData = { movieId: movieIdValue }
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("mymovie/register/notwatch", objectData).then(response => {
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
export const registerMyMovie = (movieIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const objectData = { movieId: movieIdValue }
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("mymovie/register", objectData).then(response => {
        if (response.data.status) {
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

function orderMovies(myMovies, type: string) {
    return myMovies.sort((myMovieA, myMovieB) => {
        if (myMovieA.movie !== null && myMovieB.movie !== null) {
            if (type === "title") {
                if (myMovieA.movie.title.toLowerCase() > myMovieB.movie.title.toLowerCase()) {
                    return 1
                }
                if (myMovieA.movie.title.toLowerCase() < myMovieB.movie.title.toLowerCase()) {
                    return -1
                }
            } else if (type === "category") {
                const categoryA = myMovieA.movie.categories.length > 0 ? myMovieA.movie.categories.reduce((actual, categoryObA) => `${actual.length > 0 ? `${actual}, ` : ""}${categoryObA.name}`, "") : "SEM CATEGORIA"
                const categoryB = myMovieB.movie.categories.length > 0 ? myMovieB.movie.categories.reduce((actual, categoryObB) => `${actual.length > 0 ? `${actual}, ` : ""}${categoryObB.name}`, "") : "SEM CATEGORIA"
                if (categoryA.toLowerCase() > categoryB.toLowerCase()) {
                    return 1
                }
                if (categoryA.toLowerCase() < categoryB.toLowerCase()) {
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
            } else if (type === "country") {
                const countryA = myMovieA.movie.countries.length > 0 ? myMovieA.movie.countries.reduce((actual, countryObA) => `${actual.length > 0 ? `${actual}, ` : ""}${countryObA.name}`, "") : "SEM PAÍS DE ORIGEM"
                const countryB = myMovieB.movie.countries.length > 0 ? myMovieB.movie.countries.reduce((actual, countryObB) => `${actual.length > 0 ? `${actual}, ` : ""}${countryObB.name}`, "") : "SEM PAÍS DE ORIGEM"
                if (countryA.toLowerCase() > countryB.toLowerCase()) {
                    return 1
                }
                if (countryA.toLowerCase() < countryB.toLowerCase()) {
                    return -1
                }
            }
        }
        return 0
    })
}

function searchMovies(myMovies, search: string) {
    return myMovies.filter(myMovie => (myMovie.movie !== null && myMovie.movie.title.toLowerCase().indexOf(search.toLowerCase()) > -1))
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

function filterMovies(myMovies, categoryId: string, release: string, durationMin: string, durationMax: string, countryId: string) {
    return myMovies.filter(myMovie => {
        if (
            (categoryId.length === 0 || ((categoryId === "-1" && myMovie.movie.categories_id.length === 0) || (myMovie.movie.categories_id.filter(c => c === categoryId).length > 0))) &&
            (release.length === 0 || filterRelease(release, myMovie.movie)) && filterDuration(durationMin, durationMax, myMovie.movie) &&
            (countryId.length === 0 || ((countryId === "-1" && myMovie.movie.countries_id.length === 0) || (myMovie.movie.countries_id.filter(c => c === countryId).length > 0)))
        ) {
            return true
        }
        return false
    })
}

export const getMyMovieAllByOrderAndSearchAndFilter = (orderValue: string, searchValue: string, categoryValue: string, releaseValue: string, durationMinValue: string, durationMaxValue: string, countryValue: string, myMoviesGeneral: []) => async dispatch => {
    let myMoviesValue = filterMovies(myMoviesGeneral, categoryValue, releaseValue, durationMinValue, durationMaxValue, countryValue)
    myMoviesValue = searchMovies(myMoviesValue, searchValue)
    myMoviesValue = orderMovies(myMoviesValue, orderValue)
    dispatch({ type: MY_MOVIE_LIST_FILTER_REDUCER, myMovies: myMoviesValue })
}

export const getMyMovieAll = (callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void, orderValue = "title", searchTextValue = "", categoryValue = "", releaseValue = "", durationMinValue = "", durationMaxValue = "", countryValue = "") => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers['x-access-token'] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("mymovie/open/all", { object: { category: true, country: true } }).then(response => {
        if (response.data.status) {
            const dataApi = response.data.datas
            const myMoviesValue = dataApi
            let myMoviesFilterValue = filterMovies(myMoviesValue, categoryValue, releaseValue, durationMinValue, durationMaxValue, countryValue)
            myMoviesFilterValue = searchMovies(myMoviesFilterValue, searchTextValue)
            myMoviesFilterValue = orderMovies(myMoviesValue, orderValue)
            dispatch({ type: MY_MOVIE_LIST_REDUCER, myMovies: myMoviesValue, myMoviesFilter: myMoviesFilterValue })
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}
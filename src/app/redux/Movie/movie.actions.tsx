import CryptographyConvert from "../../components/CryptographyConvert"
import api from "../../core/api"
import { MOVIE_LIST_FILTER_REDUCER, MOVIE_LIST_REDUCER, MOVIE_SINGLE_REDUCER, TOKEN_LOCAL_STORAGE } from "../../core/consts"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deleteSeveralMovie = (_ids: string[], callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("movie/delete/several", { _ids: JSON.stringify(_ids) }).then(response => {
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
export const deleteMovie = (movieIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("movie/delete", { movieId: movieIdValue }).then(response => {
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
export const approvedReviewedMovie = (movieIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("movie/approved/reviewed", { movieId: movieIdValue }).then(response => {
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
export const updateMovie = (movieIdValue: string, titleValue: string, releaseValue: string, directorsValue: [], castsValue: [], durationValue: string, categoriesValue: [], countriesValue: [], streamsValue: [], movieTheaterValue: string, resumeValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const objectData = {
        movieId: movieIdValue, title: titleValue, release: releaseValue, directors: directorsValue, casts: castsValue, duration: durationValue,
        categories: categoriesValue, countries: countriesValue, streams: streamsValue, movieTheater: movieTheaterValue, resume: resumeValue
    }
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers['x-access-token'] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("movie/update", objectData).then(response => {
        if (response.data.status) {
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

export const openMovieById = (movieIdValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("movie/open", { movieId: movieIdValue }).then(response => {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const registerMovie = (titleValue: string, releaseValue: string, directorsValue: [], castsValue: [], durationValue: string, categoriesValue: [], countriesValue: [], streamsValue: [], movieTheaterValue: string, resumeValue: string, callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async dispatch => {
    const objectData = {
        title: titleValue, release: releaseValue, directors: directorsValue, casts: castsValue, duration: durationValue,
        categories: categoriesValue, countries: countriesValue, streams: streamsValue, movieTheater: movieTheaterValue, resume: resumeValue
    }
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers["x-access-token"] = token !== null ? CryptographyConvert("base64", token, "decode") : token
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

function orderMovies(movies, type: string) {
    return movies.sort((movieA, movieB) => {
        if (type === "title") {
            if (movieA.title.toLowerCase() > movieB.title.toLowerCase()) {
                return 1
            }
            if (movieA.title.toLowerCase() < movieB.title.toLowerCase()) {
                return -1
            }
        } else if (type === "category") {
            const categoryA = movieA.categories.length > 0 ? movieA.categories.reduce((actual, categoryObA) => `${actual.length > 0 ? `${actual}, ` : ""}${categoryObA.name}`, "") : "SEM CATEGORIA"
            const categoryB = movieB.categories.length > 0 ? movieB.categories.reduce((actual, categoryObB) => `${actual.length > 0 ? `${actual}, ` : ""}${categoryObB.name}`, "") : "SEM CATEGORIA"
            if (categoryA.toLowerCase() > categoryB.toLowerCase()) {
                return 1
            }
            if (categoryA.toLowerCase() < categoryB.toLowerCase()) {
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
        } else if (type === "country") {
            const countryA = movieA.countries.length > 0 ? movieA.countries.reduce((actual, countryObA) => `${actual.length > 0 ? `${actual}, ` : ""}${countryObA.name}`, "") : "SEM PAÍS DE ORIGEM"
            const countryB = movieB.countries.length > 0 ? movieB.countries.reduce((actual, countryObB) => `${actual.length > 0 ? `${actual}, ` : ""}${countryObB.name}`, "") : "SEM PAÍS DE ORIGEM"
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

function searchMovies(movies, search: string) {
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

function filterMovies(movies, categoryId: string, release: string, durationMin: string, durationMax: string, countryId: string) {
    return movies.filter(movie => {
        if (
            (categoryId.length === 0 || ((categoryId === "-1" && movie.categories_id.length === 0) || (movie.categories_id.filter(c => c === categoryId).length > 0))) &&
            (release.length === 0 || filterRelease(release, movie)) && filterDuration(durationMin, durationMax, movie) &&
            (countryId.length === 0 || ((countryId === "-1" && movie.countries_id.length === 0) || (movie.countries_id.filter(c => c === countryId).length > 0)))
        ) {
            return true
        }
        return false
    })
}

export const getMovieAllByNotMyMovie = (callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void, searchTextValue = "") => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers['x-access-token'] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("movie/open/all/notmymovie", { object: { category: true, country: true } }).then(response => {
        if (response.data.status) {
            const dataApi = response.data.datas
            const moviesValue = dataApi
            let moviesFilterValue = searchMovies(moviesValue, searchTextValue)
            moviesFilterValue = orderMovies(moviesFilterValue, "title")
            dispatch({ type: MOVIE_LIST_REDUCER, movies: moviesValue, moviesFilter: moviesFilterValue })
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}

export const getMovieAllByOrderAndSearchAndFilter = (orderValue: string, searchValue: string, categoryValue: string, releaseValue: string, durationMinValue: string, durationMaxValue: string, countryValue: string, moviesGeneral: []) => async dispatch => {
    let moviesValue = filterMovies(moviesGeneral, categoryValue, releaseValue, durationMinValue, durationMaxValue, countryValue)
    moviesValue = searchMovies(moviesValue, searchValue)
    moviesValue = orderMovies(moviesValue, orderValue)
    dispatch({ type: MOVIE_LIST_FILTER_REDUCER, movies: moviesValue })
}

export const getMovieAll = (callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void, orderValue = "title", searchTextValue = "", categoryValue = "", releaseValue = "", durationMinValue = "", durationMaxValue = "", countryValue = "") => async dispatch => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    api.defaults.headers['x-access-token'] = token !== null ? CryptographyConvert("base64", token, "decode") : token
    await api.post("movie/open/all", { object: { category: true, country: true } }).then(response => {
        if (response.data.status) {
            const dataApi = response.data.datas
            const moviesValue = dataApi
            let moviesFilterValue = filterMovies(moviesValue, categoryValue, releaseValue, durationMinValue, durationMaxValue, countryValue)
            moviesFilterValue = searchMovies(moviesFilterValue, searchTextValue)
            moviesFilterValue = orderMovies(moviesFilterValue, orderValue)
            dispatch({ type: MOVIE_LIST_REDUCER, movies: moviesValue, moviesFilter: moviesFilterValue })
            callbackSuccess()
        } else {
            callbackError(response.data.errors.map(erro => `${erro.msg}`))
        }
    }).catch(() => {
        window.location.href = "/failpage/error_api"
    })
}
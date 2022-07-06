import {
    MOVIE_LIST_FILTER_REDUCER, MOVIE_LIST_REDUCER, MOVIE_SINGLE_REDUCER
} from "../../core/consts"

const movie = function (state: {
    movie: null, movies: [], moviesFilter: []
}, action) {
    switch (action.type) {
        case MOVIE_LIST_FILTER_REDUCER:
            return {
                ...state,
                moviesFilter: action.movies
            }
        case MOVIE_LIST_REDUCER:
            return {
                ...state,
                moviesFilter: action.moviesFilter,
                movies: action.movies
            }
        case MOVIE_SINGLE_REDUCER:
            return { ...state, movie: action.movieSingle }
        default:
            return { ...state }
    }
}

export default movie
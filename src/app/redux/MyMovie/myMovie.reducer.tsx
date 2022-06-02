import { MY_MOVIE_LIST_FILTER_REDUCER, MY_MOVIE_LIST_REDUCER } from "../../core/consts"

const mymovie = function (state: { myMovies: [], myMoviesFilter: [] }, action) {
    switch (action.type) {
        case MY_MOVIE_LIST_FILTER_REDUCER:
            return {
                ...state,
                myMoviesFilter: action.myMovies
            }
        case MY_MOVIE_LIST_REDUCER:
            return {
                ...state,
                myMoviesFilter: action.myMoviesFilter,
                myMovies: action.myMovies
            }
        default:
            return { ...state }
    }
}

export default mymovie
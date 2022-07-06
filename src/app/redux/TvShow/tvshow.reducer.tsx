import {
    TV_SHOW_LIST_FILTER_REDUCER, TV_SHOW_LIST_REDUCER, TV_SHOW_SINGLE_REDUCER
} from "../../core/consts"

const tvshow = function (state: {
    tvShow: null, tvShows: [], tvShowsFilter: []
}, action) {
    switch (action.type) {
        case TV_SHOW_LIST_FILTER_REDUCER:
            return {
                ...state,
                tvShowsFilter: action.tvShows
            }
        case TV_SHOW_LIST_REDUCER:
            return {
                ...state,
                tvShowsFilter: action.tvShowsFilter,
                tvShows: action.tvShows
            }
        case TV_SHOW_SINGLE_REDUCER:
            return { ...state, tvShow: action.tvShowSingle }
        default:
            return { ...state }
    }
}

export default tvshow
import {
    TV_SHOW_SEASON_LIST_FILTER_REDUCER, TV_SHOW_SEASON_LIST_REDUCER, TV_SHOW_SEASON_SINGLE_REDUCER
} from "../../core/consts"

const tvshowseason = function (state: {
    season: null, seasons: [], seasonsFilter: []
}, action) {
    switch (action.type) {
        case TV_SHOW_SEASON_LIST_FILTER_REDUCER:
            return {
                ...state,
                seasonsFilter: action.seasons
            }
        case TV_SHOW_SEASON_LIST_REDUCER:
            return {
                ...state,
                seasonsFilter: action.seasonsFilter,
                seasons: action.seasons
            }
        case TV_SHOW_SEASON_SINGLE_REDUCER:
            return { ...state, season: action.seasonSingle }
        default:
            return { ...state }
    }
}

export default tvshowseason
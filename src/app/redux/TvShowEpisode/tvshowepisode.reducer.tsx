import {
    TV_SHOW_EPISODE_LIST_FILTER_REDUCER, TV_SHOW_EPISODE_LIST_REDUCER, TV_SHOW_EPISODE_SINGLE_REDUCER
} from "../../core/consts"

const tvshowepisode = function (state: {
    episode: null, episodes: [], episodesFilter: []
}, action) {
    switch (action.type) {
        case TV_SHOW_EPISODE_LIST_FILTER_REDUCER:
            return {
                ...state,
                episodesFilter: action.episodes
            }
        case TV_SHOW_EPISODE_LIST_REDUCER:
            return {
                ...state,
                episodesFilter: action.episodesFilter,
                episodes: action.episodes
            }
        case TV_SHOW_EPISODE_SINGLE_REDUCER:
            return { ...state, episode: action.episodeSingle }
        default:
            return { ...state }
    }
}

export default tvshowepisode
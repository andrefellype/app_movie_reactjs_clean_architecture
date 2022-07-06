import { MY_TV_SHOW_LIST_FILTER_REDUCER, MY_TV_SHOW_LIST_REDUCER } from "../../core/consts"

const mytvshow = function (state: {
    myTvShows: [], myTvShowsFilter: []
}, action) {
    switch (action.type) {
        case MY_TV_SHOW_LIST_FILTER_REDUCER:
            return {
                ...state,
                myTvShowsFilter: action.myTvShows
            }
        case MY_TV_SHOW_LIST_REDUCER:
            return {
                ...state,
                myTvShowsFilter: action.myTvShowsFilter,
                myTvShows: action.myTvShows
            }
        default:
            return { ...state }
    }
}

export default mytvshow
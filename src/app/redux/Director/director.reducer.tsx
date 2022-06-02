import { DIRECTOR_LIST_FILTER_REDUCER, DIRECTOR_LIST_REDUCER, DIRECTOR_SINGLE_REDUCER } from "../../core/consts"

const director = function (state: { director: null, directors: [], directorsFilter: [] }, action) {
    switch (action.type) {
        case DIRECTOR_LIST_FILTER_REDUCER:
            return {
                ...state,
                directorsFilter: action.directors
            }
        case DIRECTOR_LIST_REDUCER:
            return {
                ...state,
                directorsFilter: action.directorsFilter,
                directors: action.directors
            }
        case DIRECTOR_SINGLE_REDUCER:
            return { ...state, director: action.directorSingle }
        default:
            return { ...state }
    }
}

export default director
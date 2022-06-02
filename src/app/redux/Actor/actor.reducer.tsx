import { ACTOR_LIST_FILTER_REDUCER, ACTOR_LIST_REDUCER, ACTOR_SINGLE_REDUCER } from "../../core/consts"

const actor = function (state: { actor: null, actors: [], actorsFilter: [] }, action) {
    switch (action.type) {
        case ACTOR_LIST_FILTER_REDUCER:
            return {
                ...state,
                actorsFilter: action.actors
            }
        case ACTOR_LIST_REDUCER:
            return {
                ...state,
                actorsFilter: action.actorsFilter,
                actors: action.actors
            }
        case ACTOR_SINGLE_REDUCER:
            return { ...state, actor: action.actorSingle }
        default:
            return { ...state }
    }
}

export default actor
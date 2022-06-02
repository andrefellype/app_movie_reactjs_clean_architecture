import { STREAM_LIST_FILTER_REDUCER, STREAM_LIST_REDUCER, STREAM_SINGLE_REDUCER } from "../../core/consts"

const stream = function (state: { stream: null, streams: [], streamsFilter: [] }, action) {
    switch (action.type) {
        case STREAM_LIST_FILTER_REDUCER:
            return {
                ...state,
                streamsFilter: action.streams
            }
        case STREAM_LIST_REDUCER:
            return {
                ...state,
                streamsFilter: action.streamsFilter,
                streams: action.streams
            }
        case STREAM_SINGLE_REDUCER:
            return { ...state, stream: action.streamSingle }
        default:
            return { ...state }
    }
}

export default stream
import { LOADING_SHOW_REDUCER } from "../../core/consts"

const loadingMain = function (state: { status: false, title: "" }, action) {
    switch (action.type) {
        case LOADING_SHOW_REDUCER:
            return {
                ...state,
                status: action.status,
                title: action.title
            }
        default:
            return { ...state }
    }
}

export default loadingMain
import { LOADING_SHOW_PATTERN_REDUCER, LOADING_SHOW_TABLE_REDUCER } from "../../core/consts"

const utilsAppReduxLoading = function (state: { statusPattern: false, titlePattern: "", statusTable: false, titleTable: "" }, action) {
    switch (action.type) {
        case LOADING_SHOW_TABLE_REDUCER:
            return {
                ...state,
                statusTable: action.status,
                titleTable: action.title
            }
        case LOADING_SHOW_PATTERN_REDUCER:
            return {
                ...state,
                statusPattern: action.status,
                titlePattern: action.title
            }
        default:
            return { ...state }
    }
}

export default utilsAppReduxLoading
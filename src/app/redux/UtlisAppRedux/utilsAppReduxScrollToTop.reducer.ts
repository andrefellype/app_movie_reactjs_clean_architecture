import { SCROLL_TO_TOP_REDUCER } from "../../core/consts"

const utilsAppReduxScrollToTop = function (state: { scrollToTop: true }, action) {
    switch (action.type) {
        case SCROLL_TO_TOP_REDUCER:
            return { ...state, scrollToTop: action.status }
        default:
            return { ...state }
    }
}

export default utilsAppReduxScrollToTop
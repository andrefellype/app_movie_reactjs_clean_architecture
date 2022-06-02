import { APP_INFORMATION_REDUCER } from "../../core/consts"

const app = function (state: { informationApp: null }, action) {
    switch (action.type) {
        case APP_INFORMATION_REDUCER:
            return { ...state, informationApp: action.information }
        default:
            return { ...state }
    }
}

export default app
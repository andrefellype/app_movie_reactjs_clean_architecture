import { ABOUT_US_SINGLE_REDUCER } from "../../core/consts"

const aboutUs = function (state: { aboutUs: null }, action) {
    switch (action.type) {
        case ABOUT_US_SINGLE_REDUCER:
            return { ...state, aboutUs: action.aboutUs }
        default:
            return { ...state }
    }
}

export default aboutUs
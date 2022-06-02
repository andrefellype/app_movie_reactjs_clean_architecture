import { MSG_ALERT_REDUCER, FAIL_PAGE_REDUCER } from "../../core/consts"

const msgAlert = function (state: { title: null, icon: null, type: 'message', msgs: [], confirmButton: null }, action) {
    switch (action.type) {
        case FAIL_PAGE_REDUCER:
            return {
                ...state,
                type: "fail_page",
                msgs: action.msgsList
            }
        case MSG_ALERT_REDUCER:
            return {
                ...state,
                type: "message",
                icon: action.iconValue,
                title: action.titleValue,
                msgs: action.msgsList,
                confirmButton: action.confirmButton
            }
        default:
            return { title: null, icon: null, type: 'message', msgs: [], confirmButton: null }
    }
}

export default msgAlert
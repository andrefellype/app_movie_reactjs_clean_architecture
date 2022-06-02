import { MSG_ALERT_REDUCER, FAIL_PAGE_REDUCER } from "../../core/consts"

export const insertFailPage = function (msg: string, icon: string, title?: null) {
    return { type: FAIL_PAGE_REDUCER, iconValue: icon, titleValue: title, msgsList: [msg] }
}

export const insertMsgs = function (msgs: string[], icon: string, title?: string | null, confirmButtonAction?: string | null) {
    return { type: MSG_ALERT_REDUCER, iconValue: icon, titleValue: title, msgsList: msgs, confirmButton: confirmButtonAction }
}

export const cleanMsgs = function () {
    return { type: MSG_ALERT_REDUCER, iconValue: null, titleValue: null, msgsList: [] }
}
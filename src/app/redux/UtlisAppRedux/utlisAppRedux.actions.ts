import { LOADING_SHOW_PATTERN_REDUCER, LOADING_SHOW_TABLE_REDUCER, MSG_ALERT_REDUCER, FAIL_PAGE_REDUCER, SCROLL_TO_TOP_REDUCER } from "../../core/consts"

export const showLoadingPattern = function (statusLoading: boolean, titleLoading = "Carregando dados") {
    return { type: LOADING_SHOW_PATTERN_REDUCER, status: statusLoading, title: titleLoading.toUpperCase() }
}

export const showLoadingTable = function (statusLoading: boolean, titleLoading = "Carregando dados") {
    return { type: LOADING_SHOW_TABLE_REDUCER, status: statusLoading, title: titleLoading.toUpperCase() }
}

export const insertFailPage = function (msg: string) {
    return { type: FAIL_PAGE_REDUCER, msgsList: [msg] }
}

export const insertMsgs = function (msgs: string[], icon: string, title?: string | null, confirmButtonAction?: string | null) {
    return { type: MSG_ALERT_REDUCER, iconValue: icon, titleValue: title, msgsList: msgs, confirmButton: confirmButtonAction }
}

export const cleanMsgs = function () {
    return { type: MSG_ALERT_REDUCER, iconValue: null, titleValue: null, msgsList: [] }
}

export const showScrollToTop = function (statusScroll: boolean) {
    return { type: SCROLL_TO_TOP_REDUCER, status: statusScroll }
}
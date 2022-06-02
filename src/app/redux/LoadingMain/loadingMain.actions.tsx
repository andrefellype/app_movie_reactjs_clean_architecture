import { LOADING_SHOW_REDUCER } from "../../core/consts"

export const showLoadingMain = function (statusLoading: boolean, titleLoading = "Carregando dados") {
    return { type: LOADING_SHOW_REDUCER, status: statusLoading, title: titleLoading.toUpperCase() }
}
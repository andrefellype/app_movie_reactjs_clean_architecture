/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS, MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS
} from "../../../app/core/consts"
import {
    updateEnabledByIdInDirector, deleteByIdInDirector, deleteAllByIdsInDirector, openAllInDirector, openAllBySearchInDirector
} from "../../../app/redux/Director/director.actions"
import { setLoadingPattern, insertMsgs } from "../../../app/redux/UtlisAppRedux/utlisAppRedux.actions"

export const DirectorListPageDelete = (directorId: string, searchText: string) => async dispatch => {
    await dispatch(setLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteByIdInDirector(directorId.toString(), () => {
        dispatch(setLoadingPattern(true))
        dispatch(openAllInDirector(() => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(setLoadingPattern(false))
    }))
}

export const DirectorListPageBySearch = (searchText: string, callbackSuccess: () => void, directorsGeneral) => async dispatch => {
    await dispatch(openAllBySearchInDirector(searchText, directorsGeneral))
    callbackSuccess()
}

export const DirectorListPageDeleteBatch = (arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) => async dispatch => {
    await dispatch(setLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteAllByIdsInDirector(arrayDeleteBatch, () => {
        dispatchEraseBatch()
        dispatch(setLoadingPattern(true))
        dispatch(openAllInDirector(() => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTERS_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(setLoadingPattern(false))
    }))
}

export const DirectorListPageApproved = (directorId: string, searchText: string) => async dispatch => {
    await dispatch(setLoadingPattern(true, MSG_UPDATED_REGISTER))
    await dispatch(updateEnabledByIdInDirector(directorId.toString(), () => {
        dispatch(setLoadingPattern(true))
        dispatch(openAllInDirector(() => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(setLoadingPattern(false))
    }))
}
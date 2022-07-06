/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS, MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS
} from "../../../app/core/consts"
import { setLoadingPattern, insertMsgs } from "../../../app/redux/UtlisAppRedux/utlisAppRedux.actions"
import {
    updateEnabledByIdInStream, deleteAllByIdsInStream, deleteByIdInStream, openAllInStream, openAllBySearchInStream
} from "../../../app/redux/Stream/stream.actions"

export const StreamListPageDelete = (streamId: string, searchText: string) => async dispatch => {
    await dispatch(setLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteByIdInStream(streamId.toString(), () => {
        dispatch(setLoadingPattern(true))
        dispatch(openAllInStream(() => {
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

export const StreamListPageBySearch = (searchText: string, callbackSuccess: () => void, streamsGeneral) =>
    async dispatch => {
        await dispatch(openAllBySearchInStream(searchText, streamsGeneral))
        callbackSuccess()
    }

export const StreamListPageDeleteBatch = (arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) =>
    async dispatch => {
        await dispatch(setLoadingPattern(true, MSG_DELETE_REGISTER))
        await dispatch(deleteAllByIdsInStream(arrayDeleteBatch, () => {
            dispatchEraseBatch()
            dispatch(setLoadingPattern(true))
            dispatch(openAllInStream(() => {
                dispatch(insertMsgs([MSG_DELETE_REGISTERS_SUCCESS], "success"))
                dispatch(setLoadingPattern(false))
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }, searchText))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }

export const StreamListPageApproved = (streamId: string, searchText: string) => async dispatch => {
    await dispatch(setLoadingPattern(true, MSG_UPDATED_REGISTER))
    await dispatch(updateEnabledByIdInStream(streamId.toString(), () => {
        dispatch(setLoadingPattern(true))
        dispatch(openAllInStream(() => {
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
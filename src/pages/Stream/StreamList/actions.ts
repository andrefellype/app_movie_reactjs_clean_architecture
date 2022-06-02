/* eslint-disable @typescript-eslint/no-explicit-any */
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS, MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS } from "../../../app/core/consts"
import { showLoadingMain } from "../../../app/redux/LoadingMain/loadingMain.actions"
import { insertMsgs } from "../../../app/redux/MsgAlert/msgAlert.actions"
import { approvedReviewedStream, deleteSeveralStream, deleteStream, getStreamAll, getStreamAllBySearch } from "../../../app/redux/Stream/stream.actions"

export const StreamListDelete = (streamId: string, searchText: string) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_DELETE_REGISTER))
    await dispatch(deleteStream(streamId.toString(), () => {
        dispatch(showLoadingMain(true))
        dispatch(getStreamAll(() => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 1, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingMain(false))
    }))
}

export const StreamListBySearch = (searchText: string, streamsGeneral) => async dispatch => {
    dispatch(getStreamAllBySearch(searchText, streamsGeneral))
}

export const StreamListDeleteBatch = (arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_DELETE_REGISTER))
    await dispatch(deleteSeveralStream(arrayDeleteBatch, () => {
        dispatchEraseBatch()
        dispatch(showLoadingMain(true))
        dispatch(getStreamAll(() => {
            dispatch(insertMsgs([MSG_DELETE_REGISTERS_SUCCESS], "success"))
            dispatch(showLoadingMain(false))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 1, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingMain(false))
    }))
}

export const StreamListApproved = (streamId: string, searchText: string) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_UPDATED_REGISTER))
    await dispatch(approvedReviewedStream(streamId.toString(), () => {
        dispatch(showLoadingMain(true))
        dispatch(getStreamAll(() => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 1, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingMain(false))
    }))
}
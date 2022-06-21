/* eslint-disable @typescript-eslint/no-explicit-any */
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS, MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS } from "../../../app/core/consts"
import { approvedReviewedDirectorById, deleteDirectorById, deleteSeveralDirectorByIds, getDirectorAll, getDirectorAllBySearch } from "../../../app/redux/Director/director.actions"
import { showLoading } from "../../../app/redux/LoadingMain/loadingMain.actions"
import { insertMsgs } from "../../../app/redux/MsgAlert/msgAlert.actions"

export const DirectorListDelete = (directorId: string, searchText: string) => async dispatch => {
    await dispatch(showLoading(true, MSG_DELETE_REGISTER))
    await dispatch(deleteDirectorById(directorId.toString(), () => {
        dispatch(showLoading(true))
        dispatch(getDirectorAll(() => {
            dispatch(showLoading(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, 1, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}

export const DirectorListBySearch = (searchText: string, directorsGeneral) => async dispatch => {
    dispatch(getDirectorAllBySearch(searchText, directorsGeneral))
}

export const DirectorListDeleteBatch = (arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) => async dispatch => {
    await dispatch(showLoading(true, MSG_DELETE_REGISTER))
    await dispatch(deleteSeveralDirectorByIds(arrayDeleteBatch, () => {
        dispatchEraseBatch()
        dispatch(showLoading(true))
        dispatch(getDirectorAll(() => {
            dispatch(showLoading(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTERS_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, 1, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}

export const DirectorListApproved = (directorId: string, searchText: string) => async dispatch => {
    await dispatch(showLoading(true, MSG_UPDATED_REGISTER))
    await dispatch(approvedReviewedDirectorById(directorId.toString(), () => {
        dispatch(showLoading(true))
        dispatch(getDirectorAll(() => {
            dispatch(showLoading(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, 1, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}
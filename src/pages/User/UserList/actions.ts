/* eslint-disable @typescript-eslint/no-explicit-any */
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS, MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS } from "../../../app/core/consts"
import { showLoading } from "../../../app/redux/LoadingMain/loadingMain.actions"
import { insertMsgs } from "../../../app/redux/MsgAlert/msgAlert.actions"
import { deleteSeveralUserByIds, deleteUserById, getUserAll, getUserAllByOrderAndSearchAndFilter, updateEnabledUserById } from "../../../app/redux/User/user.actions"

export const UserListUpdateEnabled = (userId: string, orderField: string, searchText: string, levelFilter: string) => async dispatch => {
    await dispatch(showLoading(true, MSG_UPDATED_REGISTER))
    await dispatch(updateEnabledUserById(userId.toString(), () => {
        dispatch(showLoading(true))
        dispatch(getUserAll(() => {
            dispatch(showLoading(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, orderField, searchText, levelFilter))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}

export const UserListDelete = (userId: string, orderField: string, searchText: string, levelFilter: string) => async dispatch => {
    await dispatch(showLoading(true, MSG_DELETE_REGISTER))
    await dispatch(deleteUserById(userId.toString(), () => {
        dispatch(showLoading(true))
        dispatch(getUserAll(() => {
            dispatch(showLoading(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, orderField, searchText, levelFilter))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}

export const UserListByOrderAndSearchAndFilter = (orderField: string, searchText: string, levelFilter: string, usersGeneral) => async dispatch => {
    dispatch(getUserAllByOrderAndSearchAndFilter(orderField, searchText, levelFilter, usersGeneral))
}

export const UserListDeleteBatch = (arrayDeleteBatch: any, orderField: string, searchText: string, levelFilter: string, dispatchEraseBatch: any) => async dispatch => {
    await dispatch(showLoading(true, MSG_DELETE_REGISTER))
    await dispatch(deleteSeveralUserByIds(arrayDeleteBatch, () => {
        dispatchEraseBatch()
        dispatch(showLoading(true))
        dispatch(getUserAll(() => {
            dispatch(showLoading(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTERS_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, orderField, searchText, levelFilter))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTER_SUCCESS, MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS } from "../../../app/core/consts"
import { insertMsgs, showLoadingPattern } from "../../../app/redux/UtlisAppRedux/utlisAppRedux.actions"
import { deleteUserById, getUserAll, getUserAllByOrderAndSearchAndFilter, updateEnabledUserById } from "../../../app/redux/User/user.actions"

export const UserListUpdateEnabled = (userId: string, orderField: string, searchText: string, levelFilter: string) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_UPDATED_REGISTER))
    await dispatch(updateEnabledUserById(userId.toString(), () => {
        dispatch(showLoadingPattern(true))
        dispatch(getUserAll(() => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, orderField, searchText, levelFilter))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingPattern(false))
    }))
}

export const UserListDelete = (userId: string, orderField: string, searchText: string, levelFilter: string) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteUserById(userId.toString(), () => {
        dispatch(showLoadingPattern(true))
        dispatch(getUserAll(() => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, orderField, searchText, levelFilter))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingPattern(false))
    }))
}

export const UserListByOrderAndSearchAndFilter = (orderField: string, searchText: string, levelFilter: string, usersGeneral) => async dispatch => {
    dispatch(getUserAllByOrderAndSearchAndFilter(orderField, searchText, levelFilter, usersGeneral))
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS } from "../../../app/core/consts"
import { showLoadingPattern, insertMsgs } from "../../../app/redux/UtlisAppRedux/utlisAppRedux.actions"
import { deleteSeveralUserByIds, getUserAll, getUserAllByOrderAndSearchAndFilter } from "../../../app/redux/User/user.actions"

export const UserListTrashByOrderAndSearchAndFilter = (orderField: string, searchText: string, levelFilter: string, callbackSuccess: () => void, usersGeneral) => async dispatch => {
    await dispatch(getUserAllByOrderAndSearchAndFilter(orderField, searchText, levelFilter, usersGeneral))
    callbackSuccess()
}

export const UserListTrashDeleteBatch = (arrayDeleteBatch: any, orderField: string, searchText: string, levelFilter: string, dispatchEraseBatch: any) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteSeveralUserByIds(arrayDeleteBatch, () => {
        dispatchEraseBatch()
        dispatch(showLoadingPattern(true))
        dispatch(getUserAll(() => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTERS_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, orderField, searchText, levelFilter))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingPattern(false))
    }))
}
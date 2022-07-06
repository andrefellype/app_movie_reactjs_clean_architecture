/* eslint-disable @typescript-eslint/no-explicit-any */
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS } from "../../../app/core/consts"
import { setLoadingPattern, insertMsgs } from "../../../app/redux/UtlisAppRedux/utlisAppRedux.actions"
import {
    deleteAllByIdsInUser, openAllInUser, openAllByOrderAndSearchAndFilterInUser
} from "../../../app/redux/User/user.actions"

export const UserListTrashPageByOrderAndSearchAndFilter = (orderField: string, searchText: string,
    levelFilter: string, callbackSuccess: () => void, usersGeneral) => async dispatch => {
        await dispatch(openAllByOrderAndSearchAndFilterInUser(orderField, searchText, levelFilter, usersGeneral))
        callbackSuccess()
    }

export const UserListTrashPageDeleteBatch = (arrayDeleteBatch: any, orderField: string, searchText: string,
    levelFilter: string, dispatchEraseBatch: any) => async dispatch => {
        await dispatch(setLoadingPattern(true, MSG_DELETE_REGISTER))
        await dispatch(deleteAllByIdsInUser(arrayDeleteBatch, () => {
            dispatchEraseBatch()
            dispatch(setLoadingPattern(true))
            dispatch(openAllInUser(() => {
                dispatch(setLoadingPattern(false))
                dispatch(insertMsgs([MSG_DELETE_REGISTERS_SUCCESS], "success"))
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }, orderField, searchText, levelFilter))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }
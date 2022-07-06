import {
    MSG_DELETE_REGISTER, MSG_DELETE_REGISTER_SUCCESS, MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS
} from "../../../app/core/consts"
import { insertMsgs, setLoadingPattern } from "../../../app/redux/UtlisAppRedux/utlisAppRedux.actions"
import {
    deleteByIdInUser, openAllInUser, openAllByOrderAndSearchAndFilterInUser, updateEnabledByIdInUser
} from "../../../app/redux/User/user.actions"

export const UserListPageUpdateEnabled = (userId: string, orderField: string,
    searchText: string, levelFilter: string) => async dispatch => {
        await dispatch(setLoadingPattern(true, MSG_UPDATED_REGISTER))
        await dispatch(updateEnabledByIdInUser(userId.toString(), () => {
            dispatch(setLoadingPattern(true))
            dispatch(openAllInUser(() => {
                dispatch(setLoadingPattern(false))
                dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success"))
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }, orderField, searchText, levelFilter))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }

export const UserListPageDelete = (userId: string, orderField: string,
    searchText: string, levelFilter: string) => async dispatch => {
        await dispatch(setLoadingPattern(true, MSG_DELETE_REGISTER))
        await dispatch(deleteByIdInUser(userId.toString(), () => {
            dispatch(setLoadingPattern(true))
            dispatch(openAllInUser(() => {
                dispatch(setLoadingPattern(false))
                dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success"))
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }, orderField, searchText, levelFilter))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }

export const UserListPageByOrderAndSearchAndFilter = (orderField: string,
    searchText: string, levelFilter: string, usersGeneral) => async dispatch => {
        dispatch(openAllByOrderAndSearchAndFilterInUser(orderField, searchText, levelFilter, usersGeneral))
    }
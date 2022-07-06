/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS
} from "../../../app/core/consts"
import {
    deleteByIdInCategory, deleteAllByIdsInCategory, openAllInCategory, openAllBySearchInCategory
} from "../../../app/redux/Category/category.actions"
import { setLoadingPattern, insertMsgs } from "../../../app/redux/UtlisAppRedux/utlisAppRedux.actions"

export const CategoryListPageDelete = (categoryId: string, searchText: string) => async dispatch => {
    await dispatch(setLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteByIdInCategory(categoryId.toString(), () => {
        dispatch(setLoadingPattern(true))
        dispatch(openAllInCategory(() => {
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

export const CategoryListPageBySearch = (searchText: string, callbackSuccess: () => void, categoriesGeneral) =>
    async dispatch => {
        await dispatch(openAllBySearchInCategory(searchText, categoriesGeneral))
        callbackSuccess()
    }

export const CategoryListPageDeleteBatch = (arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) =>
    async dispatch => {
        await dispatch(setLoadingPattern(true, MSG_DELETE_REGISTER))
        await dispatch(deleteAllByIdsInCategory(arrayDeleteBatch, () => {
            dispatchEraseBatch()
            dispatch(setLoadingPattern(true))
            dispatch(openAllInCategory(() => {
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
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS } from "../../../app/core/consts"
import { deleteCategoryById, deleteSeveralCategoryByIds, getCategoryAll, getCategoryAllBySearch } from "../../../app/redux/Category/category.actions"
import { showLoadingPattern, insertMsgs } from "../../../app/redux/UtlisAppRedux/utlisAppRedux.actions"

export const CategoryListDelete = (categoryId: string, searchText: string) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteCategoryById(categoryId.toString(), () => {
        dispatch(showLoadingPattern(true))
        dispatch(getCategoryAll(() => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingPattern(false))
    }))
}

export const CategoryListBySearch = (searchText: string, callbackSuccess: () => void, categoriesGeneral) => async dispatch => {
    await dispatch(getCategoryAllBySearch(searchText, categoriesGeneral))
    callbackSuccess()
}

export const CategoryListDeleteBatch = (arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteSeveralCategoryByIds(arrayDeleteBatch, () => {
        dispatchEraseBatch()
        dispatch(showLoadingPattern(true))
        dispatch(getCategoryAll(() => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTERS_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingPattern(false))
    }))
}
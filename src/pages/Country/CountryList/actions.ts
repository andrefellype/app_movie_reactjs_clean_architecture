/* eslint-disable @typescript-eslint/no-explicit-any */
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS, MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS } from "../../../app/core/consts"
import { approvedReviewedCountryById, deleteCountryById, deleteSeveralCountryByIds, getCountryAll, getCountryAllBySearch } from "../../../app/redux/Country/country.actions"
import { showLoadingPattern, insertMsgs } from "../../../app/redux/UtlisAppRedux/utlisAppRedux.actions"

export const CountryListDelete = (countryId: string, searchText: string) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteCountryById(countryId.toString(), () => {
        dispatch(showLoadingPattern(true))
        dispatch(getCountryAll(() => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, 1, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingPattern(false))
    }))
}

export const CountryListBySearch = (searchText: string, callbackSuccess: () => void, countriesGeneral) => async dispatch => {
    await dispatch(getCountryAllBySearch(searchText, countriesGeneral))
    callbackSuccess()
}

export const CountryListDeleteBatch = (arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteSeveralCountryByIds(arrayDeleteBatch, () => {
        dispatchEraseBatch()
        dispatch(showLoadingPattern(true))
        dispatch(getCountryAll(() => {
            dispatch(insertMsgs([MSG_DELETE_REGISTERS_SUCCESS], "success"))
            dispatch(showLoadingPattern(false))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, 1, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingPattern(false))
    }))
}

export const CountryListApproved = (CountryId: string, searchText: string) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_UPDATED_REGISTER))
    await dispatch(approvedReviewedCountryById(CountryId.toString(), () => {
        dispatch(showLoadingPattern(true))
        dispatch(getCountryAll(() => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, 1, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingPattern(false))
    }))
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS, MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS } from "../../../app/core/consts"
import { approvedReviewedCountryById, deleteCountryById, deleteSeveralCountryByIds, getCountryAll, getCountryAllBySearch } from "../../../app/redux/Country/country.actions"
import { showLoading } from "../../../app/redux/LoadingMain/loadingMain.actions"
import { insertMsgs } from "../../../app/redux/MsgAlert/msgAlert.actions"

export const CountryListDelete = (countryId: string, searchText: string) => async dispatch => {
    await dispatch(showLoading(true, MSG_DELETE_REGISTER))
    await dispatch(deleteCountryById(countryId.toString(), () => {
        dispatch(showLoading(true))
        dispatch(getCountryAll(() => {
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

export const CountryListBySearch = (searchText: string, countriesGeneral) => async dispatch => {
    dispatch(getCountryAllBySearch(searchText, countriesGeneral))
}

export const CountryListDeleteBatch = (arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) => async dispatch => {
    await dispatch(showLoading(true, MSG_DELETE_REGISTER))
    await dispatch(deleteSeveralCountryByIds(arrayDeleteBatch, () => {
        dispatchEraseBatch()
        dispatch(showLoading(true))
        dispatch(getCountryAll(() => {
            dispatch(insertMsgs([MSG_DELETE_REGISTERS_SUCCESS], "success"))
            dispatch(showLoading(false))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, 1, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}

export const CountryListApproved = (CountryId: string, searchText: string) => async dispatch => {
    await dispatch(showLoading(true, MSG_UPDATED_REGISTER))
    await dispatch(approvedReviewedCountryById(CountryId.toString(), () => {
        dispatch(showLoading(true))
        dispatch(getCountryAll(() => {
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
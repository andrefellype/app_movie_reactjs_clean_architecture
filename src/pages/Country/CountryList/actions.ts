/* eslint-disable @typescript-eslint/no-explicit-any */
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS, MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS } from "../../../app/core/consts"
import { approvedReviewedCountry, deleteCountry, deleteSeveralCountry, getCountryAll, getCountryAllBySearch } from "../../../app/redux/Country/country.actions"
import { showLoadingMain } from "../../../app/redux/LoadingMain/loadingMain.actions"
import { insertMsgs } from "../../../app/redux/MsgAlert/msgAlert.actions"

export const CountryListDelete = (countryId: string, searchText: string) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_DELETE_REGISTER))
    await dispatch(deleteCountry(countryId.toString(), () => {
        dispatch(showLoadingMain(true))
        dispatch(getCountryAll(() => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 1, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingMain(false))
    }))
}

export const CountryListBySearch = (searchText: string, countriesGeneral) => async dispatch => {
    dispatch(getCountryAllBySearch(searchText, countriesGeneral))
}

export const CountryListDeleteBatch = (arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_DELETE_REGISTER))
    await dispatch(deleteSeveralCountry(arrayDeleteBatch, () => {
        dispatchEraseBatch()
        dispatch(showLoadingMain(true))
        dispatch(getCountryAll(() => {
            dispatch(insertMsgs([MSG_DELETE_REGISTERS_SUCCESS], "success"))
            dispatch(showLoadingMain(false))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 1, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingMain(false))
    }))
}

export const CountryListApproved = (CountryId: string, searchText: string) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_UPDATED_REGISTER))
    await dispatch(approvedReviewedCountry(CountryId.toString(), () => {
        dispatch(showLoadingMain(true))
        dispatch(getCountryAll(() => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 1, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingMain(false))
    }))
}
import { MSG_DELETE_REGISTER, MSG_SAVED_DATA } from "../../../app/core/consts"
import { getCategoryAllBySearch } from "../../../app/redux/Category/category.actions"
import { deleteCountryById, getCountryAll, getCountryAllBySearch, openCountryById, registerCountry, updateCountryById } from "../../../app/redux/Country/country.actions"
import { showLoading } from "../../../app/redux/LoadingMain/loadingMain.actions"
import { insertMsgs } from "../../../app/redux/MsgAlert/msgAlert.actions"
import { deleteStreamById, getStreamAll, getStreamAllBySearch, openStreamById, registerStream, updateStreamById } from "../../../app/redux/Stream/stream.actions"

export const TvShowNewCategoryBySearch = (searchText: string, categoriesGeneral) => async dispatch => {
    dispatch(getCategoryAllBySearch(searchText, categoriesGeneral))
}

export const TvShowNewCountryBySearch = (searchText: string, countriesGeneral) => async dispatch => {
    dispatch(getCountryAllBySearch(searchText, countriesGeneral))
}

export const TvShowNewCountryInsert = (nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoading(true, MSG_SAVED_DATA))
    await dispatch(registerCountry(nameValue, 0, async () => {
        dispatch(getCountryAll(() => dispatch(showLoading(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, 0, searchText))
        callbackSuccess()
    }, async () => {
        dispatch(showLoading(false))
        calllbackError()
    }))
}

export const TvShowNewCountryUpdate = (idCountry: string, nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoading(true, MSG_SAVED_DATA))
    await dispatch(updateCountryById(idCountry, nameValue, async () => {
        await dispatch(getCountryAll(() => dispatch(showLoading(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, 0, searchText))
        callbackSuccess()
    }, async () => {
        dispatch(showLoading(false))
        calllbackError()
    }))
}

export const TvShowNewCountryDelete = (countryId: string, searchText: string, successDestroy: () => void) => async dispatch => {
    await dispatch(showLoading(true, MSG_DELETE_REGISTER))
    await dispatch(deleteCountryById(countryId, () => {
        dispatch(showLoading(true))
        dispatch(getCountryAll(() => dispatch(showLoading(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, 0, searchText))
        successDestroy()
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}

export const TvShowNewCountryOpenById = (idCountry: string) => async dispatch => {
    await dispatch(showLoading(true))
    await dispatch(openCountryById(idCountry, () => dispatch(showLoading(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}

export const TvShowNewStreamBySearch = (searchText: string, streamsGeneral) => async dispatch => {
    dispatch(getStreamAllBySearch(searchText, streamsGeneral))
}

export const TvShowNewStreamInsert = (nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoading(true, MSG_SAVED_DATA))
    await dispatch(registerStream(nameValue, 0, async () => {
        dispatch(getStreamAll(() => dispatch(showLoading(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, 0, searchText))
        callbackSuccess()
    }, async () => {
        dispatch(showLoading(false))
        calllbackError()
    }))
}

export const TvShowNewStreamUpdate = (idStream: string, nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoading(true, MSG_SAVED_DATA))
    await dispatch(updateStreamById(idStream, nameValue, async () => {
        await dispatch(getStreamAll(() => dispatch(showLoading(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, 0, searchText))
        callbackSuccess()
    }, async () => {
        dispatch(showLoading(false))
        calllbackError()
    }))
}

export const TvShowNewStreamDelete = (streamId: string, searchText: string, successDestroy: () => void) => async dispatch => {
    await dispatch(showLoading(true, MSG_DELETE_REGISTER))
    await dispatch(deleteStreamById(streamId, () => {
        dispatch(showLoading(true))
        dispatch(getStreamAll(() => dispatch(showLoading(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, 0, searchText))
        successDestroy()
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}

export const TvShowNewStreamOpenById = (idStream: string) => async dispatch => {
    await dispatch(showLoading(true))
    await dispatch(openStreamById(idStream, () => dispatch(showLoading(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}
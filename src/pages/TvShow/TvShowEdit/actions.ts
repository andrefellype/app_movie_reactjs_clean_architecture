import { MSG_DELETE_REGISTER, MSG_SAVED_DATA } from "../../../app/core/consts"
import { getCategoryAllBySearch } from "../../../app/redux/Category/category.actions"
import { deleteCountryById, getCountryAll, getCountryAllBySearch, openCountryById, registerCountry, updateCountryById } from "../../../app/redux/Country/country.actions"
import { showLoading } from "../../../app/redux/LoadingMain/loadingMain.actions"
import { insertMsgs } from "../../../app/redux/MsgAlert/msgAlert.actions"
import { deleteStreamById, getStreamAll, getStreamAllBySearch, openStreamById, registerStream, updateStreamById } from "../../../app/redux/Stream/stream.actions"

export const TvShowEditCategoryBySearch = (searchText: string, categoriesGeneral) => async dispatch => {
    dispatch(getCategoryAllBySearch(searchText, categoriesGeneral))
}

export const TvShowEditCountryBySearch = (searchText: string, countriesGeneral) => async dispatch => {
    dispatch(getCountryAllBySearch(searchText, countriesGeneral))
}

export const TvShowEditCountryInsert = (nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
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

export const TvShowEditCountryUpdate = (idCountry: string, nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
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

export const TvShowEditCountryDelete = (countryId: string, searchText: string, successDestroy: () => void) => async dispatch => {
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

export const TvShowEditCountryOpenById = (idCountry: string) => async dispatch => {
    await dispatch(showLoading(true))
    await dispatch(openCountryById(idCountry, () => dispatch(showLoading(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}

export const TvShowEditStreamBySearch = (searchText: string, streamsGeneral) => async dispatch => {
    dispatch(getStreamAllBySearch(searchText, streamsGeneral))
}

export const TvShowEditStreamInsert = (nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
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

export const TvShowEditStreamUpdate = (idStream: string, nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
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

export const TvShowEditStreamDelete = (streamId: string, searchText: string, successDestroy: () => void) => async dispatch => {
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

export const TvShowEditStreamOpenById = (idStream: string) => async dispatch => {
    await dispatch(showLoading(true))
    await dispatch(openStreamById(idStream, () => dispatch(showLoading(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}
import { MSG_DELETE_REGISTER, MSG_SAVED_DATA } from "../../../app/core/consts"
import { getCategoryAllBySearch } from "../../../app/redux/Category/category.actions"
import { deleteCountry, getCountryAll, getCountryAllBySearch, openCountryById, registerCountry, updateCountry } from "../../../app/redux/Country/country.actions"
import { showLoadingMain } from "../../../app/redux/LoadingMain/loadingMain.actions"
import { insertMsgs } from "../../../app/redux/MsgAlert/msgAlert.actions"
import { deleteStream, getStreamAll, getStreamAllBySearch, openStreamById, registerStream, updateStream } from "../../../app/redux/Stream/stream.actions"

export const TvShowEditCategoryBySearch = (searchText: string, categoriesGeneral) => async dispatch => {
    dispatch(getCategoryAllBySearch(searchText, categoriesGeneral))
}

export const TvShowEditCountryBySearch = (searchText: string, countriesGeneral) => async dispatch => {
    dispatch(getCountryAllBySearch(searchText, countriesGeneral))
}

export const TvShowEditCountryInsert = (nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_SAVED_DATA))
    await dispatch(registerCountry(nameValue, 0, async () => {
        dispatch(getCountryAll(() => dispatch(showLoadingMain(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 0, searchText))
        callbackSuccess()
    }, async () => {
        dispatch(showLoadingMain(false))
        calllbackError()
    }))
}

export const TvShowEditCountryUpdate = (idCountry: string, nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_SAVED_DATA))
    await dispatch(updateCountry(idCountry, nameValue, async () => {
        await dispatch(getCountryAll(() => dispatch(showLoadingMain(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 0, searchText))
        callbackSuccess()
    }, async () => {
        dispatch(showLoadingMain(false))
        calllbackError()
    }))
}

export const TvShowEditCountryDelete = (countryId: string, searchText: string, successDestroy: () => void) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_DELETE_REGISTER))
    await dispatch(deleteCountry(countryId, () => {
        dispatch(showLoadingMain(true))
        dispatch(getCountryAll(() => dispatch(showLoadingMain(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 0, searchText))
        successDestroy()
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingMain(false))
    }))
}

export const TvShowEditCountryOpenById = (idCountry: string) => async dispatch => {
    await dispatch(showLoadingMain(true))
    await dispatch(openCountryById(idCountry, () => dispatch(showLoadingMain(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingMain(false))
    }))
}

export const TvShowEditStreamBySearch = (searchText: string, streamsGeneral) => async dispatch => {
    dispatch(getStreamAllBySearch(searchText, streamsGeneral))
}

export const TvShowEditStreamInsert = (nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_SAVED_DATA))
    await dispatch(registerStream(nameValue, 0, async () => {
        dispatch(getStreamAll(() => dispatch(showLoadingMain(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 0, searchText))
        callbackSuccess()
    }, async () => {
        dispatch(showLoadingMain(false))
        calllbackError()
    }))
}

export const TvShowEditStreamUpdate = (idStream: string, nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_SAVED_DATA))
    await dispatch(updateStream(idStream, nameValue, async () => {
        await dispatch(getStreamAll(() => dispatch(showLoadingMain(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 0, searchText))
        callbackSuccess()
    }, async () => {
        dispatch(showLoadingMain(false))
        calllbackError()
    }))
}

export const TvShowEditStreamDelete = (streamId: string, searchText: string, successDestroy: () => void) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_DELETE_REGISTER))
    await dispatch(deleteStream(streamId, () => {
        dispatch(showLoadingMain(true))
        dispatch(getStreamAll(() => dispatch(showLoadingMain(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 0, searchText))
        successDestroy()
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingMain(false))
    }))
}

export const TvShowEditStreamOpenById = (idStream: string) => async dispatch => {
    await dispatch(showLoadingMain(true))
    await dispatch(openStreamById(idStream, () => dispatch(showLoadingMain(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingMain(false))
    }))
}
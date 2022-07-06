import { MSG_DELETE_REGISTER, MSG_SAVED_DATA } from "../../../app/core/consts"
import { openAllBySearchInCategory } from "../../../app/redux/Category/category.actions"
import {
    deleteByIdInCountry, openAllByAuthorizedInCountry, openAllBySearchInCountry, openInCountry, createInCountry, updateByIdInCountry
} from "../../../app/redux/Country/country.actions"
import { setLoadingPattern, insertMsgs } from "../../../app/redux/UtlisAppRedux/utlisAppRedux.actions"
import {
    deleteByIdInStream, openAllByAuthorizedInStream, openAllBySearchInStream, openInStream, createInStream, updateByIdInStream
} from "../../../app/redux/Stream/stream.actions"

export const TvShowNewPageCategoryBySearch = (searchText: string, categoriesGeneral) => async dispatch => {
    dispatch(openAllBySearchInCategory(searchText, categoriesGeneral))
}

export const TvShowNewPageCountryBySearch = (searchText: string, countriesGeneral) => async dispatch => {
    dispatch(openAllBySearchInCountry(searchText, countriesGeneral))
}

export const TvShowNewPageCountryInsert = (nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
    await dispatch(createInCountry(nameValue, 0, async () => {
        dispatch(openAllByAuthorizedInCountry(() => dispatch(setLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }, nameValue.substring(0, 3)))
        callbackSuccess()
    }, async () => {
        dispatch(setLoadingPattern(false))
        calllbackError()
    }))
}

export const TvShowNewPageCountryUpdate = (idCountry: string, nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
    await dispatch(updateByIdInCountry(idCountry, nameValue, async () => {
        await dispatch(openAllByAuthorizedInCountry(() => dispatch(setLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }, nameValue.substring(0, 3)))
        callbackSuccess()
    }, async () => {
        dispatch(setLoadingPattern(false))
        calllbackError()
    }))
}

export const TvShowNewPageCountryDelete = (countryId: string, searchText: string, successDestroy: () => void) => async dispatch => {
    await dispatch(setLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteByIdInCountry(countryId, () => {
        dispatch(setLoadingPattern(true))
        dispatch(openAllByAuthorizedInCountry(() => dispatch(setLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }, searchText))
        successDestroy()
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(setLoadingPattern(false))
    }))
}

export const TvShowNewPageCountryOpenById = (idCountry: string) => async dispatch => {
    await dispatch(setLoadingPattern(true))
    await dispatch(openInCountry(idCountry, () => dispatch(setLoadingPattern(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(setLoadingPattern(false))
    }))
}

export const TvShowNewPageStreamBySearch = (searchText: string, streamsGeneral) => async dispatch => {
    dispatch(openAllBySearchInStream(searchText, streamsGeneral))
}

export const TvShowNewPageStreamInsert = (nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
    await dispatch(createInStream(nameValue, 0, async () => {
        dispatch(openAllByAuthorizedInStream(() => dispatch(setLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }, nameValue.substring(0, 3)))
        callbackSuccess()
    }, async () => {
        dispatch(setLoadingPattern(false))
        calllbackError()
    }))
}

export const TvShowNewPageStreamUpdate = (idStream: string, nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
    await dispatch(updateByIdInStream(idStream, nameValue, async () => {
        await dispatch(openAllByAuthorizedInStream(() => dispatch(setLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }, nameValue.substring(0, 3)))
        callbackSuccess()
    }, async () => {
        dispatch(setLoadingPattern(false))
        calllbackError()
    }))
}

export const TvShowNewPageStreamDelete = (streamId: string, searchText: string, successDestroy: () => void) => async dispatch => {
    await dispatch(setLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteByIdInStream(streamId, () => {
        dispatch(setLoadingPattern(true))
        dispatch(openAllByAuthorizedInStream(() => dispatch(setLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }, searchText))
        successDestroy()
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(setLoadingPattern(false))
    }))
}

export const TvShowNewPageStreamOpenById = (idStream: string) => async dispatch => {
    await dispatch(setLoadingPattern(true))
    await dispatch(openInStream(idStream, () => dispatch(setLoadingPattern(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(setLoadingPattern(false))
    }))
}
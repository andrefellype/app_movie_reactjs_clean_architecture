import { MSG_DELETE_REGISTER, MSG_SAVED_DATA } from "../../../app/core/consts"
import { deleteActorById, getActorAll, getActorAllBySearch, openActorById, registerActor, updateActorById } from "../../../app/redux/Actor/actor.actions"
import { getCategoryAllBySearch } from "../../../app/redux/Category/category.actions"
import { deleteCountryById, getCountryAll, getCountryAllBySearch, openCountryById, registerCountry, updateCountryById } from "../../../app/redux/Country/country.actions"
import { deleteDirectorById, getDirectorAll, getDirectorAllBySearch, openDirectorById, registerDirector, updateDirectorById } from "../../../app/redux/Director/director.actions"
import { showLoadingPattern, insertMsgs } from "../../../app/redux/UtlisAppRedux/utlisAppRedux.actions"
import { deleteStreamById, getStreamAll, getStreamAllBySearch, openStreamById, registerStream, updateStreamById } from "../../../app/redux/Stream/stream.actions"

export const MovieNewDirectorOpenById = (idDirector: string) => async dispatch => {
    await dispatch(showLoadingPattern(true))
    await dispatch(openDirectorById(idDirector, () => dispatch(showLoadingPattern(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingPattern(false))
    }))
}

export const MovieNewDirectorInsert = (nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
    await dispatch(registerDirector(nameValue, 0, async () => {
        await dispatch(showLoadingPattern(true))
        dispatch(getDirectorAll(() => dispatch(showLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, 0, nameValue.substring(0, 3)))
        callbackSuccess()
    }, async () => {
        dispatch(showLoadingPattern(false))
        calllbackError()
    }))
}

export const MovieNewDirectorUpdate = (idDirector: string, nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
    await dispatch(updateDirectorById(idDirector, nameValue, async () => {
        await dispatch(showLoadingPattern(true))
        await dispatch(getDirectorAll(() => dispatch(showLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, 0, nameValue.substring(0, 3)))
        callbackSuccess()
    }, async () => {
        dispatch(showLoadingPattern(false))
        calllbackError()
    }))
}

export const MovieNewDirectorBySearch = (searchText: string, directorsGeneral) => async dispatch => {
    if (searchText.length >= 3)
        dispatch(getDirectorAllBySearch(searchText, directorsGeneral))
    else
        dispatch(getDirectorAllBySearch(searchText, []))
}

export const MovieNewDirectorDelete = (directorId: string, searchText: string, successDestroy: () => void) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteDirectorById(directorId, () => {
        dispatch(showLoadingPattern(true))
        dispatch(getDirectorAll(() => dispatch(showLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, 0, searchText))
        successDestroy()
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingPattern(false))
    }))
}

export const MovieNewCastBySearch = (searchText: string, directorsGeneral) => async dispatch => {
    if (searchText.length >= 3)
        dispatch(getActorAllBySearch(searchText, directorsGeneral))
    else
        dispatch(getActorAllBySearch(searchText, []))
}

export const MovieNewCastInsertActor = (nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
    await dispatch(registerActor(nameValue, 0, async () => {
        dispatch(getActorAll(() => dispatch(showLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, 0, nameValue.substring(0, 3)))
        callbackSuccess()
    }, async () => {
        dispatch(showLoadingPattern(false))
        calllbackError()
    }))
}

export const MovieNewCastUpdateActor = (idActor: string, nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
    await dispatch(updateActorById(idActor, nameValue, async () => {
        await dispatch(getActorAll(() => dispatch(showLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, 0, nameValue.substring(0, 3)))
        callbackSuccess()
    }, async () => {
        dispatch(showLoadingPattern(false))
        calllbackError()
    }))
}

export const MovieNewCastDeleteActor = (actorId: string, searchText: string, successDestroy: () => void) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteActorById(actorId, () => {
        dispatch(showLoadingPattern(true))
        dispatch(getActorAll(() => dispatch(showLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, 0, searchText))
        successDestroy()
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingPattern(false))
    }))
}

export const MovieNewActorOpenById = (idActor: string) => async dispatch => {
    await dispatch(showLoadingPattern(true))
    await dispatch(openActorById(idActor, () => dispatch(showLoadingPattern(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingPattern(false))
    }))
}

export const MovieNewCategoryBySearch = (searchText: string, categoriesGeneral) => async dispatch => {
    if (searchText.length >= 3)
        dispatch(getCategoryAllBySearch(searchText, categoriesGeneral))
    else
        dispatch(getCategoryAllBySearch(searchText, []))
}

export const MovieNewCountryBySearch = (searchText: string, countriesGeneral) => async dispatch => {
    if (searchText.length >= 3)
        dispatch(getCountryAllBySearch(searchText, countriesGeneral))
    else
        dispatch(getCountryAllBySearch(searchText, []))
}

export const MovieNewCountryInsert = (nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
    await dispatch(registerCountry(nameValue, 0, async () => {
        dispatch(getCountryAll(() => dispatch(showLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, 0, nameValue.substring(0, 3)))
        callbackSuccess()
    }, async () => {
        dispatch(showLoadingPattern(false))
        calllbackError()
    }))
}

export const MovieNewCountryUpdate = (idCountry: string, nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
    await dispatch(updateCountryById(idCountry, nameValue, async () => {
        await dispatch(getCountryAll(() => dispatch(showLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, 0, nameValue.substring(0, 3)))
        callbackSuccess()
    }, async () => {
        dispatch(showLoadingPattern(false))
        calllbackError()
    }))
}

export const MovieNewCountryDelete = (countryId: string, searchText: string, successDestroy: () => void) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteCountryById(countryId, () => {
        dispatch(showLoadingPattern(true))
        dispatch(getCountryAll(() => dispatch(showLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, 0, searchText))
        successDestroy()
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingPattern(false))
    }))
}

export const MovieNewCountryOpenById = (idCountry: string) => async dispatch => {
    await dispatch(showLoadingPattern(true))
    await dispatch(openCountryById(idCountry, () => dispatch(showLoadingPattern(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingPattern(false))
    }))
}

export const MovieNewStreamBySearch = (searchText: string, streamsGeneral) => async dispatch => {
    if (searchText.length >= 3)
        dispatch(getStreamAllBySearch(searchText, streamsGeneral))
    else
        dispatch(getStreamAllBySearch(searchText, []))
}

export const MovieNewStreamInsert = (nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
    await dispatch(registerStream(nameValue, 0, async () => {
        dispatch(getStreamAll(() => dispatch(showLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, 0, nameValue.substring(0, 3)))
        callbackSuccess()
    }, async () => {
        dispatch(showLoadingPattern(false))
        calllbackError()
    }))
}

export const MovieNewStreamUpdate = (idStream: string, nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
    await dispatch(updateStreamById(idStream, nameValue, async () => {
        await dispatch(getStreamAll(() => dispatch(showLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, 0, nameValue.substring(0, 3)))
        callbackSuccess()
    }, async () => {
        dispatch(showLoadingPattern(false))
        calllbackError()
    }))
}

export const MovieNewStreamDelete = (streamId: string, searchText: string, successDestroy: () => void) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteStreamById(streamId, () => {
        dispatch(showLoadingPattern(true))
        dispatch(getStreamAll(() => dispatch(showLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, 0, searchText))
        successDestroy()
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingPattern(false))
    }))
}

export const MovieNewStreamOpenById = (idStream: string) => async dispatch => {
    await dispatch(showLoadingPattern(true))
    await dispatch(openStreamById(idStream, () => dispatch(showLoadingPattern(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingPattern(false))
    }))
}
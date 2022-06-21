import { MSG_DELETE_REGISTER, MSG_SAVED_DATA } from "../../../app/core/consts"
import { deleteActorById, getActorAll, getActorAllBySearch, openActorById, registerActor, updateActorById } from "../../../app/redux/Actor/actor.actions"
import { getCategoryAllBySearch } from "../../../app/redux/Category/category.actions"
import { deleteCountryById, getCountryAll, getCountryAllBySearch, openCountryById, registerCountry, updateCountryById } from "../../../app/redux/Country/country.actions"
import { deleteDirectorById, getDirectorAll, getDirectorAllBySearch, openDirectorById, registerDirector, updateDirectorById } from "../../../app/redux/Director/director.actions"
import { showLoading } from "../../../app/redux/LoadingMain/loadingMain.actions"
import { insertMsgs } from "../../../app/redux/MsgAlert/msgAlert.actions"
import { deleteStreamById, getStreamAll, getStreamAllBySearch, openStreamById, registerStream, updateStreamById } from "../../../app/redux/Stream/stream.actions"

export const MovieNewDirectorOpenById = (idDirector: string) => async dispatch => {
    await dispatch(showLoading(true))
    await dispatch(openDirectorById(idDirector, () => dispatch(showLoading(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}

export const MovieNewDirectorInsert = (nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoading(true, MSG_SAVED_DATA))
    await dispatch(registerDirector(nameValue, 0, async () => {
        await dispatch(showLoading(true))
        dispatch(getDirectorAll(() => dispatch(showLoading(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, 0, searchText))
        callbackSuccess()
    }, async () => {
        dispatch(showLoading(false))
        calllbackError()
    }))
}

export const MovieNewDirectorUpdate = (idDirector: string, nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoading(true, MSG_SAVED_DATA))
    await dispatch(updateDirectorById(idDirector, nameValue, async () => {
        await dispatch(showLoading(true))
        await dispatch(getDirectorAll(() => dispatch(showLoading(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, 0, searchText))
        callbackSuccess()
    }, async () => {
        dispatch(showLoading(false))
        calllbackError()
    }))
}

export const MovieNewDirectorBySearch = (searchText: string, directorsGeneral) => async dispatch => {
    dispatch(getDirectorAllBySearch(searchText, directorsGeneral))
}

export const MovieNewDirectorDelete = (directorId: string, searchText: string, successDestroy: () => void) => async dispatch => {
    await dispatch(showLoading(true, MSG_DELETE_REGISTER))
    await dispatch(deleteDirectorById(directorId, () => {
        dispatch(showLoading(true))
        dispatch(getDirectorAll(() => dispatch(showLoading(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, 0, searchText))
        successDestroy()
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}

export const MovieNewCastBySearch = (searchText: string, directorsGeneral) => async dispatch => {
    dispatch(getActorAllBySearch(searchText, directorsGeneral))
}

export const MovieNewCastInsertActor = (nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoading(true, MSG_SAVED_DATA))
    await dispatch(registerActor(nameValue, 0, async () => {
        dispatch(getActorAll(() => dispatch(showLoading(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, 0, searchText))
        callbackSuccess()
    }, async () => {
        dispatch(showLoading(false))
        calllbackError()
    }))
}

export const MovieNewCastUpdateActor = (idActor: string, nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoading(true, MSG_SAVED_DATA))
    await dispatch(updateActorById(idActor, nameValue, async () => {
        await dispatch(getActorAll(() => dispatch(showLoading(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, 0, searchText))
        callbackSuccess()
    }, async () => {
        dispatch(showLoading(false))
        calllbackError()
    }))
}

export const MovieNewCastDeleteActor = (actorId: string, searchText: string, successDestroy: () => void) => async dispatch => {
    await dispatch(showLoading(true, MSG_DELETE_REGISTER))
    await dispatch(deleteActorById(actorId, () => {
        dispatch(showLoading(true))
        dispatch(getActorAll(() => dispatch(showLoading(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, 0, searchText))
        successDestroy()
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}

export const MovieNewActorOpenById = (idActor: string) => async dispatch => {
    await dispatch(showLoading(true))
    await dispatch(openActorById(idActor, () => dispatch(showLoading(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}

export const MovieNewCategoryBySearch = (searchText: string, categoriesGeneral) => async dispatch => {
    dispatch(getCategoryAllBySearch(searchText, categoriesGeneral))
}

export const MovieNewCountryBySearch = (searchText: string, countriesGeneral) => async dispatch => {
    dispatch(getCountryAllBySearch(searchText, countriesGeneral))
}

export const MovieNewCountryInsert = (nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
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

export const MovieNewCountryUpdate = (idCountry: string, nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
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

export const MovieNewCountryDelete = (countryId: string, searchText: string, successDestroy: () => void) => async dispatch => {
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

export const MovieNewCountryOpenById = (idCountry: string) => async dispatch => {
    await dispatch(showLoading(true))
    await dispatch(openCountryById(idCountry, () => dispatch(showLoading(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}

export const MovieNewStreamBySearch = (searchText: string, streamsGeneral) => async dispatch => {
    dispatch(getStreamAllBySearch(searchText, streamsGeneral))
}

export const MovieNewStreamInsert = (nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
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

export const MovieNewStreamUpdate = (idStream: string, nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
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

export const MovieNewStreamDelete = (streamId: string, searchText: string, successDestroy: () => void) => async dispatch => {
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

export const MovieNewStreamOpenById = (idStream: string) => async dispatch => {
    await dispatch(showLoading(true))
    await dispatch(openStreamById(idStream, () => dispatch(showLoading(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}
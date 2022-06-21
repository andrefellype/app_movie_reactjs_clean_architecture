import { MSG_DELETE_REGISTER, MSG_SAVED_DATA } from "../../../app/core/consts"
import { deleteActorById, getActorAll, getActorAllBySearch, openActorById, registerActor, updateActorById } from "../../../app/redux/Actor/actor.actions"
import { getCategoryAllBySearch } from "../../../app/redux/Category/category.actions"
import { deleteCountryById, getCountryAll, getCountryAllBySearch, openCountryById, registerCountry, updateCountryById } from "../../../app/redux/Country/country.actions"
import { deleteDirectorById, getDirectorAll, getDirectorAllBySearch, openDirectorById, registerDirector, updateDirectorById } from "../../../app/redux/Director/director.actions"
import { showLoading } from "../../../app/redux/LoadingMain/loadingMain.actions"
import { insertMsgs } from "../../../app/redux/MsgAlert/msgAlert.actions"
import { deleteStreamById, getStreamAll, getStreamAllBySearch, openStreamById, registerStream, updateStreamById } from "../../../app/redux/Stream/stream.actions"

export const MovieEditDirectorOpenById = (idDirector: string) => async dispatch => {
    await dispatch(showLoading(true))
    await dispatch(openDirectorById(idDirector, () => dispatch(showLoading(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}

export const MovieEditDirectorInsert = (nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
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

export const MovieEditDirectorUpdate = (idDirector: string, nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
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

export const MovieEditDirectorBySearch = (searchText: string, directorsGeneral) => async dispatch => {
    dispatch(getDirectorAllBySearch(searchText, directorsGeneral))
}

export const MovieEditDirectorDelete = (directorId: string, searchText: string, successDestroy: () => void) => async dispatch => {
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

export const MovieEditCastBySearch = (searchText: string, directorsGeneral) => async dispatch => {
    dispatch(getActorAllBySearch(searchText, directorsGeneral))
}

export const MovieEditCastInsertActor = (nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoading(true, MSG_SAVED_DATA))
    await dispatch(registerActor(nameValue, 0, async () => {
        await dispatch(showLoading(true))
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

export const MovieEditCastUpdateActor = (idActor: string, nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoading(true, MSG_SAVED_DATA))
    await dispatch(updateActorById(idActor, nameValue, async () => {
        await dispatch(showLoading(true))
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

export const MovieEditCastDeleteActor = (actorId: string, searchText: string, successDestroy: () => void) => async dispatch => {
    await dispatch(showLoading(true, MSG_DELETE_REGISTER))
    await dispatch(deleteActorById(actorId, async () => {
        await dispatch(showLoading(true))
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

export const MovieEditActorOpenById = (idActor: string) => async dispatch => {
    await dispatch(showLoading(true))
    await dispatch(openActorById(idActor, () => dispatch(showLoading(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}

export const MovieEditCategoryBySearch = (searchText: string, categoriesGeneral) => async dispatch => {
    dispatch(getCategoryAllBySearch(searchText, categoriesGeneral))
}

export const MovieEditCountryBySearch = (searchText: string, countriesGeneral) => async dispatch => {
    dispatch(getCountryAllBySearch(searchText, countriesGeneral))
}

export const MovieEditCountryInsert = (nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoading(true, MSG_SAVED_DATA))
    await dispatch(registerCountry(nameValue, 0, async () => {
        await dispatch(showLoading(true))
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

export const MovieEditCountryUpdate = (idCountry: string, nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoading(true, MSG_SAVED_DATA))
    await dispatch(updateCountryById(idCountry, nameValue, async () => {
        await dispatch(showLoading(true))
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

export const MovieEditCountryDelete = (countryId: string, searchText: string, successDestroy: () => void) => async dispatch => {
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

export const MovieEditCountryOpenById = (idCountry: string) => async dispatch => {
    await dispatch(showLoading(true))
    await dispatch(openCountryById(idCountry, () => dispatch(showLoading(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}

export const MovieEditStreamBySearch = (searchText: string, streamsGeneral) => async dispatch => {
    dispatch(getStreamAllBySearch(searchText, streamsGeneral))
}

export const MovieEditStreamInsert = (nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
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

export const MovieEditStreamUpdate = (idStream: string, nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
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

export const MovieEditStreamDelete = (streamId: string, searchText: string, successDestroy: () => void) => async dispatch => {
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

export const MovieEditStreamOpenById = (idStream: string) => async dispatch => {
    await dispatch(showLoading(true))
    await dispatch(openStreamById(idStream, () => dispatch(showLoading(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}
import { MSG_DELETE_REGISTER, MSG_SAVED_DATA } from "../../../app/core/consts"
import { deleteActor, getActorAll, getActorAllBySearch, openActorById, registerActor, updateActor } from "../../../app/redux/Actor/actor.actions"
import { getCategoryAllBySearch } from "../../../app/redux/Category/category.actions"
import { deleteCountry, getCountryAll, getCountryAllBySearch, openCountryById, registerCountry, updateCountry } from "../../../app/redux/Country/country.actions"
import { deleteDirector, getDirectorAll, getDirectorAllBySearch, openDirectorById, registerDirector, updateDirector } from "../../../app/redux/Director/director.actions"
import { showLoadingMain } from "../../../app/redux/LoadingMain/loadingMain.actions"
import { insertMsgs } from "../../../app/redux/MsgAlert/msgAlert.actions"
import { deleteStream, getStreamAll, getStreamAllBySearch, openStreamById, registerStream, updateStream } from "../../../app/redux/Stream/stream.actions"

export const MovieEditDirectorOpenById = (idDirector: string) => async dispatch => {
    await dispatch(showLoadingMain(true))
    await dispatch(openDirectorById(idDirector, () => dispatch(showLoadingMain(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingMain(false))
    }))
}

export const MovieEditDirectorInsert = (nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_SAVED_DATA))
    await dispatch(registerDirector(nameValue, 0, async () => {
        await dispatch(showLoadingMain(true))
        dispatch(getDirectorAll(() => dispatch(showLoadingMain(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 0, searchText))
        callbackSuccess()
    }, async () => {
        dispatch(showLoadingMain(false))
        calllbackError()
    }))
}

export const MovieEditDirectorUpdate = (idDirector: string, nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_SAVED_DATA))
    await dispatch(updateDirector(idDirector, nameValue, async () => {
        await dispatch(showLoadingMain(true))
        await dispatch(getDirectorAll(() => dispatch(showLoadingMain(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 0, searchText))
        callbackSuccess()
    }, async () => {
        dispatch(showLoadingMain(false))
        calllbackError()
    }))
}

export const MovieEditDirectorBySearch = (searchText: string, directorsGeneral) => async dispatch => {
    dispatch(getDirectorAllBySearch(searchText, directorsGeneral))
}

export const MovieEditDirectorDelete = (directorId: string, searchText: string, successDestroy: () => void) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_DELETE_REGISTER))
    await dispatch(deleteDirector(directorId, () => {
        dispatch(showLoadingMain(true))
        dispatch(getDirectorAll(() => dispatch(showLoadingMain(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 0, searchText))
        successDestroy()
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingMain(false))
    }))
}

export const MovieEditCastBySearch = (searchText: string, directorsGeneral) => async dispatch => {
    dispatch(getActorAllBySearch(searchText, directorsGeneral))
}

export const MovieEditCastInsertActor = (nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_SAVED_DATA))
    await dispatch(registerActor(nameValue, 0, async () => {
        await dispatch(showLoadingMain(true))
        dispatch(getActorAll(() => dispatch(showLoadingMain(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 0, searchText))
        callbackSuccess()
    }, async () => {
        dispatch(showLoadingMain(false))
        calllbackError()
    }))
}

export const MovieEditCastUpdateActor = (idActor: string, nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_SAVED_DATA))
    await dispatch(updateActor(idActor, nameValue, async () => {
        await dispatch(showLoadingMain(true))
        await dispatch(getActorAll(() => dispatch(showLoadingMain(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 0, searchText))
        callbackSuccess()
    }, async () => {
        dispatch(showLoadingMain(false))
        calllbackError()
    }))
}

export const MovieEditCastDeleteActor = (actorId: string, searchText: string, successDestroy: () => void) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_DELETE_REGISTER))
    await dispatch(deleteActor(actorId, async () => {
        await dispatch(showLoadingMain(true))
        dispatch(showLoadingMain(true))
        dispatch(getActorAll(() => dispatch(showLoadingMain(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 0, searchText))
        successDestroy()
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingMain(false))
    }))
}

export const MovieEditActorOpenById = (idActor: string) => async dispatch => {
    await dispatch(showLoadingMain(true))
    await dispatch(openActorById(idActor, () => dispatch(showLoadingMain(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingMain(false))
    }))
}

export const MovieEditCategoryBySearch = (searchText: string, categoriesGeneral) => async dispatch => {
    dispatch(getCategoryAllBySearch(searchText, categoriesGeneral))
}

export const MovieEditCountryBySearch = (searchText: string, countriesGeneral) => async dispatch => {
    dispatch(getCountryAllBySearch(searchText, countriesGeneral))
}

export const MovieEditCountryInsert = (nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_SAVED_DATA))
    await dispatch(registerCountry(nameValue, 0, async () => {
        await dispatch(showLoadingMain(true))
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

export const MovieEditCountryUpdate = (idCountry: string, nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_SAVED_DATA))
    await dispatch(updateCountry(idCountry, nameValue, async () => {
        await dispatch(showLoadingMain(true))
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

export const MovieEditCountryDelete = (countryId: string, searchText: string, successDestroy: () => void) => async dispatch => {
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

export const MovieEditCountryOpenById = (idCountry: string) => async dispatch => {
    await dispatch(showLoadingMain(true))
    await dispatch(openCountryById(idCountry, () => dispatch(showLoadingMain(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingMain(false))
    }))
}

export const MovieEditStreamBySearch = (searchText: string, streamsGeneral) => async dispatch => {
    dispatch(getStreamAllBySearch(searchText, streamsGeneral))
}

export const MovieEditStreamInsert = (nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
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

export const MovieEditStreamUpdate = (idStream: string, nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
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

export const MovieEditStreamDelete = (streamId: string, searchText: string, successDestroy: () => void) => async dispatch => {
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

export const MovieEditStreamOpenById = (idStream: string) => async dispatch => {
    await dispatch(showLoadingMain(true))
    await dispatch(openStreamById(idStream, () => dispatch(showLoadingMain(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingMain(false))
    }))
}
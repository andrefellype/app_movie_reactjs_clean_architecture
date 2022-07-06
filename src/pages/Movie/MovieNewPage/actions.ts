import { MSG_DELETE_REGISTER, MSG_SAVED_DATA } from "../../../app/core/consts"
import {
    deleteByIdInActor, openAllByAuthorizedInActor, openAllBySearchInActor, openInActor, createInActor, updateByIdInActor
} from "../../../app/redux/Actor/actor.actions"
import { openAllBySearchInCategory } from "../../../app/redux/Category/category.actions"
import {
    deleteByIdInCountry, openAllByAuthorizedInCountry, openAllBySearchInCountry, openInCountry, createInCountry, updateByIdInCountry
} from "../../../app/redux/Country/country.actions"
import {
    deleteByIdInDirector, openAllByAuthorizedInDirector, openAllBySearchInDirector, openInDirector, createInDirector, updateByIdInDirector
} from "../../../app/redux/Director/director.actions"
import { setLoadingPattern, insertMsgs } from "../../../app/redux/UtlisAppRedux/utlisAppRedux.actions"
import {
    deleteByIdInStream, openAllByAuthorizedInStream, openAllBySearchInStream, openInStream, createInStream, updateByIdInStream
} from "../../../app/redux/Stream/stream.actions"

export const MovieNewDirectorOpenById = (idDirector: string) => async dispatch => {
    await dispatch(setLoadingPattern(true))
    await dispatch(openInDirector(idDirector, () => dispatch(setLoadingPattern(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(setLoadingPattern(false))
    }))
}

export const MovieNewDirectorInsert = (nameValue: string, callbackSuccess: () => void,
    calllbackError: () => void) => async dispatch => {
        await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(createInDirector(nameValue, 0, async () => {
            await dispatch(setLoadingPattern(true))
            dispatch(openAllByAuthorizedInDirector(() => dispatch(setLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }, nameValue.substring(0, 3)))
            callbackSuccess()
        }, async () => {
            dispatch(setLoadingPattern(false))
            calllbackError()
        }))
    }

export const MovieNewDirectorUpdate = (idDirector: string, nameValue: string, callbackSuccess: () => void,
    calllbackError: () => void) => async dispatch => {
        await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(updateByIdInDirector(idDirector, nameValue, async () => {
            await dispatch(setLoadingPattern(true))
            await dispatch(openAllByAuthorizedInDirector(() => dispatch(setLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }, nameValue.substring(0, 3)))
            callbackSuccess()
        }, async () => {
            dispatch(setLoadingPattern(false))
            calllbackError()
        }))
    }

export const MovieNewDirectorBySearch = (searchText: string, directorsGeneral) => async dispatch => {
    if (searchText.length >= 3)
        dispatch(openAllBySearchInDirector(searchText, directorsGeneral))
    else
        dispatch(openAllBySearchInDirector(searchText, []))
}

export const MovieNewDirectorDelete = (directorId: string, searchText: string,
    successDestroy: () => void) => async dispatch => {
        await dispatch(setLoadingPattern(true, MSG_DELETE_REGISTER))
        await dispatch(deleteByIdInDirector(directorId, () => {
            dispatch(setLoadingPattern(true))
            dispatch(openAllByAuthorizedInDirector(() => dispatch(setLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }, searchText))
            successDestroy()
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }

export const MovieNewCastBySearch = (searchText: string, directorsGeneral) => async dispatch => {
    if (searchText.length >= 3)
        dispatch(openAllBySearchInActor(searchText, directorsGeneral))
    else
        dispatch(openAllBySearchInActor(searchText, []))
}

export const MovieNewCastInsertActor = (nameValue: string, callbackSuccess: () => void, calllbackError: () => void) =>
    async dispatch => {
        await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(createInActor(nameValue, 0, async () => {
            dispatch(openAllByAuthorizedInActor(() => dispatch(setLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }, nameValue.substring(0, 3)))
            callbackSuccess()
        }, async () => {
            dispatch(setLoadingPattern(false))
            calllbackError()
        }))
    }

export const MovieNewCastUpdateActor = (idActor: string, nameValue: string, callbackSuccess: () => void,
    calllbackError: () => void) => async dispatch => {
        await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(updateByIdInActor(idActor, nameValue, async () => {
            await dispatch(openAllByAuthorizedInActor(() => dispatch(setLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }, nameValue.substring(0, 3)))
            callbackSuccess()
        }, async () => {
            dispatch(setLoadingPattern(false))
            calllbackError()
        }))
    }

export const MovieNewCastDeleteActor = (actorId: string, searchText: string,
    successDestroy: () => void) => async dispatch => {
        await dispatch(setLoadingPattern(true, MSG_DELETE_REGISTER))
        await dispatch(deleteByIdInActor(actorId, () => {
            dispatch(setLoadingPattern(true))
            dispatch(openAllByAuthorizedInActor(() => dispatch(setLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }, searchText))
            successDestroy()
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }

export const MovieNewActorOpenById = (idActor: string) => async dispatch => {
    await dispatch(setLoadingPattern(true))
    await dispatch(openInActor(idActor, () => dispatch(setLoadingPattern(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(setLoadingPattern(false))
    }))
}

export const MovieNewCategoryBySearch = (searchText: string, categoriesGeneral) => async dispatch => {
    if (searchText.length >= 3)
        dispatch(openAllBySearchInCategory(searchText, categoriesGeneral))
    else
        dispatch(openAllBySearchInCategory(searchText, []))
}

export const MovieNewCountryBySearch = (searchText: string, countriesGeneral) => async dispatch => {
    if (searchText.length >= 3)
        dispatch(openAllBySearchInCountry(searchText, countriesGeneral))
    else
        dispatch(openAllBySearchInCountry(searchText, []))
}

export const MovieNewCountryInsert = (nameValue: string, callbackSuccess: () => void,
    calllbackError: () => void) => async dispatch => {
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

export const MovieNewCountryUpdate = (idCountry: string, nameValue: string, callbackSuccess: () => void,
    calllbackError: () => void) => async dispatch => {
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

export const MovieNewCountryDelete = (countryId: string, searchText: string, successDestroy: () => void) => async dispatch => {
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

export const MovieNewCountryOpenById = (idCountry: string) => async dispatch => {
    await dispatch(setLoadingPattern(true))
    await dispatch(openInCountry(idCountry, () => dispatch(setLoadingPattern(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(setLoadingPattern(false))
    }))
}

export const MovieNewStreamBySearch = (searchText: string, streamsGeneral) => async dispatch => {
    if (searchText.length >= 3)
        dispatch(openAllBySearchInStream(searchText, streamsGeneral))
    else
        dispatch(openAllBySearchInStream(searchText, []))
}

export const MovieNewStreamInsert = (nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
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

export const MovieNewStreamUpdate = (idStream: string, nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => async dispatch => {
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

export const MovieNewStreamDelete = (streamId: string, searchText: string, successDestroy: () => void) => async dispatch => {
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

export const MovieNewStreamOpenById = (idStream: string) => async dispatch => {
    await dispatch(setLoadingPattern(true))
    await dispatch(openInStream(idStream, () => dispatch(setLoadingPattern(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(setLoadingPattern(false))
    }))
}
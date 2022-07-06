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

export const MovieEditPageDirectorOpenById = (idDirector: string) => async dispatch => {
    await dispatch(setLoadingPattern(true))
    await dispatch(openInDirector(idDirector, () => dispatch(setLoadingPattern(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(setLoadingPattern(false))
    }))
}

export const MovieEditPageDirectorInsert = (nameValue: string, callbackSuccess: () => void,
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

export const MovieEditPageDirectorUpdate = (idDirector: string, nameValue: string, callbackSuccess: () => void,
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

export const MovieEditPageDirectorBySearch = (searchText: string, directorsGeneral) => async dispatch => {
    dispatch(openAllBySearchInDirector(searchText, directorsGeneral))
}

export const MovieEditPageDirectorDelete = (directorId: string, searchText: string,
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

export const MovieEditPageCastBySearch = (searchText: string, directorsGeneral) => async dispatch => {
    dispatch(openAllBySearchInActor(searchText, directorsGeneral))
}

export const MovieEditPageCastInsertActor = (nameValue: string, callbackSuccess: () => void,
    calllbackError: () => void) => async dispatch => {
        await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(createInActor(nameValue, 0, async () => {
            await dispatch(setLoadingPattern(true))
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

export const MovieEditPageCastUpdateActor = (idActor: string, nameValue: string, callbackSuccess: () => void,
    calllbackError: () => void) => async dispatch => {
        await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(updateByIdInActor(idActor, nameValue, async () => {
            await dispatch(setLoadingPattern(true))
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

export const MovieEditPageCastDeleteActor = (actorId: string, searchText: string,
    successDestroy: () => void) => async dispatch => {
        await dispatch(setLoadingPattern(true, MSG_DELETE_REGISTER))
        await dispatch(deleteByIdInActor(actorId, async () => {
            await dispatch(setLoadingPattern(true))
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

export const MovieEditPageActorOpenById = (idActor: string) => async dispatch => {
    await dispatch(setLoadingPattern(true))
    await dispatch(openInActor(idActor, () => dispatch(setLoadingPattern(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(setLoadingPattern(false))
    }))
}

export const MovieEditPageCategoryBySearch = (searchText: string, categoriesGeneral) => async dispatch => {
    dispatch(openAllBySearchInCategory(searchText, categoriesGeneral))
}

export const MovieEditPageCountryBySearch = (searchText: string, countriesGeneral) => async dispatch => {
    dispatch(openAllBySearchInCountry(searchText, countriesGeneral))
}

export const MovieEditPageCountryInsert = (nameValue: string, callbackSuccess: () => void,
    calllbackError: () => void) => async dispatch => {
        await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(createInCountry(nameValue, 0, async () => {
            await dispatch(setLoadingPattern(true))
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

export const MovieEditPageCountryUpdate = (idCountry: string, nameValue: string, callbackSuccess: () => void,
    calllbackError: () => void) => async dispatch => {
        await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(updateByIdInCountry(idCountry, nameValue, async () => {
            await dispatch(setLoadingPattern(true))
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

export const MovieEditPageCountryDelete = (countryId: string, searchText: string,
    successDestroy: () => void) => async dispatch => {
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

export const MovieEditPageCountryOpenById = (idCountry: string) => async dispatch => {
    await dispatch(setLoadingPattern(true))
    await dispatch(openInCountry(idCountry, () => dispatch(setLoadingPattern(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(setLoadingPattern(false))
    }))
}

export const MovieEditPageStreamBySearch = (searchText: string, streamsGeneral) => async dispatch => {
    dispatch(openAllBySearchInStream(searchText, streamsGeneral))
}

export const MovieEditPageStreamInsert = (nameValue: string, callbackSuccess: () => void,
    calllbackError: () => void) => async dispatch => {
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

export const MovieEditPageStreamUpdate = (idStream: string, nameValue: string, callbackSuccess: () => void,
    calllbackError: () => void) => async dispatch => {
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

export const MovieEditPageStreamDelete = (streamId: string, searchText: string, successDestroy: () => void) => async dispatch => {
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

export const MovieEditPageStreamOpenById = (idStream: string) => async dispatch => {
    await dispatch(setLoadingPattern(true))
    await dispatch(openInStream(idStream, () => dispatch(setLoadingPattern(false)), (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(setLoadingPattern(false))
    }))
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS, MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS } from "../../../app/core/consts"
import { updateEnabledByIdInActor, deleteByIdInActor, deleteAllByIdsInActor, openAllInActor, openAllBySearchInActor } from "../../../app/redux/Actor/actor.actions"
import { setLoadingPattern, insertMsgs } from "../../../app/redux/UtlisAppRedux/utlisAppRedux.actions"

export const ActorListPageDelete = (actorId: string, searchText: string) => async dispatch => {
    await dispatch(setLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteByIdInActor(actorId.toString(), () => {
        dispatch(setLoadingPattern(true))
        dispatch(openAllInActor(() => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success"))
        }, (errorMsg) => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs(errorMsg, 'error'))
        }, searchText))
    }, (errorMsg) => {
        dispatch(setLoadingPattern(false))
        dispatch(insertMsgs(errorMsg, 'error'))
    }))
}

export const ActorListPageBySearch = (searchText: string, callbackSuccess: () => void, actorsGeneral) => async dispatch => {
    await dispatch(openAllBySearchInActor(searchText, actorsGeneral))
    callbackSuccess()
}

export const ActorListPageDeleteBatch = (arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) => async dispatch => {
    await dispatch(setLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteAllByIdsInActor(arrayDeleteBatch, () => {
        dispatchEraseBatch()
        dispatch(setLoadingPattern(true))
        dispatch(openAllInActor(() => {
            dispatch(insertMsgs([MSG_DELETE_REGISTERS_SUCCESS], "success"))
            dispatch(setLoadingPattern(false))
        }, (errorMsg) => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs(errorMsg, 'error'))
        }, searchText))
    }, (errorMsg) => {
        dispatch(setLoadingPattern(false))
        dispatch(insertMsgs(errorMsg, 'error'))
    }))
}

export const ActorListPageApproved = (actorId: string, searchText: string) => async dispatch => {
    await dispatch(setLoadingPattern(true, MSG_UPDATED_REGISTER))
    await dispatch(updateEnabledByIdInActor(actorId.toString(), () => {
        dispatch(setLoadingPattern(true))
        dispatch(openAllInActor(() => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success"))
        }, (errorMsg) => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs(errorMsg, 'error'))
        }, searchText))
    }, (errorMsg) => {
        dispatch(setLoadingPattern(false))
        dispatch(insertMsgs(errorMsg, 'error'))
    }))
}
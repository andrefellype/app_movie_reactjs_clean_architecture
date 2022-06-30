/* eslint-disable @typescript-eslint/no-explicit-any */
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS, MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS } from "../../../app/core/consts"
import { approvedReviewedActorById, deleteActorById, deleteSeveralActorByIds, getActorAll, getActorAllBySearch } from "../../../app/redux/Actor/actor.actions"
import { showLoadingPattern, insertMsgs } from "../../../app/redux/UtlisAppRedux/utlisAppRedux.actions"

export const ActorListDelete = (actorId: string, searchText: string) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteActorById(actorId.toString(), () => {
        dispatch(showLoadingPattern(true))
        dispatch(getActorAll(() => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success"))
        }, (errorMsg) => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs(errorMsg, 'error'))
        }, 1, searchText))
    }, (errorMsg) => {
        dispatch(showLoadingPattern(false))
        dispatch(insertMsgs(errorMsg, 'error'))
    }))
}

export const ActorListBySearch = (searchText: string, callbackSuccess: () => void, actorsGeneral) => async dispatch => {
    await dispatch(getActorAllBySearch(searchText, actorsGeneral))
    callbackSuccess()
}

export const ActorListDeleteBatch = (arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteSeveralActorByIds(arrayDeleteBatch, () => {
        dispatchEraseBatch()
        dispatch(showLoadingPattern(true))
        dispatch(getActorAll(() => {
            dispatch(insertMsgs([MSG_DELETE_REGISTERS_SUCCESS], "success"))
            dispatch(showLoadingPattern(false))
        }, (errorMsg) => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs(errorMsg, 'error'))
        }, 1, searchText))
    }, (errorMsg) => {
        dispatch(showLoadingPattern(false))
        dispatch(insertMsgs(errorMsg, 'error'))
    }))
}

export const ActorListApproved = (actorId: string, searchText: string) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_UPDATED_REGISTER))
    await dispatch(approvedReviewedActorById(actorId.toString(), () => {
        dispatch(showLoadingPattern(true))
        dispatch(getActorAll(() => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success"))
        }, (errorMsg) => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs(errorMsg, 'error'))
        }, 1, searchText))
    }, (errorMsg) => {
        dispatch(showLoadingPattern(false))
        dispatch(insertMsgs(errorMsg, 'error'))
    }))
}
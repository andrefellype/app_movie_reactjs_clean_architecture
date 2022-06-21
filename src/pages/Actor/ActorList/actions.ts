/* eslint-disable @typescript-eslint/no-explicit-any */
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS, MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS } from "../../../app/core/consts"
import { approvedReviewedActorById, deleteActorById, deleteSeveralActorByIds, getActorAll, getActorAllBySearch } from "../../../app/redux/Actor/actor.actions"
import { showLoading } from "../../../app/redux/LoadingMain/loadingMain.actions"
import { insertMsgs } from "../../../app/redux/MsgAlert/msgAlert.actions"

export const ActorListDelete = (actorId: string, searchText: string) => async dispatch => {
    await dispatch(showLoading(true, MSG_DELETE_REGISTER))
    await dispatch(deleteActorById(actorId.toString(), () => {
        dispatch(showLoading(true))
        dispatch(getActorAll(() => {
            dispatch(showLoading(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success"))
        }, (errorMsg) => {
            dispatch(showLoading(false))
            dispatch(insertMsgs(errorMsg, 'error'))
        }, 1, searchText))
    }, (errorMsg) => {
        dispatch(showLoading(false))
        dispatch(insertMsgs(errorMsg, 'error'))
    }))
}

export const ActorListBySearch = (searchText: string, actorsGeneral) => async dispatch => {
    dispatch(getActorAllBySearch(searchText, actorsGeneral))
}

export const ActorListDeleteBatch = (arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) => async dispatch => {
    await dispatch(showLoading(true, MSG_DELETE_REGISTER))
    await dispatch(deleteSeveralActorByIds(arrayDeleteBatch, () => {
        dispatchEraseBatch()
        dispatch(showLoading(true))
        dispatch(getActorAll(() => {
            dispatch(insertMsgs([MSG_DELETE_REGISTERS_SUCCESS], "success"))
            dispatch(showLoading(false))
        }, (errorMsg) => {
            dispatch(showLoading(false))
            dispatch(insertMsgs(errorMsg, 'error'))
        }, 1, searchText))
    }, (errorMsg) => {
        dispatch(showLoading(false))
        dispatch(insertMsgs(errorMsg, 'error'))
    }))
}

export const ActorListApproved = (actorId: string, searchText: string) => async dispatch => {
    await dispatch(showLoading(true, MSG_UPDATED_REGISTER))
    await dispatch(approvedReviewedActorById(actorId.toString(), () => {
        dispatch(showLoading(true))
        dispatch(getActorAll(() => {
            dispatch(showLoading(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success"))
        }, (errorMsg) => {
            dispatch(showLoading(false))
            dispatch(insertMsgs(errorMsg, 'error'))
        }, 1, searchText))
    }, (errorMsg) => {
        dispatch(showLoading(false))
        dispatch(insertMsgs(errorMsg, 'error'))
    }))
}
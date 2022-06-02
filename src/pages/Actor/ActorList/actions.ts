/* eslint-disable @typescript-eslint/no-explicit-any */
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS, MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS } from "../../../app/core/consts"
import { approvedReviewedActor, deleteActor, deleteSeveralActor, getActorAll, getActorAllBySearch } from "../../../app/redux/Actor/actor.actions"
import { showLoadingMain } from "../../../app/redux/LoadingMain/loadingMain.actions"
import { insertMsgs } from "../../../app/redux/MsgAlert/msgAlert.actions"

export const ActorListDelete = (actorId: string, searchText: string) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_DELETE_REGISTER))
    await dispatch(deleteActor(actorId.toString(), () => {
        dispatch(showLoadingMain(true))
        dispatch(getActorAll(() => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success"))
        }, (errorMsg) => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs(errorMsg, 'error'))
        }, 1, searchText))
    }, (errorMsg) => {
        dispatch(showLoadingMain(false))
        dispatch(insertMsgs(errorMsg, 'error'))
    }))
}

export const ActorListBySearch = (searchText: string, actorsGeneral) => async dispatch => {
    dispatch(getActorAllBySearch(searchText, actorsGeneral))
}

export const ActorListDeleteBatch = (arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_DELETE_REGISTER))
    await dispatch(deleteSeveralActor(arrayDeleteBatch, () => {
        dispatchEraseBatch()
        dispatch(showLoadingMain(true))
        dispatch(getActorAll(() => {
            dispatch(insertMsgs([MSG_DELETE_REGISTERS_SUCCESS], "success"))
            dispatch(showLoadingMain(false))
        }, (errorMsg) => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs(errorMsg, 'error'))
        }, 1, searchText))
    }, (errorMsg) => {
        dispatch(showLoadingMain(false))
        dispatch(insertMsgs(errorMsg, 'error'))
    }))
}

export const ActorListApproved = (actorId: string, searchText: string) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_UPDATED_REGISTER))
    await dispatch(approvedReviewedActor(actorId.toString(), () => {
        dispatch(showLoadingMain(true))
        dispatch(getActorAll(() => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success"))
        }, (errorMsg) => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs(errorMsg, 'error'))
        }, 1, searchText))
    }, (errorMsg) => {
        dispatch(showLoadingMain(false))
        dispatch(insertMsgs(errorMsg, 'error'))
    }))
}
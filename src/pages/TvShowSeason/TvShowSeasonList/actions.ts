/* eslint-disable @typescript-eslint/no-explicit-any */
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS, MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS } from "../../../app/core/consts"
import { showLoadingMain } from "../../../app/redux/LoadingMain/loadingMain.actions"
import { insertMsgs } from "../../../app/redux/MsgAlert/msgAlert.actions"
import { approvedTvShowSeason, deleteSeveralTvShowSeason, deleteTvShowSeason, getTvShowSeasonAll, getTvShowSeasonAllBySearch } from "../../../app/redux/TvShowSeason/tvshowseason.actions"

export const TvShowSeasonListDelete = (tvShowSeasonId: string, tvShowId: string, searchText: string) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_DELETE_REGISTER))
    await dispatch(deleteTvShowSeason(tvShowSeasonId, async () => {
        dispatch(showLoadingMain(true))
        dispatch(showLoadingMain(true))
        await dispatch(getTvShowSeasonAll(tvShowId, () => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingMain(false))
    }))
}

export const TvShowSeasonListBySearch = (searchText: string, seasonsGeneral) => async dispatch => {
    dispatch(getTvShowSeasonAllBySearch(searchText, seasonsGeneral))
}

export const TvShowSeasonListDeleteBatch = (tvShowId: string, arrayDeleteBatch: any, dispatchEraseBatch: any, searchText: string) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_DELETE_REGISTER))
    await dispatch(deleteSeveralTvShowSeason(arrayDeleteBatch, async () => {
        dispatchEraseBatch()
        dispatch(showLoadingMain(true))
        await dispatch(getTvShowSeasonAll(tvShowId, () => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTERS_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingMain(false))
    }))
}

export const TvShowSeasonListApproved = (tvShowSeasonId: string, tvShowId: string, searchText: string) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_UPDATED_REGISTER))
    await dispatch(approvedTvShowSeason(tvShowSeasonId, async () => {
        dispatch(showLoadingMain(true))
        await dispatch(getTvShowSeasonAll(tvShowId, () => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingMain(false))
    }))
}
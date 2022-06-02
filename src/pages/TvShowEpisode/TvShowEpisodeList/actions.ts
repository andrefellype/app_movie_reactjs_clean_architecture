/* eslint-disable @typescript-eslint/no-explicit-any */
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS, MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS } from "../../../app/core/consts"
import { showLoadingMain } from "../../../app/redux/LoadingMain/loadingMain.actions"
import { insertMsgs } from "../../../app/redux/MsgAlert/msgAlert.actions"
import { approvedTvShowEpisode, deleteSeveralTvShowEpisode, deleteTvShowEpisode, getTvShowEpisodeAll, getTvShowEpisodeAllBySearch } from "../../../app/redux/TvShowEpisode/tvshowepisode.actions"

export const TvShowEpisodeListDelete = (tvShowepisodeId: string, tvShowSeasonId: string, searchText: string) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_DELETE_REGISTER))
    await dispatch(deleteTvShowEpisode(tvShowepisodeId, async () => {
        dispatch(showLoadingMain(true))
        await dispatch(getTvShowEpisodeAll(tvShowSeasonId, () => {
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

export const TvShowEpisodeListBySearch = (searchText: string, episodesGeneral) => async dispatch => {
    dispatch(getTvShowEpisodeAllBySearch(searchText, episodesGeneral))
}

export const TvShowEpisodeListDeleteBatch = (tvShowSeasonId: string, arrayDeleteBatch: any, dispatchEraseBatch: any, searchText: string) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_DELETE_REGISTER))
    await dispatch(deleteSeveralTvShowEpisode(arrayDeleteBatch, async () => {
        dispatch(showLoadingMain(true))
        dispatchEraseBatch()
        await dispatch(getTvShowEpisodeAll(tvShowSeasonId, () => {
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

export const TvShowEpisodeListApproved = (tvShowepisodeId: string, tvShowSeasonId: string, searchText: string) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_UPDATED_REGISTER))
    await dispatch(approvedTvShowEpisode(tvShowepisodeId, async () => {
        await dispatch(showLoadingMain(true))
        await dispatch(getTvShowEpisodeAll(tvShowSeasonId, () => {
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
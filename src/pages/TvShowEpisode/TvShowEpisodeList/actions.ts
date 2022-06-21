/* eslint-disable @typescript-eslint/no-explicit-any */
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS, MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS } from "../../../app/core/consts"
import { showLoading } from "../../../app/redux/LoadingMain/loadingMain.actions"
import { insertMsgs } from "../../../app/redux/MsgAlert/msgAlert.actions"
import { approvedTvShowEpisodeById, deleteSeveralTvShowEpisodeByIds, deleteTvShowEpisodeById, getTvShowEpisodeAll, getTvShowEpisodeAllBySearch } from "../../../app/redux/TvShowEpisode/tvshowepisode.actions"

export const TvShowEpisodeListDelete = (tvShowepisodeId: string, tvShowSeasonId: string, searchText: string) => async dispatch => {
    await dispatch(showLoading(true, MSG_DELETE_REGISTER))
    await dispatch(deleteTvShowEpisodeById(tvShowepisodeId, async () => {
        dispatch(showLoading(true))
        await dispatch(getTvShowEpisodeAll(tvShowSeasonId, () => {
            dispatch(showLoading(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}

export const TvShowEpisodeListBySearch = (searchText: string, episodesGeneral) => async dispatch => {
    dispatch(getTvShowEpisodeAllBySearch(searchText, episodesGeneral))
}

export const TvShowEpisodeListDeleteBatch = (tvShowSeasonId: string, arrayDeleteBatch: any, dispatchEraseBatch: any, searchText: string) => async dispatch => {
    await dispatch(showLoading(true, MSG_DELETE_REGISTER))
    await dispatch(deleteSeveralTvShowEpisodeByIds(arrayDeleteBatch, async () => {
        dispatch(showLoading(true))
        dispatchEraseBatch()
        await dispatch(getTvShowEpisodeAll(tvShowSeasonId, () => {
            dispatch(showLoading(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTERS_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}

export const TvShowEpisodeListApproved = (tvShowepisodeId: string, tvShowSeasonId: string, searchText: string) => async dispatch => {
    await dispatch(showLoading(true, MSG_UPDATED_REGISTER))
    await dispatch(approvedTvShowEpisodeById(tvShowepisodeId, async () => {
        await dispatch(showLoading(true))
        await dispatch(getTvShowEpisodeAll(tvShowSeasonId, () => {
            dispatch(showLoading(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}
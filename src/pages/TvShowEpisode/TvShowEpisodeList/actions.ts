/* eslint-disable @typescript-eslint/no-explicit-any */
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS, MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS } from "../../../app/core/consts"
import { showLoadingPattern, insertMsgs } from "../../../app/redux/UtlisAppRedux/utlisAppRedux.actions"
import { approvedTvShowEpisodeById, deleteSeveralTvShowEpisodeByIds, deleteTvShowEpisodeById, getTvShowEpisodeAll, getTvShowEpisodeAllBySearch } from "../../../app/redux/TvShowEpisode/tvshowepisode.actions"

export const TvShowEpisodeListDelete = (tvShowepisodeId: string, tvShowSeasonId: string, searchText: string) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteTvShowEpisodeById(tvShowepisodeId, async () => {
        dispatch(showLoadingPattern(true))
        await dispatch(getTvShowEpisodeAll(tvShowSeasonId, () => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingPattern(false))
    }))
}

export const TvShowEpisodeListBySearch = (searchText: string, episodesGeneral) => async dispatch => {
    dispatch(getTvShowEpisodeAllBySearch(searchText, episodesGeneral))
}

export const TvShowEpisodeListDeleteBatch = (tvShowSeasonId: string, arrayDeleteBatch: any, dispatchEraseBatch: any, searchText: string) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteSeveralTvShowEpisodeByIds(arrayDeleteBatch, async () => {
        dispatch(showLoadingPattern(true))
        dispatchEraseBatch()
        await dispatch(getTvShowEpisodeAll(tvShowSeasonId, () => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTERS_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingPattern(false))
    }))
}

export const TvShowEpisodeListApproved = (tvShowepisodeId: string, tvShowSeasonId: string, searchText: string) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_UPDATED_REGISTER))
    await dispatch(approvedTvShowEpisodeById(tvShowepisodeId, async () => {
        await dispatch(showLoadingPattern(true))
        await dispatch(getTvShowEpisodeAll(tvShowSeasonId, () => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingPattern(false))
    }))
}
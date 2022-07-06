/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS, MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS
} from "../../../app/core/consts"
import { setLoadingPattern, insertMsgs } from "../../../app/redux/UtlisAppRedux/utlisAppRedux.actions"
import {
    updateEnabledByIdInTvShowEpisode, deleteAllByIdsInTvShowEpisode, deleteByIdInTvShowEpisode, openAllInTvShowEpisode, openAllBySearchInTvShowEpisode
} from "../../../app/redux/TvShowEpisode/tvshowepisode.actions"

export const TvShowEpisodeListPageDelete = (tvShowepisodeId: string, tvShowSeasonId: string, searchText: string) => async dispatch => {
    await dispatch(setLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteByIdInTvShowEpisode(tvShowepisodeId, async () => {
        dispatch(setLoadingPattern(true))
        await dispatch(openAllInTvShowEpisode(tvShowSeasonId, () => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(setLoadingPattern(false))
    }))
}

export const TvShowEpisodeListPageBySearch = (searchText: string, callbackSuccess: () => void, episodesGeneral) => async dispatch => {
    dispatch(openAllBySearchInTvShowEpisode(searchText, episodesGeneral))
    callbackSuccess()
}

export const TvShowEpisodeListPageDeleteBatch = (tvShowSeasonId: string, arrayDeleteBatch: any,
    dispatchEraseBatch: any, searchText: string) => async dispatch => {
        await dispatch(setLoadingPattern(true, MSG_DELETE_REGISTER))
        await dispatch(deleteAllByIdsInTvShowEpisode(arrayDeleteBatch, async () => {
            dispatch(setLoadingPattern(true))
            dispatchEraseBatch()
            await dispatch(openAllInTvShowEpisode(tvShowSeasonId, () => {
                dispatch(setLoadingPattern(false))
                dispatch(insertMsgs([MSG_DELETE_REGISTERS_SUCCESS], "success"))
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }, searchText))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }

export const TvShowEpisodeListPageApproved = (tvShowepisodeId: string, tvShowSeasonId: string, searchText: string) => async dispatch => {
    await dispatch(setLoadingPattern(true, MSG_UPDATED_REGISTER))
    await dispatch(updateEnabledByIdInTvShowEpisode(tvShowepisodeId, async () => {
        await dispatch(setLoadingPattern(true))
        await dispatch(openAllInTvShowEpisode(tvShowSeasonId, () => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }, searchText))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(setLoadingPattern(false))
    }))
}
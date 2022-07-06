/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS,
    MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS
} from "../../../app/core/consts"
import { setLoadingPattern, insertMsgs } from "../../../app/redux/UtlisAppRedux/utlisAppRedux.actions"
import {
    updateEnabledByIdInTvShowSeason, deleteAllByIdsInTvShowSeason, deleteByIdInTvShowSeason,
    openAllInTvShowSeason, openAllByOrderAndSearchInTvShowSeason
} from "../../../app/redux/TvShowSeason/tvshowseason.actions"

export const TvShowSeasonListPageDelete = (tvShowSeasonId: string, tvShowId: string, searchText: string) => async dispatch => {
    await dispatch(setLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteByIdInTvShowSeason(tvShowSeasonId, async () => {
        dispatch(setLoadingPattern(true))
        dispatch(setLoadingPattern(true))
        await dispatch(openAllInTvShowSeason(tvShowId, () => {
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

export const TvShowSeasonListPageBySearch = (searchText: string, callbackSuccess: () => void, seasonsGeneral) => async dispatch => {
    dispatch(openAllByOrderAndSearchInTvShowSeason(searchText, seasonsGeneral))
    callbackSuccess()
}

export const TvShowSeasonListPageDeleteBatch = (tvShowId: string, arrayDeleteBatch: any, dispatchEraseBatch: any, searchText: string) => async dispatch => {
    await dispatch(setLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteAllByIdsInTvShowSeason(arrayDeleteBatch, async () => {
        dispatchEraseBatch()
        dispatch(setLoadingPattern(true))
        await dispatch(openAllInTvShowSeason(tvShowId, () => {
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

export const TvShowSeasonListPageApproved = (tvShowSeasonId: string, tvShowId: string, searchText: string) => async dispatch => {
    await dispatch(setLoadingPattern(true, MSG_UPDATED_REGISTER))
    await dispatch(updateEnabledByIdInTvShowSeason(tvShowSeasonId, async () => {
        dispatch(setLoadingPattern(true))
        await dispatch(openAllInTvShowSeason(tvShowId, () => {
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
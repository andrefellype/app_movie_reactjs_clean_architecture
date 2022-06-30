/* eslint-disable @typescript-eslint/no-explicit-any */
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS, MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS } from "../../../app/core/consts"
import { showLoadingPattern, insertMsgs } from "../../../app/redux/UtlisAppRedux/utlisAppRedux.actions"
import { approvedTvShowSeasonById, deleteSeveralTvShowSeasonByIds, deleteTvShowSeasonById, getTvShowSeasonAll, getTvShowSeasonAllBySearch } from "../../../app/redux/TvShowSeason/tvshowseason.actions"

export const TvShowSeasonListDelete = (tvShowSeasonId: string, tvShowId: string, searchText: string) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteTvShowSeasonById(tvShowSeasonId, async () => {
        dispatch(showLoadingPattern(true))
        dispatch(showLoadingPattern(true))
        await dispatch(getTvShowSeasonAll(tvShowId, () => {
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

export const TvShowSeasonListBySearch = (searchText: string, seasonsGeneral) => async dispatch => {
    dispatch(getTvShowSeasonAllBySearch(searchText, seasonsGeneral))
}

export const TvShowSeasonListDeleteBatch = (tvShowId: string, arrayDeleteBatch: any, dispatchEraseBatch: any, searchText: string) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteSeveralTvShowSeasonByIds(arrayDeleteBatch, async () => {
        dispatchEraseBatch()
        dispatch(showLoadingPattern(true))
        await dispatch(getTvShowSeasonAll(tvShowId, () => {
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

export const TvShowSeasonListApproved = (tvShowSeasonId: string, tvShowId: string, searchText: string) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_UPDATED_REGISTER))
    await dispatch(approvedTvShowSeasonById(tvShowSeasonId, async () => {
        dispatch(showLoadingPattern(true))
        await dispatch(getTvShowSeasonAll(tvShowId, () => {
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
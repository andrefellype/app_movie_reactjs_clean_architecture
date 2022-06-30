/* eslint-disable @typescript-eslint/no-explicit-any */
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS, MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS } from "../../../app/core/consts"
import { showLoadingPattern, insertMsgs } from "../../../app/redux/UtlisAppRedux/utlisAppRedux.actions"
import { approvedReviewedTvShowById, deleteSeveralTvShowByIds, deleteTvShowById, getTvShowAll, getTvShowAllByOrderAndSearchAndFilter } from "../../../app/redux/TvShow/tvshow.actions"

export const TvShowListDelete = (tvShowId: string, orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteTvShowById(tvShowId.toString(), () => {
        dispatch(showLoadingPattern(true))
        dispatch(getTvShowAll(() => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, orderField, searchText, categoryFilter, releaseFilter, countryFilter))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingPattern(false))
    }))
}

export const TvShowListDeleteBatch = (arrayDeleteBatch: any, orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string, dispatchEraseBatch: any) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteSeveralTvShowByIds(arrayDeleteBatch, () => {
        dispatchEraseBatch()
        dispatch(showLoadingPattern(true))
        dispatch(getTvShowAll(() => {
            dispatch(insertMsgs([MSG_DELETE_REGISTERS_SUCCESS], "success"))
            dispatch(showLoadingPattern(false))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, orderField, searchText, categoryFilter, releaseFilter, countryFilter))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingPattern(false))
    }))
}

export const TvShowListByOrderAndSearchAndFilter = (orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string, updateTvShows: () => void, tvShowsGeneral) => async dispatch => {
    dispatch(getTvShowAllByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, countryFilter, tvShowsGeneral))
    updateTvShows()
}

export const TvShowListApproved = (tvShowId: string, orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => async dispatch => {
    await dispatch(showLoadingPattern(true, MSG_UPDATED_REGISTER))
    await dispatch(approvedReviewedTvShowById(tvShowId.toString(), () => {
        dispatch(showLoadingPattern(true))
        dispatch(getTvShowAll(() => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, orderField, searchText, categoryFilter, releaseFilter, countryFilter))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingPattern(false))
    }))
}
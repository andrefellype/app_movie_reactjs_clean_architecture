/* eslint-disable @typescript-eslint/no-explicit-any */
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS, MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS } from "../../../app/core/consts"
import { showLoading } from "../../../app/redux/LoadingMain/loadingMain.actions"
import { insertMsgs } from "../../../app/redux/MsgAlert/msgAlert.actions"
import { approvedReviewedTvShowById, deleteSeveralTvShowByIds, deleteTvShowById, getTvShowAll, getTvShowAllByOrderAndSearchAndFilter } from "../../../app/redux/TvShow/tvshow.actions"

export const TvShowListDelete = (tvShowId: string, orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => async dispatch => {
    await dispatch(showLoading(true, MSG_DELETE_REGISTER))
    await dispatch(deleteTvShowById(tvShowId.toString(), () => {
        dispatch(showLoading(true))
        dispatch(getTvShowAll(() => {
            dispatch(showLoading(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, orderField, searchText, categoryFilter, releaseFilter, countryFilter))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}

export const TvShowListDeleteBatch = (arrayDeleteBatch: any, orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string, dispatchEraseBatch: any) => async dispatch => {
    await dispatch(showLoading(true, MSG_DELETE_REGISTER))
    await dispatch(deleteSeveralTvShowByIds(arrayDeleteBatch, () => {
        dispatchEraseBatch()
        dispatch(showLoading(true))
        dispatch(getTvShowAll(() => {
            dispatch(insertMsgs([MSG_DELETE_REGISTERS_SUCCESS], "success"))
            dispatch(showLoading(false))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, orderField, searchText, categoryFilter, releaseFilter, countryFilter))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}

export const TvShowListByOrderAndSearchAndFilter = (orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string, tvShowsGeneral) => async dispatch => {
    dispatch(getTvShowAllByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, countryFilter, tvShowsGeneral))
}

export const TvShowListApproved = (tvShowId: string, orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => async dispatch => {
    await dispatch(showLoading(true, MSG_UPDATED_REGISTER))
    await dispatch(approvedReviewedTvShowById(tvShowId.toString(), () => {
        dispatch(showLoading(true))
        dispatch(getTvShowAll(() => {
            dispatch(showLoading(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, orderField, searchText, categoryFilter, releaseFilter, countryFilter))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoading(false))
    }))
}
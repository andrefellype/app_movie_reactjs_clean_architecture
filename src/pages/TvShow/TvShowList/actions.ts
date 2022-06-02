/* eslint-disable @typescript-eslint/no-explicit-any */
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS, MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS } from "../../../app/core/consts"
import { showLoadingMain } from "../../../app/redux/LoadingMain/loadingMain.actions"
import { insertMsgs } from "../../../app/redux/MsgAlert/msgAlert.actions"
import { approvedReviewedTvShow, deleteSeveralTvShow, deleteTvShow, getTvShowAll, getTvShowAllByOrderAndSearchAndFilter } from "../../../app/redux/TvShow/tvshow.actions"

export const TvShowListDelete = (tvShowId: string, orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_DELETE_REGISTER))
    await dispatch(deleteTvShow(tvShowId.toString(), () => {
        dispatch(showLoadingMain(true))
        dispatch(getTvShowAll(() => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, orderField, searchText, categoryFilter, releaseFilter, countryFilter))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingMain(false))
    }))
}

export const TvShowListDeleteBatch = (arrayDeleteBatch: any, orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string, dispatchEraseBatch: any) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_DELETE_REGISTER))
    await dispatch(deleteSeveralTvShow(arrayDeleteBatch, () => {
        dispatchEraseBatch()
        dispatch(showLoadingMain(true))
        dispatch(getTvShowAll(() => {
            dispatch(insertMsgs([MSG_DELETE_REGISTERS_SUCCESS], "success"))
            dispatch(showLoadingMain(false))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, orderField, searchText, categoryFilter, releaseFilter, countryFilter))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingMain(false))
    }))
}

export const TvShowListByOrderAndSearchAndFilter = (orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string, tvShowsGeneral) => async dispatch => {
    dispatch(getTvShowAllByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, countryFilter, tvShowsGeneral))
}

export const TvShowListApproved = (tvShowId: string, orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_UPDATED_REGISTER))
    await dispatch(approvedReviewedTvShow(tvShowId.toString(), () => {
        dispatch(showLoadingMain(true))
        dispatch(getTvShowAll(() => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, orderField, searchText, categoryFilter, releaseFilter, countryFilter))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingMain(false))
    }))
}
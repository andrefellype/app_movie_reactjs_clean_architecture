/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS, MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS
} from "../../../app/core/consts"
import { setLoadingPattern, insertMsgs } from "../../../app/redux/UtlisAppRedux/utlisAppRedux.actions"
import {
    updateEnabledByIdInTvShow, deleteAllByIdsInTvShow, deleteByIdInTvShow, openAllInTvShow, openAllByOrderAndSearchAndFilterInTvShow
} from "../../../app/redux/TvShow/tvshow.actions"

export const TvShowListPageDelete = (tvShowId: string, orderField: string, searchText: string,
    categoryFilter: string, releaseFilter: string, countryFilter: string) => async dispatch => {
        await dispatch(setLoadingPattern(true, MSG_DELETE_REGISTER))
        await dispatch(deleteByIdInTvShow(tvShowId.toString(), () => {
            dispatch(setLoadingPattern(true))
            dispatch(openAllInTvShow(() => {
                dispatch(setLoadingPattern(false))
                dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success"))
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }, orderField, searchText, categoryFilter, releaseFilter, countryFilter))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }

export const TvShowListPageDeleteBatch = (arrayDeleteBatch: any, orderField: string, searchText: string,
    categoryFilter: string, releaseFilter: string, countryFilter: string, dispatchEraseBatch: any) => async dispatch => {
        await dispatch(setLoadingPattern(true, MSG_DELETE_REGISTER))
        await dispatch(deleteAllByIdsInTvShow(arrayDeleteBatch, () => {
            dispatchEraseBatch()
            dispatch(setLoadingPattern(true))
            dispatch(openAllInTvShow(() => {
                dispatch(insertMsgs([MSG_DELETE_REGISTERS_SUCCESS], "success"))
                dispatch(setLoadingPattern(false))
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }, orderField, searchText, categoryFilter, releaseFilter, countryFilter))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }

export const TvShowListPageByOrderAndSearchAndFilter = (orderField: string, searchText: string, categoryFilter: string,
    releaseFilter: string, countryFilter: string, updateTvShows: () => void, tvShowsGeneral) => async dispatch => {
        dispatch(openAllByOrderAndSearchAndFilterInTvShow(orderField, searchText, categoryFilter, releaseFilter, countryFilter, tvShowsGeneral))
        updateTvShows()
    }

export const TvShowListPageApproved = (tvShowId: string, orderField: string, searchText: string, categoryFilter: string,
    releaseFilter: string, countryFilter: string) => async dispatch => {
        await dispatch(setLoadingPattern(true, MSG_UPDATED_REGISTER))
        await dispatch(updateEnabledByIdInTvShow(tvShowId.toString(), () => {
            dispatch(setLoadingPattern(true))
            dispatch(openAllInTvShow(() => {
                dispatch(setLoadingPattern(false))
                dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success"))
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }, orderField, searchText, categoryFilter, releaseFilter, countryFilter))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }
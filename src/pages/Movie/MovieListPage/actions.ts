/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS, MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS
} from "../../../app/core/consts"
import { setLoadingPattern, insertMsgs } from "../../../app/redux/UtlisAppRedux/utlisAppRedux.actions"
import {
    updateEnabledByIdInMovie, deleteByIdInMovie, deleteAllByIdsInMovie, openAllInMovie, openAllByOrderAndSearchAndFilterInMovie
} from "../../../app/redux/Movie/movie.actions"

export const MovieListDelete = (movieId: string, orderField: string, searchText: string, categoryFilter: string,
    releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string) => async dispatch => {
        await dispatch(setLoadingPattern(true, MSG_DELETE_REGISTER))
        await dispatch(deleteByIdInMovie(movieId.toString(), () => {
            dispatch(setLoadingPattern(true))
            dispatch(openAllInMovie(() => {
                dispatch(setLoadingPattern(false))
                dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success"))
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }, orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }

export const MovieListDeleteBatch = (arrayDeleteBatch: any, orderField: string, searchText: string,
    categoryFilter: string, releaseFilter: string, durationMinFilter: string, durationMaxFilter: string,
    countryFilter: string, dispatchEraseBatch: any) => async dispatch => {
        await dispatch(setLoadingPattern(true, MSG_DELETE_REGISTER))
        await dispatch(deleteAllByIdsInMovie(arrayDeleteBatch, () => {
            dispatchEraseBatch()
            dispatch(setLoadingPattern(true))
            dispatch(openAllInMovie(() => {
                dispatch(insertMsgs([MSG_DELETE_REGISTERS_SUCCESS], "success"))
                dispatch(setLoadingPattern(false))
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }, orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }

export const MovieListByOrderAndSearchAndFilter = (orderField: string, searchText: string, categoryFilter: string,
    releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string,
    updateMovies: () => void, moviesGeneral) => async dispatch => {
        dispatch(openAllByOrderAndSearchAndFilterInMovie(orderField, searchText, categoryFilter,
            releaseFilter, durationMinFilter, durationMaxFilter, countryFilter, moviesGeneral))
        updateMovies()
    }

export const MovieListApproved = (movieId: string, orderField: string, searchText: string, categoryFilter: string,
    releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string) => async dispatch => {
        await dispatch(setLoadingPattern(true, MSG_UPDATED_REGISTER))
        await dispatch(updateEnabledByIdInMovie(movieId.toString(), () => {
            dispatch(setLoadingPattern(true))
            dispatch(openAllInMovie(() => {
                dispatch(setLoadingPattern(false))
                dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success"))
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }, orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }
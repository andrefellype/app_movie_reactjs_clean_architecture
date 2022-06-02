/* eslint-disable @typescript-eslint/no-explicit-any */
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTERS_SUCCESS, MSG_DELETE_REGISTER_SUCCESS, MSG_UPDATED_REGISTER, MSG_UPDATE_REGISTER_SUCCESS } from "../../../app/core/consts"
import { showLoadingMain } from "../../../app/redux/LoadingMain/loadingMain.actions"
import { approvedReviewedMovie, deleteMovie, deleteSeveralMovie, getMovieAll, getMovieAllByOrderAndSearchAndFilter } from "../../../app/redux/Movie/movie.actions"
import { insertMsgs } from "../../../app/redux/MsgAlert/msgAlert.actions"

export const MovieListDelete = (movieId: string, orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_DELETE_REGISTER))
    await dispatch(deleteMovie(movieId.toString(), () => {
        dispatch(showLoadingMain(true))
        dispatch(getMovieAll(() => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingMain(false))
    }))
}

export const MovieListDeleteBatch = (arrayDeleteBatch: any, orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string, dispatchEraseBatch: any) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_DELETE_REGISTER))
    await dispatch(deleteSeveralMovie(arrayDeleteBatch, () => {
        dispatchEraseBatch()
        dispatch(showLoadingMain(true))
        dispatch(getMovieAll(() => {
            dispatch(insertMsgs([MSG_DELETE_REGISTERS_SUCCESS], "success"))
            dispatch(showLoadingMain(false))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingMain(false))
    }))
}

export const MovieListByOrderAndSearchAndFilter = (orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string, moviesGeneral) => async dispatch => {
    dispatch(getMovieAllByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter, moviesGeneral))
}

export const MovieListApproved = (movieId: string, orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_UPDATED_REGISTER))
    await dispatch(approvedReviewedMovie(movieId.toString(), () => {
        dispatch(showLoadingMain(true))
        dispatch(getMovieAll(() => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingMain(false))
    }))
}
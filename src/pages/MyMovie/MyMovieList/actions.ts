/* eslint-disable @typescript-eslint/no-explicit-any */
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTER_SUCCESS } from "../../../app/core/consts"
import { showLoadingMain } from "../../../app/redux/LoadingMain/loadingMain.actions"
import { insertMsgs } from "../../../app/redux/MsgAlert/msgAlert.actions"
import { deleteMyMovie, getMyMovieAll, getMyMovieAllByOrderAndSearchAndFilter } from "../../../app/redux/MyMovie/myMovie.actions"

export const MyMovieListDelete = (movieId: string, orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_DELETE_REGISTER))
    await dispatch(deleteMyMovie(movieId.toString(), () => {
        dispatch(showLoadingMain(true))
        dispatch(getMyMovieAll(() => {
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

export const MyMovieListByOrderAndSearchAndFilter = (orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string, moviesGeneral) => async dispatch => {
    dispatch(getMyMovieAllByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter, moviesGeneral))
}
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTER_SUCCESS } from "../../../app/core/consts"
import { setLoadingPattern, insertMsgs } from "../../../app/redux/UtlisAppRedux/utlisAppRedux.actions"
import {
    deleteByMovieIdInMyMovie, openAllInMyMovie, openAllByOrderAndSearchAndFilterInMyMovie
} from "../../../app/redux/MyMovie/myMovie.actions"

export const MyMovieListPageDelete = (movieId: string, orderField: string, searchText: string, categoryFilter: string,
    releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string) => async dispatch => {
        await dispatch(setLoadingPattern(true, MSG_DELETE_REGISTER))
        await dispatch(deleteByMovieIdInMyMovie(movieId.toString(), () => {
            dispatch(setLoadingPattern(true))
            dispatch(openAllInMyMovie(() => {
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

export const MyMovieListPageByOrderAndSearchAndFilter = (orderField: string, searchText: string, categoryFilter: string,
    releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string,
    updateMovies: () => void, moviesGeneral) => async dispatch => {
        dispatch(openAllByOrderAndSearchAndFilterInMyMovie(orderField, searchText, categoryFilter, releaseFilter, durationMinFilter,
            durationMaxFilter, countryFilter, moviesGeneral))
        updateMovies()
    }
/* eslint-disable prefer-destructuring */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MSG_NEW_REGISTER_SUCCESS, MSG_REMOVE_REGISTER_SUCCESS, MSG_REMOVE_REGISTER, MSG_SAVED_DATA } from '../../../app/core/consts'
import { showLoadingMain } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { getMovieAllByNotMyMovie } from '../../../app/redux/Movie/movie.actions'
import { getMoviesAll, getMoviesAllFilter } from '../../../app/redux/Movie/movie.selector'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'
import { registerMyMovie, registerNeverWatchMovie } from '../../../app/redux/MyMovie/myMovie.actions'
import { MyMovieNewMovieBySearch } from './actions'
import MyMovieNewView from './view'

function MyMovieNew() {

    const dispatch = useDispatch()

    const movies = useSelector(getMoviesAllFilter)
    const moviesGeneral = useSelector(getMoviesAll)

    React.useEffect(() => {
        dispatch(showLoadingMain(true))
        dispatch(getMovieAllByNotMyMovie(() => dispatch(showLoadingMain(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function refreshListMovie(searchText: string, callbackSucess: () => void) {
        await dispatch(showLoadingMain(true))
        await dispatch(getMovieAllByNotMyMovie(() => dispatch(showLoadingMain(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, searchText))
        callbackSucess()
    }

    async function insertMyMovie(movieId: string) {
        await dispatch(showLoadingMain(true, MSG_SAVED_DATA))
        await dispatch(registerMyMovie(movieId, () => {
            dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
            dispatch(showLoadingMain(false))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }))
    }

    async function insertNeverWatchMovie(movieId: string) {
        await dispatch(showLoadingMain(true, MSG_REMOVE_REGISTER))
        await dispatch(registerNeverWatchMovie(movieId, () => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs([MSG_REMOVE_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }))
    }

    return (
        <MyMovieNewView movies={movies}
            actionChangeSearchMovie={(searchText: string) => dispatch(MyMovieNewMovieBySearch(searchText, moviesGeneral))}
            actionRefreshListMovie={(searchText: string, callbackSucess: () => void) => refreshListMovie(searchText, callbackSucess)}
            saveRegister={(movieId: string) => insertMyMovie(movieId)} removeRegister={(movieId: string) => insertNeverWatchMovie(movieId)} />
    )
}

export default MyMovieNew
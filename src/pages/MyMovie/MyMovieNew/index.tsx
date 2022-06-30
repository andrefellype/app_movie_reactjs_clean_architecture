/* eslint-disable prefer-destructuring */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MSG_NEW_REGISTER_SUCCESS, MSG_REMOVE_REGISTER_SUCCESS, MSG_REMOVE_REGISTER, MSG_SAVED_DATA } from '../../../app/core/consts'
import { showLoadingPattern, insertMsgs, showLoadingTable } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { getDetailsMovieAll, getMovieAllByNotMyMovie } from '../../../app/redux/Movie/movie.actions'
import { getMoviesAll, getMoviesAllFilter } from '../../../app/redux/Movie/movie.selector'
import { registerMyMovie, registerNeverWatchMovie } from '../../../app/redux/MyMovie/myMovie.actions'
import { MyMovieNewMovieBySearch } from './actions'
import MyMovieNewView from './view'
import { showStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'
import GetListPaginate from '../../../app/components/Utils/GetListPaginate'

function MyMovieNew() {

    const dispatch = useDispatch()
    const valueListPaginate = 6
    const [refreshPage, setRefreshPage] = React.useState(false)
    const [positionPagination, setPositionPagination] = React.useState(1)
    const movies = useSelector(getMoviesAllFilter)
    const moviesGeneral = useSelector(getMoviesAll)
    const isLoading = useSelector(showStatusLoading)

    React.useEffect(() => {
        dispatch(showLoadingTable(true))
        dispatch(getMovieAllByNotMyMovie(() => setRefreshPage(true), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingTable(false))
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function refreshListMovie(searchText: string) {
        await dispatch(showLoadingTable(true))
        await dispatch(getMovieAllByNotMyMovie(() => setRefreshPage(true),
        (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingTable(false))
        }, searchText))
    }

    async function insertMyMovie(movieId: string) {
        await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(registerMyMovie(movieId, () => {
            dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
            dispatch(showLoadingPattern(false))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }))
    }

    React.useEffect(() => {
        if (refreshPage) {
            if (GetListPaginate(movies, positionPagination, valueListPaginate).length > 0) {
                if (!isLoading.statusTable)
                    dispatch(showLoadingTable(true))
                dispatch(getDetailsMovieAll(movies, GetListPaginate(movies, positionPagination, valueListPaginate),
                    () => {
                        setRefreshPage(false)
                        dispatch(showLoadingTable(false))
                    }, (errorsMsg) => {
                        dispatch(insertMsgs(errorsMsg, 'error'))
                        dispatch(showLoadingTable(false))
                    }))
            }
        }
        if (positionPagination > 1) {
            if (GetListPaginate(movies, positionPagination, valueListPaginate).length === 0) {
                setPositionPagination((positionPagination - 1))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movies, refreshPage])

    React.useEffect(() => {
        if (GetListPaginate(movies, positionPagination, valueListPaginate).length > 0) {
            if (!isLoading.statusTable)
                dispatch(showLoadingTable(true))
            dispatch(getDetailsMovieAll(movies, GetListPaginate(movies, positionPagination, valueListPaginate),
                () => setRefreshPage(true), (errorsMsg) => {
                    dispatch(insertMsgs(errorsMsg, 'error'))
                    dispatch(showLoadingTable(false))
                }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [positionPagination])

    function getCountPaginate() {
        if (movies) {
            let divid = (movies.length / valueListPaginate)
            if (!Number.isInteger(divid)) {
                divid = Math.floor(divid) + 1
            }
            return divid
        }
        return 0
    }

    async function insertNeverWatchMovie(movieId: string) {
        await dispatch(showLoadingPattern(true, MSG_REMOVE_REGISTER))
        await dispatch(registerNeverWatchMovie(movieId, () => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs([MSG_REMOVE_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }))
    }

    return (
        <MyMovieNewView movies={GetListPaginate(movies, positionPagination, valueListPaginate)} showLoading={isLoading}
            positionPage={positionPagination} countMovie={getCountPaginate()}
            changePagination={(value: number) => setPositionPagination(value)}
            actionChangeSearchMovie={(searchText: string) => dispatch(MyMovieNewMovieBySearch(searchText, () => setRefreshPage(true), moviesGeneral))}
            actionRefreshListMovie={(searchText: string) => refreshListMovie(searchText)}
            saveRegister={(movieId: string) => insertMyMovie(movieId)} removeRegister={(movieId: string) => insertNeverWatchMovie(movieId)} />
    )
}

export default MyMovieNew
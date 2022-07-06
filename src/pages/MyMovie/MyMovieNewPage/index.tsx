import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MSG_NEW_REGISTER_SUCCESS, MSG_REMOVE_REGISTER_SUCCESS, MSG_REMOVE_REGISTER, MSG_SAVED_DATA } from '../../../app/core/consts'
import { setLoadingPattern, insertMsgs, setLoadingTable } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { openAllDetailInMovie, openAllNoMyMovieInMovie } from '../../../app/redux/Movie/movie.actions'
import { getMoviesAll, getMoviesAllFilter } from '../../../app/redux/Movie/movie.selector'
import { createInMyMovie } from '../../../app/redux/MyMovie/myMovie.actions'
import { MyMovieNewPageBySearch } from './actions'
import MyMovieNewPageView from './view'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'
import GetListPaginate from '../../../app/components/Utils/GetListPaginate'
import { createInMyMovieNeverWatch } from '../../../app/redux/MyMovieNeverWatch/myMovieNeverWatch.actions'

function MyMovieNewPage() {
    const dispatch = useDispatch()
    const valueListPaginate = 6
    const [refreshPage, setRefreshPage] = React.useState(false)
    const [positionPagination, setPositionPagination] = React.useState(1)
    const movies = useSelector(getMoviesAllFilter)
    const moviesGeneral = useSelector(getMoviesAll)
    const isLoading = useSelector(isStatusLoading)

    React.useEffect(() => {
        dispatch(setLoadingTable(true))
        dispatch(openAllNoMyMovieInMovie(() => setRefreshPage(true), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingTable(false))
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function refreshListMovie(searchText: string) {
        await dispatch(setLoadingTable(true))
        await dispatch(openAllNoMyMovieInMovie(() => setRefreshPage(true),
            (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingTable(false))
            }, searchText))
    }

    async function insertMyMovie(movieId: string) {
        await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(createInMyMovie(movieId, () => {
            dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
            dispatch(setLoadingPattern(false))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }

    React.useEffect(() => {
        if (refreshPage) {
            if (GetListPaginate(movies, positionPagination, valueListPaginate).length > 0) {
                dispatch(openAllDetailInMovie(movies, GetListPaginate(movies, positionPagination, valueListPaginate),
                    () => {
                        setRefreshPage(false)
                        dispatch(setLoadingTable(false))
                    }, (errorsMsg) => {
                        dispatch(insertMsgs(errorsMsg, 'error'))
                        dispatch(setLoadingTable(false))
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
                dispatch(setLoadingTable(true))
            dispatch(openAllDetailInMovie(movies, GetListPaginate(movies, positionPagination, valueListPaginate),
                () => setRefreshPage(true), (errorsMsg) => {
                    dispatch(insertMsgs(errorsMsg, 'error'))
                    dispatch(setLoadingTable(false))
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
        await dispatch(setLoadingPattern(true, MSG_REMOVE_REGISTER))
        await dispatch(createInMyMovieNeverWatch(movieId, () => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs([MSG_REMOVE_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }

    return (
        <MyMovieNewPageView movies={GetListPaginate(movies, positionPagination, valueListPaginate)} showLoading={isLoading}
            positionPage={positionPagination} countMovie={getCountPaginate()}
            changePagination={(value: number) => setPositionPagination(value)}
            actionChangeSearchMovie={(searchText: string) => dispatch(MyMovieNewPageBySearch(searchText, () => setRefreshPage(true), moviesGeneral))}
            actionRefreshListMovie={(searchText: string) => refreshListMovie(searchText)}
            saveRegister={(movieId: string) => insertMyMovie(movieId)} removeRegister={(movieId: string) => insertNeverWatchMovie(movieId)} />
    )
}

export default MyMovieNewPage
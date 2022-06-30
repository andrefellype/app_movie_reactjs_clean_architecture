/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showLoadingTable, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import MovieListView from './view'
import { getCategoryAll } from '../../../app/redux/Category/category.actions'
import { getMoviesAll, getMoviesAllFilter } from '../../../app/redux/Movie/movie.selector'
import { getDetailsMovieAll, getMovieAll } from '../../../app/redux/Movie/movie.actions'
import { getCategoriesAll } from '../../../app/redux/Category/category.selector'
import { getCountriesAll } from '../../../app/redux/Country/country.selector'
import { getCountryAll } from '../../../app/redux/Country/country.actions'
import { MovieListApproved, MovieListByOrderAndSearchAndFilter, MovieListDelete, MovieListDeleteBatch } from './actions'
import GetListPaginate from '../../../app/components/Utils/GetListPaginate'
import { showStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function MovieList() {

    const dispatch = useDispatch()

    const valueListPaginate = 6
    const [refreshPage, setRefreshPage] = React.useState(false)
    const [positionPagination, setPositionPagination] = React.useState(1)
    const movies = useSelector(getMoviesAllFilter)
    const moviesGeneral = useSelector(getMoviesAll)
    const getCategories = useSelector(getCategoriesAll)
    const getCountries = useSelector(getCountriesAll)
    const isLoading = useSelector(showStatusLoading)

    const orderDefaultValue = "title"

    async function refreshList(orderField = orderDefaultValue, searchText = "", categoryFilter = "", releaseFilter = "", durationMinFilter = "", durationMaxFilter = "", countryFilter = "") {
        dispatch(showLoadingTable(true))
        dispatch(getCategoryAll(null, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingTable(false))
        }, ""))
        dispatch(getCountryAll(null, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingTable(false))
        }, 0, ""))
        dispatch(getMovieAll(() => setRefreshPage(true), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingTable(false))
        }, orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter))
    }

    React.useEffect(() => {
        refreshList()
        // eslint-disable-next-line
    }, [])

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

    function updateGetListScroll(position) {
        return movies ? movies.slice(0, position) : []
    }

    return (
        <MovieListView getListScroll={(positionScroll) => updateGetListScroll(positionScroll)} showLoading={isLoading}
            moviesBatch={movies ? movies.filter(row => row.enabledEdit) : []} positionPage={positionPagination}
            movies={GetListPaginate(movies, positionPagination, valueListPaginate)} countMovie={getCountPaginate()}
            changePagination={(value: number) => setPositionPagination(value)} getCategories={getCategories} getCountries={getCountries} orderDefault={orderDefaultValue}
            actionChangeSearchText={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string) => dispatch(MovieListByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter, () => setRefreshPage(true), moviesGeneral))}
            actionClickFilter={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string) => dispatch(MovieListByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter, () => setRefreshPage(true), moviesGeneral))}
            actionEraseFilter={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string) => dispatch(MovieListByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter, () => setRefreshPage(true), moviesGeneral))}
            actionOrderList={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string) => dispatch(MovieListByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter, () => setRefreshPage(true), moviesGeneral))}
            actionRefreshList={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string) => refreshList(orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter)}
            actionDeleteRegister={(movieId: string, orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string) => dispatch(MovieListDelete(movieId, orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter))}
            actionDeleteBatch={(arrayDeleteBatch: any, orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string, dispatchEraseBatch: any) => dispatch(MovieListDeleteBatch(arrayDeleteBatch, orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter, dispatchEraseBatch))}
            actionApprovedRegister={(movieId: string, orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string) => dispatch(MovieListApproved(movieId, orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter))} />
    )
}

export default MovieList
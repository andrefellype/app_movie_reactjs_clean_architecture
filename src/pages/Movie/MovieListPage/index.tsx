/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoadingTable, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import MovieListView from './view'
import { openAllInCategory } from '../../../app/redux/Category/category.actions'
import { getMoviesAll, getMoviesAllFilter } from '../../../app/redux/Movie/movie.selector'
import { clearAllInMovie, openAllDetailInMovie, openAllInMovie } from '../../../app/redux/Movie/movie.actions'
import { getCategoriesAll } from '../../../app/redux/Category/category.selector'
import { getCountriesAll } from '../../../app/redux/Country/country.selector'
import { openAllByAuthorizedInCountry } from '../../../app/redux/Country/country.actions'
import { MovieListApproved, MovieListByOrderAndSearchAndFilter, MovieListDelete, MovieListDeleteBatch } from './actions'
import GetListPaginate from '../../../app/components/Utils/GetListPaginate'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function MovieList() {
    const dispatch = useDispatch()

    const valueListPaginate = 9
    const [refreshPage, setRefreshPage] = React.useState(false)
    const [startLoading, setStartLoading] = React.useState(false)
    const [positionPagination, setPositionPagination] = React.useState(1)
    const movies = useSelector(getMoviesAllFilter)
    const moviesGeneral = useSelector(getMoviesAll)
    const getCategories = useSelector(getCategoriesAll)
    const getCountries = useSelector(getCountriesAll)
    const isLoading = useSelector(isStatusLoading)

    const orderDefaultValue = "title"

    async function refreshList(orderField = orderDefaultValue, searchText = "", categoryFilter = "", releaseFilter = "",
        durationMinFilter = "", durationMaxFilter = "", countryFilter = "") {
        dispatch(clearAllInMovie())
        if (!startLoading) {
            dispatch(setLoadingTable(true))
            setStartLoading(true)
        }
        dispatch(openAllInCategory(null, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingTable(false))
        }, ""))
        dispatch(openAllByAuthorizedInCountry(null, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingTable(false))
        }, ""))
        dispatch(openAllInMovie(() => setRefreshPage(true), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingTable(false))
        }, orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter))
    }

    React.useEffect(() => {
        refreshList()
        // eslint-disable-next-line
    }, [])

    React.useEffect(() => {
        if (refreshPage) {
            if (GetListPaginate(movies, positionPagination, valueListPaginate).length > 0) {
                if (!startLoading) {
                    dispatch(setLoadingTable(true))
                    setStartLoading(true)
                }
                dispatch(openAllDetailInMovie(movies, GetListPaginate(movies, positionPagination, valueListPaginate),
                    () => {
                        setRefreshPage(false)
                        dispatch(setLoadingTable(false))
                        setStartLoading(false)
                    }, (errorsMsg) => {
                        dispatch(insertMsgs(errorsMsg, 'error'))
                        dispatch(setLoadingTable(false))
                    }))
            } else {
                if (isLoading.statusTable) {
                    setRefreshPage(false)
                    dispatch(setLoadingTable(false))
                }
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
            if (!startLoading) {
                dispatch(setLoadingTable(true))
                setStartLoading(true)
            }
            setRefreshPage(true)
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
            changePagination={(value: number) => setPositionPagination(value)} getCategories={getCategories}
            getCountries={getCountries} orderDefault={orderDefaultValue}
            actionChangeSearchText={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string,
                durationMinFilter: string, durationMaxFilter: string, countryFilter: string) =>
                dispatch(MovieListByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, durationMinFilter,
                    durationMaxFilter, countryFilter, () => setRefreshPage(true), moviesGeneral))}
            actionClickFilter={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string,
                durationMinFilter: string, durationMaxFilter: string, countryFilter: string) =>
                dispatch(MovieListByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter,
                    durationMinFilter, durationMaxFilter, countryFilter, () => setRefreshPage(true), moviesGeneral))}
            actionEraseFilter={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string,
                durationMinFilter: string, durationMaxFilter: string, countryFilter: string) =>
                dispatch(MovieListByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter,
                    durationMinFilter, durationMaxFilter, countryFilter, () => setRefreshPage(true), moviesGeneral))}
            actionOrderList={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string,
                durationMinFilter: string, durationMaxFilter: string, countryFilter: string) =>
                dispatch(MovieListByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, durationMinFilter,
                    durationMaxFilter, countryFilter, () => setRefreshPage(true), moviesGeneral))}
            actionRefreshList={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, durationMinFilter: string,
                durationMaxFilter: string, countryFilter: string) =>
                refreshList(orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter)}
            actionDeleteRegister={(movieId: string, orderField: string, searchText: string, categoryFilter: string,
                releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string) =>
                dispatch(MovieListDelete(movieId, orderField, searchText, categoryFilter, releaseFilter, durationMinFilter,
                    durationMaxFilter, countryFilter))}
            actionDeleteBatch={(arrayDeleteBatch: any, orderField: string, searchText: string, categoryFilter: string,
                releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string,
                dispatchEraseBatch: any) =>
                dispatch(MovieListDeleteBatch(arrayDeleteBatch, orderField, searchText, categoryFilter,
                    releaseFilter, durationMinFilter, durationMaxFilter, countryFilter, dispatchEraseBatch))}
            actionApprovedRegister={(movieId: string, orderField: string, searchText: string, categoryFilter: string,
                releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string) =>
                dispatch(MovieListApproved(movieId, orderField, searchText, categoryFilter, releaseFilter, durationMinFilter,
                    durationMaxFilter, countryFilter))} />
    )
}

export default MovieList
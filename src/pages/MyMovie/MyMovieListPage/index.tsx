import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { insertMsgs, setLoadingTable } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import MyMovieListPageView from './view'
import { openAllInCategory } from '../../../app/redux/Category/category.actions'
import { getCategoriesAll } from '../../../app/redux/Category/category.selector'
import { getCountriesAll } from '../../../app/redux/Country/country.selector'
import { openAllByAuthorizedInCountry } from '../../../app/redux/Country/country.actions'
import { MyMovieListPageByOrderAndSearchAndFilter, MyMovieListPageDelete } from './actions'
import GetListPaginate from '../../../app/components/Utils/GetListPaginate'
import { openAllInMyMovie, openAllDetailInMyMovie, clearAllInMyMovie } from '../../../app/redux/MyMovie/myMovie.actions'
import { getMyMoviesAll, getMyMoviesAllFilter } from '../../../app/redux/MyMovie/myMovie.selector'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function MyMovieListPage() {
    const dispatch = useDispatch()

    const valueListPaginate = 9
    const [refreshPage, setRefreshPage] = React.useState(false)
    const [startLoading, setStartLoading] = React.useState(false)
    const [positionPagination, setPositionPagination] = React.useState(1)
    const myMovies = useSelector(getMyMoviesAllFilter)
    const myMoviesGeneral = useSelector(getMyMoviesAll)
    const getCategories = useSelector(getCategoriesAll)
    const getCountries = useSelector(getCountriesAll)
    const isLoading = useSelector(isStatusLoading)

    const orderDefaultValue = "title"

    async function refreshList(orderField = orderDefaultValue, searchText = "", categoryFilter = "", releaseFilter = "", durationMinFilter = "",
        durationMaxFilter = "", countryFilter = "") {
        dispatch(clearAllInMyMovie())
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
        dispatch(openAllInMyMovie(() => setRefreshPage(true), (errorsMsg) => {
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
            if (GetListPaginate(myMovies, positionPagination, valueListPaginate).length > 0) {
                if (!startLoading) {
                    dispatch(setLoadingTable(true))
                    setStartLoading(true)
                }
                dispatch(openAllDetailInMyMovie(myMovies, GetListPaginate(myMovies, positionPagination, valueListPaginate),
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
            if (GetListPaginate(myMovies, positionPagination, valueListPaginate).length === 0) {
                setPositionPagination((positionPagination - 1))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myMovies, refreshPage])

    React.useEffect(() => {
        if (GetListPaginate(myMovies, positionPagination, valueListPaginate).length > 0) {
            if (!startLoading) {
                dispatch(setLoadingTable(true))
                setStartLoading(true)
            }
            setRefreshPage(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [positionPagination])

    function getCountPaginate() {
        if (myMovies) {
            let divid = (myMovies.length / valueListPaginate)
            if (!Number.isInteger(divid)) {
                divid = Math.floor(divid) + 1
            }
            return divid
        }
        return 0
    }

    return (
        <MyMovieListPageView showLoading={isLoading} positionPage={positionPagination}
            myMovies={GetListPaginate(myMovies, positionPagination, valueListPaginate)} countMyMovie={getCountPaginate()}
            changePagination={(value: number) => setPositionPagination(value)}
            getCategories={getCategories} getCountries={getCountries} orderDefault={orderDefaultValue}
            actionChangeSearchText={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string,
                durationMinFilter: string, durationMaxFilter: string, countryFilter: string) =>
                dispatch(MyMovieListPageByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, durationMinFilter,
                    durationMaxFilter, countryFilter, () => setRefreshPage(true), myMoviesGeneral))}
            actionClickFilter={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string,
                durationMinFilter: string, durationMaxFilter: string, countryFilter: string) =>
                dispatch(MyMovieListPageByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, durationMinFilter,
                    durationMaxFilter, countryFilter, () => setRefreshPage(true), myMoviesGeneral))}
            actionEraseFilter={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, durationMinFilter: string,
                durationMaxFilter: string, countryFilter: string) => dispatch(MyMovieListPageByOrderAndSearchAndFilter(orderField, searchText, categoryFilter,
                    releaseFilter, durationMinFilter, durationMaxFilter, countryFilter, () => setRefreshPage(true), myMoviesGeneral))}
            actionOrderList={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, durationMinFilter: string,
                durationMaxFilter: string, countryFilter: string) => dispatch(MyMovieListPageByOrderAndSearchAndFilter(orderField, searchText, categoryFilter,
                    releaseFilter, durationMinFilter, durationMaxFilter, countryFilter, () => setRefreshPage(true), myMoviesGeneral))}
            actionRefreshList={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, durationMinFilter: string,
                durationMaxFilter: string, countryFilter: string) => refreshList(orderField, searchText, categoryFilter, releaseFilter, durationMinFilter,
                    durationMaxFilter, countryFilter)}
            actionDeleteRegister={(movieId: string, orderField: string, searchText: string, categoryFilter: string, releaseFilter: string,
                durationMinFilter: string, durationMaxFilter: string, countryFilter: string) => dispatch(MyMovieListPageDelete(movieId, orderField, searchText,
                    categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter))} />
    )
}

export default MyMovieListPage
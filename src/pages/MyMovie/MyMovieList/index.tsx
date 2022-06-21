/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading } from '../../../app/redux/LoadingMain/loadingMain.actions'
import MyMovieListView from './view'
import { getCategoryAll } from '../../../app/redux/Category/category.actions'
import { getCategoriesAll } from '../../../app/redux/Category/category.selector'
import { getCountriesAll } from '../../../app/redux/Country/country.selector'
import { getCountryAll } from '../../../app/redux/Country/country.actions'
import { MyMovieListByOrderAndSearchAndFilter, MyMovieListDelete } from './actions'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'
import GetListPaginate from '../../../app/components/Utils/GetListPaginate'
import { getMyMovieAll } from '../../../app/redux/MyMovie/myMovie.actions'
import { getMyMoviesAll, getMyMoviesAllFilter } from '../../../app/redux/MyMovie/myMovie.selector'

function MyMovieList() {

    const dispatch = useDispatch()

    const valueListPaginate = 6
    const [positionPagination, setPositionPagination] = React.useState(1)
    const myMovies = useSelector(getMyMoviesAllFilter)
    const myMoviesGeneral = useSelector(getMyMoviesAll)
    const getCategories = useSelector(getCategoriesAll)
    const getCountries = useSelector(getCountriesAll)

    const orderDefaultValue = "title"

    async function refreshList(orderField = orderDefaultValue, searchText = "", categoryFilter = "", releaseFilter = "", durationMinFilter = "", durationMaxFilter = "", countryFilter = "") {
        dispatch(showLoading(true))
        dispatch(getCategoryAll(null, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, ""))
        dispatch(getCountryAll(null, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, 0, ""))
        dispatch(getMyMovieAll(() => dispatch(showLoading(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter))
    }

    React.useEffect(() => {
        refreshList()
        // eslint-disable-next-line
    }, [])

    React.useEffect(() => {
        if (positionPagination > 1) {
            if (GetListPaginate(myMovies, positionPagination, valueListPaginate).length === 0) {
                setPositionPagination((positionPagination - 1))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myMovies])

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
        <MyMovieListView positionPage={positionPagination} myMovies={GetListPaginate(myMovies, positionPagination, valueListPaginate)} countMyMovie={getCountPaginate()}
            changePagination={(value: number) => setPositionPagination(value)}
            getCategories={getCategories} getCountries={getCountries} orderDefault={orderDefaultValue}
            actionChangeSearchText={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string) => dispatch(MyMovieListByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter, myMoviesGeneral))}
            actionClickFilter={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string) => dispatch(MyMovieListByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter, myMoviesGeneral))}
            actionEraseFilter={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string) => dispatch(MyMovieListByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter, myMoviesGeneral))}
            actionOrderList={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string) => dispatch(MyMovieListByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter, myMoviesGeneral))}
            actionRefreshList={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string) => refreshList(orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter)}
            actionDeleteRegister={(movieId: string, orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, durationMinFilter: string, durationMaxFilter: string, countryFilter: string) => dispatch(MyMovieListDelete(movieId, orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter))} />
    )
}

export default MyMovieList
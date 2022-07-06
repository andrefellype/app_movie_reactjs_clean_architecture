import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { insertMsgs, setLoadingTable } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import MyTvShowListPageView from './view'
import { openAllInCategory } from '../../../app/redux/Category/category.actions'
import { getCategoriesAll } from '../../../app/redux/Category/category.selector'
import { getCountriesAll } from '../../../app/redux/Country/country.selector'
import { openAllByAuthorizedInCountry } from '../../../app/redux/Country/country.actions'
import { MyTvShowListPageByOrderAndSearchAndFilter, MyTvShowListPageDelete } from './actions'
import GetListPaginate from '../../../app/components/Utils/GetListPaginate'
import { getMyTvShowsAll, getMyTvShowsAllFilter } from '../../../app/redux/MyTvShow/myTvShow.selector'
import { clearMyTvShowAll, getMyTvShowAll, getMyTvShowDetailsTvShowAll } from '../../../app/redux/MyTvShow/myTvShow.actions'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function MyTvShowListPage() {
    const dispatch = useDispatch()

    const valueListPaginate = 9
    const [refreshPage, setRefreshPage] = React.useState(false)
    const [startLoading, setStartLoading] = React.useState(false)
    const [positionPagination, setPositionPagination] = React.useState(1)
    const myTvShows = useSelector(getMyTvShowsAllFilter)
    const myTvShowsGeneral = useSelector(getMyTvShowsAll)
    const getCategories = useSelector(getCategoriesAll)
    const getCountries = useSelector(getCountriesAll)
    const isLoading = useSelector(isStatusLoading)

    const orderDefaultValue = "title"

    async function refreshList(orderField = orderDefaultValue, searchText = "", categoryFilter = "", releaseFilter = "", countryFilter = "") {
        dispatch(clearMyTvShowAll())
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
        dispatch(getMyTvShowAll(() => setRefreshPage(true), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingTable(false))
        }, orderField, searchText, categoryFilter, releaseFilter, countryFilter))
    }

    React.useEffect(() => {
        refreshList()
        // eslint-disable-next-line
    }, [])

    React.useEffect(() => {
        if (refreshPage) {
            if (GetListPaginate(myTvShows, positionPagination, valueListPaginate).length > 0) {
                if (!startLoading) {
                    dispatch(setLoadingTable(true))
                    setStartLoading(true)
                }
                dispatch(getMyTvShowDetailsTvShowAll(myTvShows, GetListPaginate(myTvShows, positionPagination, valueListPaginate),
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
            if (GetListPaginate(myTvShows, positionPagination, valueListPaginate).length === 0) {
                setPositionPagination((positionPagination - 1))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myTvShows, refreshPage])

    React.useEffect(() => {
        if (GetListPaginate(myTvShows, positionPagination, valueListPaginate).length > 0) {
            if (!startLoading) {
                dispatch(setLoadingTable(true))
                setStartLoading(true)
            }
            setRefreshPage(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [positionPagination])

    function getCountPaginate() {
        if (myTvShows) {
            let divid = (myTvShows.length / valueListPaginate)
            if (!Number.isInteger(divid)) {
                divid = Math.floor(divid) + 1
            }
            return divid
        }
        return 0
    }

    return (
        <MyTvShowListPageView positionPage={positionPagination} myTvShows={GetListPaginate(myTvShows, positionPagination, valueListPaginate)}
            countMyTvShow={getCountPaginate()} changePagination={(value: number) => setPositionPagination(value)} showLoading={isLoading}
            getCategories={getCategories} getCountries={getCountries} orderDefault={orderDefaultValue}
            actionChangeSearchText={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string,
                countryFilter: string) => dispatch(MyTvShowListPageByOrderAndSearchAndFilter(orderField, searchText, categoryFilter,
                    releaseFilter, countryFilter, () => setRefreshPage(true), myTvShowsGeneral))}
            actionClickFilter={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string,
                countryFilter: string) => dispatch(MyTvShowListPageByOrderAndSearchAndFilter(orderField, searchText, categoryFilter,
                    releaseFilter, countryFilter, () => setRefreshPage(true), myTvShowsGeneral))}
            actionEraseFilter={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string,
                countryFilter: string) => dispatch(MyTvShowListPageByOrderAndSearchAndFilter(orderField, searchText, categoryFilter,
                    releaseFilter, countryFilter, () => setRefreshPage(true), myTvShowsGeneral))}
            actionOrderList={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string,
                countryFilter: string) => dispatch(MyTvShowListPageByOrderAndSearchAndFilter(orderField, searchText, categoryFilter,
                    releaseFilter, countryFilter, () => setRefreshPage(true), myTvShowsGeneral))}
            actionRefreshList={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string,
                countryFilter: string) => refreshList(orderField, searchText, categoryFilter, releaseFilter, countryFilter)}
            actionDeleteRegister={(tvShowId: string, orderField: string, searchText: string, categoryFilter: string,
                releaseFilter: string, countryFilter: string) => dispatch(MyTvShowListPageDelete(tvShowId, orderField, searchText,
                    categoryFilter, releaseFilter, countryFilter))} />
    )
}

export default MyTvShowListPage
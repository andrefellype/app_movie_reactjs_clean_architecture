/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { insertMsgs, showLoadingTable } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import MyTvShowListView from './view'
import { getCategoryAll } from '../../../app/redux/Category/category.actions'
import { getCategoriesAll } from '../../../app/redux/Category/category.selector'
import { getCountriesAll } from '../../../app/redux/Country/country.selector'
import { getCountryAll } from '../../../app/redux/Country/country.actions'
import { MyTvShowListByOrderAndSearchAndFilter, MyTvShowListDelete } from './actions'
import GetListPaginate from '../../../app/components/Utils/GetListPaginate'
import { getMyTvShowsAll, getMyTvShowsAllFilter } from '../../../app/redux/MyTvShow/myTvShow.selector'
import { getMyTvShowAll, getMyTvShowDetailsTvShowAll } from '../../../app/redux/MyTvShow/myTvShow.actions'
import { showStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function MyTvShowList() {

    const dispatch = useDispatch()

    const valueListPaginate = 6
    const [refreshPage, setRefreshPage] = React.useState(false)
    const [positionPagination, setPositionPagination] = React.useState(1)
    const myTvShows = useSelector(getMyTvShowsAllFilter)
    const myTvShowsGeneral = useSelector(getMyTvShowsAll)
    const getCategories = useSelector(getCategoriesAll)
    const getCountries = useSelector(getCountriesAll)
    const isLoading = useSelector(showStatusLoading)

    const orderDefaultValue = "title"

    async function refreshList(orderField = orderDefaultValue, searchText = "", categoryFilter = "", releaseFilter = "", countryFilter = "") {
        dispatch(showLoadingTable(true))
        dispatch(getCategoryAll(null, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingTable(false))
        }, ""))
        dispatch(getCountryAll(null, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingTable(false))
        }, 0, ""))
        dispatch(getMyTvShowAll(() => setRefreshPage(true), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingTable(false))
        }, orderField, searchText, categoryFilter, releaseFilter, countryFilter))
    }

    React.useEffect(() => {
        refreshList()
        // eslint-disable-next-line
    }, [])

    React.useEffect(() => {
        if (refreshPage) {
            if (GetListPaginate(myTvShows, positionPagination, valueListPaginate).length > 0) {
                if (!isLoading.statusTable)
                    dispatch(showLoadingTable(true))
                dispatch(getMyTvShowDetailsTvShowAll(myTvShows, GetListPaginate(myTvShows, positionPagination, valueListPaginate),
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
            if (GetListPaginate(myTvShows, positionPagination, valueListPaginate).length === 0) {
                setPositionPagination((positionPagination - 1))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myTvShows, refreshPage])

    React.useEffect(() => {
        if (GetListPaginate(myTvShows, positionPagination, valueListPaginate).length > 0) {
            if (!isLoading.statusTable)
                dispatch(showLoadingTable(true))
            dispatch(getMyTvShowDetailsTvShowAll(myTvShows, GetListPaginate(myTvShows, positionPagination, valueListPaginate),
                () => setRefreshPage(true), (errorsMsg) => {
                    dispatch(insertMsgs(errorsMsg, 'error'))
                    dispatch(showLoadingTable(false))
                }))
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
        <MyTvShowListView positionPage={positionPagination} myTvShows={GetListPaginate(myTvShows, positionPagination, valueListPaginate)}
            countMyTvShow={getCountPaginate()} changePagination={(value: number) => setPositionPagination(value)} showLoading={isLoading}
            getCategories={getCategories} getCountries={getCountries} orderDefault={orderDefaultValue}
            actionChangeSearchText={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => dispatch(MyTvShowListByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, countryFilter, () => setRefreshPage(true), myTvShowsGeneral))}
            actionClickFilter={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => dispatch(MyTvShowListByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, countryFilter, () => setRefreshPage(true), myTvShowsGeneral))}
            actionEraseFilter={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => dispatch(MyTvShowListByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, countryFilter, () => setRefreshPage(true), myTvShowsGeneral))}
            actionOrderList={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => dispatch(MyTvShowListByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, countryFilter, () => setRefreshPage(true), myTvShowsGeneral))}
            actionRefreshList={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => refreshList(orderField, searchText, categoryFilter, releaseFilter, countryFilter)}
            actionDeleteRegister={(tvShowId: string, orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => dispatch(MyTvShowListDelete(tvShowId, orderField, searchText, categoryFilter, releaseFilter, countryFilter))} />
    )
}

export default MyTvShowList
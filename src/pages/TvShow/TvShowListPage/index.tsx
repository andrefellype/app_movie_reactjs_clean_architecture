/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { insertMsgs, setLoadingTable } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import TvShowListPageView from './view'
import { openAllInCategory } from '../../../app/redux/Category/category.actions'
import { getCategoriesAll } from '../../../app/redux/Category/category.selector'
import { getCountriesAll } from '../../../app/redux/Country/country.selector'
import { openAllByAuthorizedInCountry } from '../../../app/redux/Country/country.actions'
import {
    TvShowListPageApproved, TvShowListPageByOrderAndSearchAndFilter, TvShowListPageDelete, TvShowListPageDeleteBatch
} from './actions'
import { getTvShowsAll, getTvShowsAllFilter } from '../../../app/redux/TvShow/tvshow.selector'
import { clearAllInTvShow, openAllDetailInTvShow, openAllInTvShow } from '../../../app/redux/TvShow/tvshow.actions'
import GetListPaginate from '../../../app/components/Utils/GetListPaginate'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function TvShowListPage() {
    const dispatch = useDispatch()

    const valueListPaginate = 9
    const [refreshPage, setRefreshPage] = React.useState(false)
    const [startLoading, setStartLoading] = React.useState(false)
    const [positionPagination, setPositionPagination] = React.useState(1)
    const tvShows = useSelector(getTvShowsAllFilter)
    const tvShowsGeneral = useSelector(getTvShowsAll)
    const getCategories = useSelector(getCategoriesAll)
    const getCountries = useSelector(getCountriesAll)
    const isLoading = useSelector(isStatusLoading)

    const orderDefaultValue = "title"

    async function refreshList(orderField = orderDefaultValue, searchText = "", categoryFilter = "", releaseFilter = "",
        countryFilter = "") {
        dispatch(clearAllInTvShow())
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
        dispatch(openAllInTvShow(() => setRefreshPage(true), (errorsMsg) => {
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
            if (GetListPaginate(tvShows, positionPagination, valueListPaginate).length > 0) {
                if (!startLoading) {
                    dispatch(setLoadingTable(true))
                    setStartLoading(true)
                }
                dispatch(openAllDetailInTvShow(tvShows, GetListPaginate(tvShows, positionPagination, valueListPaginate),
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
            if (GetListPaginate(tvShows, positionPagination, valueListPaginate).length === 0) {
                setPositionPagination((positionPagination - 1))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tvShows, refreshPage])

    React.useEffect(() => {
        if (GetListPaginate(tvShows, positionPagination, valueListPaginate).length > 0) {
            if (!startLoading) {
                dispatch(setLoadingTable(true))
                setStartLoading(true)
            }
            setRefreshPage(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [positionPagination])

    function getCountPaginate() {
        if (tvShows) {
            let divid = (tvShows.length / valueListPaginate)
            if (!Number.isInteger(divid)) {
                divid = Math.floor(divid) + 1
            }
            return divid
        }
        return 0
    }

    function updateGetListScroll(position) {
        return tvShows ? tvShows.slice(0, position) : []
    }

    return (
        <TvShowListPageView getListScroll={(positionScroll) => updateGetListScroll(positionScroll)} tvShowsBatch={tvShows
            ? tvShows.filter(row => row.enabledEdit) : []} showLoading={isLoading} positionPage={positionPagination}
            tvShows={GetListPaginate(tvShows, positionPagination, valueListPaginate)} countTvShow={getCountPaginate()}
            changePagination={(value: number) => setPositionPagination(value)}
            getCategories={getCategories} getCountries={getCountries} orderDefault={orderDefaultValue}
            actionChangeSearchText={(orderField: string, searchText: string, categoryFilter: string,
                releaseFilter: string, countryFilter: string) =>
                dispatch(TvShowListPageByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, countryFilter,
                    () => setRefreshPage(true), tvShowsGeneral))}
            actionClickFilter={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) =>
                dispatch(TvShowListPageByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, countryFilter,
                    () => setRefreshPage(true), tvShowsGeneral))}
            actionEraseFilter={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) =>
                dispatch(TvShowListPageByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, countryFilter,
                    () => setRefreshPage(true), tvShowsGeneral))}
            actionOrderList={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) =>
                dispatch(TvShowListPageByOrderAndSearchAndFilter(orderField, searchText, categoryFilter,
                    releaseFilter, countryFilter, () => setRefreshPage(true), tvShowsGeneral))}
            actionRefreshList={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) =>
                refreshList(orderField, searchText, categoryFilter, releaseFilter, countryFilter)}
            actionDeleteRegister={(tvShowId: string, orderField: string, searchText: string, categoryFilter: string,
                releaseFilter: string, countryFilter: string) => dispatch(TvShowListPageDelete(tvShowId, orderField, searchText, categoryFilter,
                    releaseFilter, countryFilter))}
            actionDeleteBatch={(arrayDeleteBatch: any, orderField: string, searchText: string, categoryFilter: string,
                releaseFilter: string, countryFilter: string, dispatchEraseBatch: any) =>
                dispatch(TvShowListPageDeleteBatch(arrayDeleteBatch, orderField, searchText, categoryFilter, releaseFilter, countryFilter, dispatchEraseBatch))}
            actionApprovedRegister={(tvShowId: string, orderField: string, searchText: string, categoryFilter: string,
                releaseFilter: string, countryFilter: string) => dispatch(TvShowListPageApproved(tvShowId, orderField,
                    searchText, categoryFilter, releaseFilter, countryFilter))} />
    )
}

export default TvShowListPage
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading } from '../../../app/redux/LoadingMain/loadingMain.actions'
import TvShowListView from './view'
import { getCategoryAll } from '../../../app/redux/Category/category.actions'
import { getCategoriesAll } from '../../../app/redux/Category/category.selector'
import { getCountriesAll } from '../../../app/redux/Country/country.selector'
import { getCountryAll } from '../../../app/redux/Country/country.actions'
import { TvShowListApproved, TvShowListByOrderAndSearchAndFilter, TvShowListDelete, TvShowListDeleteBatch } from './actions'
import { getTvShowsAll, getTvShowsAllFilter } from '../../../app/redux/TvShow/tvshow.selector'
import { getTvShowAll } from '../../../app/redux/TvShow/tvshow.actions'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'
import GetListPaginate from '../../../app/components/Utils/GetListPaginate'

function TvShowList() {

    const dispatch = useDispatch()

    const valueListPaginate = 6
    const [positionPagination, setPositionPagination] = React.useState(1)
    const tvShows = useSelector(getTvShowsAllFilter)
    const tvShowsGeneral = useSelector(getTvShowsAll)
    const getCategories = useSelector(getCategoriesAll)
    const getCountries = useSelector(getCountriesAll)

    const orderDefaultValue = "title"

    async function refreshList(orderField = orderDefaultValue, searchText = "", categoryFilter = "", releaseFilter = "", countryFilter = "") {
        dispatch(showLoading(true))
        dispatch(getCategoryAll(null, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, ""))
        dispatch(getCountryAll(null, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, 0, ""))
        dispatch(getTvShowAll(() => dispatch(showLoading(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, orderField, searchText, categoryFilter, releaseFilter, countryFilter))
    }

    React.useEffect(() => {
        refreshList()
        // eslint-disable-next-line
    }, [])

    React.useEffect(() => {
        if (positionPagination > 1) {
            if (GetListPaginate(tvShows, positionPagination, valueListPaginate).length === 0) {
                setPositionPagination((positionPagination - 1))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tvShows])

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

    return (
        <TvShowListView tvShowsBatch={tvShows ? tvShows.filter(row => row.enabledEdit) : []} positionPage={positionPagination}
            tvShows={GetListPaginate(tvShows, positionPagination, valueListPaginate)} countTvShow={getCountPaginate()}
            changePagination={(value: number) => setPositionPagination(value)}
            getCategories={getCategories} getCountries={getCountries} orderDefault={orderDefaultValue}
            actionChangeSearchText={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => dispatch(TvShowListByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, countryFilter, tvShowsGeneral))}
            actionClickFilter={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => dispatch(TvShowListByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, countryFilter, tvShowsGeneral))}
            actionEraseFilter={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => dispatch(TvShowListByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, countryFilter, tvShowsGeneral))}
            actionOrderList={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => dispatch(TvShowListByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, countryFilter, tvShowsGeneral))}
            actionRefreshList={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => refreshList(orderField, searchText, categoryFilter, releaseFilter, countryFilter)}
            actionDeleteRegister={(tvShowId: string, orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => dispatch(TvShowListDelete(tvShowId, orderField, searchText, categoryFilter, releaseFilter, countryFilter))}
            actionDeleteBatch={(arrayDeleteBatch: any, orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string, dispatchEraseBatch: any) => dispatch(TvShowListDeleteBatch(arrayDeleteBatch, orderField, searchText, categoryFilter, releaseFilter, countryFilter, dispatchEraseBatch))}
            actionApprovedRegister={(tvShowId: string, orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => dispatch(TvShowListApproved(tvShowId, orderField, searchText, categoryFilter, releaseFilter, countryFilter))} />
    )
}

export default TvShowList
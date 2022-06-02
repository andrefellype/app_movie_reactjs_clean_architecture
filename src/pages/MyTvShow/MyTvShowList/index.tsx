/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showLoadingMain } from '../../../app/redux/LoadingMain/loadingMain.actions'
import MyTvShowListView from './view'
import { getCategoryAll } from '../../../app/redux/Category/category.actions'
import { getCategoriesAll } from '../../../app/redux/Category/category.selector'
import { getCountriesAll } from '../../../app/redux/Country/country.selector'
import { getCountryAll } from '../../../app/redux/Country/country.actions'
import { MyTvShowListByOrderAndSearchAndFilter, MyTvShowListDelete } from './actions'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'
import GetListPaginate from '../../../app/components/Utils/GetListPaginate'
import { getMyTvShowsAll, getMyTvShowsAllFilter } from '../../../app/redux/MyTvShow/myTvShow.selector'
import { getMyTvShowAll } from '../../../app/redux/MyTvShow/myTvShow.actions'

function MyTvShowList() {

    const dispatch = useDispatch()

    const valueListPaginate = 6
    const [positionPagination, setPositionPagination] = React.useState(1)
    const myTvShows = useSelector(getMyTvShowsAllFilter)
    const myTvShowsGeneral = useSelector(getMyTvShowsAll)
    const getCategories = useSelector(getCategoriesAll)
    const getCountries = useSelector(getCountriesAll)

    const orderDefaultValue = "title"

    async function refreshList(orderField = orderDefaultValue, searchText = "", categoryFilter = "", releaseFilter = "", countryFilter = "") {
        dispatch(showLoadingMain(true))
        dispatch(getCategoryAll(null, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, ""))
        dispatch(getCountryAll(null, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 0, ""))
        dispatch(getMyTvShowAll(() => dispatch(showLoadingMain(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, orderField, searchText, categoryFilter, releaseFilter, countryFilter))
    }

    React.useEffect(() => {
        refreshList()
        // eslint-disable-next-line
    }, [])

    React.useEffect(() => {
        if (positionPagination > 1) {
            if (GetListPaginate(myTvShows, positionPagination, valueListPaginate).length === 0) {
                setPositionPagination((positionPagination - 1))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myTvShows])

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
        <MyTvShowListView positionPage={positionPagination} myTvShows={GetListPaginate(myTvShows, positionPagination, valueListPaginate)} countMyTvShow={getCountPaginate()}
            changePagination={(value: number) => setPositionPagination(value)}
            getCategories={getCategories} getCountries={getCountries} orderDefault={orderDefaultValue}
            actionChangeSearchText={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => dispatch(MyTvShowListByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, countryFilter, myTvShowsGeneral))}
            actionClickFilter={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => dispatch(MyTvShowListByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, countryFilter, myTvShowsGeneral))}
            actionEraseFilter={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => dispatch(MyTvShowListByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, countryFilter, myTvShowsGeneral))}
            actionOrderList={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => dispatch(MyTvShowListByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, countryFilter, myTvShowsGeneral))}
            actionRefreshList={(orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => refreshList(orderField, searchText, categoryFilter, releaseFilter, countryFilter)}
            actionDeleteRegister={(tvShowId: string, orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => dispatch(MyTvShowListDelete(tvShowId, orderField, searchText, categoryFilter, releaseFilter, countryFilter))} />
    )
}

export default MyTvShowList
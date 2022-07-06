/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { insertMsgs, setLoadingTable } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import CountryListPageView from './view'
import {
    CountryListPageApproved, CountryListPageBySearch, CountryListPageDelete, CountryListPageDeleteBatch
} from './actions'
import { openAllInCountry } from '../../../app/redux/Country/country.actions'
import { getCountriesAll, getCountriesAllFilter } from '../../../app/redux/Country/country.selector'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function CountryListPage() {
    const dispatch = useDispatch()

    const countries = useSelector(getCountriesAllFilter)
    const countriesGeneral = useSelector(getCountriesAll)
    const isLoading = useSelector(isStatusLoading)

    async function refreshList(searchText = "", callbackSuccess: (() => void) | null = null) {
        await dispatch(setLoadingTable(true))
        await dispatch(openAllInCountry(() => {
            dispatch(setLoadingTable(false))
            if (callbackSuccess !== null)
                callbackSuccess()
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingTable(false))
        }, searchText))
    }

    React.useEffect(() => {
        refreshList()
        // eslint-disable-next-line
    }, [])

    function updateGetListScroll(position) {
        return countries.slice(0, position)
    }

    return (
        <CountryListPageView showLoading={isLoading} getListScroll={(positionScroll) =>
            updateGetListScroll(positionScroll)} countries={countries}
            actionChangeSearchText={(searchText: string, callbackSuccess: () => void) =>
                dispatch(CountryListPageBySearch(searchText, callbackSuccess, countriesGeneral))}
            actionRefreshList={(searchText: string, callbackSuccess: () => void) => refreshList(searchText, callbackSuccess)}
            actionDeleteRegister={(countryId: string, searchText: string) =>
                dispatch(CountryListPageDelete(countryId, searchText))}
            actionApprovedRegister={(countryId: string, searchText: string) =>
                dispatch(CountryListPageApproved(countryId, searchText))}
            actionDeleteBatch={(arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) =>
                dispatch(CountryListPageDeleteBatch(arrayDeleteBatch, searchText, dispatchEraseBatch))} />
    )
}

export default CountryListPage
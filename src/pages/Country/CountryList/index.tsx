/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { insertMsgs, showLoadingTable } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import CountryListView from './view'
import { CountryListApproved, CountryListBySearch, CountryListDelete, CountryListDeleteBatch } from './actions'
import { getCountryAll } from '../../../app/redux/Country/country.actions'
import { getCountriesAll, getCountriesAllFilter } from '../../../app/redux/Country/country.selector'
import { showStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function CountryList() {

    const dispatch = useDispatch()

    const countries = useSelector(getCountriesAllFilter)
    const countriesGeneral = useSelector(getCountriesAll)
    const isLoading = useSelector(showStatusLoading)

    async function refreshList(searchText = "") {
        await dispatch(showLoadingTable(true))
        await dispatch(getCountryAll(() => dispatch(showLoadingTable(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingTable(false))
        }, 1, searchText))
    }

    React.useEffect(() => {
        refreshList()
        // eslint-disable-next-line
    }, [])

    function updateGetListScroll(position) {
        return countries.slice(0, position)
    }

    return (
        <CountryListView showLoading={isLoading} getListScroll={(positionScroll) => updateGetListScroll(positionScroll)} countries={countries}
            actionChangeSearchText={(searchText: string, callbackSuccess: () => void) => dispatch(CountryListBySearch(searchText, callbackSuccess, countriesGeneral))}
            actionRefreshList={(searchText: string) => refreshList(searchText)}
            actionDeleteRegister={(countryId: string, searchText: string) => dispatch(CountryListDelete(countryId, searchText))}
            actionApprovedRegister={(countryId: string, searchText: string) => dispatch(CountryListApproved(countryId, searchText))}
            actionDeleteBatch={(arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) => dispatch(CountryListDeleteBatch(arrayDeleteBatch, searchText, dispatchEraseBatch))} />
    )
}

export default CountryList
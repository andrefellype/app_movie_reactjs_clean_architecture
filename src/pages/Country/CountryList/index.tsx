/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading } from '../../../app/redux/LoadingMain/loadingMain.actions'
import CountryListView from './view'
import { CountryListApproved, CountryListBySearch, CountryListDelete, CountryListDeleteBatch } from './actions'
import { getCountryAll } from '../../../app/redux/Country/country.actions'
import { getCountriesAll, getCountriesAllFilter } from '../../../app/redux/Country/country.selector'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'
import GetListPaginate from '../../../app/components/Utils/GetListPaginate'

function CountryList() {

    const dispatch = useDispatch()

    const valueListPaginate = 6
    const [positionPagination, setPositionPagination] = React.useState(1)
    const countries = useSelector(getCountriesAllFilter)
    const countriesGeneral = useSelector(getCountriesAll)

    async function refreshList(searchText = "") {
        await dispatch(showLoading(true))
        await dispatch(getCountryAll(() => dispatch(showLoading(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, 1, searchText))
    }

    React.useEffect(() => {
        refreshList()
        // eslint-disable-next-line
    }, [])

    React.useEffect(() => {
        if (positionPagination > 1) {
            if (GetListPaginate(countries, positionPagination, valueListPaginate).length === 0) {
                setPositionPagination((positionPagination - 1))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countries])

    function getCountPaginate() {
        if (countries) {
            let divid = (countries.length / valueListPaginate)
            if (!Number.isInteger(divid)) {
                divid = Math.floor(divid) + 1
            }
            return divid
        }
        return 0
    }

    return (
        <CountryListView countriesBatch={countries} positionPage={positionPagination} countries={GetListPaginate(countries, positionPagination, valueListPaginate)} countCountry={getCountPaginate()}
            changePagination={(value: number) => setPositionPagination(value)}
            actionChangeSearchText={(searchText: string) => dispatch(CountryListBySearch(searchText, countriesGeneral))}
            actionRefreshList={(searchText: string) => refreshList(searchText)}
            actionDeleteRegister={(countryId: string, searchText: string) => dispatch(CountryListDelete(countryId, searchText))}
            actionApprovedRegister={(countryId: string, searchText: string) => dispatch(CountryListApproved(countryId, searchText))}
            actionDeleteBatch={(arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) => dispatch(CountryListDeleteBatch(arrayDeleteBatch, searchText, dispatchEraseBatch))} />
    )
}

export default CountryList
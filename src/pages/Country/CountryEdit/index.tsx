/* eslint-disable prefer-destructuring */
import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { showLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import CountryEditView from './view'
import { getCountrySingle } from '../../../app/redux/Country/country.selector'
import { openCountryById, updateCountryById } from '../../../app/redux/Country/country.actions'
import { showStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function CountryEdit() {

    const dispatch = useDispatch()

    const getCountry = useSelector(getCountrySingle)
    const getLoading = useSelector(showStatusLoading)

    const { countryId } = useParams()

    React.useEffect(() => {
        if (typeof countryId !== "undefined" && countryId !== null) {
            dispatch(showLoadingPattern(true))
            dispatch(openCountryById(countryId.toString(), () => dispatch(showLoadingPattern(false)), (errorsMsg) => {
                dispatch(showLoadingPattern(false))
                dispatch(insertMsgs(errorsMsg, 'error'))
            }))
        }
        // eslint-disable-next-line
    }, [])

    async function updateRegister(nameField: string) {
        if (typeof countryId !== "undefined" && countryId !== null) {
            await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
            await dispatch(updateCountryById(countryId.toString(), nameField, () => {
                dispatch(showLoadingPattern(false))
                dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success", null, "reload_page"))
            }, (errorsMsg) => {
                dispatch(showLoadingPattern(false))
                dispatch(insertMsgs(errorsMsg, 'error'))
            }))
        }
    }

    function getIsLoading() {
        if (typeof getLoading !== "undefined" && typeof getLoading.statusPattern !== "undefined") {
            return getLoading.statusPattern
        }
        return false
    }

    return (
        <CountryEditView getCountry={getCountry} isLoading={getIsLoading()} update={(nameField: string) => updateRegister(nameField)} />
    )
}

export default CountryEdit
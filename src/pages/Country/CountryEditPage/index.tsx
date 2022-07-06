import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import CountryEditPageView from './view'
import { getCountrySingle } from '../../../app/redux/Country/country.selector'
import { openInCountry, updateByIdInCountry } from '../../../app/redux/Country/country.actions'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function CountryEditPage() {
    const dispatch = useDispatch()

    const getCountry = useSelector(getCountrySingle)
    const getLoading = useSelector(isStatusLoading)

    const { countryId } = useParams()

    React.useEffect(() => {
        if (typeof countryId !== "undefined" && countryId !== null) {
            dispatch(setLoadingPattern(true))
            dispatch(openInCountry(countryId.toString(), () => dispatch(setLoadingPattern(false)), (errorsMsg) => {
                dispatch(setLoadingPattern(false))
                dispatch(insertMsgs(errorsMsg, 'error'))
            }))
        }
        // eslint-disable-next-line
    }, [])

    async function updateRegister(nameField: string) {
        if (typeof countryId !== "undefined" && countryId !== null) {
            await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
            await dispatch(updateByIdInCountry(countryId.toString(), nameField, () => {
                dispatch(setLoadingPattern(false))
                dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success", null, "reload_page"))
            }, (errorsMsg) => {
                dispatch(setLoadingPattern(false))
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
        <CountryEditPageView getCountry={getCountry} isLoading={getIsLoading()}
            update={(nameField: string) => updateRegister(nameField)} />
    )
}

export default CountryEditPage
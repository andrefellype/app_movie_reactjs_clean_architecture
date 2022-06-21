/* eslint-disable prefer-destructuring */
import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import CountryEditView from './view'
import { getCountrySingle } from '../../../app/redux/Country/country.selector'
import { openCountryById, updateCountryById } from '../../../app/redux/Country/country.actions'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'

function CountryEdit() {

    const dispatch = useDispatch()

    const getCountry = useSelector(getCountrySingle)

    const { countryId } = useParams()

    React.useEffect(() => {
        if (typeof countryId !== "undefined" && countryId !== null) {
            dispatch(showLoading(true))
            dispatch(openCountryById(countryId.toString(), () => dispatch(showLoading(false)), (errorsMsg) => {
                dispatch(showLoading(false))
                dispatch(insertMsgs(errorsMsg, 'error'))
            }))
        }
        // eslint-disable-next-line
    }, [])

    async function updateRegister(nameField: string) {
        if (typeof countryId !== "undefined" && countryId !== null) {
            await dispatch(showLoading(true, MSG_SAVED_DATA))
            await dispatch(updateCountryById(countryId.toString(), nameField, () => {
                dispatch(showLoading(false))
                dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success", null, "reload_page"))
            }, (errorsMsg) => {
                dispatch(showLoading(false))
                dispatch(insertMsgs(errorsMsg, 'error'))
            }))
        }
    }

    return (
        <CountryEditView getCountry={getCountry} update={(nameField: string) => updateRegister(nameField)} />
    )
}

export default CountryEdit
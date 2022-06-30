/* eslint-disable prefer-destructuring */
import { useDispatch } from 'react-redux'
import { MSG_NEW_REGISTER_SUCCESS, MSG_SAVED_DATA } from '../../../app/core/consts'
import { registerCountry } from '../../../app/redux/Country/country.actions'
import { showLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import CountryNewView from './view'

function CountryNew() {

    const dispatch = useDispatch()

    async function insertCountry(nameField: string) {
        await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(registerCountry(nameField, 1, () => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs(errorsMsg, 'error'))
        }))
    }

    return (
        <CountryNewView saveRegister={(nameField: string) => insertCountry(nameField)} />
    )
}

export default CountryNew
/* eslint-disable prefer-destructuring */
import { useDispatch } from 'react-redux'
import { MSG_NEW_REGISTER_SUCCESS, MSG_SAVED_DATA } from '../../../app/core/consts'
import { registerCountry } from '../../../app/redux/Country/country.actions'
import { showLoading } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'
import CountryNewView from './view'

function CountryNew() {

    const dispatch = useDispatch()

    async function insertCountry(nameField: string) {
        await dispatch(showLoading(true, MSG_SAVED_DATA))
        await dispatch(registerCountry(nameField, 1, () => {
            dispatch(showLoading(false))
            dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(showLoading(false))
            dispatch(insertMsgs(errorsMsg, 'error'))
        }))
    }

    return (
        <CountryNewView saveRegister={(nameField: string) => insertCountry(nameField)} />
    )
}

export default CountryNew
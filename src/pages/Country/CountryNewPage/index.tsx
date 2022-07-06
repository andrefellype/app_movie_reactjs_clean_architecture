import { useDispatch } from 'react-redux'
import { MSG_NEW_REGISTER_SUCCESS, MSG_SAVED_DATA } from '../../../app/core/consts'
import { createInCountry } from '../../../app/redux/Country/country.actions'
import { setLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import CountryNewPageView from './view'

function CountryNewPage() {
    const dispatch = useDispatch()

    async function insertCountry(nameField: string) {
        await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(createInCountry(nameField, 1, () => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs(errorsMsg, 'error'))
        }))
    }

    return (
        <CountryNewPageView saveRegister={(nameField: string) => insertCountry(nameField)} />
    )
}

export default CountryNewPage
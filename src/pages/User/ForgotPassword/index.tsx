import { useDispatch } from 'react-redux'
import { insertMsgs, showLoadingPattern } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { MSG_SEND_LINK_SUCCESS, MSG_SEND_MESSAGE } from '../../../app/core/consts'
import { recoveryPasswordUser } from '../../../app/redux/User/user.actions'
import ForgotPasswordView from './view'

function ForgotPassword() {

    const dispatch = useDispatch()

    async function recoveryPassword(cellphoneField) {
        await dispatch(showLoadingPattern(true, MSG_SEND_MESSAGE))
        await dispatch(recoveryPasswordUser(cellphoneField,
            () => {
                dispatch(insertMsgs([MSG_SEND_LINK_SUCCESS], "success", null, "reload_page"))
                dispatch(showLoadingPattern(false))
            },
            (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingPattern(false))
            })
        )
    }

    return (
        <ForgotPasswordView recovery={(cellphoneField: string) => recoveryPassword(cellphoneField)} />
    )
}

export default ForgotPassword
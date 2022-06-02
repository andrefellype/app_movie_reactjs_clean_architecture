import { useDispatch } from 'react-redux'
import { showLoadingMain } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { MSG_SEND_LINK_SUCCESS, MSG_SEND_MESSAGE } from '../../../app/core/consts'
import { recoveryUserPassword } from '../../../app/redux/User/user.actions'
import ForgotPasswordView from './view'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'

function ForgotPassword() {

    const dispatch = useDispatch()

    async function recoveryPassword(cellphoneField) {
        await dispatch(showLoadingMain(true, MSG_SEND_MESSAGE))
        await dispatch(recoveryUserPassword(cellphoneField,
            () => {
                dispatch(insertMsgs([MSG_SEND_LINK_SUCCESS], "success", null, "reload_page"))
                dispatch(showLoadingMain(false))
            },
            (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingMain(false))
            })
        )
    }

    return (
        <ForgotPasswordView recovery={(cellphoneField: string) => recoveryPassword(cellphoneField)} />
    )
}

export default ForgotPassword
import { useDispatch } from 'react-redux'
import { insertMsgs, setLoadingPattern } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { MSG_SEND_LINK_SUCCESS, MSG_SEND_MESSAGE } from '../../../app/core/consts'
import { createRecoveryPasswordInUser } from '../../../app/redux/User/user.actions'
import ForgotPasswordPageView from './view'

function ForgotPasswordPage() {

    const dispatch = useDispatch()

    async function recoveryPassword(cellphoneField) {
        await dispatch(setLoadingPattern(true, MSG_SEND_MESSAGE))
        await dispatch(createRecoveryPasswordInUser(cellphoneField,
            () => {
                dispatch(insertMsgs([MSG_SEND_LINK_SUCCESS], "success", null, "reload_page"))
                dispatch(setLoadingPattern(false))
            },
            (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            })
        )
    }

    return (
        <ForgotPasswordPageView recovery={(cellphoneField: string) => recoveryPassword(cellphoneField)} />
    )
}

export default ForgotPasswordPage
/* eslint-disable prefer-destructuring */
import { useDispatch } from 'react-redux'
import { MSG_NEW_REGISTER_SUCCESS, MSG_SAVED_DATA } from '../../../app/core/consts'
import { showLoading } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'
import { registerStream } from '../../../app/redux/Stream/stream.actions'
import StreamNewView from './view'

function StreamNew() {

    const dispatch = useDispatch()

    async function insertStream(nameField: string) {
        await dispatch(showLoading(true, MSG_SAVED_DATA))
        await dispatch(registerStream(nameField, 1, () => {
            dispatch(showLoading(false))
            dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }))
    }

    return (
        <StreamNewView saveRegister={(nameField: string) => insertStream(nameField)} />
    )
}

export default StreamNew
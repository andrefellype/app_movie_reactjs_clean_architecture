/* eslint-disable prefer-destructuring */
import { useDispatch } from 'react-redux'
import { MSG_NEW_REGISTER_SUCCESS, MSG_SAVED_DATA } from '../../../app/core/consts'
import { registerDirector } from '../../../app/redux/Director/director.actions'
import { showLoading } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'
import DirectorNewView from './view'

function DirectorNew() {

    const dispatch = useDispatch()

    async function insertDirector(nameField: string) {
        await dispatch(showLoading(true, MSG_SAVED_DATA))
        await dispatch(registerDirector(nameField, 1, () => {
            dispatch(showLoading(false))
            dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }))
    }

    return (
        <DirectorNewView saveRegister={(nameField: string) => insertDirector(nameField)} />
    )
}

export default DirectorNew
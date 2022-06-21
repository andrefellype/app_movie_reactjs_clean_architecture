/* eslint-disable prefer-destructuring */
import { useDispatch } from 'react-redux'
import { MSG_NEW_REGISTER_SUCCESS, MSG_SAVED_DATA } from '../../../app/core/consts'
import { registerActor } from '../../../app/redux/Actor/actor.actions'
import { showLoading } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'
import ActorNewView from './view'

function ActorNew() {

    const dispatch = useDispatch()

    async function insertActor(nameField: string) {
        await dispatch(showLoading(true, MSG_SAVED_DATA))
        await dispatch(registerActor(nameField, 1, () => {
            dispatch(showLoading(false))
            dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorMsg) => {
            dispatch(showLoading(false))
            dispatch(insertMsgs(errorMsg, 'error'))
        }))
    }

    return (
        <ActorNewView saveRegister={(nameField: string) => insertActor(nameField)} />
    )
}

export default ActorNew
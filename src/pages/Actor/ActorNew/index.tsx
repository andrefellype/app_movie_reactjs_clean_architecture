/* eslint-disable prefer-destructuring */
import { useDispatch } from 'react-redux'
import { MSG_NEW_REGISTER_SUCCESS, MSG_SAVED_DATA } from '../../../app/core/consts'
import { registerActor } from '../../../app/redux/Actor/actor.actions'
import { showLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import ActorNewView from './view'

function ActorNew() {

    const dispatch = useDispatch()

    async function insertActor(nameField: string) {
        await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(registerActor(nameField, 1, () => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorMsg) => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs(errorMsg, 'error'))
        }))
    }

    return (
        <ActorNewView saveRegister={(nameField: string) => insertActor(nameField)} />
    )
}

export default ActorNew
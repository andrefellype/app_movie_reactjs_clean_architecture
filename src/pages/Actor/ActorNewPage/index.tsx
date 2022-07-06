import { useDispatch } from 'react-redux'
import { MSG_NEW_REGISTER_SUCCESS, MSG_SAVED_DATA } from '../../../app/core/consts'
import { createInActor } from '../../../app/redux/Actor/actor.actions'
import { setLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import ActorNewPageView from './view'

function ActorNewPage() {
    const dispatch = useDispatch()

    async function insertActor(nameField: string) {
        await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(createInActor(nameField, 1, () => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorMsg) => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs(errorMsg, 'error'))
        }))
    }

    return (
        <ActorNewPageView saveRegister={(nameField: string) => insertActor(nameField)} />
    )
}

export default ActorNewPage
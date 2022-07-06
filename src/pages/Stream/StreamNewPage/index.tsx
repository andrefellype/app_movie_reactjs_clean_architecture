import { useDispatch } from 'react-redux'
import { MSG_NEW_REGISTER_SUCCESS, MSG_SAVED_DATA } from '../../../app/core/consts'
import { setLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { createInStream } from '../../../app/redux/Stream/stream.actions'
import StreamNewPageView from './view'

function StreamNewPage() {
    const dispatch = useDispatch()

    async function insertStream(nameField: string) {
        await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(createInStream(nameField, 1, () => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }

    return (
        <StreamNewPageView saveRegister={(nameField: string) => insertStream(nameField)} />
    )
}

export default StreamNewPage
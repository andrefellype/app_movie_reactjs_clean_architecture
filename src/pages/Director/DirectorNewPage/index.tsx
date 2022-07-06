import { useDispatch } from 'react-redux'
import { MSG_NEW_REGISTER_SUCCESS, MSG_SAVED_DATA } from '../../../app/core/consts'
import { createInDirector } from '../../../app/redux/Director/director.actions'
import { setLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import DirectorNewPageView from './view'

function DirectorNewPage() {
    const dispatch = useDispatch()

    async function insertDirector(nameField: string) {
        await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(createInDirector(nameField, 1, () => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }

    return (
        <DirectorNewPageView saveRegister={(nameField: string) => insertDirector(nameField)} />
    )
}

export default DirectorNewPage
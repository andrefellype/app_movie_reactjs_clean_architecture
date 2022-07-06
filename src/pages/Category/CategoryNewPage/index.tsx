import { useDispatch } from 'react-redux'
import { MSG_NEW_REGISTER_SUCCESS, MSG_SAVED_DATA } from '../../../app/core/consts'
import { createInCategory } from '../../../app/redux/Category/category.actions'
import { setLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import CategoryNewPageView from './view'

function CategoryNewPage() {
    const dispatch = useDispatch()

    async function insertCategory(nameField: string) {
        await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(createInCategory(nameField, () => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }

    return (
        <CategoryNewPageView saveRegister={(nameField: string) => insertCategory(nameField)} />
    )
}

export default CategoryNewPage
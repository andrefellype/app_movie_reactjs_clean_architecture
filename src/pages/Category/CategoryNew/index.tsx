/* eslint-disable prefer-destructuring */
import { useDispatch } from 'react-redux'
import { MSG_NEW_REGISTER_SUCCESS, MSG_SAVED_DATA } from '../../../app/core/consts'
import { registerCategory } from '../../../app/redux/Category/category.actions'
import { showLoading } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'
import CategoryNewView from './view'

function CategoryNew() {

    const dispatch = useDispatch()

    async function insertCategory(nameField: string) {
        await dispatch(showLoading(true, MSG_SAVED_DATA))
        await dispatch(registerCategory(nameField, () => {
            dispatch(showLoading(false))
            dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }))
    }

    return (
        <CategoryNewView saveRegister={(nameField: string) => insertCategory(nameField)} />
    )
}

export default CategoryNew
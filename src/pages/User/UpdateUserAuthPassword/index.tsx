import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MSG_SAVED_DATA, MSG_UPDATE_PASSWORD_SUCCESS } from '../../../app/core/consts'
import { getUserSingle } from '../../../app/redux/User/user.selector'
import { showLoading } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { openUserByToken, updatePasswordUserByToken } from '../../../app/redux/User/user.actions'
import UpdateUserAuthPasswordView from './view'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'

function UpdateUserAuthPassword() {

    const dispatch = useDispatch()

    const getUser = useSelector(getUserSingle)

    React.useEffect(() => {
        dispatch(showLoading(true))
        dispatch(openUserByToken(() => dispatch(showLoading(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }))
        // eslint-disable-next-line
    }, [])

    async function updatePassword(passwordField: string, confirmPasswordField: string) {
        await dispatch(showLoading(true, MSG_SAVED_DATA))
        await dispatch(updatePasswordUserByToken(passwordField, confirmPasswordField, () => {
            dispatch(showLoading(false))
            dispatch(insertMsgs([MSG_UPDATE_PASSWORD_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }))
    }

    return (
        <UpdateUserAuthPasswordView getUser={getUser} update={(passwordField: string, confirmPasswordField: string) => updatePassword(passwordField, confirmPasswordField)} />
    )
}

export default UpdateUserAuthPassword
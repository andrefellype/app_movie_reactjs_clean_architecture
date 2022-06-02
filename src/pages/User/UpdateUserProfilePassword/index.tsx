import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MSG_SAVED_DATA, MSG_UPDATE_PASSWORD_SUCCESS } from '../../../app/core/consts'
import { getUserSingle } from '../../../app/redux/User/user.selector'
import { showLoadingMain } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { openByToken, updatePasswordAuth } from '../../../app/redux/User/user.actions'
import UpdateUserProfilePasswordView from './view'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'

function UpdateUserProfilePassword() {

    const dispatch = useDispatch()

    const getUser = useSelector(getUserSingle)

    React.useEffect(() => {
        dispatch(showLoadingMain(true))
        dispatch(openByToken(() => dispatch(showLoadingMain(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }))
        // eslint-disable-next-line
    }, [])

    async function updatePassword(passwordField: string, confirmPasswordField: string) {
        await dispatch(showLoadingMain(true, MSG_SAVED_DATA))
        await dispatch(updatePasswordAuth(passwordField, confirmPasswordField, () => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs([MSG_UPDATE_PASSWORD_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }))
    }

    return (
        <UpdateUserProfilePasswordView getUser={getUser} update={(passwordField: string, confirmPasswordField: string) => updatePassword(passwordField, confirmPasswordField)} />
    )
}

export default UpdateUserProfilePassword
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MSG_SAVED_DATA, MSG_UPDATE_PASSWORD_SUCCESS } from '../../../app/core/consts'
import { getUserSingle } from '../../../app/redux/User/user.selector'
import { insertMsgs, showLoadingPattern } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { openUserByToken, updatePasswordUserByToken } from '../../../app/redux/User/user.actions'
import UpdateUserAuthPasswordView from './view'
import { showStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function UpdateUserAuthPassword() {

    const dispatch = useDispatch()

    const getUser = useSelector(getUserSingle)
    const getLoading = useSelector(showStatusLoading)

    React.useEffect(() => {
        dispatch(showLoadingPattern(true))
        dispatch(openUserByToken(() => dispatch(showLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }))
        // eslint-disable-next-line
    }, [])

    async function updatePassword(passwordField: string, confirmPasswordField: string) {
        await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(updatePasswordUserByToken(passwordField, confirmPasswordField, () => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs([MSG_UPDATE_PASSWORD_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }))
    }

    function getIsLoading() {
        if (typeof getLoading !== "undefined" && typeof getLoading.statusPattern !== "undefined") {
            return getLoading.statusPattern
        }
        return false
    }

    return (
        <UpdateUserAuthPasswordView getUser={getUser} isLoading={getIsLoading()}
            update={(passwordField: string, confirmPasswordField: string) => updatePassword(passwordField, confirmPasswordField)} />
    )
}

export default UpdateUserAuthPassword
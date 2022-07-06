import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MSG_SAVED_DATA, MSG_UPDATE_PASSWORD_SUCCESS } from '../../../app/core/consts'
import { getUserSingle } from '../../../app/redux/User/user.selector'
import { insertMsgs, setLoadingPattern } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { openByTokenInUser, updatePasswordByTokenInUser } from '../../../app/redux/User/user.actions'
import UpdateUserAuthPasswordPageView from './view'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function UpdateUserAuthPasswordPage() {
    const dispatch = useDispatch()

    const getUser = useSelector(getUserSingle)
    const getLoading = useSelector(isStatusLoading)

    React.useEffect(() => {
        dispatch(setLoadingPattern(true))
        dispatch(openByTokenInUser(() => dispatch(setLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
        // eslint-disable-next-line
    }, [])

    async function updatePassword(passwordField: string, confirmPasswordField: string) {
        await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(updatePasswordByTokenInUser(passwordField, confirmPasswordField, () => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs([MSG_UPDATE_PASSWORD_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }

    function getIsLoading() {
        if (typeof getLoading !== "undefined" && typeof getLoading.statusPattern !== "undefined") {
            return getLoading.statusPattern
        }
        return false
    }

    return (
        <UpdateUserAuthPasswordPageView getUser={getUser} isLoading={getIsLoading()}
            update={(passwordField: string, confirmPasswordField: string) =>
                updatePassword(passwordField, confirmPasswordField)} />
    )
}

export default UpdateUserAuthPasswordPage
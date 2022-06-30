/* eslint-disable prefer-destructuring */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { insertMsgs, showLoadingPattern } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { openUserByToken, updateUserByToken } from '../../../app/redux/User/user.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import { getUserSingle } from '../../../app/redux/User/user.selector'
import UpdateUserAuthView from './view'
import { showStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function UpdateUserAuth() {

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

    function getIsLoading() {
        if (typeof getLoading !== "undefined" && typeof getLoading.statusPattern !== "undefined") {
            return getLoading.statusPattern
        }
        return false
    }

    async function updateUser(nameField: string, birthField: string, emailField: string, cellphoneField: string) {
        await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(updateUserByToken(nameField, birthField, emailField, cellphoneField, () => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }))
    }

    return (
        <UpdateUserAuthView isLoading={getIsLoading()} getUser={getUser}
            update={(nameField: string, birthField: string, emailField: string, cellphoneField: string) => updateUser(nameField, birthField, emailField, cellphoneField)} />
    )
}

export default UpdateUserAuth
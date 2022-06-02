/* eslint-disable prefer-destructuring */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showLoadingMain } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { openByToken, updateAuth } from '../../../app/redux/User/user.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import { getUserSingle } from '../../../app/redux/User/user.selector'
import UpdateUserProfileView from './view'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'

function UpdateUserProfile() {

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

    async function updateUser(nameField: string, birthField: string, emailField: string, cellphoneField: string) {
        await dispatch(showLoadingMain(true, MSG_SAVED_DATA))
        await dispatch(updateAuth(nameField, birthField, emailField, cellphoneField, () => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }))
    }

    return (
        <UpdateUserProfileView getUser={getUser} update={(nameField: string, birthField: string, emailField: string, cellphoneField: string) => updateUser(nameField, birthField, emailField, cellphoneField)} />
    )
}

export default UpdateUserProfile
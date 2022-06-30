/* eslint-disable prefer-destructuring */
import React from 'react'
import { useDispatch } from 'react-redux'
import { MSG_NEW_REGISTER_SUCCESS, MSG_SAVED_DATA } from '../../../app/core/consts'
import { insertMsgs, showLoadingPattern } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { registerUser } from '../../../app/redux/User/user.actions'
import UserNewView from './view'

function UserNew() {

    const dispatch = useDispatch()

    async function insertUser(nameField: string, birthField: string, emailField: string, cellphoneField: string, passwordField: string, confirmPasswordField: string, levelField: string) {
        await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(registerUser(nameField, birthField, emailField, cellphoneField, passwordField, confirmPasswordField, levelField, () => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }))
    }

    return (
        <UserNewView saveRegister={(nameField: string, birthField: string, emailField: string, cellphoneField: string, passwordField: string, confirmPasswordField: string, levelField: string) => insertUser(nameField, birthField, emailField, cellphoneField, passwordField, confirmPasswordField, levelField)} />
    )
}

export default UserNew
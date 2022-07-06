import React from 'react'
import { useDispatch } from 'react-redux'
import { MSG_NEW_REGISTER_SUCCESS, MSG_SAVED_DATA } from '../../../app/core/consts'
import { insertMsgs, setLoadingPattern } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { createInUser } from '../../../app/redux/User/user.actions'
import UserNewPageView from './view'

function UserNewPage() {
    const dispatch = useDispatch()

    async function insertUser(nameField: string, birthField: string, emailField: string,
        cellphoneField: string, passwordField: string, confirmPasswordField: string, levelField: string) {
        await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(createInUser(nameField, birthField, emailField, cellphoneField, passwordField,
            confirmPasswordField, levelField, () => {
                dispatch(setLoadingPattern(false))
                dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }))
    }

    return (
        <UserNewPageView saveRegister={(nameField: string, birthField: string, emailField: string,
            cellphoneField: string, passwordField: string, confirmPasswordField: string, levelField: string) =>
            insertUser(nameField, birthField, emailField, cellphoneField, passwordField, confirmPasswordField, levelField)} />
    )
}

export default UserNewPage
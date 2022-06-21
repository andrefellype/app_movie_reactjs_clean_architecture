/* eslint-disable prefer-destructuring */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { openUserByToken, updateUserByToken } from '../../../app/redux/User/user.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import { getUserSingle } from '../../../app/redux/User/user.selector'
import UpdateUserAuthView from './view'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'

function UpdateUserAuth() {

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

    async function updateUser(nameField: string, birthField: string, emailField: string, cellphoneField: string) {
        await dispatch(showLoading(true, MSG_SAVED_DATA))
        await dispatch(updateUserByToken(nameField, birthField, emailField, cellphoneField, () => {
            dispatch(showLoading(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }))
    }

    return (
        <UpdateUserAuthView getUser={getUser} update={(nameField: string, birthField: string, emailField: string, cellphoneField: string) => updateUser(nameField, birthField, emailField, cellphoneField)} />
    )
}

export default UpdateUserAuth
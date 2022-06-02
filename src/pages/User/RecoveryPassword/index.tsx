import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { showLoadingMain } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { MSG_UPDATED_REGISTER, MSG_UPDATE_PASSWORD_SUCCESS } from '../../../app/core/consts'
import { getUserSingle } from '../../../app/redux/User/user.selector'
import { openUserByCodeRecoveryPassword, updatePasswordUserByCodeRecovery } from '../../../app/redux/User/user.actions'
import RecoveryPasswordView from './view'
import { insertFailPage, insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'

function RecoveryPassword() {

    const dispatch = useDispatch()

    const { codeRecovery } = useParams()

    const getUser = useSelector(getUserSingle)

    React.useEffect(() => {
        dispatch(showLoadingMain(true))
        dispatch(openUserByCodeRecoveryPassword(codeRecovery as string, () => dispatch(showLoadingMain(false)),
            (errorsMsg) => {
                if (typeof errorsMsg === "string") {
                    dispatch(insertFailPage(errorsMsg, 'error'))
                    dispatch(showLoadingMain(false))
                } else {
                    dispatch(insertMsgs(errorsMsg, 'error'))
                    dispatch(showLoadingMain(false))
                }
            }))
        // eslint-disable-next-line
    }, [])

    async function update(passwordField: string, confirmPasswordField: string) {
        await dispatch(showLoadingMain(true, MSG_UPDATED_REGISTER))
        await dispatch(updatePasswordUserByCodeRecovery(codeRecovery as string, passwordField, confirmPasswordField, () => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs([MSG_UPDATE_PASSWORD_SUCCESS], 'success', null, 'back_sign'))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }))
    }

    return (
        <RecoveryPasswordView getUser={getUser} updatePassword={(passwordField, confirmPasswordField) => update(passwordField, confirmPasswordField)} />
    )
}

export default RecoveryPassword
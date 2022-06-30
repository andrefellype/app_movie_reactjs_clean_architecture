import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { showLoadingPattern, insertFailPage, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { MSG_UPDATED_REGISTER, MSG_UPDATE_PASSWORD_SUCCESS } from '../../../app/core/consts'
import { getUserSingle } from '../../../app/redux/User/user.selector'
import { openUserByCodeRecovery, updatePasswordUserByCodeRecovery } from '../../../app/redux/User/user.actions'
import RecoveryPasswordView from './view'

function RecoveryPassword() {

    const dispatch = useDispatch()

    const { codeRecovery } = useParams()

    const getUser = useSelector(getUserSingle)

    React.useEffect(() => {
        dispatch(showLoadingPattern(true))
        dispatch(openUserByCodeRecovery(codeRecovery as string, () => dispatch(showLoadingPattern(false)),
            (errorsMsg) => {
                if (typeof errorsMsg === "string") {
                    dispatch(insertFailPage(errorsMsg))
                    dispatch(showLoadingPattern(false))
                } else {
                    dispatch(insertMsgs(errorsMsg, 'error'))
                    dispatch(showLoadingPattern(false))
                }
            }))
        // eslint-disable-next-line
    }, [])

    async function update(passwordField: string, confirmPasswordField: string) {
        await dispatch(showLoadingPattern(true, MSG_UPDATED_REGISTER))
        await dispatch(updatePasswordUserByCodeRecovery(codeRecovery as string, passwordField, confirmPasswordField, () => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs([MSG_UPDATE_PASSWORD_SUCCESS], 'success', null, 'back_sign'))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }))
    }

    return (
        <RecoveryPasswordView getUser={getUser} updatePassword={(passwordField, confirmPasswordField) => update(passwordField, confirmPasswordField)} />
    )
}

export default RecoveryPassword
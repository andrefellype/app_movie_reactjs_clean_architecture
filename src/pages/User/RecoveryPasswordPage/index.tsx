import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { setLoadingPattern, insertFailPage, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { MSG_UPDATED_REGISTER, MSG_UPDATE_PASSWORD_SUCCESS } from '../../../app/core/consts'
import { getUserSingle } from '../../../app/redux/User/user.selector'
import { openByCodeRecoveryInUser, updatePasswordByCodeRecoveryInUser } from '../../../app/redux/User/user.actions'
import RecoveryPasswordPageView from './view'

function RecoveryPasswordPage() {

    const dispatch = useDispatch()

    const { codeRecovery } = useParams()

    const getUser = useSelector(getUserSingle)

    React.useEffect(() => {
        dispatch(setLoadingPattern(true))
        dispatch(openByCodeRecoveryInUser(codeRecovery as string, () => dispatch(setLoadingPattern(false)),
            (errorsMsg) => {
                if (typeof errorsMsg === "string") {
                    dispatch(insertFailPage(errorsMsg))
                    dispatch(setLoadingPattern(false))
                } else {
                    dispatch(insertMsgs(errorsMsg, 'error'))
                    dispatch(setLoadingPattern(false))
                }
            }))
        // eslint-disable-next-line
    }, [])

    async function update(passwordField: string, confirmPasswordField: string) {
        await dispatch(setLoadingPattern(true, MSG_UPDATED_REGISTER))
        await dispatch(updatePasswordByCodeRecoveryInUser(codeRecovery as string, passwordField, confirmPasswordField, () => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs([MSG_UPDATE_PASSWORD_SUCCESS], 'success', null, 'back_sign'))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }

    return (
        <RecoveryPasswordPageView getUser={getUser} updatePassword={(passwordField, confirmPasswordField) =>
            update(passwordField, confirmPasswordField)} />
    )
}

export default RecoveryPasswordPage
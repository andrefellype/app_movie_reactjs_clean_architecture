/* eslint-disable no-underscore-dangle */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { getUserSingle } from '../../../app/redux/User/user.selector'
import { showLoading } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { openUserById, updatePasswordById } from '../../../app/redux/User/user.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_PASSWORD_SUCCESS, URL_PANEL_HOME, USER_LOCAL_STORAGE } from '../../../app/core/consts'
import CryptographyConvert from '../../../app/components/CryptographyConvert'
import UpdateUserPasswordView from './view'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'

function UpdateUserPassword() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userId } = useParams()

    const getUser = useSelector(getUserSingle)

    async function verifyIdUser() {
        const userLocal = await localStorage.getItem(USER_LOCAL_STORAGE)
        if (userLocal !== null) {
            const userCrypto = await CryptographyConvert("base64", userLocal, "decode")
            if (userCrypto !== null) {
                const user = JSON.parse(userCrypto)
                if (userId === user._id) {
                    return false
                }
            }
        }
        return true
    }

    function verifyLevelUser(userActual) {
        verifyIdUser().then(statusVerify => {
            if (userActual && (userActual.level === "COMMON" || !statusVerify)) {
                navigate(URL_PANEL_HOME)
            }
        })
    }

    React.useEffect(() => {
        if (userId !== null && typeof userId !== "undefined") {
            dispatch(showLoading(true))
            dispatch(openUserById(userId.toString(), () => dispatch(showLoading(false)), (errorsMsg) => {
                dispatch(showLoading(false))
                dispatch(insertMsgs(errorsMsg, 'error'))
            }, (userActual) => verifyLevelUser(userActual)))
        }
        // eslint-disable-next-line
    }, [])

    async function updateUser(passwordField: string, confirmPasswordField: string) {
        if (userId !== null && typeof userId !== "undefined") {
            await dispatch(showLoading(true, MSG_SAVED_DATA))
            await dispatch(updatePasswordById(userId.toString(), passwordField, confirmPasswordField, () => {
                dispatch(showLoading(false))
                dispatch(insertMsgs([MSG_UPDATE_PASSWORD_SUCCESS], "success", null, "reload_page"))
            }, (errorMsg) => {
                dispatch(showLoading(false))
                dispatch(insertMsgs(errorMsg, 'error'))
            }))
        }
    }

    return (
        <UpdateUserPasswordView getUser={getUser} update={(passwordField: string, confirmPasswordField: string) => updateUser(passwordField, confirmPasswordField)} />
    )
}

export default UpdateUserPassword
/* eslint-disable no-underscore-dangle */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { getUserSingle } from '../../../app/redux/User/user.selector'
import { showLoadingMain } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { openUserById, updatePassword } from '../../../app/redux/User/user.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_PASSWORD_SUCCESS, URL_PANEL_HOME, USER_LOCAL_STORAGE } from '../../../app/core/consts'
import CryptographyConvert from '../../../app/components/CryptographyConvert'
import UserEditPasswordView from './view'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'

function UserEditPassword() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userId } = useParams()

    const getUser = useSelector(getUserSingle)

    React.useEffect(() => {
        if (userId !== null && typeof userId !== "undefined") {
            dispatch(showLoadingMain(true))
            dispatch(openUserById(userId.toString(), () => dispatch(showLoadingMain(false)), (errorsMsg) => {
                dispatch(showLoadingMain(false))
                dispatch(insertMsgs(errorsMsg, 'error'))
            }))
        }
        // eslint-disable-next-line
    }, [])

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

    React.useEffect(() => {
        verifyIdUser().then(statusVerify => {
            if (getUser && (getUser.level === "COMMON" || !statusVerify)) {
                navigate(URL_PANEL_HOME)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getUser])

    async function updateUser(passwordField: string, confirmPasswordField: string) {
        if (userId !== null && typeof userId !== "undefined") {
            await dispatch(showLoadingMain(true, MSG_SAVED_DATA))
            await dispatch(updatePassword(userId.toString(), passwordField, confirmPasswordField, () => {
                dispatch(showLoadingMain(false))
                dispatch(insertMsgs([MSG_UPDATE_PASSWORD_SUCCESS], "success", null, "reload_page"))
            }, (errorMsg) => {
                dispatch(showLoadingMain(false))
                dispatch(insertMsgs(errorMsg, 'error'))
            }))
        }
    }

    return (
        <UserEditPasswordView getUser={getUser} update={(passwordField: string, confirmPasswordField: string) => updateUser(passwordField, confirmPasswordField)} />
    )
}

export default UserEditPassword
/* eslint-disable no-underscore-dangle */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { getUserSingle } from '../../../app/redux/User/user.selector'
import { insertMsgs, showLoadingPattern } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { URL_USERS, USER_LOCAL_STORAGE } from '../../../app/core/consts'
import { openUserById } from '../../../app/redux/User/user.actions'
import CryptographyConvert from '../../../app/components/CryptographyConvert'
import UserShowView from './view'
import { showStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function UserShow() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getUser = useSelector(getUserSingle)
    const getLoading = useSelector(showStatusLoading)

    const { userId } = useParams()

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
            if (statusVerify) {
                dispatch(showLoadingPattern(true))
                dispatch(openUserById(userId as string, () => dispatch(showLoadingPattern(false)), (errorsMsg) => {
                    dispatch(showLoadingPattern(false))
                    dispatch(insertMsgs(errorsMsg, 'error'))
                }))
            } else {
                navigate(URL_USERS)
            }
        })
        // eslint-disable-next-line
    }, [])

    function getIsLoading() {
        if (typeof getLoading !== "undefined" && typeof getLoading.statusPattern !== "undefined") {
            return getLoading.statusPattern
        }
        return false
    }

    return (
        <UserShowView getUser={getUser} isLoading={getIsLoading()} />
    )
}

export default UserShow
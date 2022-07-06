/* eslint-disable no-underscore-dangle */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { getUserSingle } from '../../../app/redux/User/user.selector'
import { insertMsgs, setLoadingPattern } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { URL_USERS, USER_LOCAL_STORAGE } from '../../../app/core/consts'
import { openInUser } from '../../../app/redux/User/user.actions'
import CryptographyConvertBase64 from '../../../app/components/CryptographyConvert/CryptographyConvertBase64'
import UserShowPageView from './view'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function UserShowPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getUser = useSelector(getUserSingle)
    const getLoading = useSelector(isStatusLoading)

    const { userId } = useParams()

    async function verifyIdUser() {
        const userLocal = await localStorage.getItem(USER_LOCAL_STORAGE)
        if (userLocal !== null) {
            const userCrypto = await CryptographyConvertBase64(userLocal, "decode")
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
                dispatch(setLoadingPattern(true))
                dispatch(openInUser(userId as string, () =>
                    dispatch(setLoadingPattern(false)), (errorsMsg) => {
                        dispatch(setLoadingPattern(false))
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
        <UserShowPageView getUser={getUser} isLoading={getIsLoading()} />
    )
}

export default UserShowPage
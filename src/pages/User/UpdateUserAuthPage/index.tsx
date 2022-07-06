import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { insertMsgs, setLoadingPattern } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { openByTokenInUser, updateByTokenInUser } from '../../../app/redux/User/user.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import { getUserSingle } from '../../../app/redux/User/user.selector'
import UpdateUserAuthPageView from './view'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function UpdateUserAuthPage() {
    const dispatch = useDispatch()

    const getUser = useSelector(getUserSingle)
    const getLoading = useSelector(isStatusLoading)

    React.useEffect(() => {
        dispatch(setLoadingPattern(true))
        dispatch(openByTokenInUser(() => dispatch(setLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
        // eslint-disable-next-line
    }, [])

    function getIsLoading() {
        if (typeof getLoading !== "undefined" && typeof getLoading.statusPattern !== "undefined") {
            return getLoading.statusPattern
        }
        return false
    }

    async function updateUser(nameField: string, birthField: string, emailField: string, cellphoneField: string) {
        await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(updateByTokenInUser(nameField, birthField, emailField, cellphoneField, () => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }

    return (
        <UpdateUserAuthPageView isLoading={getIsLoading()} getUser={getUser}
            update={(nameField: string, birthField: string, emailField: string, cellphoneField: string) =>
                updateUser(nameField, birthField, emailField, cellphoneField)} />
    )
}

export default UpdateUserAuthPage
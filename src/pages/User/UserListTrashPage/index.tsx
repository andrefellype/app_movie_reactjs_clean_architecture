/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersAll, getUsersAllFilter } from '../../../app/redux/User/user.selector'
import { setLoadingTable, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { openAllInUser } from '../../../app/redux/User/user.actions'
import UserListTrashPageView from './view'
import { UserListTrashPageByOrderAndSearchAndFilter, UserListTrashPageDeleteBatch } from './actions'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function UserListTrashPage() {
    const dispatch = useDispatch()

    const users = useSelector(getUsersAllFilter)
    const usersGeneral = useSelector(getUsersAll)
    const isLoading = useSelector(isStatusLoading)

    const orderDefaultValue = "name"

    async function refreshList(orderField = orderDefaultValue, searchText = "", levelFilter = "", callbackSuccess: (() => void) | null = null) {
        await dispatch(setLoadingTable(true))
        await dispatch(openAllInUser(() => {
            dispatch(setLoadingTable(false))
            if (callbackSuccess !== null) callbackSuccess()
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingTable(false))
        }, orderField, searchText, levelFilter))
    }

    React.useEffect(() => {
        refreshList()
        // eslint-disable-next-line
    }, [])

    function updateGetListScroll(position) {
        return users.slice(0, position)
    }

    return (
        <UserListTrashPageView users={users} showLoading={isLoading} orderDefault={orderDefaultValue}
            getListScroll={(positionScroll) => updateGetListScroll(positionScroll)}
            actionChangeSearchText={(orderField: string, searchText: string, levelFilter: string, callbackSuccess: () => void) =>
                dispatch(UserListTrashPageByOrderAndSearchAndFilter(orderField, searchText, levelFilter, callbackSuccess, usersGeneral))}
            actionClickFilter={(orderField: string, searchText: string, levelFilter: string, callbackSuccess: () => void) =>
                dispatch(UserListTrashPageByOrderAndSearchAndFilter(orderField, searchText, levelFilter, callbackSuccess, usersGeneral))}
            actionEraseFilter={(orderField: string, searchText: string, callbackSuccess: () => void) =>
                dispatch(UserListTrashPageByOrderAndSearchAndFilter(orderField, searchText, "", callbackSuccess, usersGeneral))}
            actionOrderList={(orderField: string, searchText: string, levelFilter: string, callbackSuccess: () => void) =>
                dispatch(UserListTrashPageByOrderAndSearchAndFilter(orderField, searchText, levelFilter, callbackSuccess, usersGeneral))}
            actionRefreshList={(orderField: string, searchText: string, levelFilter: string, callbackSuccess: () => void) =>
                refreshList(orderField, searchText, levelFilter, callbackSuccess)}
            actionDeleteBatch={(arrayDeleteBatch: any, orderField: string, searchText: string, levelFilter: string, dispatchEraseBatch: any) =>
                dispatch(UserListTrashPageDeleteBatch(arrayDeleteBatch, orderField, searchText, levelFilter, dispatchEraseBatch))} />
    )
}

export default UserListTrashPage
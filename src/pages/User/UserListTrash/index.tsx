/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersAll, getUsersAllFilter } from '../../../app/redux/User/user.selector'
import { showLoadingTable, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { getUserAll } from '../../../app/redux/User/user.actions'
import UserListTrashView from './view'
import { UserListTrashByOrderAndSearchAndFilter, UserListTrashDeleteBatch } from './actions'
import { showStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function UserListTrash() {

    const dispatch = useDispatch()
    
    const users = useSelector(getUsersAllFilter)
    const usersGeneral = useSelector(getUsersAll)
    const isLoading = useSelector(showStatusLoading)

    const orderDefaultValue = "name"

    async function refreshList(orderField = orderDefaultValue, searchText = "", levelFilter = "") {
        await dispatch(showLoadingTable(true))
        await dispatch(getUserAll(() => dispatch(showLoadingTable(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingTable(false))
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
        <UserListTrashView users={users} showLoading={isLoading} getListScroll={(positionScroll) => updateGetListScroll(positionScroll)} orderDefault={orderDefaultValue}
            actionChangeSearchText={(orderField: string, searchText: string, levelFilter: string, callbackSuccess: () => void) => dispatch(UserListTrashByOrderAndSearchAndFilter(orderField, searchText, levelFilter, callbackSuccess, usersGeneral))}
            actionClickFilter={(orderField: string, searchText: string, levelFilter: string, callbackSuccess: () => void) => dispatch(UserListTrashByOrderAndSearchAndFilter(orderField, searchText, levelFilter, callbackSuccess, usersGeneral))}
            actionEraseFilter={(orderField: string, searchText: string, callbackSuccess: () => void) => dispatch(UserListTrashByOrderAndSearchAndFilter(orderField, searchText, "", callbackSuccess, usersGeneral))}
            actionOrderList={(orderField: string, searchText: string, levelFilter: string, callbackSuccess: () => void) => dispatch(UserListTrashByOrderAndSearchAndFilter(orderField, searchText, levelFilter, callbackSuccess, usersGeneral))}
            actionRefreshList={(orderField: string, searchText: string, levelFilter: string) => refreshList(orderField, searchText, levelFilter)}
            actionDeleteBatch={(arrayDeleteBatch: any, orderField: string, searchText: string, levelFilter: string, dispatchEraseBatch: any) => dispatch(UserListTrashDeleteBatch(arrayDeleteBatch, orderField, searchText, levelFilter, dispatchEraseBatch))} />
    )
}

export default UserListTrash
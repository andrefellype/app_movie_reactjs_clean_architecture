/* eslint-disable no-underscore-dangle */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUsersAll, getUsersAllFilter } from '../../../app/redux/User/user.selector'
import { insertMsgs, setLoadingTable } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { URL_USER_UPDATE_PASSWORD } from '../../../app/core/consts'
import { openAllInUser } from '../../../app/redux/User/user.actions'
import UserListPageView from './view'
import { UserListPageByOrderAndSearchAndFilter, UserListPageDelete, UserListPageUpdateEnabled } from './actions'
import GetListPaginate from '../../../app/components/Utils/GetListPaginate'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function UserListPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const valueListPaginate = 9
    const [positionPagination, setPositionPagination] = React.useState(1)
    const users = useSelector(getUsersAllFilter)
    const usersGeneral = useSelector(getUsersAll)
    const isLoading = useSelector(isStatusLoading)

    const orderDefaultValue = "name"

    async function refreshList(orderField = orderDefaultValue, searchText = "", levelFilter = "") {
        await dispatch(setLoadingTable(true))
        await dispatch(openAllInUser(() => dispatch(setLoadingTable(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingTable(false))
        }, orderField, searchText, levelFilter))
    }

    React.useEffect(() => {
        refreshList()
        // eslint-disable-next-line
    }, [])

    function showUpdatePassword(user) {
        if (user.level !== "COMMON") {
            navigate(`${URL_USER_UPDATE_PASSWORD}/${user._id}`)
        } else {
            dispatch(insertMsgs(["Este nível não pode ser alterado a senha"], "warning"))
        }
    }

    React.useEffect(() => {
        if (positionPagination > 1) {
            if (GetListPaginate(users, positionPagination, valueListPaginate).length === 0) {
                setPositionPagination((positionPagination - 1))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users])

    function getCountPaginate() {
        if (users) {
            let divid = (users.length / valueListPaginate)
            if (!Number.isInteger(divid)) {
                divid = Math.floor(divid) + 1
            }
            return divid
        }
        return 0
    }

    return (
        <UserListPageView positionPage={positionPagination} countUser={getCountPaginate()}
            users={GetListPaginate(users, positionPagination, valueListPaginate)}
            showLoading={isLoading} changePagination={(value: number) => setPositionPagination(value)}
            orderDefault={orderDefaultValue} showUpdatePassword={(user) => showUpdatePassword(user)}
            actionChangeSearchText={(orderField: string, searchText: string, levelFilter: string) =>
                dispatch(UserListPageByOrderAndSearchAndFilter(orderField, searchText, levelFilter, usersGeneral))}
            actionClickFilter={(orderField: string, searchText: string, levelFilter: string) =>
                dispatch(UserListPageByOrderAndSearchAndFilter(orderField, searchText, levelFilter, usersGeneral))}
            actionEraseFilter={(orderField: string, searchText: string) =>
                dispatch(UserListPageByOrderAndSearchAndFilter(orderField, searchText, "", usersGeneral))}
            actionOrderList={(orderField: string, searchText: string, levelFilter: string) =>
                dispatch(UserListPageByOrderAndSearchAndFilter(orderField, searchText, levelFilter, usersGeneral))}
            actionRefreshList={(orderField: string, searchText: string, levelFilter: string) =>
                refreshList(orderField, searchText, levelFilter)}
            actionUpdateEnabled={(userId: string, orderField: string, searchText: string, levelFilter: string) =>
                dispatch(UserListPageUpdateEnabled(userId, orderField, searchText, levelFilter))}
            actionDeleteRegister={(userId: string, orderField: string, searchText: string, levelFilter: string) =>
                dispatch(UserListPageDelete(userId, orderField, searchText, levelFilter))} />
    )
}

export default UserListPage
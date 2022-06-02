/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUsersAll, getUsersAllFilter } from '../../../app/redux/User/user.selector'
import { showLoadingMain } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { URL_USER_UPDATE_PASSWORD } from '../../../app/core/consts'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'
import { getUserAll } from '../../../app/redux/User/user.actions'
import UserListView from './view'
import { UserListByOrderAndSearchAndFilter, UserListDeleteBatch, UserListDelete, UserListUpdateEnabled } from './actions'
import GetListPaginate from '../../../app/components/Utils/GetListPaginate'

function UserList() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const valueListPaginate = 6
    const [positionPagination, setPositionPagination] = React.useState(1)
    const users = useSelector(getUsersAllFilter)
    const usersGeneral = useSelector(getUsersAll)

    const orderDefaultValue = "name"

    async function refreshList(orderField = orderDefaultValue, searchText = "", levelFilter = "") {
        await dispatch(showLoadingMain(true))
        await dispatch(getUserAll(() => dispatch(showLoadingMain(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
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
        <UserListView usersBatch={users} positionPage={positionPagination} users={GetListPaginate(users, positionPagination, valueListPaginate)} countUser={getCountPaginate()}
            changePagination={(value: number) => setPositionPagination(value)}
            orderDefault={orderDefaultValue} showUpdatePassword={(user) => showUpdatePassword(user)}
            actionChangeSearchText={(orderField: string, searchText: string, levelFilter: string) => dispatch(UserListByOrderAndSearchAndFilter(orderField, searchText, levelFilter, usersGeneral))}
            actionClickFilter={(orderField: string, searchText: string, levelFilter: string) => dispatch(UserListByOrderAndSearchAndFilter(orderField, searchText, levelFilter, usersGeneral))}
            actionEraseFilter={(orderField: string, searchText: string) => dispatch(UserListByOrderAndSearchAndFilter(orderField, searchText, "", usersGeneral))}
            actionOrderList={(orderField: string, searchText: string, levelFilter: string) => dispatch(UserListByOrderAndSearchAndFilter(orderField, searchText, levelFilter, usersGeneral))}
            actionRefreshList={(orderField: string, searchText: string, levelFilter: string) => refreshList(orderField, searchText, levelFilter)}
            actionUpdateEnabled={(userId: string, orderField: string, searchText: string, levelFilter: string) => dispatch(UserListUpdateEnabled(userId, orderField, searchText, levelFilter))}
            actionDeleteRegister={(userId: string, orderField: string, searchText: string, levelFilter: string) => dispatch(UserListDelete(userId, orderField, searchText, levelFilter))}
            actionDeleteBatch={(arrayDeleteBatch: any, orderField: string, searchText: string, levelFilter: string, dispatchEraseBatch: any) => dispatch(UserListDeleteBatch(arrayDeleteBatch, orderField, searchText, levelFilter, dispatchEraseBatch))} />
    )
}

export default UserList
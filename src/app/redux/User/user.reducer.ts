import GetLocalStorage from "../../components/Utils/GetLocalStorage"
import {
    TOKEN_LOCAL_STORAGE, USER_ACCESS_REDUCER, USER_LIST_FILTER_REDUCER, USER_LIST_REDUCER, USER_LOCAL_STORAGE, USER_SINGLE_REDUCER
} from "../../core/consts"

const user = function (state: {
    userAccess: null, user: null, tokenAccess: null, users: [], usersFilter: []
}, action) {
    switch (action.type) {
        case USER_LIST_FILTER_REDUCER:
            return {
                ...state,
                usersFilter: action.users
            }
        case USER_LIST_REDUCER:
            return {
                ...state,
                usersFilter: action.usersFilter,
                users: action.users
            }
        case USER_SINGLE_REDUCER:
            return { ...state, user: action.userSingle }
        case USER_ACCESS_REDUCER:
            return {
                ...state,
                userAccess: action.userAccess,
                tokenAccess: action.tokenAccess,
            }
        default:
            let userLocal = GetLocalStorage(USER_LOCAL_STORAGE)
            if (userLocal !== null) {
                userLocal = JSON.parse(userLocal)
            }
            const tokenLocal = GetLocalStorage(TOKEN_LOCAL_STORAGE)
            return {
                ...state,
                userAccess: userLocal,
                tokenAccess: tokenLocal
            }
    }
}

export default user
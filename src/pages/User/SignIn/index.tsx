import { useDispatch } from 'react-redux'
import { insertMsgs, showLoadingPattern } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { MSG_SIGNIN } from '../../../app/core/consts'
import { signInUser } from '../../../app/redux/User/user.actions'
import SignInView from './view'

function SignIn() {

    const dispatch = useDispatch()

    async function login(cellphoneField: string, passwordField: string) {
        await dispatch(showLoadingPattern(true, MSG_SIGNIN))
        await dispatch(signInUser(cellphoneField, passwordField, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }))
    }

    return (
        <SignInView signIn={(cellphoneField: string, passwordField: string) => login(cellphoneField, passwordField)} />
    )
}

export default SignIn
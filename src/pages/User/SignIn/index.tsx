import { useDispatch } from 'react-redux'
import { showLoadingMain } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { MSG_SIGNIN } from '../../../app/core/consts'
import { signInUser } from '../../../app/redux/User/user.actions'
import SignInView from './view'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'

function SignIn() {

    const dispatch = useDispatch()

    async function login(cellphoneField: string, passwordField: string) {
        await dispatch(showLoadingMain(true, MSG_SIGNIN))
        await dispatch(signInUser(cellphoneField, passwordField, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }))
    }

    return (
        <SignInView signIn={(cellphoneField: string, passwordField: string) => login(cellphoneField, passwordField)} />
    )
}

export default SignIn
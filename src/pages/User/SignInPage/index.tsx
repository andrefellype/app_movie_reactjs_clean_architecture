import { useDispatch } from 'react-redux'
import { insertMsgs, setLoadingPattern } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { MSG_SIGNIN } from '../../../app/core/consts'
import { signInUser } from '../../../app/redux/User/user.actions'
import SignInPageView from './view'

function SignInPage() {
    const dispatch = useDispatch()

    async function login(cellphoneField: string, passwordField: string) {
        await dispatch(setLoadingPattern(true, MSG_SIGNIN))
        await dispatch(signInUser(cellphoneField, passwordField, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }

    return (
        <SignInPageView signIn={(cellphoneField: string, passwordField: string) => login(cellphoneField, passwordField)} />
    )
}

export default SignInPage
import { useDispatch } from 'react-redux'
import { MSG_SAVED_DATA } from '../../../app/core/consts'
import { insertMsgs, setLoadingPattern } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { signUpUser } from '../../../app/redux/User/user.actions'
import SignUpPageView from './view'

function SignUpPage() {
    const dispatch = useDispatch()

    async function insertUser(nameField: string, birthField: string, cellphoneField: string, emailField: string,
        passwordField: string, confirmPasswordField: string) {
        await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(signUpUser(nameField, birthField, cellphoneField, emailField, passwordField, confirmPasswordField, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }

    return (
        <SignUpPageView register={(nameField: string, birthField: string, cellphoneField: string, emailField: string,
            passwordField: string, confirmPasswordField: string) => insertUser(nameField, birthField, cellphoneField, emailField,
                passwordField, confirmPasswordField)} />
    )
}

export default SignUpPage
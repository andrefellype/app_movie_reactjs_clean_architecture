/* eslint-disable prefer-destructuring */
import { useDispatch } from 'react-redux'
import { MSG_SAVED_DATA } from '../../../app/core/consts'
import { showLoadingMain } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'
import { signUpUser } from '../../../app/redux/User/user.actions'
import SignUpView from './view'

function SignUp() {

    const dispatch = useDispatch()

    async function insertUser(nameField: string, birthField: string, cellphoneField: string, emailField: string, passwordField: string, confirmPasswordField: string) {
        await dispatch(showLoadingMain(true, MSG_SAVED_DATA))
        await dispatch(signUpUser(nameField, birthField, cellphoneField, emailField, passwordField, confirmPasswordField, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }))
    }

    return (
        <SignUpView register={(nameField: string, birthField: string, cellphoneField: string, emailField: string, passwordField: string, confirmPasswordField: string) => insertUser(nameField, birthField, cellphoneField, emailField, passwordField, confirmPasswordField)} />
    )
}

export default SignUp
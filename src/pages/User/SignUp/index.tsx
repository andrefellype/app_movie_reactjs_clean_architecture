/* eslint-disable prefer-destructuring */
import { useDispatch } from 'react-redux'
import { MSG_SAVED_DATA } from '../../../app/core/consts'
import { insertMsgs, showLoadingPattern } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { signUpUser } from '../../../app/redux/User/user.actions'
import SignUpView from './view'

function SignUp() {

    const dispatch = useDispatch()

    async function insertUser(nameField: string, birthField: string, cellphoneField: string, emailField: string, passwordField: string, confirmPasswordField: string) {
        await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(signUpUser(nameField, birthField, cellphoneField, emailField, passwordField, confirmPasswordField, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }))
    }

    return (
        <SignUpView register={(nameField: string, birthField: string, cellphoneField: string, emailField: string, passwordField: string, confirmPasswordField: string) => insertUser(nameField, birthField, cellphoneField, emailField, passwordField, confirmPasswordField)} />
    )
}

export default SignUp
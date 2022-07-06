/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { Dialog, DialogActions } from '@mui/material'
import FacebookLogin from 'react-facebook-login'

class DialogFacebook extends React.Component<{
    isOpenFacebook: boolean, closeFacebook: () => void, keyAppFacebook: string, callbackFacebook: (response) => void
}> {
    render() {
        const { isOpenFacebook, closeFacebook, keyAppFacebook, callbackFacebook, } = this.props

        return (
            <Dialog open={isOpenFacebook} onClose={closeFacebook} aria-labelledby="form-dialog-title">
                <DialogActions>
                    <FacebookLogin appId={keyAppFacebook} autoLoad fields="name,email,picture"
                        scope="public_profile" callback={callbackFacebook} />
                </DialogActions>
            </Dialog>
        )
    }
}

export default DialogFacebook
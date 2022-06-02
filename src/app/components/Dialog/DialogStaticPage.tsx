/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-props-no-spreading */
import { Dialog, DialogContent, Typography } from '@mui/material'
import React from 'react'

class DialogStaticPage extends React.Component<{ messageDialog: string, showDialog: boolean, style?: object }> {

    render() {
        const { messageDialog, showDialog, children, ...other } = this.props

        return (
            <Dialog open={showDialog} aria-labelledby="form-dialog-title" {...other}>
                <DialogContent>
                    <Typography gutterBottom variant="h6" component="h6" style={{ fontWeight: 'bold' }}>
                        {messageDialog.toUpperCase()}
                    </Typography>
                    {children}
                </DialogContent>
            </Dialog>
        )
    }
}

export default DialogStaticPage
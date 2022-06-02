/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { Dialog, DialogActions, DialogContent, Typography } from '@mui/material'
import ButtonSuccess from "../Button/ButtonSuccess"
import ButtonDanger from "../Button/ButtonDanger"

class DialogYesOrNot extends React.Component<{
    titleDialog?: string | null, showDialog: boolean, onCloseDialog: () => void, clickDialogNot: () => void, clickDialogYes: () => void,
    titleYesDialog?: string, titleNotDialog?: string, contentDialog?: string | null, contentWidget?: JSX.Element | null, style?: object
}> {

    render() {

        const { titleDialog, showDialog, onCloseDialog, clickDialogNot, clickDialogYes, titleYesDialog = "Sim", titleNotDialog = "Não", contentDialog, contentWidget, ...other } = this.props

        function getContentDialog() {
            if (contentDialog !== null && typeof contentDialog === "string") {
                // eslint-disable-next-line react/no-danger
                return <div dangerouslySetInnerHTML={{ __html: contentDialog }} />
            }
            return null
        }

        return (
            <Dialog open={showDialog} onClose={onCloseDialog} aria-labelledby="form-dialog-title" {...other}>
                <DialogContent>
                    {titleDialog && <Typography gutterBottom variant="h6" component="h6" style={{ fontWeight: 'bold', marginBottom: 15 }}>
                        {titleDialog.toUpperCase()}
                    </Typography>}
                    {contentDialog && getContentDialog()}
                    {contentWidget && contentWidget}
                </DialogContent>
                <DialogActions style={{ marginLeft: 10, marginRight: 10 }}>
                    <ButtonSuccess title={titleYesDialog} sizeBtn="small" actionClick={() => clickDialogYes()} />
                    <ButtonDanger title={titleNotDialog} sizeBtn="small" actionClick={() => clickDialogNot()} />
                </DialogActions>
            </Dialog>
        )
    }
}

export default DialogYesOrNot
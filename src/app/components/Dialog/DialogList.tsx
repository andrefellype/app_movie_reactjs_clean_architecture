/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import { Dialog, DialogActions, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import ButtonDanger from '../Button/ButtonDanger'

import IconList from '../IconList'

export type DialogListModel = {
    text: string | string[], icon?: string, cursorClick?: "pointer" | null, actionClick?: (() => void) | null
}

export default class DialogList extends React.Component<{
    showDialog: boolean, onCloseDialog?: () => void, clickCloseDialog?: () => void, listDialog: DialogListModel[],
    style?: object
}> {
    render() {
        const { showDialog, onCloseDialog, clickCloseDialog, listDialog, children, ...other } = this.props

        function actionClickDialog(item) {
            if (item !== null && item.actionClick !== null) {
                return item.actionClick
            }
            return () => { console.log("DialogList") }
        }

        return (
            <Dialog {...other} open={showDialog} onClose={onCloseDialog} aria-labelledby="form-dialog-title">
                <DialogActions>
                    <List component="nav" aria-label="secondary mailbox folders">
                        {listDialog.map((item, key) => (<div key={key}>
                            <ListItem style={{ cursor: `${item.cursorClick !== null && item.cursorClick}` }}
                                onClick={actionClickDialog(item)}>
                                <ListItemIcon>
                                    {item.icon && <IconList style={{ marginTop: 5, marginBottom: 5, marginRight: 5 }}
                                        icon={item.icon} />}
                                    {typeof item.text === 'string' ? <ListItemText primary={<b>{item.text}</b>} /> :
                                        item.text.map(itText => <ListItemText primary={<b>{itText}</b>} />)}
                                </ListItemIcon>
                            </ListItem>
                            {key < (listDialog.length - 1) && <Divider />}
                        </div>))}
                        {children}
                    </List>
                </DialogActions>
                <DialogActions>
                    <ButtonDanger title="FECHAR" actionClick={clickCloseDialog} />
                </DialogActions>
            </Dialog>
        )
    }
}
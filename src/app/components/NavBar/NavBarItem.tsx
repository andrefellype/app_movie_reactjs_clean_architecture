/* eslint-disable no-console */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/require-default-props */
import React from "react"
import { useNavigate } from "react-router-dom"
import { Badge, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import IconList from "../IconList"
import DialogList from "../Dialog/DialogList"
import ICON_OBJECT_LIST from "../IconList/ICON_OBJECT_LIST"


type NavBarItemModel = {
    icon?: string, title?: string, badgeText?: string, isNotification?: boolean,
    notifications?: { text: string | string[], icon: string, cursorClick?: "pointer" | null, actionClick?: () => void | null }[],
    dropdowns?: { text: string | string[], icon: string, cursorClick?: "pointer" | null, actionClick?: () => void | null }[],
    collapsables?: { text: string, icon: string, actionClick?: () => void }[],
    redirectUrl?: string | null, clickOut?: () => void | null, onMobileClose?: () => void
}
const NavBarItem: React.FC<NavBarItemModel> = function ({ icon, title, badgeText, isNotification, notifications, dropdowns, collapsables, redirectUrl, clickOut, onMobileClose }) {

    const navigate = useNavigate()

    const [showCollapsable, setShowCollapsable] = React.useState(false)
    const [showNotification, setShowNotification] = React.useState(false)
    const [showDropdown, setShowDropdown] = React.useState(false)

    function getNotifications() {
        if (notifications != null) {
            return notifications
        }
        return []
    }

    function getDropdowns() {
        if (dropdowns != null) {
            return dropdowns
        }
        return []
    }

    function getCollapsables() {
        if (collapsables != null) {
            return collapsables
        }
        return []
    }

    function actionClickNav() {
        if (getCollapsables().length > 0)
            return () => setShowCollapsable(!showCollapsable)
        if (getNotifications().length > 0)
            return () => setShowNotification(true)
        if (getDropdowns().length > 0)
            return () => setShowDropdown(true)
        if (redirectUrl !== null) {
            return () => {
                if (onMobileClose) {
                    onMobileClose()
                }
                navigate(`${redirectUrl}`)
            }
        }
        if (clickOut !== null) {
            return clickOut
        }
        return () => { console.log("NavBarItem actionClickNav") }
    }

    return (
        <React.Fragment>
            <ListItem button onClick={actionClickNav()}>
                <ListItemIcon>
                    <Badge badgeContent={badgeText} color={(badgeText || isNotification) ? "error" : "default"}>
                        {icon && <IconList icon={icon} sizeIcon="medium" style={{ color: '#000000', marginTop: 1, marginRight: 20 }} />}
                    </Badge>
                    {title && <ListItemText primary={<b style={{ color: '#000000' }}>{title}</b>} />}
                </ListItemIcon>
                {getCollapsables().length > 0 && (showCollapsable ? <IconList icon={ICON_OBJECT_LIST.EXPAND_LESS_ICON} style={{ marginLeft: 5 }} /> : <IconList icon={ICON_OBJECT_LIST.EXPAND_MORE_ICON} style={{ marginLeft: 5 }} />)}
            </ListItem>
            {getNotifications().length > 0 && <DialogList onCloseDialog={() => setShowNotification(true)} clickCloseDialog={() => setShowNotification(false)} showDialog={showNotification} listDialog={getNotifications()} />}
            {getDropdowns().length > 0 && <DialogList showDialog={showDropdown} onCloseDialog={() => setShowDropdown(true)} clickCloseDialog={() => setShowDropdown(false)} listDialog={getDropdowns()} />}
            {getCollapsables().length > 0 && <Collapse in={showCollapsable} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {getCollapsables().map((item, key) => (
                        <ListItemButton sx={{ pl: 3 }} key={key} onClick={item.actionClick}>
                            <ListItemIcon style={{ color: '#000000' }}>
                                {item.icon && <IconList icon={item.icon} style={{ marginRight: 10 }} sizeIcon="medium" />}
                                <ListItemText style={{ fontSize: 14, marginTop: 2 }} primary={<b style={{ fontSize: 14 }}>{item.text}</b>} />
                            </ListItemIcon>
                        </ListItemButton>))}
                </List>
            </Collapse>}
        </React.Fragment>
    )
}

export default NavBarItem
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/require-default-props */
import React from "react"
import { Badge, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import IconList from "../IconList"
import DialogList from "../Dialog/DialogList"

type NavBarItemModel = { icon?: string, title?: string, badgeText?: string, notifications: { text: string | string[], icon: string, cursorClick?: "pointer" | null, actionClick?: (() => void) | null }[] }
const NavBarItemNotifications: React.FC<NavBarItemModel> = function ({ icon, title, badgeText, notifications }) {

    const [showNotification, setShowNotification] = React.useState(false)

    return (
        <React.Fragment>
            <ListItem button onClick={() => setShowNotification(true)}>
                <ListItemIcon>
                    <Badge badgeContent={badgeText} color={badgeText ? "error" : "default"}>
                        {icon && <IconList icon={icon} sizeIcon="medium" style={{
                            color: '#000000', marginTop: 1, marginRight: 20
                        }} />}
                    </Badge>
                    {title && <ListItemText primary={<b style={{ color: '#000000' }}>{title}</b>} />}
                </ListItemIcon>
            </ListItem>
            <DialogList onCloseDialog={() => setShowNotification(true)}
                clickCloseDialog={() => setShowNotification(false)} showDialog={showNotification}
                listDialog={notifications} />
        </React.Fragment>
    )
}

export default NavBarItemNotifications
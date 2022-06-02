/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-console */
import React from "react"
import { useNavigate } from "react-router-dom"
import { Badge, IconButton } from "@mui/material"
import DialogList from "../Dialog/DialogList"
import IconList from "../IconList"

type HeaderItemModel = {
    icon?: string | null, title?: string | null, badgeText?: string | null, isNotification?: boolean,
    notifications?: { text: string | string[], icon: string, cursorClick?: "pointer" | null, actionClick?: () => void | null }[],
    dropdowns?: { text: string | string[], icon: string, cursorClick?: "pointer" | null, actionClick?: () => void | null }[],
    redirectUrl?: string | null, clickOut?: () => void | null, sx?: object
}
const HeaderItem: React.FC<HeaderItemModel> = function ({ icon, title, badgeText, isNotification, notifications, dropdowns, redirectUrl, clickOut, sx }): JSX.Element | null {

    const navigate = useNavigate()

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

    function onClickAction() {
        if (getNotifications().length)
            return () => setShowNotification(true)
        if (getDropdowns().length)
            return () => setShowDropdown(true)
        if (redirectUrl !== null) {
            return () => navigate(`${redirectUrl}`)
        }
        if (clickOut !== null) {
            return clickOut
        }
        return () => { console.log("onClickAction HeaderItem") }
    }

    return (
        <React.Fragment>
            <IconButton color="inherit" onClick={onClickAction()} style={{ marginRight: 1 }} edge="end" sx={sx}>
                <Badge badgeContent={badgeText} color={(badgeText || isNotification) ? "error" : "default"}>
                    {icon && <IconList icon={icon} sizeIcon="medium" style={{ marginTop: 1, marginRight: 2 }} />}
                    {title}
                </Badge>
            </IconButton>
            {getNotifications().length > 0 && <DialogList onCloseDialog={() => setShowNotification(true)} clickCloseDialog={() => setShowNotification(false)} showDialog={showNotification} listDialog={getNotifications()} />}
            {getDropdowns().length > 0 && <DialogList showDialog={showDropdown} onCloseDialog={() => setShowDropdown(true)} clickCloseDialog={() => setShowDropdown(false)} listDialog={getDropdowns()} />}
        </React.Fragment>
    )
}

HeaderItem.defaultProps = {
    icon: null,
    title: null,
    badgeText: "",
    isNotification: false,
    notifications: [],
    dropdowns: [],
    redirectUrl: null,
    clickOut: () => { console.log("clickOut HeaderItem") },
    sx: {}
}

export default HeaderItem
/* eslint-disable react/require-default-props */
import React from "react"
import { Badge, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import IconList from "../IconList"
import ComponentLink from '../Utils/ComponentLink'

type NavBarItemModel = { icon?: string, title?: string, badgeText?: string, redirectUrl?: string | null }

const NavBarItemLink: React.FC<NavBarItemModel> = function ({ icon, title, badgeText, redirectUrl }) {
    return (
        <ListItem component={ComponentLink} to={redirectUrl} button>
            <ListItemIcon>
                <Badge badgeContent={badgeText} color={badgeText ? "error" : "default"}>
                    {icon && <IconList icon={icon} sizeIcon="medium" style={{
                        color: '#000000', marginTop: 1, marginRight: 20
                    }} />}
                </Badge>
                {title && <ListItemText primary={<b style={{ color: '#000000' }}>{title}</b>} />}
            </ListItemIcon>
        </ListItem>
    )
}

export default NavBarItemLink
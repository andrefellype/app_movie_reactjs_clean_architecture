/* eslint-disable react/jsx-fragments */
/* eslint-disable react/require-default-props */
import React from "react"
import { Badge, Collapse, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import IconList from "../IconList"
import ICON_OBJECT_LIST from "../IconList/ICON_OBJECT_LIST"
import NavBarItemLink from "./NavBarItemLink"
import NavBarItemOnClick from "./NavBarItemOnClick"

type NavBarItemModel = { icon?: string, title?: string, badgeText?: string, collapsables: { text: string, icon: string, redirectUrl?: string | null, actionClick?: (() => void) | null }[] }
const NavBarItemCollapsables: React.FC<NavBarItemModel> = function ({ icon, title, badgeText, collapsables }) {

    const [showCollapsable, setShowCollapsable] = React.useState(false)

    function getLink(collapsable, collapsableKey) {
        if (typeof collapsable.redirectUrl !== "undefined" && collapsable.redirectUrl !== null)
            return <NavBarItemLink key={collapsableKey} icon={collapsable.icon} redirectUrl={collapsable.redirectUrl} title={collapsable.text} />
        if (typeof collapsable.actionClick !== "undefined" && collapsable.actionClick !== null)
            return <NavBarItemOnClick key={collapsableKey} icon={collapsable.icon} title={collapsable.text} clickOut={collapsable.actionClick} />
        return null
    }

    return (
        <React.Fragment>
            <ListItem button onClick={() => setShowCollapsable(true)}>
                <ListItemIcon>
                    <Badge badgeContent={badgeText} color={badgeText ? "error" : "default"}>
                        {icon && <IconList icon={icon} sizeIcon="medium" style={{ color: '#000000', marginTop: 1, marginRight: 20 }} />}
                    </Badge>
                    {title && <ListItemText primary={<b style={{ color: '#000000' }}>{title}</b>} />}
                </ListItemIcon>
                {showCollapsable ? <IconList icon={ICON_OBJECT_LIST.EXPAND_LESS_ICON} style={{ marginLeft: 5 }} /> : <IconList icon={ICON_OBJECT_LIST.EXPAND_MORE_ICON} style={{ marginLeft: 5 }} />}
            </ListItem>
            <Collapse in={showCollapsable} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {collapsables.map((item, key) => getLink(item, key))}
                </List>
            </Collapse>
        </React.Fragment>
    )
}

export default NavBarItemCollapsables
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-fragments */
import React from "react"
import { Drawer, List, Toolbar } from "@mui/material"
import NavBarItem from "./NavBarItem"

import textNavbar from '../../assets/text_navbar.png'

const drawerWidth = 240
export type NavBarMenu = {
    icon?: string, title?: string, badgeText?: string, isNotification?: boolean, isDesktop: boolean, isMobile: boolean,
    notifications?: { text: string | string[], icon: string, cursorClick?: "pointer" | null, actionClick?: (() => void) | null }[],
    dropdowns?: { text: string | string[], icon: string, cursorClick?: "pointer" | null, actionClick?: (() => void) | null }[],
    collapsables?: { text: string, icon: string, redirectUrl?: string | null, actionClick?: (() => void) | null }[], redirectUrl?: string | null, clickOut?: (() => void) | null
}
const NavBar: React.FC<{ isMobile: boolean, onMobileNavOpen: () => void, window?: () => Window, menusList: NavBarMenu[] }> = function ({ isMobile, onMobileNavOpen, window, menusList }) {

    const container = window !== undefined ? () => window().document.body : undefined

    const toolbarDrawer = (
        <Toolbar>
            <img src={textNavbar} alt="IMG_NAVBAR" style={{ width: '100%', height: '60%' }} />
        </Toolbar>
    )

    return (
        <React.Fragment>
            <Drawer container={container} variant="temporary" open={isMobile} onClose={onMobileNavOpen} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}>
                {toolbarDrawer}
                <List>
                    {menusList.filter(value => value.isMobile).map((value, key) => (
                        <NavBarItem key={key} icon={value.icon} title={value.title} redirectUrl={value.redirectUrl} clickOut={value.clickOut} isNotification={value.isNotification}
                            notifications={value.notifications} dropdowns={value.dropdowns} collapsables={value.collapsables} onMobileClose={onMobileNavOpen} />
                    ))}
                </List>
            </Drawer>
            <Drawer variant="permanent" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }} open>
                {toolbarDrawer}
                <List>
                    {menusList.filter(value => value.isDesktop).map((value, key) => (
                        <NavBarItem key={key} icon={value.icon} title={value.title} redirectUrl={value.redirectUrl} clickOut={value.clickOut} isNotification={value.isNotification}
                            notifications={value.notifications} dropdowns={value.dropdowns} collapsables={value.collapsables} onMobileClose={onMobileNavOpen} />
                    ))}
                </List>
            </Drawer>
        </React.Fragment>
    )
}

export default NavBar
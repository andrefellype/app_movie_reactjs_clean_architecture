import React from "react"
import { Box, Toolbar, IconButton, AppBar, Typography, Hidden } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import HeaderItem from "./HeaderItem"

const drawerWidth = 240

export type HeaderMenu = {
    icon?: string, title?: string, badgeText?: string, isNotification?: boolean, isDesktop: boolean,
    isMobile: boolean, notifications?: {
        text: string | string[], icon: string, cursorClick?: "pointer" | null, actionClick?: (() => void) | null
    }[], dropdowns?: {
        text: string | string[], icon: string, cursorClick?: "pointer" | null, actionClick?: (() => void) | null
    }[], redirectUrl?: string | null, clickOut?: (() => void) | null,
}

const Header: React.FC<{ onMobileNavOpen: () => void, titleHeader?: string | null, menusList: HeaderMenu[] }> = function ({ onMobileNavOpen, titleHeader, menusList }) {
    return (
        <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}>
            <Toolbar>
                <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={onMobileNavOpen}
                    sx={{ mr: 1, display: { sm: 'none' } }}>
                    <MenuIcon />
                </IconButton>
                <Typography style={{ fontWeight: 'bold', fontSize: 26 }} variant="h6" noWrap component="div">
                    {titleHeader ?? "AFMM"}
                </Typography>
                <Box flexGrow={1} />
                {menusList.map((value, key) => (value.isDesktop !== value.isMobile) ? (
                    <Hidden key={key} lgUp={value.isMobile} mdDown={value.isDesktop}>
                        <HeaderItem icon={value.icon} title={value.title} badgeText={value.badgeText}
                            isNotification={value.isNotification} notifications={value.notifications}
                            dropdowns={value.dropdowns} redirectUrl={value.redirectUrl} clickOut={value.clickOut} />
                    </Hidden>) : (
                    <Hidden key={key}>
                        <HeaderItem icon={value.icon} title={value.title} badgeText={value.badgeText}
                            isNotification={value.isNotification} notifications={value.notifications}
                            dropdowns={value.dropdowns} redirectUrl={value.redirectUrl} clickOut={value.clickOut} />
                    </Hidden>
                ))}
            </Toolbar>
        </AppBar>
    )
}

Header.defaultProps = {
    titleHeader: null
}

export default Header
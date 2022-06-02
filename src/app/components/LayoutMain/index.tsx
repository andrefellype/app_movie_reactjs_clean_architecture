import { Box, Toolbar } from "@mui/material"
import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import DialogStaticPage from "../Dialog/DialogStaticPage"
import Header, { HeaderMenu } from "../Header"
import LoadingBackdrop from "../LoadingBackdrop"
import NavBar, { NavBarMenu } from "../NavBar"

const drawerWidth = 240

type typeMsgAlert = { title?: string | null, icon?: 'success' | 'error' | 'warning' | 'info' | 'question' | null, type: string, msgs: string[], confirmButton?: string | null }
type typeLoading = { status: false, title: "" }

const LayoutMain: React.FC<{
    titleHeaderValue: string, msgAlert?: typeMsgAlert | null, cleanMsg?: () => void | null, isLoading?: typeLoading | null, signOutCallback?: () => void | null, menusNavBar: NavBarMenu[],
    menusHeader: HeaderMenu[], urlSignIn: string
}> = function ({ titleHeaderValue, msgAlert, cleanMsg, isLoading, signOutCallback, menusNavBar, menusHeader, urlSignIn }) {

    const navigate = useNavigate()

    const [mobileOpen, setMobileOpen] = React.useState(false)
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

    const [dialogFailPage, setDialogFailPage] = React.useState(false)
    const [msgFailPage, setMsgFailPage] = React.useState("")

    React.useEffect(() => {
        if (typeof msgAlert !== "undefined" && msgAlert !== null) {
            if (msgAlert.msgs.length > 0) {
                if (msgAlert.msgs[0] === "token_invalidate" && typeof signOutCallback !== "undefined") {
                    signOutCallback()
                    setMsgFailPage("TOKEN NOT VALIDATE")
                    setDialogFailPage(true)
                } else {
                    if (msgAlert.type === "message") {
                        let htmlMsg = "<div style='padding-top: 10'>"
                        msgAlert.msgs.forEach(msg => {
                            htmlMsg += "<div style='font-size: 25px; font-weight: bold; margin-bottom: 10'>"
                            htmlMsg += msg
                            htmlMsg += "</div>"
                        })
                        htmlMsg += "</div>"
                        Swal.fire({
                            icon: msgAlert.icon !== null ? msgAlert.icon : "info",
                            title: msgAlert.title !== null ? msgAlert.title : "",
                            allowOutsideClick: false,
                            position: 'center',
                            html: htmlMsg,
                            preConfirm: () => {
                                if (msgAlert.confirmButton) {
                                    if (msgAlert.confirmButton === "reload_page") {
                                        window.location.reload()
                                    } else if (msgAlert.confirmButton === "back_sign") {
                                        navigate(urlSignIn)
                                    }
                                }
                            }
                        })
                    } else if (msgAlert.type === "fail_page") {
                        setMsgFailPage(msgAlert.msgs[0])
                        setDialogFailPage(true)
                    }
                }
                if (typeof cleanMsg !== "undefined" && cleanMsg !== null) {
                    cleanMsg()
                }
            }
        }
        // eslint-disable-next-line
    }, [msgAlert])

    return (
        <Box sx={{ display: 'flex' }}>
            <Header titleHeader={titleHeaderValue} onMobileNavOpen={handleDrawerToggle} menusList={menusHeader} />
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
                <NavBar menusList={menusNavBar} isMobile={mobileOpen} onMobileNavOpen={handleDrawerToggle} />
            </Box>
            <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                <Toolbar />
                {(typeof isLoading !== "undefined" && isLoading !== null && isLoading.status) && <LoadingBackdrop loadingObject={isLoading} />}
                <Outlet />
            </Box>
            <DialogStaticPage showDialog={dialogFailPage} messageDialog={msgFailPage} />
        </Box>
    )
}

LayoutMain.defaultProps = {
    msgAlert: null,
    isLoading: null,
    cleanMsg: undefined,
    signOutCallback: undefined
}

export default LayoutMain
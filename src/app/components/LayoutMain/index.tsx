import { Box, Fab, Toolbar } from "@mui/material"
import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import DialogStaticPage from "../Dialog/DialogStaticPage"
import Header, { HeaderMenu } from "../Header"
import LoadingBackdrop from "../LoadingBackdrop"
import NavBar, { NavBarMenu } from "../NavBar"
import IconList from "../IconList"
import ICON_OBJECT_LIST from "../IconList/ICON_OBJECT_LIST"

const drawerWidth = 240

type typeMsgAlert = { title?: string | null, icon?: 'success' | 'error' | 'warning' | 'info' | 'question' | null, type: string, msgs: string[], confirmButton?: string | null }
type typeLoading = { statusPattern: false, titlePattern: "" }

const LayoutMain: React.FC<{
    titleHeaderValue: string, msgAlert?: typeMsgAlert | null, cleanMsg?: (() => void) | null, isLoading?: typeLoading | null, signOutCallback?: (() => void) | null, menusNavBar: NavBarMenu[],
    menusHeader: HeaderMenu[], urlSignIn: string, isScrollTop: boolean
}> = function ({ titleHeaderValue, msgAlert, cleanMsg, isLoading, signOutCallback, menusNavBar, menusHeader, urlSignIn, isScrollTop }) {

    const navigate = useNavigate()

    const [mobileOpen, setMobileOpen] = React.useState(false)
    const [dialogFailPage, setDialogFailPage] = React.useState(false)
    const [msgFailPage, setMsgFailPage] = React.useState("")
    const [visible, setVisible] = React.useState(false)

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

    React.useEffect(() => {
        if (typeof msgAlert !== "undefined" && msgAlert !== null) {
            if (msgAlert.msgs.length > 0) {
                if (msgAlert.msgs[0] === "token_invalidate" && typeof signOutCallback !== "undefined" && signOutCallback !== null) {
                    signOutCallback()
                    setMsgFailPage("TOKEN NOT VALIDATE")
                    setDialogFailPage(true)
                } else {
                    if (msgAlert.type === "message") {
                        const confirmButtonValue = msgAlert.confirmButton
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
                                if (confirmButtonValue) {
                                    if (confirmButtonValue === "reload_page") {
                                        window.location.reload()
                                    } else if (confirmButtonValue === "back_sign") {
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

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    window.addEventListener('scroll', toggleVisible)

    return (
        <Box sx={{ display: 'flex' }}>
            <Header titleHeader={titleHeaderValue} onMobileNavOpen={handleDrawerToggle} menusList={menusHeader} />
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
                <NavBar menusList={menusNavBar} isMobile={mobileOpen} onMobileNavOpen={handleDrawerToggle} />
            </Box>
            <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                <Toolbar />
                {(typeof isLoading !== "undefined" && isLoading !== null && isLoading.statusPattern) && <LoadingBackdrop loadingObject={isLoading} />}
                {isScrollTop && <Fab onClick={scrollToTop} sx={{ position: 'fixed', display: visible ? 'visible' : 'none', bottom: 16, right: 16 }} color="primary">
                    <IconList icon={ICON_OBJECT_LIST.ARROW_DROP_UP_ICON} sizeIcon="large" />
                </Fab>}
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
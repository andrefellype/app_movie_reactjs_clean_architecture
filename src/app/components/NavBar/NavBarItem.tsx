import React from "react"
import NavBarItemLink from "./NavBarItemLink"
import NavBarItemNotifications from "./NavBarItemNotifications"
import NavBarItemDropdowns from "./NavBarItemDropdowns"
import NavBarItemOnClick from "./NavBarItemOnClick"
import NavBarItemCollapsables from "./NavBarItemCollapsables"

type NavBarItemModel = {
    icon?: string, title?: string, badgeText?: string, isNotification?: boolean,
    notifications?: { text: string | string[], icon: string, cursorClick?: "pointer" | null, actionClick?: (() => void) | null }[],
    dropdowns?: { text: string | string[], icon: string, cursorClick?: "pointer" | null, actionClick?: (() => void) | null }[],
    collapsables?: { text: string, icon: string, redirectUrl?: string | null, actionClick?: (() => void) | null }[],
    redirectUrl?: string | null, clickOut?: (() => void) | null, onMobileClose?: () => void
}
const NavBarItem: React.FC<NavBarItemModel> = function ({ icon, title, badgeText, notifications, dropdowns, collapsables, redirectUrl, clickOut }) {

    function getNotifications() {
        if (typeof notifications !== "undefined" && notifications != null) {
            return notifications
        }
        return []
    }

    function getDropdowns() {
        if (typeof dropdowns !== "undefined" && dropdowns != null) {
            return dropdowns
        }
        return []
    }

    function getCollapsables() {
        if (typeof collapsables !== "undefined" && collapsables != null) {
            return collapsables
        }
        return []
    }

    function getLink() {
        if (typeof redirectUrl !== "undefined" && redirectUrl !== null)
            return <NavBarItemLink badgeText={badgeText} icon={icon} redirectUrl={redirectUrl} title={title} />
        if (getNotifications().length > 0)
            return <NavBarItemNotifications badgeText={badgeText} icon={icon} notifications={getNotifications()} title={title} />
        if (getDropdowns().length > 0)
            return <NavBarItemDropdowns badgeText={badgeText} icon={icon} dropdowns={getDropdowns()} title={title} />
        if (typeof clickOut !== "undefined" && clickOut !== null)
            return <NavBarItemOnClick badgeText={badgeText} icon={icon} title={title} clickOut={clickOut} />
        if (getCollapsables().length > 0)
            return <NavBarItemCollapsables badgeText={badgeText} icon={icon} title={title} collapsables={getCollapsables()} />
        return null
    }

    return getLink()
}

export default NavBarItem
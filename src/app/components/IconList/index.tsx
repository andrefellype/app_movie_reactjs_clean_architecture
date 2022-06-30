/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HomeIcon from '@mui/icons-material/Home'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import CheckIcon from '@mui/icons-material/Check'
import FacebookIcon from '@mui/icons-material/Facebook'
import DeleteIcon from '@mui/icons-material/Delete'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import InfoIcon from '@mui/icons-material/Info'
import CallIcon from '@mui/icons-material/Call'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import GroupIcon from '@mui/icons-material/Group'
import SettingsIcon from '@mui/icons-material/Settings'
import ClearIcon from '@mui/icons-material/Clear'
import FilterListIcon from '@mui/icons-material/FilterList'
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl'
import RefreshIcon from '@mui/icons-material/Refresh'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import EditIcon from '@mui/icons-material/Edit'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MapIcon from '@mui/icons-material/Map'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import InstagramIcon from '@mui/icons-material/Instagram'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore'
import HourglassTopIcon from '@mui/icons-material/HourglassTop'
import RemoveIcon from '@mui/icons-material/Remove'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import HeightIcon from '@mui/icons-material/Height'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import TabletMacIcon from '@mui/icons-material/TabletMac'
import ListAltIcon from '@mui/icons-material/ListAlt'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import MovieIcon from '@mui/icons-material/Movie'
import LiveTvIcon from '@mui/icons-material/LiveTv'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ICON_OBJECT_LIST from './ICON_OBJECT_LIST'

export default class IconList extends React.Component<{ icon: string, sizeIcon?: 'inherit' | 'large' | 'medium' | 'small', style?: object }> {
    render() {
        const { icon, sizeIcon = "small", ...other } = this.props

        switch (icon) {
            case "":
            case null:
                return null
            case ICON_OBJECT_LIST.ARROW_DROP_UP_ICON:
                return <ArrowDropUpIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.ARROW_CIRCLE_UP:
                return <ArrowCircleUpIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.ACCOUNT_BOX_ICON:
                return <AccountBoxIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.DO_DISTURB_ALT_ICON:
                return <DoDisturbAltIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.CALENDAR_MONTH_ICON:
                return <CalendarMonthIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.LIVE_TV_ICON:
                return <LiveTvIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.MOVIE_ICON:
                return <MovieIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.ARROW_DROP_DOWN_ICON:
                return <ArrowDropDownIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.MAIL_ICON:
                return <MailIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.INBOX_ICON:
                return <InboxIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.TABLET_MAC_ICON:
                return <TabletMacIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.LIST_ALT_ICON:
                return <ListAltIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.ARROW_FORWARD_IOS_ICON:
                return <ArrowForwardIosIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.HEIGHT_ICON:
                return <HeightIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.ATTACH_MONEY_ICON:
                return <AttachMoneyIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.FORMAT_LIST_NUMBERED_ICON:
                return <FormatListNumberedIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.ACCESS_TIME_FILLED_ICON:
                return <AccessTimeFilledIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.ACCOUNT_BALANCE_ICON:
                return <AccountBalanceIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.REMOVE_ICON:
                return <RemoveIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.HOURGLASS_TOP_ICON:
                return <HourglassTopIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.LOCAL_GROCERY_STORE_ICON:
                return <LocalGroceryStoreIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.INSTAGRAM_ICON:
                return <InstagramIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.EMAIL_ICON:
                return <EmailIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.PHONE_ICON:
                return <PhoneIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.PHONE_IPHONE_ICON:
                return <PhoneIphoneIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.AC_UNIT_ICON:
                return <AcUnitIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.MAP_ICON:
                return <MapIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.FAVORITE_ICON:
                return <FavoriteIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.FAVORITE_BORDER_ICON:
                return <FavoriteBorderIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.EDIT_ICON:
                return <EditIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.LOCK_ICON:
                return <LockIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.LOCK_OPEN_ICON:
                return <LockOpenIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.REMOVE_RED_EYE_ICON:
                return <RemoveRedEyeIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.ARROW_BACK_IOS_NEW_ICON:
                return <ArrowBackIosNewIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.ADD_ICON:
                return <AddIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.REFRESH_ICON:
                return <RefreshIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.FORMAT_LIST_NUMBERED_RTL_ICON:
                return <FormatListNumberedRtlIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.FILTER_LIST_ICON:
                return <FilterListIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.CLEAR_ICON:
                return <ClearIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.SETTINGS_ICON:
                return <SettingsIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.GROUP_ICON:
                return <GroupIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.VPN_KEY_ICON:
                return <VpnKeyIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.ADD_CIRCLE_OUTLINE_ICON:
                return <AddCircleOutlineIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.CALL_ICON:
                return <CallIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.INFO_ICON:
                return <InfoIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.EXIT_TO_APP_ICON:
                return <ExitToAppIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.DELETE_ICON:
                return <DeleteIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.FACEBOOK_ICON:
                return <FacebookIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.CHECK_ICON:
                return <CheckIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.VISIBILITY_ICON:
                return <VisibilityIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.VISIBILITY_OFF_ICON:
                return <VisibilityOffIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.EXPAND_MORE_ICON:
                return <ExpandMoreIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.EXPAND_LESS_ICON:
                return <ExpandLessIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.HOME_ICON:
                return <HomeIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.ACCOUNT_CIRCLE_ICON:
                return <AccountCircleIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.MENU_ICON:
                return <MenuIcon fontSize={sizeIcon} {...other} />
            case ICON_OBJECT_LIST.CANCEL_ICON:
                return <CancelIcon fontSize={sizeIcon} {...other} />
            default:
                return <CancelIcon fontSize={sizeIcon} {...other} />
        }
    }
}
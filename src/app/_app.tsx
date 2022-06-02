import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import LayoutMain from './components/LayoutMain'
import PageMain from '../pages/App/PageMain'
import PanelMain from '../pages/App/PanelMain'
import UnderConstruction from '../pages/App/UnderConstruction'
import { NavBarMenu } from './components/NavBar'
import { HeaderMenu } from './components/Header'
import ICON_OBJECT_LIST from './components/IconList/ICON_OBJECT_LIST'
import GlobalStyles from './components/GlobalStyles'
import DialogYesOrNot from './components/Dialog/DialogYesOrNot'
import FailPage from '../pages/App/FailPage'
import { getMsgAlert } from './redux/MsgAlert/msgAlert.selector'
import { statusLoadingMain } from './redux/LoadingMain/loadingMain.selector'
import { cleanMsgs, insertMsgs } from './redux/MsgAlert/msgAlert.actions'
import { showLoadingMain } from './redux/LoadingMain/loadingMain.actions'
import {
    MSG_LOGOUT_SYSTEM, MSG_LOGOUT_SYSTEM_ACTION, SYSTEM_API_VERSION, URL_ABOUT, URL_ABOUT_EDIT, URL_ABOUT_NEW, URL_ACTORS, URL_ACTOR_EDIT, URL_ACTOR_NEW,
    URL_CATEGORIES, URL_CATEGORY_EDIT, URL_CATEGORY_NEW, URL_COUNTRIES, URL_COUNTRY_EDIT, URL_COUNTRY_NEW, URL_DIRECTORS, URL_DIRECTOR_EDIT, URL_DIRECTOR_NEW,
    URL_FAIL_PAGE, URL_FORGOT_PASSWORD, URL_MAIN, URL_MOVIES, URL_MOVIE_EDIT, URL_MOVIE_NEW, URL_MY_MOVIES, URL_MY_MOVIE_NEW, URL_MY_TV_SHOWS, URL_MY_TV_SHOW_NEW, URL_PANEL_HOME, URL_RECOVERY_PASSWORD,
    URL_SIGN_IN, URL_SIGN_UP, URL_STREAMS, URL_STREAM_EDIT, URL_STREAM_NEW, URL_TV_SHOWS, URL_TV_SHOW_EDIT, URL_TV_SHOW_EPISODES, URL_TV_SHOW_EPISODE_EDIT,
    URL_TV_SHOW_EPISODE_NEW, URL_TV_SHOW_NEW, URL_TV_SHOW_SEASONS, URL_TV_SHOW_SEASON_EDIT, URL_TV_SHOW_SEASON_NEW, URL_UNDER_CONSTRUCTION, URL_USERS, URL_USER_NEW,
    URL_USER_PROFILE, URL_USER_PROFILE_PASSWORD, URL_USER_UPDATE_PASSWORD
} from './core/consts'
import SignUp from '../pages/User/SignUp'
import { getUserAccess } from './redux/User/user.selector'
import { isVerifyUser, signOutUser } from './redux/User/user.actions'
import SignIn from '../pages/User/SignIn'
import ForgotPassword from '../pages/User/ForgotPassword'
import RecoveryPassword from '../pages/User/RecoveryPassword'
import UpdateUserProfile from '../pages/User/UpdateUserProfile'
import UpdateUserProfilePassword from '../pages/User/UpdateUserProfilePassword'
import UserList from '../pages/User/UserList'
import UserNew from '../pages/User/UserNew'
import UserShow from '../pages/User/UserShow'
import UserEditPassword from '../pages/User/UserEditPassword'
import AboutApp from '../pages/App/AboutApp'
import AboutAppNew from '../pages/App/AboutAppNew'
import AboutAppEdit from '../pages/App/AboutAppEdit'
import CategoryList from '../pages/Category/CategoryList'
import CategoryNew from '../pages/Category/CategoryNew'
import CategoryEdit from '../pages/Category/CategoryEdit'
import DirectorList from '../pages/Director/DirectorList'
import DirectorNew from '../pages/Director/DirectorNew'
import DirectorEdit from '../pages/Director/DirectorEdit'
import ActorList from '../pages/Actor/ActorList'
import ActorNew from '../pages/Actor/ActorNew'
import ActorEdit from '../pages/Actor/ActorEdit'
import CountryList from '../pages/Country/CountryList'
import CountryNew from '../pages/Country/CountryNew'
import CountryEdit from '../pages/Country/CountryEdit'
import StreamList from '../pages/Stream/StreamList'
import StreamNew from '../pages/Stream/StreamNew'
import StreamEdit from '../pages/Stream/StreamEdit'
import MovieList from '../pages/Movie/MovieList'
import MovieNew from '../pages/Movie/MovieNew'
import MovieEdit from '../pages/Movie/MovieEdit'
import TvShowList from '../pages/TvShow/TvShowList'
import TvShowNew from '../pages/TvShow/TvShowNew'
import TvShowEdit from '../pages/TvShow/TvShowEdit'
import TvShowSeasonList from '../pages/TvShowSeason/TvShowSeasonList'
import TvShowSeasonNew from '../pages/TvShowSeason/TvShowSeasonNew'
import TvShowSeasonEdit from '../pages/TvShowSeason/TvShowSeasonEdit'
import TvShowEpisodeList from '../pages/TvShowEpisode/TvShowEpisodeList'
import TvShowEpisodeNew from '../pages/TvShowEpisode/TvShowEpisodeNew'
import TvShowEpisodeEdit from '../pages/TvShowEpisode/TvShowEpisodeEdit'
import MyMovieList from '../pages/MyMovie/MyMovieList'
import MyMovieNew from '../pages/MyMovie/MyMovieNew'
import MyTvShowList from '../pages/MyTvShow/MyTvShowList'
import MyTvShowNew from '../pages/MyTvShow/MyTvShowNew'

const mdTheme = createTheme({})

function App() {

    const dispatch = useDispatch()

    const [showLogout, setShowLogout] = React.useState(false)

    const getAuthenticate = useSelector(getUserAccess)
    const msgAlertSelector = useSelector(getMsgAlert)
    const isLoadingSelector = useSelector(statusLoadingMain)

    function actionCleanMsgs() {
        dispatch(cleanMsgs())
    }

    function actionSignOut() {
        dispatch(signOutUser())
    }

    React.useEffect(() => {
        dispatch(isVerifyUser((errorsMsg) => dispatch(insertMsgs(errorsMsg, 'error'))))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const menusNavBar: { checkUser: number, checkLevels?: string[], notLevels?: string[], menu: NavBarMenu }[] = [
        { checkUser: 0, notLevels: ['ADMIN'], menu: { icon: ICON_OBJECT_LIST.HOME_ICON, title: "INÍCIO", isDesktop: true, isMobile: true, redirectUrl: URL_MAIN } },
        { checkUser: 1, menu: { icon: ICON_OBJECT_LIST.TABLET_MAC_ICON, title: "PAINEL", isDesktop: true, isMobile: true, redirectUrl: URL_PANEL_HOME } },
        { checkUser: 0, menu: { icon: ICON_OBJECT_LIST.ACCOUNT_CIRCLE_ICON, title: "AREA DE ACESSO", isDesktop: true, isMobile: false, redirectUrl: URL_SIGN_IN } },
        { checkUser: 1, checkLevels: ['ADMIN'], menu: { icon: ICON_OBJECT_LIST.GROUP_ICON, title: "USUÁRIOS", isDesktop: true, isMobile: true, redirectUrl: URL_USERS } },
        { checkUser: 1, checkLevels: ['ADMIN'], menu: { icon: ICON_OBJECT_LIST.LIST_ALT_ICON, title: "CATEGORIAS", isDesktop: true, isMobile: true, redirectUrl: URL_CATEGORIES } },
        { checkUser: 1, checkLevels: ['ADMIN'], menu: { icon: ICON_OBJECT_LIST.LIST_ALT_ICON, title: "DIRETORES", isDesktop: true, isMobile: true, redirectUrl: URL_DIRECTORS } },
        { checkUser: 1, checkLevels: ['ADMIN'], menu: { icon: ICON_OBJECT_LIST.LIST_ALT_ICON, title: "ATORES", isDesktop: true, isMobile: true, redirectUrl: URL_ACTORS } },
        { checkUser: 1, checkLevels: ['ADMIN'], menu: { icon: ICON_OBJECT_LIST.LIST_ALT_ICON, title: "PAÍSES", isDesktop: true, isMobile: true, redirectUrl: URL_COUNTRIES } },
        { checkUser: 1, checkLevels: ['ADMIN'], menu: { icon: ICON_OBJECT_LIST.LIST_ALT_ICON, title: "STREAMS", isDesktop: true, isMobile: true, redirectUrl: URL_STREAMS } },
        { checkUser: 1, menu: { icon: ICON_OBJECT_LIST.MOVIE_ICON, title: "FILMES", isDesktop: true, isMobile: true, redirectUrl: URL_MOVIES } },
        { checkUser: 1, menu: { icon: ICON_OBJECT_LIST.LIVE_TV_ICON, title: "SÉRIES", isDesktop: true, isMobile: true, redirectUrl: URL_TV_SHOWS } },
        { checkUser: 1, menu: { icon: ICON_OBJECT_LIST.MOVIE_ICON, title: "MEUS FILMES", isDesktop: true, isMobile: true, redirectUrl: URL_MY_MOVIES } },
        { checkUser: 1, menu: { icon: ICON_OBJECT_LIST.LIVE_TV_ICON, title: "MINHAS SÉRIES", isDesktop: true, isMobile: true, redirectUrl: URL_MY_TV_SHOWS } },
        { checkUser: -1, menu: { icon: ICON_OBJECT_LIST.INFO_ICON, title: "SOBRE NÓS", isDesktop: true, isMobile: true, redirectUrl: URL_ABOUT } },
    ]

    function verifyUser(checkUser: number, checkLevels: string[] = [], notLevels: string[] = []) {
        let statusSignIn = true
        if (checkUser === 0) {
            statusSignIn = !getAuthenticate
        } else if (checkUser === 1) {
            statusSignIn = getAuthenticate
        }
        if (getAuthenticate) {
            if (checkLevels.length > 0) {
                statusSignIn = checkLevels.filter(cl => getAuthenticate.level === cl).length > 0
            }
            if (notLevels.length > 0) {
                statusSignIn = notLevels.filter(nl => nl === getAuthenticate.level).length === 0
            }
        }
        return statusSignIn
    }

    const menusHeader: { checkUser: number, checkLevels?: string[], notLevels?: string[], menu: HeaderMenu }[] = [
        { checkUser: 0, menu: { icon: ICON_OBJECT_LIST.ACCOUNT_CIRCLE_ICON, redirectUrl: URL_SIGN_IN, isDesktop: false, isMobile: true } },
        { checkUser: 1, menu: { icon: ICON_OBJECT_LIST.VPN_KEY_ICON, redirectUrl: URL_USER_PROFILE_PASSWORD, isDesktop: true, isMobile: true } },
        { checkUser: 1, menu: { icon: ICON_OBJECT_LIST.ACCOUNT_CIRCLE_ICON, redirectUrl: URL_USER_PROFILE, isDesktop: true, isMobile: true } },
        { checkUser: 1, menu: { icon: ICON_OBJECT_LIST.EXIT_TO_APP_ICON, clickOut: () => setShowLogout(true), isDesktop: true, isMobile: true } },
    ]

    function verifyUserComponent(component, status: number, levelsAccess: string[] = [], notLevels: string[] = []) {
        if (getAuthenticate) {
            if (levelsAccess.length > 0 && levelsAccess.filter(level => level === getAuthenticate.level).length === 0) {
                return <Navigate to={URL_PANEL_HOME} />
            }
            if (notLevels.length > 0 && notLevels.filter(nl => nl === getAuthenticate.level).length > 0) {
                return <Navigate to={URL_PANEL_HOME} />
            }
        }
        if (status === 1) {
            return getAuthenticate ? component : <Navigate to={URL_SIGN_IN} />
        }
        if (status === 0) {
            return !getAuthenticate ? component : <Navigate to={URL_PANEL_HOME} />
        }
        return component
    }

    const routes: RouteObject[] = [
        {
            path: URL_MAIN,
            element: <LayoutMain titleHeaderValue={`APPMOVIE ${SYSTEM_API_VERSION}`} urlSignIn={URL_SIGN_IN} signOutCallback={() => actionSignOut()} cleanMsg={() => actionCleanMsgs()} msgAlert={msgAlertSelector} isLoading={isLoadingSelector}
                menusNavBar={menusNavBar.filter(menu => verifyUser(menu.checkUser, menu.checkLevels, menu.notLevels)).map(menu => menu.menu)}
                menusHeader={menusHeader.filter(menu => verifyUser(menu.checkUser, menu.checkLevels, menu.notLevels)).map(menu => menu.menu)} />,
            children: [
                { path: URL_MAIN, element: verifyUserComponent(<PageMain />, 0) },
                { path: URL_PANEL_HOME, element: verifyUserComponent(<PanelMain />, 1) },

                { path: URL_SIGN_UP, element: verifyUserComponent(<SignUp />, 0) },
                { path: URL_SIGN_IN, element: verifyUserComponent(<SignIn />, 0) },
                { path: URL_FORGOT_PASSWORD, element: verifyUserComponent(<ForgotPassword />, 0) },
                { path: `${URL_RECOVERY_PASSWORD}/:codeRecovery`, element: verifyUserComponent(<RecoveryPassword />, 0) },
                { path: URL_USER_PROFILE, element: verifyUserComponent(<UpdateUserProfile />, 1) },
                { path: URL_USER_PROFILE_PASSWORD, element: verifyUserComponent(<UpdateUserProfilePassword />, 1) },
                { path: URL_USERS, element: verifyUserComponent(<UserList />, 1, ['ADMIN']) },
                { path: URL_USER_NEW, element: verifyUserComponent(<UserNew />, 1, ['ADMIN']) },
                { path: `${URL_USERS}/:userId`, element: verifyUserComponent(<UserShow />, 1, ['ADMIN']) },
                { path: `${URL_USER_UPDATE_PASSWORD}/:userId`, element: verifyUserComponent(<UserEditPassword />, 1, ['ADMIN']) },

                { path: URL_ABOUT, element: verifyUserComponent(<AboutApp />, -1) },
                { path: URL_ABOUT_NEW, element: verifyUserComponent(<AboutAppNew />, 1, ['ADMIN']) },
                { path: URL_ABOUT_EDIT, element: verifyUserComponent(<AboutAppEdit />, 1, ['ADMIN']) },

                { path: URL_CATEGORIES, element: verifyUserComponent(<CategoryList />, 1, ['ADMIN']) },
                { path: URL_CATEGORY_NEW, element: verifyUserComponent(<CategoryNew />, 1, ['ADMIN']) },
                { path: `${URL_CATEGORY_EDIT}/:categoryId`, element: verifyUserComponent(<CategoryEdit />, 1, ['ADMIN']) },

                { path: URL_DIRECTORS, element: verifyUserComponent(<DirectorList />, 1, ['ADMIN']) },
                { path: URL_DIRECTOR_NEW, element: verifyUserComponent(<DirectorNew />, 1, ['ADMIN']) },
                { path: `${URL_DIRECTOR_EDIT}/:directorId`, element: verifyUserComponent(<DirectorEdit />, 1, ['ADMIN']) },

                { path: URL_ACTORS, element: verifyUserComponent(<ActorList />, 1, ['ADMIN']) },
                { path: URL_ACTOR_NEW, element: verifyUserComponent(<ActorNew />, 1, ['ADMIN']) },
                { path: `${URL_ACTOR_EDIT}/:actorId`, element: verifyUserComponent(<ActorEdit />, 1, ['ADMIN']) },

                { path: URL_COUNTRIES, element: verifyUserComponent(<CountryList />, 1, ['ADMIN']) },
                { path: URL_COUNTRY_NEW, element: verifyUserComponent(<CountryNew />, 1, ['ADMIN']) },
                { path: `${URL_COUNTRY_EDIT}/:countryId`, element: verifyUserComponent(<CountryEdit />, 1, ['ADMIN']) },

                { path: URL_STREAMS, element: verifyUserComponent(<StreamList />, 1, ['ADMIN']) },
                { path: URL_STREAM_NEW, element: verifyUserComponent(<StreamNew />, 1, ['ADMIN']) },
                { path: `${URL_STREAM_EDIT}/:streamId`, element: verifyUserComponent(<StreamEdit />, 1, ['ADMIN']) },

                { path: URL_MOVIES, element: verifyUserComponent(<MovieList />, 1) },
                { path: URL_MOVIE_NEW, element: verifyUserComponent(<MovieNew />, 1) },
                { path: `${URL_MOVIE_EDIT}/:movieId`, element: verifyUserComponent(<MovieEdit />, 1) },

                { path: URL_TV_SHOWS, element: verifyUserComponent(<TvShowList />, 1) },
                { path: URL_TV_SHOW_NEW, element: verifyUserComponent(<TvShowNew />, 1) },
                { path: `${URL_TV_SHOW_EDIT}/:tvShowId`, element: verifyUserComponent(<TvShowEdit />, 1) },

                { path: `${URL_TV_SHOW_SEASONS}/:tvShowId`, element: verifyUserComponent(<TvShowSeasonList />, 1) },
                { path: `${URL_TV_SHOW_SEASON_NEW}/:tvShowId`, element: verifyUserComponent(<TvShowSeasonNew />, 1) },
                { path: `${URL_TV_SHOW_SEASON_EDIT}/:tvShowSeasonId/:tvShowId`, element: verifyUserComponent(<TvShowSeasonEdit />, 1) },

                { path: `${URL_TV_SHOW_EPISODES}/:tvShowSeasonId/:tvShowId`, element: verifyUserComponent(<TvShowEpisodeList />, 1) },
                { path: `${URL_TV_SHOW_EPISODE_NEW}/:tvShowSeasonId/:tvShowId`, element: verifyUserComponent(<TvShowEpisodeNew />, 1) },
                { path: `${URL_TV_SHOW_EPISODE_EDIT}/:tvShowEpisodeId/:tvShowSeasonId/:tvShowId`, element: verifyUserComponent(<TvShowEpisodeEdit />, 1) },

                { path: URL_MY_MOVIES, element: verifyUserComponent(<MyMovieList />, 1) },
                { path: URL_MY_MOVIE_NEW, element: verifyUserComponent(<MyMovieNew />, 1) },

                { path: URL_MY_TV_SHOWS, element: verifyUserComponent(<MyTvShowList />, 1) },
                { path: URL_MY_TV_SHOW_NEW, element: verifyUserComponent(<MyTvShowNew />, 1) },

                { path: URL_UNDER_CONSTRUCTION, element: <UnderConstruction /> },
                { path: `${URL_FAIL_PAGE}/:typeFail`, element: <FailPage /> },
            ]
        }
    ]

    async function logoutSystem() {
        setShowLogout(false)
        dispatch(showLoadingMain(true, MSG_LOGOUT_SYSTEM_ACTION))
        dispatch(signOutUser())
    }

    function getDialogs() {
        return (<DialogYesOrNot showDialog={showLogout} onCloseDialog={() => setShowLogout(false)} clickDialogNot={() => setShowLogout(false)} titleDialog={MSG_LOGOUT_SYSTEM} clickDialogYes={() => logoutSystem()} />)
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <GlobalStyles />
            {getDialogs()}
            {useRoutes(routes)}
        </ThemeProvider>
    )
}

export default App

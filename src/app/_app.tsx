import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import LayoutMain from './components/LayoutMain'
import { HeaderMenu } from './components/Header'
import ICON_OBJECT_LIST from './components/IconList/ICON_OBJECT_LIST'
import GlobalStyles from './components/GlobalStyles'
import DialogYesOrNot from './components/Dialog/DialogYesOrNot'
import { getMsgAlert, isStatusLoading, isStatusScrollToTop } from './redux/UtlisAppRedux/utlisAppRedux.selector'
import { cleanMsgs, insertMsgs, setLoadingPattern } from './redux/UtlisAppRedux/utlisAppRedux.actions'
import { NavBarMenu } from './components/NavBar'
import {
    MSG_LOGOUT_SYSTEM, MSG_LOGOUT_SYSTEM_ACTION, SYSTEM_API_VERSION, URL_ABOUT_US, URL_ABOUT_US_EDIT, URL_ABOUT_US_NEW,
    URL_ACTORS, URL_ACTOR_EDIT, URL_ACTOR_NEW, URL_CATEGORIES, URL_CATEGORY_EDIT, URL_CATEGORY_NEW, URL_COUNTRIES, URL_COUNTRY_EDIT,
    URL_COUNTRY_NEW, URL_DIRECTORS, URL_DIRECTOR_EDIT, URL_DIRECTOR_NEW, URL_FAIL_PAGE, URL_FORGOT_PASSWORD, URL_MAIN, URL_MOVIES,
    URL_MOVIE_EDIT, URL_MOVIE_NEW, URL_MY_MOVIES, URL_MY_MOVIE_NEW, URL_MY_TV_SHOWS, URL_MY_TV_SHOW_NEW, URL_PANEL_HOME, URL_RECOVERY_PASSWORD,
    URL_SIGN_IN, URL_SIGN_UP, URL_STREAMS, URL_STREAM_EDIT, URL_STREAM_NEW, URL_TV_SHOWS, URL_TV_SHOW_EDIT, URL_TV_SHOW_EPISODES, URL_TV_SHOW_EPISODE_EDIT,
    URL_TV_SHOW_EPISODE_NEW, URL_TV_SHOW_NEW, URL_TV_SHOW_SEASONS, URL_TV_SHOW_SEASON_EDIT, URL_TV_SHOW_SEASON_NEW, URL_UNDER_CONSTRUCTION, URL_USERS,
    URL_USER_NEW, URL_USER_AUTH, URL_USER_AUTH_PASSWORD, URL_USER_UPDATE_PASSWORD, URL_USERS_TRASH
} from './core/consts'
import { getUserAccess } from './redux/User/user.selector'
import { updateTokenInUser, signOutUser } from './redux/User/user.actions'
import MainPage from '../pages/App/MainPage'
import PanelPage from '../pages/App/PanelPage'
import UnderConstructionPage from '../pages/App/UnderConstructionPage'
import FailPage from '../pages/App/FailPage'
import SignUpPage from '../pages/User/SignUpPage'
import SignInPage from '../pages/User/SignInPage'
import ForgotPasswordPage from '../pages/User/ForgotPasswordPage'
import RecoveryPasswordPage from '../pages/User/RecoveryPasswordPage'
import UpdateUserAuthPage from '../pages/User/UpdateUserAuthPage'
import UpdateUserAuthPasswordPage from '../pages/User/UpdateUserAuthPasswordPage'
import UserListPage from '../pages/User/UserListPage'
import UserListTrashPage from '../pages/User/UserListTrashPage'
import UserNewPage from '../pages/User/UserNewPage'
import UserShowPage from '../pages/User/UserShowPage'
import UpdateUserPasswordPage from '../pages/User/UpdateUserPasswordPage'
import AboutUsShowPage from '../pages/AboutUs/AboutUsShowPage'
import AboutUsNewPage from '../pages/AboutUs/AboutUsNewPage'
import AboutUsEditPage from '../pages/AboutUs/AboutUsEditPage'
import CategoryListPage from '../pages/Category/CategoryListPage'
import CategoryNewPage from '../pages/Category/CategoryNewPage'
import CategoryEditPage from '../pages/Category/CategoryEditPage'
import DirectorListPage from '../pages/Director/DirectorListPage'
import DirectorNewPage from '../pages/Director/DirectorNewPage'
import DirectorEditPage from '../pages/Director/DirectorEditPage'
import ActorListPage from '../pages/Actor/ActorListPage'
import ActorNewPage from '../pages/Actor/ActorNewPage'
import ActorEditPage from '../pages/Actor/ActorEditPage'
import CountryListPage from '../pages/Country/CountryListPage'
import CountryNewPage from '../pages/Country/CountryNewPage'
import CountryEditPage from '../pages/Country/CountryEditPage'
import StreamListPage from '../pages/Stream/StreamListPage'
import StreamNewPage from '../pages/Stream/StreamNewPage'
import StreamEditPage from '../pages/Stream/StreamEditPage'
import MovieListPage from '../pages/Movie/MovieListPage'
import MovieNewPage from '../pages/Movie/MovieNewPage'
import MovieEditPage from '../pages/Movie/MovieEditPage'
import MovieShowPage from '../pages/Movie/MovieShowPage'
import TvShowListPage from '../pages/TvShow/TvShowListPage'
import TvShowNewPage from '../pages/TvShow/TvShowNewPage'
import TvShowEditPage from '../pages/TvShow/TvShowEditPage'
import TvShowShowPage from '../pages/TvShow/TvShowShowPage'
import TvShowSeasonListPage from '../pages/TvShowSeason/TvShowSeasonListPage'
import TvShowSeasonNewPage from '../pages/TvShowSeason/TvShowSeasonNewPage'
import TvShowSeasonEditPage from '../pages/TvShowSeason/TvShowSeasonEditPage'
import TvShowEpisodeListPage from '../pages/TvShowEpisode/TvShowEpisodeListPage'
import TvShowEpisodeNewPage from '../pages/TvShowEpisode/TvShowEpisodeNewPage'
import TvShowEpisodeEditPage from '../pages/TvShowEpisode/TvShowEpisodeEditPage'
import MyMovieListPage from '../pages/MyMovie/MyMovieListPage'
import MyMovieNewPage from '../pages/MyMovie/MyMovieNewPage'
import MyTvShowListPage from '../pages/MyTvShow/MyTvShowListPage'
import MyTvShowNewPage from '../pages/MyTvShow/MyTvShowNewPage'

const mdTheme = createTheme({})

function App() {

    const dispatch = useDispatch()

    const [showLogout, setShowLogout] = React.useState(false)

    const getAuthenticate = useSelector(getUserAccess)
    const msgAlertSelector = useSelector(getMsgAlert)
    const isLoadingSelector = useSelector(isStatusLoading)
    const isScrollToTop = useSelector(isStatusScrollToTop)

    function actionCleanMsgs() {
        dispatch(cleanMsgs())
    }

    function actionSignOut() {
        dispatch(signOutUser())
    }

    React.useEffect(() => {
        dispatch(updateTokenInUser((errorsMsg) => dispatch(insertMsgs(errorsMsg, 'error'))))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const menusNavBar: { checkUser: number, checkLevels?: string[], notLevels?: string[], menu: NavBarMenu }[] = [
        { checkUser: 0, notLevels: ['ADMIN'], menu: { icon: ICON_OBJECT_LIST.HOME_ICON, title: "INÍCIO", isDesktop: true, isMobile: true, redirectUrl: URL_MAIN } },
        {
            checkUser: 1, menu: {
                icon: ICON_OBJECT_LIST.TABLET_MAC_ICON, title: "PAINEL", isDesktop: true, isMobile: true, redirectUrl: URL_PANEL_HOME
            }
        },
        {
            checkUser: 0, menu: {
                icon: ICON_OBJECT_LIST.ACCOUNT_CIRCLE_ICON, title: "AREA DE ACESSO", isDesktop: true, isMobile: false, redirectUrl: URL_SIGN_IN
            }
        },
        {
            checkUser: 1, checkLevels: ['ADMIN'], menu: {
                icon: ICON_OBJECT_LIST.GROUP_ICON, title: "USUÁRIOS", isDesktop: true, isMobile: true, redirectUrl: URL_USERS
            }
        },
        {
            checkUser: 1, checkLevels: ['ADMIN'], menu: {
                icon: ICON_OBJECT_LIST.LIST_ALT_ICON, title: "CATEGORIAS", isDesktop: true, isMobile: true, redirectUrl: URL_CATEGORIES
            }
        },
        {
            checkUser: 1, checkLevels: ['ADMIN'], menu: {
                icon: ICON_OBJECT_LIST.LIST_ALT_ICON, title: "DIRETORES", isDesktop: true, isMobile: true, redirectUrl: URL_DIRECTORS
            }
        },
        {
            checkUser: 1, checkLevels: ['ADMIN'], menu: {
                icon: ICON_OBJECT_LIST.LIST_ALT_ICON, title: "ATORES", isDesktop: true, isMobile: true, redirectUrl: URL_ACTORS
            }
        },
        {
            checkUser: 1, checkLevels: ['ADMIN'], menu: {
                icon: ICON_OBJECT_LIST.LIST_ALT_ICON, title: "PAÍSES", isDesktop: true, isMobile: true, redirectUrl: URL_COUNTRIES
            }
        },
        {
            checkUser: 1, checkLevels: ['ADMIN'], menu: {
                icon: ICON_OBJECT_LIST.LIST_ALT_ICON, title: "STREAMS", isDesktop: true, isMobile: true, redirectUrl: URL_STREAMS
            }
        },
        {
            checkUser: 1, menu: { icon: ICON_OBJECT_LIST.MOVIE_ICON, title: "FILMES", isDesktop: true, isMobile: true, redirectUrl: URL_MOVIES }
        },
        {
            checkUser: 1, menu: { icon: ICON_OBJECT_LIST.LIVE_TV_ICON, title: "SÉRIES", isDesktop: true, isMobile: true, redirectUrl: URL_TV_SHOWS }
        },
        {
            checkUser: 1, menu: { icon: ICON_OBJECT_LIST.MOVIE_ICON, title: "MEUS FILMES", isDesktop: true, isMobile: true, redirectUrl: URL_MY_MOVIES }
        },
        {
            checkUser: 1, menu: { icon: ICON_OBJECT_LIST.LIVE_TV_ICON, title: "MINHAS SÉRIES", isDesktop: true, isMobile: true, redirectUrl: URL_MY_TV_SHOWS }
        },
        {
            checkUser: -1, menu: { icon: ICON_OBJECT_LIST.INFO_ICON, title: "SOBRE NÓS", isDesktop: true, isMobile: true, redirectUrl: URL_ABOUT_US }
        },
    ]

    function verifyUser(checkUser: number, checkLevels: string[] = [], notLevels: string[] = []) {
        let statusSignIn = true
        if (checkUser === 0) {
            statusSignIn = !getAuthenticate
        } else if (checkUser === 1) {
            statusSignIn = getAuthenticate
        }
        if (statusSignIn && getAuthenticate) {
            if (checkLevels.length > 0 && notLevels.length > 0) {
                statusSignIn = (checkLevels.filter(cl => getAuthenticate.level === cl).length > 0
                    && notLevels.filter(nl => nl === getAuthenticate.level).length === 0)
            } else if (checkLevels.length > 0) {
                statusSignIn = checkLevels.filter(cl => getAuthenticate.level === cl).length > 0
            } else if (notLevels.length > 0) {
                statusSignIn = notLevels.filter(nl => nl === getAuthenticate.level).length === 0
            }
        }
        return statusSignIn
    }

    const menusHeader: { checkUser: number, checkLevels?: string[], notLevels?: string[], menu: HeaderMenu }[] = [
        { checkUser: 0, menu: { icon: ICON_OBJECT_LIST.ACCOUNT_CIRCLE_ICON, redirectUrl: URL_SIGN_IN, isDesktop: false, isMobile: true } },
        { checkUser: 1, menu: { icon: ICON_OBJECT_LIST.VPN_KEY_ICON, redirectUrl: URL_USER_AUTH_PASSWORD, isDesktop: true, isMobile: true } },
        { checkUser: 1, menu: { icon: ICON_OBJECT_LIST.ACCOUNT_CIRCLE_ICON, redirectUrl: URL_USER_AUTH, isDesktop: true, isMobile: true } },
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
            element: <LayoutMain titleHeaderValue={`APPMOVIE ${SYSTEM_API_VERSION}`} urlSignIn={URL_SIGN_IN}
                signOutCallback={() => actionSignOut()} cleanMsg={() => actionCleanMsgs()} msgAlert={msgAlertSelector}
                isLoading={isLoadingSelector} isScrollTop={isScrollToTop}
                menusNavBar={menusNavBar.filter(menu => verifyUser(menu.checkUser, menu.checkLevels, menu.notLevels)).map(menu => menu.menu)}
                menusHeader={menusHeader.filter(menu => verifyUser(menu.checkUser, menu.checkLevels, menu.notLevels)).map(menu => menu.menu)} />,
            children: [
                { path: URL_MAIN, element: verifyUserComponent(<MainPage />, 0) },
                { path: URL_PANEL_HOME, element: verifyUserComponent(<PanelPage />, 1) },

                { path: URL_SIGN_UP, element: verifyUserComponent(<SignUpPage />, 0) },
                { path: URL_SIGN_IN, element: verifyUserComponent(<SignInPage />, 0) },
                { path: URL_FORGOT_PASSWORD, element: verifyUserComponent(<ForgotPasswordPage />, 0) },
                { path: `${URL_RECOVERY_PASSWORD}/:codeRecovery`, element: verifyUserComponent(<RecoveryPasswordPage />, 0) },
                { path: URL_USER_AUTH, element: verifyUserComponent(<UpdateUserAuthPage />, 1) },
                { path: URL_USER_AUTH_PASSWORD, element: verifyUserComponent(<UpdateUserAuthPasswordPage />, 1) },
                { path: URL_USERS, element: verifyUserComponent(<UserListPage />, 1, ['ADMIN']) },
                { path: URL_USERS_TRASH, element: verifyUserComponent(<UserListTrashPage />, 1, ['ADMIN']) },
                { path: URL_USER_NEW, element: verifyUserComponent(<UserNewPage />, 1, ['ADMIN']) },
                { path: `${URL_USERS}/:userId`, element: verifyUserComponent(<UserShowPage />, 1, ['ADMIN']) },
                { path: `${URL_USER_UPDATE_PASSWORD}/:userId`, element: verifyUserComponent(<UpdateUserPasswordPage />, 1, ['ADMIN']) },

                { path: URL_ABOUT_US, element: verifyUserComponent(<AboutUsShowPage />, -1) },
                { path: URL_ABOUT_US_NEW, element: verifyUserComponent(<AboutUsNewPage />, 1, ['ADMIN']) },
                { path: URL_ABOUT_US_EDIT, element: verifyUserComponent(<AboutUsEditPage />, 1, ['ADMIN']) },

                { path: URL_CATEGORIES, element: verifyUserComponent(<CategoryListPage />, 1, ['ADMIN']) },
                { path: URL_CATEGORY_NEW, element: verifyUserComponent(<CategoryNewPage />, 1, ['ADMIN']) },
                { path: `${URL_CATEGORY_EDIT}/:categoryId`, element: verifyUserComponent(<CategoryEditPage />, 1, ['ADMIN']) },

                { path: URL_DIRECTORS, element: verifyUserComponent(<DirectorListPage />, 1, ['ADMIN']) },
                { path: URL_DIRECTOR_NEW, element: verifyUserComponent(<DirectorNewPage />, 1, ['ADMIN']) },
                { path: `${URL_DIRECTOR_EDIT}/:directorId`, element: verifyUserComponent(<DirectorEditPage />, 1, ['ADMIN']) },

                { path: URL_ACTORS, element: verifyUserComponent(<ActorListPage />, 1, ['ADMIN']) },
                { path: URL_ACTOR_NEW, element: verifyUserComponent(<ActorNewPage />, 1, ['ADMIN']) },
                { path: `${URL_ACTOR_EDIT}/:actorId`, element: verifyUserComponent(<ActorEditPage />, 1, ['ADMIN']) },

                { path: URL_COUNTRIES, element: verifyUserComponent(<CountryListPage />, 1, ['ADMIN']) },
                { path: URL_COUNTRY_NEW, element: verifyUserComponent(<CountryNewPage />, 1, ['ADMIN']) },
                { path: `${URL_COUNTRY_EDIT}/:countryId`, element: verifyUserComponent(<CountryEditPage />, 1, ['ADMIN']) },

                { path: URL_STREAMS, element: verifyUserComponent(<StreamListPage />, 1, ['ADMIN']) },
                { path: URL_STREAM_NEW, element: verifyUserComponent(<StreamNewPage />, 1, ['ADMIN']) },
                { path: `${URL_STREAM_EDIT}/:streamId`, element: verifyUserComponent(<StreamEditPage />, 1, ['ADMIN']) },

                { path: URL_MOVIES, element: verifyUserComponent(<MovieListPage />, 1) },
                { path: URL_MOVIE_NEW, element: verifyUserComponent(<MovieNewPage />, 1) },
                { path: `${URL_MOVIE_EDIT}/:movieId`, element: verifyUserComponent(<MovieEditPage />, 1) },
                { path: `${URL_MOVIES}/:movieId`, element: verifyUserComponent(<MovieShowPage />, 1) },

                { path: URL_TV_SHOWS, element: verifyUserComponent(<TvShowListPage />, 1) },
                { path: URL_TV_SHOW_NEW, element: verifyUserComponent(<TvShowNewPage />, 1) },
                { path: `${URL_TV_SHOW_EDIT}/:tvShowId`, element: verifyUserComponent(<TvShowEditPage />, 1) },
                { path: `${URL_TV_SHOWS}/:tvShowId`, element: verifyUserComponent(<TvShowShowPage />, 1) },

                { path: `${URL_TV_SHOW_SEASONS}/:tvShowId`, element: verifyUserComponent(<TvShowSeasonListPage />, 1) },
                { path: `${URL_TV_SHOW_SEASON_NEW}/:tvShowId`, element: verifyUserComponent(<TvShowSeasonNewPage />, 1) },
                { path: `${URL_TV_SHOW_SEASON_EDIT}/:tvShowSeasonId/:tvShowId`, element: verifyUserComponent(<TvShowSeasonEditPage />, 1) },

                { path: `${URL_TV_SHOW_EPISODES}/:tvShowSeasonId/:tvShowId`, element: verifyUserComponent(<TvShowEpisodeListPage />, 1) },
                { path: `${URL_TV_SHOW_EPISODE_NEW}/:tvShowSeasonId/:tvShowId`, element: verifyUserComponent(<TvShowEpisodeNewPage />, 1) },
                {
                    path: `${URL_TV_SHOW_EPISODE_EDIT}/:tvShowEpisodeId/:tvShowSeasonId/:tvShowId`,
                    element: verifyUserComponent(<TvShowEpisodeEditPage />, 1)
                },

                { path: URL_MY_MOVIES, element: verifyUserComponent(<MyMovieListPage />, 1) },
                { path: URL_MY_MOVIE_NEW, element: verifyUserComponent(<MyMovieNewPage />, 1) },

                { path: URL_MY_TV_SHOWS, element: verifyUserComponent(<MyTvShowListPage />, 1) },
                { path: URL_MY_TV_SHOW_NEW, element: verifyUserComponent(<MyTvShowNewPage />, 1) },

                { path: URL_UNDER_CONSTRUCTION, element: <UnderConstructionPage /> },
                { path: `${URL_FAIL_PAGE}/:typeFail`, element: <FailPage /> },
            ]
        }
    ]

    async function logoutSystem() {
        setShowLogout(false)
        dispatch(setLoadingPattern(true, MSG_LOGOUT_SYSTEM_ACTION))
        dispatch(signOutUser())
    }

    function getDialogs() {
        return (<DialogYesOrNot showDialog={showLogout} onCloseDialog={() => setShowLogout(false)}
            clickDialogNot={() => setShowLogout(false)} titleDialog={MSG_LOGOUT_SYSTEM}
            clickDialogYes={() => logoutSystem()} />)
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

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MSG_NEW_REGISTER_SUCCESS, MSG_REMOVE_REGISTER, MSG_REMOVE_REGISTER_SUCCESS, MSG_SAVED_DATA } from '../../../app/core/consts'
import { showLoading } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'
import { registerMyTvShow, registerNeverWatch } from '../../../app/redux/MyTvShow/myTvShow.actions'
import { getTvShowAllByNotMyTvShow } from '../../../app/redux/TvShow/tvshow.actions'
import { getTvShowsAll, getTvShowsAllFilter } from '../../../app/redux/TvShow/tvshow.selector'
import { getTvShowEpisodeAllByNotMyTvShow } from '../../../app/redux/TvShowEpisode/tvshowepisode.actions'
import { getTvShowEpisodesAllFilter } from '../../../app/redux/TvShowEpisode/tvshowepisode.selector'
import { getTvShowSeasonAllByNotMyTvShow } from '../../../app/redux/TvShowSeason/tvshowseason.actions'
import { getTvShowSeasonsAllFilter } from '../../../app/redux/TvShowSeason/tvshowseason.selector'
import { MyTvShowNewTvShowBySearch } from './actions'
import MyTvShowNewView from './view'

function MyTvShowNew() {

    const dispatch = useDispatch()

    const tvShows = useSelector(getTvShowsAllFilter)
    const tvShowsGeneral = useSelector(getTvShowsAll)
    const tvShowSeasons = useSelector(getTvShowSeasonsAllFilter)
    const tvShowEpisodes = useSelector(getTvShowEpisodesAllFilter)

    React.useEffect(() => {
        dispatch(showLoading(true))
        dispatch(getTvShowAllByNotMyTvShow(() => dispatch(showLoading(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function refreshListEpisode(seasonId: string, callbackSucess: () => void) {
        await dispatch(showLoading(true))
        await dispatch(getTvShowEpisodeAllByNotMyTvShow(seasonId, () => {
            dispatch(showLoading(false))
            callbackSucess()
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }))
    }

    async function refreshListSeason(tvShowId: string, callbackSucess: () => void) {
        if (typeof tvShowId !== "undefined" && tvShowId !== null) {
            await dispatch(showLoading(true))
            await dispatch(getTvShowSeasonAllByNotMyTvShow(tvShowId, () => {
                dispatch(showLoading(false))
                callbackSucess()
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoading(false))
            }))
        }
    }

    async function refreshListTvShow(searchText: string, callbackSucess: () => void) {
        await dispatch(showLoading(true))
        await dispatch(getTvShowAllByNotMyTvShow(() => dispatch(showLoading(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, searchText))
        callbackSucess()
    }

    async function insertMyTvShow(episodes: object[], seasonId: string, tvShowId: string) {
        await dispatch(showLoading(true, MSG_SAVED_DATA))
        await dispatch(registerMyTvShow(episodes, seasonId, tvShowId, () => {
            dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
            dispatch(showLoading(false))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }))
    }

    async function insertNeverWatch(tvShowIdValue: string, tvShowSeasonIdValue: string, tvShowEpisodeIdValue: string, typeValue: string) {
        await dispatch(showLoading(true, MSG_REMOVE_REGISTER))
        await dispatch(registerNeverWatch(tvShowIdValue, tvShowSeasonIdValue, tvShowEpisodeIdValue, typeValue, () => {
            dispatch(showLoading(false))
            dispatch(insertMsgs([MSG_REMOVE_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }))
    }

    return (
        <MyTvShowNewView tvShows={tvShows} seasons={tvShowSeasons} episodes={tvShowEpisodes}
            refreshListEpisode={(seasonId: string, callbackSucess: () => void) => refreshListEpisode(seasonId, callbackSucess)}
            refreshListSeason={(tvShowId: string, callbackSucess: () => void) => refreshListSeason(tvShowId, callbackSucess)}
            actionChangeSearchTvShow={(searchText: string) => dispatch(MyTvShowNewTvShowBySearch(searchText, tvShowsGeneral))}
            actionRefreshListTvShow={(searchText: string, callbackSucess: () => void) => refreshListTvShow(searchText, callbackSucess)}
            saveRegister={(episodes: object[], seasonId: string, tvShowId: string) => insertMyTvShow(episodes, seasonId, tvShowId)}
            removeRegister={(tvShowIdValue: string, tvShowSeasonIdValue: string, tvShowEpisodeIdValue: string, typeValue: string) => insertNeverWatch(tvShowIdValue, tvShowSeasonIdValue, tvShowEpisodeIdValue, typeValue)} />
    )
}

export default MyTvShowNew
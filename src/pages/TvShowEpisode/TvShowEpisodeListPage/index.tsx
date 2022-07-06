/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setLoadingPattern, insertMsgs, setLoadingTable } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import TvShowEpisodeListPageView from './view'
import {
    TvShowEpisodeListPageBySearch, TvShowEpisodeListPageDeleteBatch, TvShowEpisodeListPageDelete, TvShowEpisodeListPageApproved
} from './actions'
import { getTvShowSingle } from '../../../app/redux/TvShow/tvshow.selector'
import { openInTvShow } from '../../../app/redux/TvShow/tvshow.actions'
import { getTvShowEpisodesAll, getTvShowEpisodesAllFilter } from '../../../app/redux/TvShowEpisode/tvshowepisode.selector'
import { openAllInTvShowEpisode } from '../../../app/redux/TvShowEpisode/tvshowepisode.actions'
import { getTvShowSeasonSingle } from '../../../app/redux/TvShowSeason/tvshowseason.selector'
import { openInTvShowSeason } from '../../../app/redux/TvShowSeason/tvshowseason.actions'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function TvShowEpisodeListPage() {
    const dispatch = useDispatch()

    const getTvShow = useSelector(getTvShowSingle)
    const getTvShowSeason = useSelector(getTvShowSeasonSingle)
    const isLoading = useSelector(isStatusLoading)

    const episodes = useSelector(getTvShowEpisodesAllFilter)
    const episodesGeneral = useSelector(getTvShowEpisodesAll)

    const { tvShowSeasonId, tvShowId } = useParams()

    async function refreshList(searchText = "", callbackSuccess: (() => void) | null = null) {
        if (typeof tvShowSeasonId !== "undefined" && tvShowSeasonId !== null) {
            await dispatch(setLoadingTable(true))
            await dispatch(openAllInTvShowEpisode(tvShowSeasonId, () => {
                dispatch(setLoadingTable(false))
                if (callbackSuccess !== null)
                    callbackSuccess()
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingTable(false))
            }, searchText))
        }
    }

    React.useEffect(() => {
        if (typeof tvShowId !== "undefined" && tvShowId !== null) {
            dispatch(setLoadingPattern(true))
            dispatch(openInTvShow(tvShowId.toString(), () => dispatch(setLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }))
        }
        if (typeof tvShowSeasonId !== "undefined" && tvShowSeasonId !== null) {
            dispatch(setLoadingPattern(true))
            dispatch(openInTvShowSeason(tvShowSeasonId.toString(), () => dispatch(setLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }))
        }
        // eslint-disable-next-line
    }, [])

    React.useEffect(() => {
        refreshList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getTvShow])

    function updateGetListScroll(position) {
        return episodes.slice(0, position)
    }

    return (
        <TvShowEpisodeListPageView showLoading={isLoading} getTvShow={getTvShow} getListScroll={(positionScroll) =>
            updateGetListScroll(positionScroll)} getTvShowSeason={getTvShowSeason} episodes={episodes}
            actionRefreshList={(searchText: string, callbackSuccess: () => void) => refreshList(searchText, callbackSuccess)}
            actionChangeSearchText={(searchText: string, callbackSuccess: () => void) =>
                dispatch(TvShowEpisodeListPageBySearch(searchText, callbackSuccess, episodesGeneral))}
            actionDeleteRegister={(episodeId: string, searchText: string) =>
                dispatch(TvShowEpisodeListPageDelete(episodeId, ((typeof tvShowSeasonId !== "undefined")
                    ? tvShowSeasonId.toString() : ""), searchText))}
            actionApprovedRegister={(episodeId: string, searchText: string) =>
                dispatch(TvShowEpisodeListPageApproved(episodeId, ((typeof tvShowSeasonId !== "undefined")
                    ? tvShowSeasonId.toString() : ""), searchText))}
            actionDeleteBatch={(arrayDeleteBatch: any, dispatchEraseBatch: any, searchText: string) =>
                dispatch(TvShowEpisodeListPageDeleteBatch(((typeof tvShowSeasonId !== "undefined")
                    ? tvShowSeasonId.toString() : ""), arrayDeleteBatch, dispatchEraseBatch, searchText))} />
    )
}

export default TvShowEpisodeListPage
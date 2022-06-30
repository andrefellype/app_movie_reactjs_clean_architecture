/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { showLoadingPattern, insertMsgs, showLoadingTable } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import TvShowEpisodeListView from './view'
import { TvShowEpisodeListBySearch, TvShowEpisodeListDeleteBatch, TvShowEpisodeListDelete, TvShowEpisodeListApproved } from './actions'
import { getTvShowSingle } from '../../../app/redux/TvShow/tvshow.selector'
import { openTvShowById } from '../../../app/redux/TvShow/tvshow.actions'
import { getTvShowEpisodesAll, getTvShowEpisodesAllFilter } from '../../../app/redux/TvShowEpisode/tvshowepisode.selector'
import { getTvShowEpisodeAll } from '../../../app/redux/TvShowEpisode/tvshowepisode.actions'
import { getTvShowSeasonSingle } from '../../../app/redux/TvShowSeason/tvshowseason.selector'
import { openTvShowSeasonById } from '../../../app/redux/TvShowSeason/tvshowseason.actions'
import { showStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function TvShowEpisodeList() {

    const dispatch = useDispatch()

    const getTvShow = useSelector(getTvShowSingle)
    const getTvShowSeason = useSelector(getTvShowSeasonSingle)
    const isLoading = useSelector(showStatusLoading)

    const episodes = useSelector(getTvShowEpisodesAllFilter)
    const episodesGeneral = useSelector(getTvShowEpisodesAll)

    const { tvShowSeasonId, tvShowId } = useParams()

    async function refreshList(searchText = "") {
        if (typeof tvShowSeasonId !== "undefined" && tvShowSeasonId !== null) {
            await dispatch(showLoadingTable(true))
            await dispatch(getTvShowEpisodeAll(tvShowSeasonId, () => dispatch(showLoadingTable(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingTable(false))
            }, searchText))
        }
    }

    React.useEffect(() => {
        if (typeof tvShowId !== "undefined" && tvShowId !== null) {
            dispatch(showLoadingPattern(true))
            dispatch(openTvShowById(tvShowId.toString(), () => dispatch(showLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingPattern(false))
            }))
        }
        if (typeof tvShowSeasonId !== "undefined" && tvShowSeasonId !== null) {
            dispatch(showLoadingPattern(true))
            dispatch(openTvShowSeasonById(tvShowSeasonId.toString(), () => dispatch(showLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingPattern(false))
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
        <TvShowEpisodeListView showLoading={isLoading} getTvShow={getTvShow} getListScroll={(positionScroll) => updateGetListScroll(positionScroll)}
            getTvShowSeason={getTvShowSeason} episodes={episodes}
            actionRefreshList={(searchText: string) => refreshList(searchText)}
            actionChangeSearchText={(searchText: string) => dispatch(TvShowEpisodeListBySearch(searchText, episodesGeneral))}
            actionDeleteRegister={(episodeId: string, searchText: string) => dispatch(TvShowEpisodeListDelete(episodeId, ((typeof tvShowSeasonId !== "undefined") ? tvShowSeasonId.toString() : ""), searchText))}
            actionApprovedRegister={(episodeId: string, searchText: string) => dispatch(TvShowEpisodeListApproved(episodeId, ((typeof tvShowSeasonId !== "undefined") ? tvShowSeasonId.toString() : ""), searchText))}
            actionDeleteBatch={(arrayDeleteBatch: any, dispatchEraseBatch: any, searchText: string) => dispatch(TvShowEpisodeListDeleteBatch(((typeof tvShowSeasonId !== "undefined") ? tvShowSeasonId.toString() : ""), arrayDeleteBatch, dispatchEraseBatch, searchText))} />
    )
}

export default TvShowEpisodeList
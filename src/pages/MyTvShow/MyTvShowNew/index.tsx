import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MSG_NEW_REGISTER_SUCCESS, MSG_REMOVE_REGISTER, MSG_REMOVE_REGISTER_SUCCESS, MSG_SAVED_DATA } from '../../../app/core/consts'
import { showLoadingPattern, insertMsgs, showLoadingTable } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { registerMyTvShow, registerNeverWatch } from '../../../app/redux/MyTvShow/myTvShow.actions'
import { getDetailsTvShowAll, getTvShowAllByNotMyTvShow } from '../../../app/redux/TvShow/tvshow.actions'
import { getTvShowsAll, getTvShowsAllFilter } from '../../../app/redux/TvShow/tvshow.selector'
import { getTvShowEpisodeAllByNotMyTvShow } from '../../../app/redux/TvShowEpisode/tvshowepisode.actions'
import { getTvShowEpisodesAllFilter } from '../../../app/redux/TvShowEpisode/tvshowepisode.selector'
import { getTvShowSeasonAllByNotMyTvShow } from '../../../app/redux/TvShowSeason/tvshowseason.actions'
import { getTvShowSeasonsAllFilter } from '../../../app/redux/TvShowSeason/tvshowseason.selector'
import { MyTvShowNewTvShowBySearch } from './actions'
import MyTvShowNewView from './view'
import { showStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'
import GetListPaginate from '../../../app/components/Utils/GetListPaginate'

function MyTvShowNew() {

    const dispatch = useDispatch()

    const valueListPaginateTvShow = 6
    const valueListPaginateSeason = 6
    const valueListPaginateEpisode = 6

    const [refreshPageTvShow, setRefreshPageTvShow] = React.useState(false)
    const [positionPaginationTvShow, setPositionPaginationTvShow] = React.useState(1)
    const [positionPaginationSeason, setPositionPaginationSeason] = React.useState(1)
    const [positionPaginationEpisode, setPositionPaginationEpisode] = React.useState(1)
    const tvShows = useSelector(getTvShowsAllFilter)
    const tvShowsGeneral = useSelector(getTvShowsAll)
    const tvShowSeasons = useSelector(getTvShowSeasonsAllFilter)
    const tvShowEpisodes = useSelector(getTvShowEpisodesAllFilter)
    const isLoading = useSelector(showStatusLoading)

    React.useEffect(() => {
        dispatch(showLoadingTable(true))
        dispatch(getTvShowAllByNotMyTvShow(() => setRefreshPageTvShow(true), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingTable(false))
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        if (refreshPageTvShow) {
            if (GetListPaginate(tvShows, positionPaginationTvShow, valueListPaginateTvShow).length > 0) {
                if (!isLoading.statusTable)
                    dispatch(showLoadingTable(true))
                dispatch(getDetailsTvShowAll(tvShows, GetListPaginate(tvShows, positionPaginationTvShow, valueListPaginateTvShow),
                    () => {
                        setRefreshPageTvShow(false)
                        dispatch(showLoadingTable(false))
                    }, (errorsMsg) => {
                        dispatch(insertMsgs(errorsMsg, 'error'))
                        dispatch(showLoadingTable(false))
                    }))
            }
        }
        if (positionPaginationTvShow > 1) {
            if (GetListPaginate(tvShows, positionPaginationTvShow, valueListPaginateTvShow).length === 0) {
                setPositionPaginationTvShow((positionPaginationTvShow - 1))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tvShows, refreshPageTvShow])

    React.useEffect(() => {
        if (GetListPaginate(tvShows, positionPaginationTvShow, valueListPaginateTvShow).length > 0) {
            if (!isLoading.statusTable)
                dispatch(showLoadingTable(true))
            dispatch(getDetailsTvShowAll(tvShows, GetListPaginate(tvShows, positionPaginationTvShow, valueListPaginateTvShow),
                () => setRefreshPageTvShow(true), (errorsMsg) => {
                    dispatch(insertMsgs(errorsMsg, 'error'))
                    dispatch(showLoadingTable(false))
                }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [positionPaginationTvShow])

    function getCountPaginateTvShow() {
        if (tvShows) {
            let divid = (tvShows.length / valueListPaginateTvShow)
            if (!Number.isInteger(divid)) {
                divid = Math.floor(divid) + 1
            }
            return divid
        }
        return 0
    }

    React.useEffect(() => {
        if (positionPaginationSeason > 1) {
            if (GetListPaginate(tvShowSeasons, positionPaginationSeason, valueListPaginateSeason).length === 0) {
                setPositionPaginationSeason((positionPaginationSeason - 1))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tvShowSeasons])

    function getCountPaginateSeason() {
        if (tvShowSeasons) {
            let divid = (tvShowSeasons.length / valueListPaginateSeason)
            if (!Number.isInteger(divid)) {
                divid = Math.floor(divid) + 1
            }
            return divid
        }
        return 0
    }

    React.useEffect(() => {
        if (positionPaginationEpisode > 1) {
            if (GetListPaginate(tvShowEpisodes, positionPaginationEpisode, valueListPaginateEpisode).length === 0) {
                setPositionPaginationEpisode((positionPaginationEpisode - 1))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tvShowEpisodes])

    function getCountPaginateEpisode() {
        if (tvShowEpisodes) {
            let divid = (tvShowEpisodes.length / valueListPaginateEpisode)
            if (!Number.isInteger(divid)) {
                divid = Math.floor(divid) + 1
            }
            return divid
        }
        return 0
    }

    async function refreshListEpisode(seasonId: string) {
        await dispatch(showLoadingTable(true))
        await dispatch(getTvShowEpisodeAllByNotMyTvShow(seasonId, () => dispatch(showLoadingTable(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingTable(false))
        }))
    }

    async function refreshListSeason(tvShowId: string) {
        if (typeof tvShowId !== "undefined" && tvShowId !== null) {
            await dispatch(showLoadingTable(true))
            await dispatch(getTvShowSeasonAllByNotMyTvShow(tvShowId, () => dispatch(showLoadingTable(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingTable(false))
            }))
        }
    }

    async function refreshListTvShow(searchText: string) {
        await dispatch(showLoadingTable(true))
        await dispatch(getTvShowAllByNotMyTvShow(() => setRefreshPageTvShow(true), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingTable(false))
        }, searchText))
    }

    async function insertMyTvShow(episodes: object[], seasonId: string, tvShowId: string) {
        await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(registerMyTvShow(episodes, seasonId, tvShowId, () => {
            dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
            dispatch(showLoadingPattern(false))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }))
    }

    async function insertNeverWatch(tvShowIdValue: string, tvShowSeasonIdValue: string, tvShowEpisodeIdValue: string, typeValue: string) {
        await dispatch(showLoadingPattern(true, MSG_REMOVE_REGISTER))
        await dispatch(registerNeverWatch(tvShowIdValue, tvShowSeasonIdValue, tvShowEpisodeIdValue, typeValue, () => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs([MSG_REMOVE_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }))
    }

    return (
        <MyTvShowNewView tvShows={GetListPaginate(tvShows, positionPaginationTvShow, valueListPaginateTvShow)}
            seasons={GetListPaginate(tvShowSeasons, positionPaginationSeason, valueListPaginateSeason)}
            episodes={GetListPaginate(tvShowEpisodes, positionPaginationEpisode, valueListPaginateEpisode)}
            showLoading={isLoading} positionPageTvShow={positionPaginationTvShow} countTvShow={getCountPaginateTvShow()}
            changePaginationTvShow={(value: number) => setPositionPaginationTvShow(value)}
            positionPageSeason={positionPaginationSeason} countSeason={getCountPaginateSeason()}
            changePaginationSeason={(value: number) => setPositionPaginationSeason(value)}
            positionPageEpisode={positionPaginationEpisode} countEpisode={getCountPaginateEpisode()}
            changePaginationEpisode={(value: number) => setPositionPaginationEpisode(value)}
            refreshListEpisode={(seasonId: string) => refreshListEpisode(seasonId)}
            refreshListSeason={(tvShowId: string) => refreshListSeason(tvShowId)}
            actionChangeSearchTvShow={(searchText: string) => dispatch(MyTvShowNewTvShowBySearch(searchText, () => setRefreshPageTvShow(true), tvShowsGeneral))}
            actionRefreshListTvShow={(searchText: string) => refreshListTvShow(searchText)}
            saveRegister={(episodes: object[], seasonId: string, tvShowId: string) => insertMyTvShow(episodes, seasonId, tvShowId)}
            removeRegister={(tvShowIdValue: string, tvShowSeasonIdValue: string, tvShowEpisodeIdValue: string, typeValue: string) => insertNeverWatch(tvShowIdValue, tvShowSeasonIdValue, tvShowEpisodeIdValue, typeValue)} />
    )
}

export default MyTvShowNew
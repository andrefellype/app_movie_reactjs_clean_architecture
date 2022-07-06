import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    MSG_NEW_REGISTER_SUCCESS, MSG_REMOVE_REGISTER, MSG_REMOVE_REGISTER_SUCCESS, MSG_SAVED_DATA
} from '../../../app/core/consts'
import { setLoadingPattern, insertMsgs, setLoadingTable } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { registerMyTvShow } from '../../../app/redux/MyTvShow/myTvShow.actions'
import { openAllDetailInTvShow, openAllNoMyTvShowInTvShow } from '../../../app/redux/TvShow/tvshow.actions'
import { getTvShowsAll, getTvShowsAllFilter } from '../../../app/redux/TvShow/tvshow.selector'
import { openAllNoMyTvShowInTvShowEpisode } from '../../../app/redux/TvShowEpisode/tvshowepisode.actions'
import { getTvShowEpisodesAllFilter } from '../../../app/redux/TvShowEpisode/tvshowepisode.selector'
import { openAllNoMyTvShowInTvShowSeason } from '../../../app/redux/TvShowSeason/tvshowseason.actions'
import { getTvShowSeasonsAllFilter } from '../../../app/redux/TvShowSeason/tvshowseason.selector'
import { MyTvShowNewPageTvShowBySearch } from './actions'
import MyTvShowNewPageView from './view'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'
import GetListPaginate from '../../../app/components/Utils/GetListPaginate'
import { createInMyTvShowNeverWatchEpisode } from '../../../app/redux/MyTvShowEpisodeNeverWatch/myTvShowEpisodeNeverWatch.actions'
import { createInMyTvShowNeverWatchSeason } from '../../../app/redux/MyTvShowSeasonNeverWatch/myTvShowSeasonNeverWatch.actions'
import { createInMyTvShowNeverWatch } from '../../../app/redux/MyTvShowNeverWatch/myTvShowNeverWatch.actions'

function MyTvShowNewPage() {
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
    const isLoading = useSelector(isStatusLoading)

    React.useEffect(() => {
        dispatch(setLoadingTable(true))
        dispatch(openAllNoMyTvShowInTvShow(() => setRefreshPageTvShow(true), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingTable(false))
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        if (refreshPageTvShow) {
            if (GetListPaginate(tvShows, positionPaginationTvShow, valueListPaginateTvShow).length > 0) {
                dispatch(openAllDetailInTvShow(tvShows, GetListPaginate(tvShows, positionPaginationTvShow, valueListPaginateTvShow),
                    () => {
                        setRefreshPageTvShow(false)
                        dispatch(setLoadingTable(false))
                    }, (errorsMsg) => {
                        dispatch(insertMsgs(errorsMsg, 'error'))
                        dispatch(setLoadingTable(false))
                    }))
            } else {
                if (isLoading.statusTable) {
                    setRefreshPageTvShow(false)
                    dispatch(setLoadingTable(false))
                }
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
                dispatch(setLoadingTable(true))
            dispatch(openAllDetailInTvShow(tvShows, GetListPaginate(tvShows, positionPaginationTvShow, valueListPaginateTvShow),
                () => setRefreshPageTvShow(true), (errorsMsg) => {
                    dispatch(insertMsgs(errorsMsg, 'error'))
                    dispatch(setLoadingTable(false))
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
        await dispatch(setLoadingTable(true))
        await dispatch(openAllNoMyTvShowInTvShowEpisode(seasonId, () => dispatch(setLoadingTable(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingTable(false))
        }))
    }

    async function refreshListSeason(tvShowId: string) {
        if (typeof tvShowId !== "undefined" && tvShowId !== null) {
            await dispatch(setLoadingTable(true))
            await dispatch(openAllNoMyTvShowInTvShowSeason(tvShowId, () => dispatch(setLoadingTable(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingTable(false))
            }))
        }
    }

    async function refreshListTvShow(searchText: string) {
        await dispatch(setLoadingTable(true))
        await dispatch(openAllNoMyTvShowInTvShow(() => setRefreshPageTvShow(true), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingTable(false))
        }, searchText))
    }

    async function insertMyTvShowEpisode(episodes: object[], seasonId: string, tvShowId: string) {
        await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(registerMyTvShow(episodes, seasonId, tvShowId, () => {
            dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
            dispatch(setLoadingPattern(false))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }

    async function insertNeverWatchTvShow(tvShowIdValue: string) {
        await dispatch(setLoadingPattern(true, MSG_REMOVE_REGISTER))
        await dispatch(createInMyTvShowNeverWatch(tvShowIdValue, () => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs([MSG_REMOVE_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }

    async function insertNeverWatchSeason(tvShowIdValue: string, tvShowSeasonIdValue: string) {
        await dispatch(setLoadingPattern(true, MSG_REMOVE_REGISTER))
        await dispatch(createInMyTvShowNeverWatchSeason(tvShowIdValue, tvShowSeasonIdValue, () => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs([MSG_REMOVE_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }

    async function insertNeverWatchEpisode(tvShowIdValue: string, tvShowSeasonIdValue: string, tvShowEpisodeIdValue: string) {
        await dispatch(setLoadingPattern(true, MSG_REMOVE_REGISTER))
        await dispatch(createInMyTvShowNeverWatchEpisode(tvShowIdValue, tvShowSeasonIdValue, tvShowEpisodeIdValue, () => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs([MSG_REMOVE_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }

    return (
        <MyTvShowNewPageView tvShows={GetListPaginate(tvShows, positionPaginationTvShow, valueListPaginateTvShow)}
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
            actionChangeSearchTvShow={(searchText: string) =>
                dispatch(MyTvShowNewPageTvShowBySearch(searchText, () => setRefreshPageTvShow(true), tvShowsGeneral))}
            actionRefreshListTvShow={(searchText: string) => refreshListTvShow(searchText)}
            saveRegister={(episodes: object[], seasonId: string, tvShowId: string) => insertMyTvShowEpisode(episodes, seasonId, tvShowId)}
            removeRegisterTvShow={(tvShowIdValue: string) => insertNeverWatchTvShow(tvShowIdValue)}
            removeSeasonRegister={(tvShowIdValue: string, tvShowSeasonIdValue: string) =>
                insertNeverWatchSeason(tvShowIdValue, tvShowSeasonIdValue)}
            removeEpisodeRegister={(tvShowIdValue: string, tvShowSeasonIdValue: string, tvShowEpisodeIdValue: string) =>
                insertNeverWatchEpisode(tvShowIdValue, tvShowSeasonIdValue, tvShowEpisodeIdValue)} />
    )
}

export default MyTvShowNewPage
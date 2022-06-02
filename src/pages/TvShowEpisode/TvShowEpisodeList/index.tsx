/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { showLoadingMain } from '../../../app/redux/LoadingMain/loadingMain.actions'
import TvShowEpisodeListView from './view'
import { TvShowEpisodeListBySearch, TvShowEpisodeListDeleteBatch, TvShowEpisodeListDelete, TvShowEpisodeListApproved } from './actions'
import { getTvShowSingle } from '../../../app/redux/TvShow/tvshow.selector'
import { openTvShowById } from '../../../app/redux/TvShow/tvshow.actions'
import { getTvShowEpisodesAll, getTvShowEpisodesAllFilter } from '../../../app/redux/TvShowEpisode/tvshowepisode.selector'
import { getTvShowEpisodeAll } from '../../../app/redux/TvShowEpisode/tvshowepisode.actions'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'
import GetListPaginate from '../../../app/components/Utils/GetListPaginate'
import { getTvShowSeasonSingle } from '../../../app/redux/TvShowSeason/tvshowseason.selector'
import { openTvShowSeasonById } from '../../../app/redux/TvShowSeason/tvshowseason.actions'

function TvShowEpisodeList() {

    const dispatch = useDispatch()

    const valueListPaginate = 6
    const [positionPagination, setPositionPagination] = React.useState(1)
    const getTvShow = useSelector(getTvShowSingle)
    const getTvShowSeason = useSelector(getTvShowSeasonSingle)

    const episodes = useSelector(getTvShowEpisodesAllFilter)
    const episodesGeneral = useSelector(getTvShowEpisodesAll)

    const { tvShowSeasonId, tvShowId } = useParams()

    async function refreshList(searchText = "") {
        if (typeof tvShowSeasonId !== "undefined" && tvShowSeasonId !== null) {
            await dispatch(showLoadingMain(true))
            await dispatch(getTvShowEpisodeAll(tvShowSeasonId, () => dispatch(showLoadingMain(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingMain(false))
            }, searchText))
        }
    }

    React.useEffect(() => {
        if (positionPagination > 1) {
            if (GetListPaginate(episodes, positionPagination, valueListPaginate).length === 0) {
                setPositionPagination((positionPagination - 1))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [episodes])

    function getCountPaginate() {
        if (episodes) {
            let divid = (episodes.length / valueListPaginate)
            if (!Number.isInteger(divid)) {
                divid = Math.floor(divid) + 1
            }
            return divid
        }
        return 0
    }

    React.useEffect(() => {
        if (typeof tvShowId !== "undefined" && tvShowId !== null) {
            dispatch(showLoadingMain(true))
            dispatch(openTvShowById(tvShowId.toString(), () => dispatch(showLoadingMain(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingMain(false))
            }))
        }
        if (typeof tvShowSeasonId !== "undefined" && tvShowSeasonId !== null) {
            dispatch(showLoadingMain(true))
            dispatch(openTvShowSeasonById(tvShowSeasonId.toString(), () => dispatch(showLoadingMain(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingMain(false))
            }))
        }
        // eslint-disable-next-line
    }, [])

    React.useEffect(() => {
        refreshList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getTvShow])

    return (
        <TvShowEpisodeListView episodesBatch={episodes ? episodes.filter(row => row.enabledEdit) : []} positionPage={positionPagination} getTvShow={getTvShow}
            getTvShowSeason={getTvShowSeason} episodes={GetListPaginate(episodes, positionPagination, valueListPaginate)} countEpisode={getCountPaginate()}
            changePagination={(value: number) => setPositionPagination(value)}
            actionRefreshList={(searchText: string) => refreshList(searchText)}
            actionChangeSearchText={(searchText: string) => dispatch(TvShowEpisodeListBySearch(searchText, episodesGeneral))}
            actionDeleteRegister={(episodeId: string, searchText: string) => dispatch(TvShowEpisodeListDelete(episodeId, ((typeof tvShowSeasonId !== "undefined") ? tvShowSeasonId.toString() : ""), searchText))}
            actionApprovedRegister={(episodeId: string, searchText: string) => dispatch(TvShowEpisodeListApproved(episodeId, ((typeof tvShowSeasonId !== "undefined") ? tvShowSeasonId.toString() : ""), searchText))}
            actionDeleteBatch={(arrayDeleteBatch: any, dispatchEraseBatch: any, searchText: string) => dispatch(TvShowEpisodeListDeleteBatch(((typeof tvShowSeasonId !== "undefined") ? tvShowSeasonId.toString() : ""), arrayDeleteBatch, dispatchEraseBatch, searchText))} />
    )
}

export default TvShowEpisodeList
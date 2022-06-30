/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { showLoadingPattern, insertMsgs, showLoadingTable } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import TvShowSeasonListView from './view'
import { TvShowSeasonListBySearch, TvShowSeasonListDeleteBatch, TvShowSeasonListDelete, TvShowSeasonListApproved } from './actions'
import { getTvShowSingle } from '../../../app/redux/TvShow/tvshow.selector'
import { openTvShowById } from '../../../app/redux/TvShow/tvshow.actions'
import { getTvShowSeasonsAll, getTvShowSeasonsAllFilter } from '../../../app/redux/TvShowSeason/tvshowseason.selector'
import { getTvShowSeasonAll } from '../../../app/redux/TvShowSeason/tvshowseason.actions'
import { showStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function TvShowSeasonList() {

    const dispatch = useDispatch()

    const getTvShow = useSelector(getTvShowSingle)
    const isLoading = useSelector(showStatusLoading)

    const seasons = useSelector(getTvShowSeasonsAllFilter)
    const seasonsGeneral = useSelector(getTvShowSeasonsAll)

    const { tvShowId } = useParams()

    async function refreshList(searchText = "") {
        if (typeof tvShowId !== "undefined" && tvShowId !== null) {
            await dispatch(showLoadingTable(true))
            await dispatch(getTvShowSeasonAll(tvShowId, () => dispatch(showLoadingTable(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingTable(false))
            }, searchText))
        }
    }

    React.useEffect(() => {
        if (typeof tvShowId !== "undefined" && tvShowId !== null) {
            dispatch(openTvShowById(tvShowId.toString(), () => dispatch(showLoadingPattern(false)), (errorsMsg) => {
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
        return seasons.slice(0, position)
    }

    return (
        <TvShowSeasonListView showLoading={isLoading} getListScroll={(positionScroll) => updateGetListScroll(positionScroll)} getTvShow={getTvShow}
            seasons={seasons} actionRefreshList={(searchText: string) => refreshList(searchText)}
            actionChangeSearchText={(searchText: string) => dispatch(TvShowSeasonListBySearch(searchText, seasonsGeneral))}
            actionDeleteRegister={(seasonId: string, searchText: string) => dispatch(TvShowSeasonListDelete(seasonId, ((typeof tvShowId !== "undefined") ? tvShowId.toString() : ""), searchText))}
            actionApprovedRegister={(seasonId: string, searchText: string) => dispatch(TvShowSeasonListApproved(seasonId, ((typeof tvShowId !== "undefined") ? tvShowId.toString() : ""), searchText))}
            actionDeleteBatch={(arrayDeleteBatch: any, dispatchEraseBatch: any, searchText: string) => dispatch(TvShowSeasonListDeleteBatch(((typeof tvShowId !== "undefined") ? tvShowId.toString() : ""), arrayDeleteBatch, dispatchEraseBatch, searchText))} />
    )
}

export default TvShowSeasonList
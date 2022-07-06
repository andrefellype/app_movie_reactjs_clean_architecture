/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setLoadingPattern, insertMsgs, setLoadingTable } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import TvShowSeasonListPageView from './view'
import { TvShowSeasonListPageBySearch, TvShowSeasonListPageDeleteBatch, TvShowSeasonListPageDelete, TvShowSeasonListPageApproved } from './actions'
import { getTvShowSingle } from '../../../app/redux/TvShow/tvshow.selector'
import { openInTvShow } from '../../../app/redux/TvShow/tvshow.actions'
import { getTvShowSeasonsAll, getTvShowSeasonsAllFilter } from '../../../app/redux/TvShowSeason/tvshowseason.selector'
import { openAllInTvShowSeason } from '../../../app/redux/TvShowSeason/tvshowseason.actions'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function TvShowSeasonListPage() {
    const dispatch = useDispatch()

    const getTvShow = useSelector(getTvShowSingle)
    const isLoading = useSelector(isStatusLoading)

    const seasons = useSelector(getTvShowSeasonsAllFilter)
    const seasonsGeneral = useSelector(getTvShowSeasonsAll)

    const { tvShowId } = useParams()

    async function refreshList(searchText = "", callbackSuccess: (() => void) | null = null) {
        if (typeof tvShowId !== "undefined" && tvShowId !== null) {
            await dispatch(setLoadingTable(true))
            await dispatch(openAllInTvShowSeason(tvShowId, () => {
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
            dispatch(openInTvShow(tvShowId.toString(), () => dispatch(setLoadingPattern(false)), (errorsMsg) => {
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
        return seasons.slice(0, position)
    }

    return (
        <TvShowSeasonListPageView showLoading={isLoading} getListScroll={(positionScroll) => updateGetListScroll(positionScroll)}
            getTvShow={getTvShow} seasons={seasons}
            actionRefreshList={(searchText: string, callbackSuccess: () => void) => refreshList(searchText, callbackSuccess)}
            actionChangeSearchText={(searchText: string, callbackSuccess: () => void) =>
                dispatch(TvShowSeasonListPageBySearch(searchText, callbackSuccess, seasonsGeneral))}
            actionDeleteRegister={(seasonId: string, searchText: string) => dispatch(TvShowSeasonListPageDelete(seasonId,
                ((typeof tvShowId !== "undefined") ? tvShowId.toString() : ""), searchText))}
            actionApprovedRegister={(seasonId: string, searchText: string) => dispatch(TvShowSeasonListPageApproved(seasonId,
                ((typeof tvShowId !== "undefined") ? tvShowId.toString() : ""), searchText))}
            actionDeleteBatch={(arrayDeleteBatch: any, dispatchEraseBatch: any, searchText: string) =>
                dispatch(TvShowSeasonListPageDeleteBatch(((typeof tvShowId !== "undefined") ? tvShowId.toString() : ""),
                    arrayDeleteBatch, dispatchEraseBatch, searchText))} />
    )
}

export default TvShowSeasonListPage
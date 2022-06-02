/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { showLoadingMain } from '../../../app/redux/LoadingMain/loadingMain.actions'
import TvShowSeasonListView from './view'
import { TvShowSeasonListBySearch, TvShowSeasonListDeleteBatch, TvShowSeasonListDelete, TvShowSeasonListApproved } from './actions'
import { getTvShowSingle } from '../../../app/redux/TvShow/tvshow.selector'
import { openTvShowById } from '../../../app/redux/TvShow/tvshow.actions'
import { getTvShowSeasonsAll, getTvShowSeasonsAllFilter } from '../../../app/redux/TvShowSeason/tvshowseason.selector'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'
import GetListPaginate from '../../../app/components/Utils/GetListPaginate'
import { getTvShowSeasonAll } from '../../../app/redux/TvShowSeason/tvshowseason.actions'

function TvShowSeasonList() {

    const dispatch = useDispatch()

    const getTvShow = useSelector(getTvShowSingle)

    const valueListPaginate = 6
    const [positionPagination, setPositionPagination] = React.useState(1)
    const seasons = useSelector(getTvShowSeasonsAllFilter)
    const seasonsGeneral = useSelector(getTvShowSeasonsAll)

    const { tvShowId } = useParams()

    async function refreshList(searchText = "") {
        if (typeof tvShowId !== "undefined" && tvShowId !== null) {
            await dispatch(showLoadingMain(true))
            await dispatch(getTvShowSeasonAll(tvShowId, () => dispatch(showLoadingMain(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingMain(false))
            }, searchText))
        }
    }

    React.useEffect(() => {
        if (typeof tvShowId !== "undefined" && tvShowId !== null) {
            dispatch(openTvShowById(tvShowId.toString(), () => dispatch(showLoadingMain(false)), (errorsMsg) => {
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

    React.useEffect(() => {
        if (positionPagination > 1) {
            if (GetListPaginate(seasons, positionPagination, valueListPaginate).length === 0) {
                setPositionPagination((positionPagination - 1))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seasons])

    function getCountPaginate() {
        if (seasons) {
            let divid = (seasons.length / valueListPaginate)
            if (!Number.isInteger(divid)) {
                divid = Math.floor(divid) + 1
            }
            return divid
        }
        return 0
    }

    return (
        <TvShowSeasonListView getTvShow={getTvShow} positionPage={positionPagination}
            seasonsBatch={seasons ? seasons.filter(row => row.enabledEdit) : []} seasons={GetListPaginate(seasons, positionPagination, valueListPaginate)} countSeason={getCountPaginate()}
            changePagination={(value: number) => setPositionPagination(value)}
            actionRefreshList={(searchText: string) => refreshList(searchText)}
            actionChangeSearchText={(searchText: string) => dispatch(TvShowSeasonListBySearch(searchText, seasonsGeneral))}
            actionDeleteRegister={(seasonId: string, searchText: string) => dispatch(TvShowSeasonListDelete(seasonId, ((typeof tvShowId !== "undefined") ? tvShowId.toString() : ""), searchText))}
            actionApprovedRegister={(seasonId: string, searchText: string) => dispatch(TvShowSeasonListApproved(seasonId, ((typeof tvShowId !== "undefined") ? tvShowId.toString() : ""), searchText))}
            actionDeleteBatch={(arrayDeleteBatch: any, dispatchEraseBatch: any, searchText: string) => dispatch(TvShowSeasonListDeleteBatch(((typeof tvShowId !== "undefined") ? tvShowId.toString() : ""), arrayDeleteBatch, dispatchEraseBatch, searchText))} />
    )
}

export default TvShowSeasonList
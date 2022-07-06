import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import TvShowShowPageView from './view'
import { getTvShowSingle } from '../../../app/redux/TvShow/tvshow.selector'
import { openInTvShow } from '../../../app/redux/TvShow/tvshow.actions'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function TvShowShowPage() {
    const dispatch = useDispatch()

    const getTvShow = useSelector(getTvShowSingle)
    const getLoading = useSelector(isStatusLoading)

    const { tvShowId } = useParams()

    React.useEffect(() => {
        if (typeof tvShowId !== "undefined" && tvShowId !== null) {
            dispatch(setLoadingPattern(true))
            dispatch(openInTvShow(tvShowId.toString(), () => dispatch(setLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    function getIsLoading() {
        if (typeof getLoading !== "undefined" && typeof getLoading.statusPattern !== "undefined") {
            return getLoading.statusPattern
        }
        return false
    }

    return (
        <TvShowShowPageView getTvShow={getTvShow} isLoading={getIsLoading()} />
    )
}

export default TvShowShowPage
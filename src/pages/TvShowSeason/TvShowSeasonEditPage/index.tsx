/* eslint-disable no-underscore-dangle */
import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import TvShowSeasonEditPageView from './view'
import { openInTvShow } from '../../../app/redux/TvShow/tvshow.actions'
import { openInTvShowSeason, updateByIdInTvShowSeason } from '../../../app/redux/TvShowSeason/tvshowseason.actions'
import { getTvShowSingle } from '../../../app/redux/TvShow/tvshow.selector'
import { getTvShowSeasonSingle } from '../../../app/redux/TvShowSeason/tvshowseason.selector'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function TvShowSeasonEditPage() {
    const dispatch = useDispatch()

    const getTvShow = useSelector(getTvShowSingle)
    const getTvShowSeason = useSelector(getTvShowSeasonSingle)
    const getLoading = useSelector(isStatusLoading)

    const { tvShowId, tvShowSeasonId } = useParams()

    React.useEffect(() => {
        if (typeof tvShowId !== "undefined" && tvShowId !== null) {
            dispatch(setLoadingPattern(true))
            dispatch(openInTvShow(tvShowId.toString(), null, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }))
        }
        // eslint-disable-next-line
    }, [])

    async function refreshOpen() {
        if (typeof tvShowSeasonId !== "undefined" && tvShowSeasonId !== null
            && (getTvShowSeason === null || typeof getTvShowSeason === "undefined" || getTvShowSeason?._id !== tvShowSeasonId)) {
            if (!getLoading.statusTable)
                await dispatch(setLoadingPattern(true))
            await dispatch(openInTvShowSeason(tvShowSeasonId, () => dispatch(setLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }))
        } else if (typeof tvShowSeasonId !== "undefined" && tvShowSeasonId !== null && getTvShowSeason === null
            || typeof getTvShowSeason === "undefined" || getTvShowSeason?._id === tvShowSeasonId) {
            dispatch(setLoadingPattern(false))
        }
    }

    React.useEffect(() => {
        refreshOpen()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getTvShow])

    async function updateRegister(nameField: string) {
        if (typeof tvShowId !== "undefined" && tvShowId !== null && typeof tvShowSeasonId !== "undefined" && tvShowSeasonId !== null) {
            await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
            await dispatch(updateByIdInTvShowSeason(tvShowSeasonId.toString(), nameField, tvShowId.toString(), () => {
                dispatch(setLoadingPattern(false))
                dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success", null, "reload_page"))
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }))
        }
    }

    function getIsLoading() {
        if (typeof getLoading !== "undefined" && typeof getLoading.statusPattern !== "undefined") {
            return getLoading.statusPattern
        }
        return false
    }

    return (
        <TvShowSeasonEditPageView isLoading={getIsLoading()} getTvShow={getTvShow} getSeason={getTvShowSeason}
            update={(nameField: string) => updateRegister(nameField)} />
    )
}

export default TvShowSeasonEditPage
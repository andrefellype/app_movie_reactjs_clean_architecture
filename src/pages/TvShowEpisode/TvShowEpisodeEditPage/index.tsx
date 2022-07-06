/* eslint-disable no-underscore-dangle */
import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import TvShowSeasonEditView from './view'
import { openInTvShow } from '../../../app/redux/TvShow/tvshow.actions'
import { getTvShowSingle } from '../../../app/redux/TvShow/tvshow.selector'
import { openInTvShowEpisode, updateByIdInTvShowEpisode } from '../../../app/redux/TvShowEpisode/tvshowepisode.actions'
import { getTvShowSeasonSingle } from '../../../app/redux/TvShowSeason/tvshowseason.selector'
import { getTvShowEpisodeSingle } from '../../../app/redux/TvShowEpisode/tvshowepisode.selector'
import { openInTvShowSeason } from '../../../app/redux/TvShowSeason/tvshowseason.actions'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function TvShowEpisodeEditPage() {
    const dispatch = useDispatch()

    const getTvShow = useSelector(getTvShowSingle)
    const getTvShowSeason = useSelector(getTvShowSeasonSingle)
    const getTvShowEpisode = useSelector(getTvShowEpisodeSingle)
    const getLoading = useSelector(isStatusLoading)

    const { tvShowEpisodeId, tvShowId, tvShowSeasonId } = useParams()

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

    async function refreshOpenSeason() {
        if (typeof tvShowSeasonId !== "undefined" && tvShowSeasonId !== null
            && (getTvShowSeason === null || typeof getTvShowSeason === "undefined" || getTvShowSeason?._id !== tvShowId)) {
            await dispatch(openInTvShowSeason(tvShowSeasonId, null, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }))
        }
    }

    React.useEffect(() => {
        refreshOpenSeason()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getTvShow])

    async function refreshOpenEpisode() {
        if (typeof tvShowEpisodeId !== "undefined" && tvShowEpisodeId !== null
            && (getTvShowEpisode === null || typeof getTvShowEpisode === "undefined" || getTvShowEpisode?._id !== tvShowEpisodeId)) {
            if (!getLoading.statusTable)
                await dispatch(setLoadingPattern(true))
            await dispatch(openInTvShowEpisode(tvShowEpisodeId, () => dispatch(setLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }))
        } else if (typeof tvShowEpisodeId !== "undefined" && tvShowEpisodeId !== null && getTvShowEpisode === null
            || typeof getTvShowEpisode === "undefined" || getTvShowEpisode?._id === tvShowEpisodeId) {
            dispatch(setLoadingPattern(false))
        }
    }

    React.useEffect(() => {
        refreshOpenEpisode()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getTvShowSeason])

    async function updateRegister(nameField: string) {
        if (typeof tvShowSeasonId !== "undefined" && tvShowSeasonId !== null && typeof tvShowEpisodeId !== "undefined" && tvShowEpisodeId !== null) {
            await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
            await dispatch(updateByIdInTvShowEpisode(tvShowEpisodeId.toString(), nameField, tvShowSeasonId.toString(), () => {
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
        <TvShowSeasonEditView isLoading={getIsLoading()} getTvShow={getTvShow} getTvShowSeason={getTvShowSeason}
            getEpisode={getTvShowEpisode} update={(nameField: string) => updateRegister(nameField)} />
    )
}

export default TvShowEpisodeEditPage
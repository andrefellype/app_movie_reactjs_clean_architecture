/* eslint-disable prefer-destructuring */
import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { showLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import TvShowSeasonEditView from './view'
import { openTvShowById } from '../../../app/redux/TvShow/tvshow.actions'
import { getTvShowSingle } from '../../../app/redux/TvShow/tvshow.selector'
import { openTvShowEpisodeById, updateTvShowEpisodeById } from '../../../app/redux/TvShowEpisode/tvshowepisode.actions'
import { getTvShowSeasonSingle } from '../../../app/redux/TvShowSeason/tvshowseason.selector'
import { getTvShowEpisodeSingle } from '../../../app/redux/TvShowEpisode/tvshowepisode.selector'
import { openTvShowSeasonById } from '../../../app/redux/TvShowSeason/tvshowseason.actions'
import { showStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function TvShowEpisodeEdit() {

    const dispatch = useDispatch()

    const getTvShow = useSelector(getTvShowSingle)
    const getTvShowSeason = useSelector(getTvShowSeasonSingle)
    const getTvShowEpisode = useSelector(getTvShowEpisodeSingle)
    const getLoading = useSelector(showStatusLoading)

    const { tvShowEpisodeId, tvShowId, tvShowSeasonId } = useParams()

    React.useEffect(() => {
        if (typeof tvShowId !== "undefined" && tvShowId !== null) {
            dispatch(showLoadingPattern(true))
            dispatch(openTvShowById(tvShowId.toString(), () => dispatch(showLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingPattern(false))
            }))
        }
        // eslint-disable-next-line
    }, [])

    async function refreshOpenSeason() {
        if (typeof tvShowSeasonId !== "undefined" && tvShowSeasonId !== null) {
            await dispatch(showLoadingPattern(true))
            await dispatch(openTvShowSeasonById(tvShowSeasonId, () => dispatch(showLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingPattern(false))
            }))
        }
    }

    React.useEffect(() => {
        refreshOpenSeason()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getTvShow])

    async function refreshOpenEpisode() {
        if (typeof tvShowEpisodeId !== "undefined" && tvShowEpisodeId !== null) {
            await dispatch(showLoadingPattern(true))
            await dispatch(openTvShowEpisodeById(tvShowEpisodeId, () => dispatch(showLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingPattern(false))
            }))
        }
    }

    React.useEffect(() => {
        refreshOpenEpisode()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getTvShowSeason])

    async function updateRegister(nameField: string) {
        if (typeof tvShowSeasonId !== "undefined" && tvShowSeasonId !== null && typeof tvShowEpisodeId !== "undefined" && tvShowEpisodeId !== null) {
            await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
            await dispatch(updateTvShowEpisodeById(tvShowEpisodeId.toString(), nameField, tvShowSeasonId.toString(), () => {
                dispatch(showLoadingPattern(false))
                dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success", null, "reload_page"))
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingPattern(false))
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

export default TvShowEpisodeEdit
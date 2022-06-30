/* eslint-disable prefer-destructuring */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { MSG_NEW_REGISTER_SUCCESS, MSG_SAVED_DATA } from '../../../app/core/consts'
import { showLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { openTvShowById } from '../../../app/redux/TvShow/tvshow.actions'
import { getTvShowSingle } from '../../../app/redux/TvShow/tvshow.selector'
import { registerTvShowEpisode } from '../../../app/redux/TvShowEpisode/tvshowepisode.actions'
import { openTvShowSeasonById } from '../../../app/redux/TvShowSeason/tvshowseason.actions'
import { getTvShowSeasonSingle } from '../../../app/redux/TvShowSeason/tvshowseason.selector'
import TvShowEpisodeNewView from './view'

function TvShowEpisodeNew() {

    const dispatch = useDispatch()

    const getTvShow = useSelector(getTvShowSingle)
    const getTvShowSeason = useSelector(getTvShowSeasonSingle)

    const { tvShowSeasonId, tvShowId } = useParams()

    async function insertSeason(nameField: string) {
        if (typeof tvShowSeasonId !== "undefined" && tvShowSeasonId !== null) {
            await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
            await dispatch(registerTvShowEpisode(tvShowSeasonId, nameField, () => {
                dispatch(showLoadingPattern(false))
                dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingPattern(false))
            }))
        }
    }

    React.useEffect(() => {
        if (typeof tvShowId !== "undefined" && tvShowId !== null) {
            dispatch(showLoadingPattern(true))
            dispatch(openTvShowById(tvShowId.toString(), () => dispatch(showLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingPattern(false))
            }))
        }
        if (typeof tvShowSeasonId !== "undefined" && tvShowSeasonId !== null) {
            dispatch(showLoadingPattern(true))
            dispatch(openTvShowSeasonById(tvShowSeasonId.toString(), () => dispatch(showLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingPattern(false))
            }))
        }
        // eslint-disable-next-line
    }, [])

    return (
        <TvShowEpisodeNewView getTvShow={getTvShow} getTvShowSeason={getTvShowSeason} saveRegister={(nameField: string) => insertSeason(nameField)} />
    )
}

export default TvShowEpisodeNew
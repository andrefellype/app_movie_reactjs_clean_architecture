/* eslint-disable prefer-destructuring */
import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { showLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import TvShowSeasonEditView from './view'
import { openTvShowById } from '../../../app/redux/TvShow/tvshow.actions'
import { openTvShowSeasonById, updateTvShowSeasonById } from '../../../app/redux/TvShowSeason/tvshowseason.actions'
import { getTvShowSingle } from '../../../app/redux/TvShow/tvshow.selector'
import { getTvShowSeasonSingle } from '../../../app/redux/TvShowSeason/tvshowseason.selector'
import { showStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function TvShowSeasonEdit() {

    const dispatch = useDispatch()

    const getTvShow = useSelector(getTvShowSingle)
    const getTvShowSeason = useSelector(getTvShowSeasonSingle)
    const getLoading = useSelector(showStatusLoading)

    const { tvShowId, tvShowSeasonId } = useParams()

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

    async function refreshOpen() {
        if (typeof tvShowSeasonId !== "undefined" && tvShowSeasonId !== null) {
            await dispatch(showLoadingPattern(true))
            await dispatch(openTvShowSeasonById(tvShowSeasonId, () => dispatch(showLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingPattern(false))
            }))
        }
    }

    React.useEffect(() => {
        refreshOpen()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getTvShow])

    async function updateRegister(nameField: string) {
        if (typeof tvShowId !== "undefined" && tvShowId !== null && typeof tvShowSeasonId !== "undefined" && tvShowSeasonId !== null) {
            await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
            await dispatch(updateTvShowSeasonById(tvShowSeasonId.toString(), nameField, tvShowId.toString(), () => {
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
        <TvShowSeasonEditView isLoading={getIsLoading()} getTvShow={getTvShow} getSeason={getTvShowSeason}
            update={(nameField: string) => updateRegister(nameField)} />
    )
}

export default TvShowSeasonEdit
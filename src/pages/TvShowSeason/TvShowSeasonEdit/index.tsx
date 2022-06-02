/* eslint-disable prefer-destructuring */
import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { showLoadingMain } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import TvShowSeasonEditView from './view'
import { openTvShowById } from '../../../app/redux/TvShow/tvshow.actions'
import { openTvShowSeasonById, updateTvShowSeason } from '../../../app/redux/TvShowSeason/tvshowseason.actions'
import { getTvShowSingle } from '../../../app/redux/TvShow/tvshow.selector'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'
import { getTvShowSeasonSingle } from '../../../app/redux/TvShowSeason/tvshowseason.selector'

function TvShowSeasonEdit() {

    const dispatch = useDispatch()

    const getTvShow = useSelector(getTvShowSingle)
    const getTvShowSeason = useSelector(getTvShowSeasonSingle)

    const { tvShowId, tvShowSeasonId } = useParams()

    React.useEffect(() => {
        if (typeof tvShowId !== "undefined" && tvShowId !== null) {
            dispatch(showLoadingMain(true))
            dispatch(openTvShowById(tvShowId.toString(), () => dispatch(showLoadingMain(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingMain(false))
            }))
        }
        // eslint-disable-next-line
    }, [])

    async function refreshOpen() {
        if (typeof tvShowSeasonId !== "undefined" && tvShowSeasonId !== null) {
            await dispatch(showLoadingMain(true))
            await dispatch(openTvShowSeasonById(tvShowSeasonId, () => dispatch(showLoadingMain(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingMain(false))
            }))
        }
    }

    React.useEffect(() => {
        refreshOpen()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getTvShow])

    async function updateRegister(nameField: string) {
        if (typeof tvShowId !== "undefined" && tvShowId !== null && typeof tvShowSeasonId !== "undefined" && tvShowSeasonId !== null) {
            await dispatch(showLoadingMain(true, MSG_SAVED_DATA))
            await dispatch(updateTvShowSeason(tvShowSeasonId.toString(), nameField, tvShowId.toString(), () => {
                dispatch(showLoadingMain(false))
                dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success", null, "reload_page"))
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingMain(false))
            }))
        }
    }

    return (
        <TvShowSeasonEditView getTvShow={getTvShow} getSeason={getTvShowSeason} update={(nameField: string) => updateRegister(nameField)} />
    )
}

export default TvShowSeasonEdit
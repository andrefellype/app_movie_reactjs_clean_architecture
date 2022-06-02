/* eslint-disable prefer-destructuring */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { MSG_NEW_REGISTER_SUCCESS, MSG_SAVED_DATA } from '../../../app/core/consts'
import { showLoadingMain } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'
import { openTvShowById } from '../../../app/redux/TvShow/tvshow.actions'
import { getTvShowSingle } from '../../../app/redux/TvShow/tvshow.selector'
import { registerTvShowSeason } from '../../../app/redux/TvShowSeason/tvshowseason.actions'
import TvShowSeasonNewView from './view'

function TvShowSeasonNew() {

    const dispatch = useDispatch()

    const getTvShow = useSelector(getTvShowSingle)

    const { tvShowId } = useParams()

    async function insertSeason(nameField: string) {
        if (typeof tvShowId !== "undefined" && tvShowId !== null) {
            await dispatch(showLoadingMain(true, MSG_SAVED_DATA))
            await dispatch(registerTvShowSeason(tvShowId, nameField, () => {
                dispatch(showLoadingMain(false))
                dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingMain(false))
            }))
        }
    }

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

    return (
        <TvShowSeasonNewView getTvShow={getTvShow} saveRegister={(nameField: string) => insertSeason(nameField)} />
    )
}

export default TvShowSeasonNew
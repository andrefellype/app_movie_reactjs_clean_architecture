import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { MSG_NEW_REGISTER_SUCCESS, MSG_SAVED_DATA } from '../../../app/core/consts'
import { setLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { openInTvShow } from '../../../app/redux/TvShow/tvshow.actions'
import { getTvShowSingle } from '../../../app/redux/TvShow/tvshow.selector'
import { createInTvShowSeason } from '../../../app/redux/TvShowSeason/tvshowseason.actions'
import TvShowSeasonNewPageView from './view'

function TvShowSeasonNewPage() {
    const dispatch = useDispatch()

    const getTvShow = useSelector(getTvShowSingle)

    const { tvShowId } = useParams()

    async function insertSeason(nameField: string) {
        if (typeof tvShowId !== "undefined" && tvShowId !== null) {
            await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
            await dispatch(createInTvShowSeason(tvShowId, nameField, () => {
                dispatch(setLoadingPattern(false))
                dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }))
        }
    }

    React.useEffect(() => {
        if (typeof tvShowId !== "undefined" && tvShowId !== null) {
            dispatch(setLoadingPattern(true))
            dispatch(openInTvShow(tvShowId.toString(), () => dispatch(setLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }))
        }
        // eslint-disable-next-line
    }, [])

    return (
        <TvShowSeasonNewPageView getTvShow={getTvShow} saveRegister={(nameField: string) => insertSeason(nameField)} />
    )
}

export default TvShowSeasonNewPage
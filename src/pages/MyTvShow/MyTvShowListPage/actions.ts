/* eslint-disable @typescript-eslint/no-explicit-any */
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTER_SUCCESS } from "../../../app/core/consts"
import { setLoadingPattern, insertMsgs } from "../../../app/redux/UtlisAppRedux/utlisAppRedux.actions"
import { deleteMyTvShowByTvShowId, getMyTvShowAll, getMyTvShowAllByOrderAndSearchAndFilter } from "../../../app/redux/MyTvShow/myTvShow.actions"

export const MyTvShowListPageDelete = (tvShowId: string, orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => async dispatch => {
    await dispatch(setLoadingPattern(true, MSG_DELETE_REGISTER))
    await dispatch(deleteMyTvShowByTvShowId(tvShowId, () => {
        dispatch(setLoadingPattern(true))
        dispatch(getMyTvShowAll(() => {
            dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success"))
            dispatch(setLoadingPattern(false))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }, orderField, searchText, categoryFilter, releaseFilter, countryFilter))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(setLoadingPattern(false))
    }))
}

export const MyTvShowListPageByOrderAndSearchAndFilter = (orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string, updateTvShow: () => void, tvShowsGeneral) => async dispatch => {
    dispatch(getMyTvShowAllByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, countryFilter, tvShowsGeneral))
    updateTvShow()
}
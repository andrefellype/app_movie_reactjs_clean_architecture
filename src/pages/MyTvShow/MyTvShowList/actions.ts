/* eslint-disable @typescript-eslint/no-explicit-any */
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTER_SUCCESS } from "../../../app/core/consts"
import { showLoadingMain } from "../../../app/redux/LoadingMain/loadingMain.actions"
import { insertMsgs } from "../../../app/redux/MsgAlert/msgAlert.actions"
import { deleteMyTvShow, getMyTvShowAll, getMyTvShowAllByOrderAndSearchAndFilter } from "../../../app/redux/MyTvShow/myTvShow.actions"

export const MyTvShowListDelete = (tvShowId: string, orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string) => async dispatch => {
    await dispatch(showLoadingMain(true, MSG_DELETE_REGISTER))
    await dispatch(deleteMyTvShow(tvShowId, () => {
        dispatch(showLoadingMain(true))
        dispatch(getMyTvShowAll(() => {
            dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success"))
            dispatch(showLoadingMain(false))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, orderField, searchText, categoryFilter, releaseFilter, countryFilter))
    }, (errorsMsg) => {
        dispatch(insertMsgs(errorsMsg, 'error'))
        dispatch(showLoadingMain(false))
    }))
}

export const MyTvShowListByOrderAndSearchAndFilter = (orderField: string, searchText: string, categoryFilter: string, releaseFilter: string, countryFilter: string, tvShowsGeneral) => async dispatch => {
    dispatch(getMyTvShowAllByOrderAndSearchAndFilter(orderField, searchText, categoryFilter, releaseFilter, countryFilter, tvShowsGeneral))
}
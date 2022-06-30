import { getTvShowAllByOrderAndSearchAndFilter } from "../../../app/redux/TvShow/tvshow.actions"

export const MyTvShowNewTvShowBySearch = (searchText: string, updateTvShow: () => void, tvShowsGeneral) => async dispatch => {
    dispatch(getTvShowAllByOrderAndSearchAndFilter("title", searchText, "", "", "", tvShowsGeneral))
    updateTvShow()
}
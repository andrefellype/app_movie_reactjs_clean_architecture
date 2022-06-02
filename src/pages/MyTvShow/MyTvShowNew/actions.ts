import { getTvShowAllByOrderAndSearchAndFilter } from "../../../app/redux/TvShow/tvshow.actions"

export const MyTvShowNewTvShowBySearch = (searchText: string, tvShowsGeneral) => async dispatch => {
    dispatch(getTvShowAllByOrderAndSearchAndFilter("title", searchText, "", "", "", tvShowsGeneral))
}
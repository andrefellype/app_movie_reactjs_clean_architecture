import { openAllByOrderAndSearchAndFilterInTvShow } from "../../../app/redux/TvShow/tvshow.actions"

export const MyTvShowNewPageTvShowBySearch = (searchText: string, updateTvShow: () => void, tvShowsGeneral) =>
    async dispatch => {
        dispatch(openAllByOrderAndSearchAndFilterInTvShow("title", searchText, "", "", "", tvShowsGeneral))
        updateTvShow()
    }
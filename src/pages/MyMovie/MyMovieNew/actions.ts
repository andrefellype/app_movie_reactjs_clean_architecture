import { getMovieAllByOrderAndSearchAndFilter } from "../../../app/redux/Movie/movie.actions"

export const MyMovieNewMovieBySearch = (searchText: string, moviesGeneral) => async dispatch => {
    dispatch(getMovieAllByOrderAndSearchAndFilter("title", searchText, "", "", "", "", "", moviesGeneral))
}
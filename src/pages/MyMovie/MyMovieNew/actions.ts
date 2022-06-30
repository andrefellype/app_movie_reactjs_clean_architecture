import { getMovieAllByOrderAndSearchAndFilter } from "../../../app/redux/Movie/movie.actions"

export const MyMovieNewMovieBySearch = (searchText: string, updateMovie: () => void, moviesGeneral) => async dispatch => {
    dispatch(getMovieAllByOrderAndSearchAndFilter("title", searchText, "", "", "", "", "", moviesGeneral))
    updateMovie()
}
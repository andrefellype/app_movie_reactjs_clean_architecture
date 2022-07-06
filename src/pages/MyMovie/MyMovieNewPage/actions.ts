import { openAllByOrderAndSearchAndFilterInMovie } from "../../../app/redux/Movie/movie.actions"

export const MyMovieNewPageBySearch = (searchText: string, updateMovie: () => void, moviesGeneral) => async dispatch => {
    dispatch(openAllByOrderAndSearchAndFilterInMovie("title", searchText, "", "", "", "", "", moviesGeneral))
    updateMovie()
}
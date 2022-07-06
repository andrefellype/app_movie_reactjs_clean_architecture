import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import MovieShowPageView from './view'
import { getMovieSingle } from '../../../app/redux/Movie/movie.selector'
import { openInMovie } from '../../../app/redux/Movie/movie.actions'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function MovieShowPage() {
    const dispatch = useDispatch()

    const getMovie = useSelector(getMovieSingle)
    const getLoading = useSelector(isStatusLoading)

    const { movieId } = useParams()

    React.useEffect(() => {
        if (typeof movieId !== "undefined" && movieId !== null) {
            dispatch(setLoadingPattern(true))
            dispatch(openInMovie(movieId.toString(), () => dispatch(setLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function getIsLoading() {
        if (typeof getLoading !== "undefined" && typeof getLoading.statusPattern !== "undefined") {
            return getLoading.statusPattern
        }
        return false
    }

    return (
        <MovieShowPageView getMovie={getMovie} isLoading={getIsLoading()} />
    )
}

export default MovieShowPage
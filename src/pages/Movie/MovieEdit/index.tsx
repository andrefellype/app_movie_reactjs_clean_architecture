/* eslint-disable prefer-destructuring */
import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { showLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import { getCategoriesAll, getCategoriesAllFilter } from '../../../app/redux/Category/category.selector'
import { getCategoryAll } from '../../../app/redux/Category/category.actions'
import MovieEditView from './view'
import { getMovieSingle } from '../../../app/redux/Movie/movie.selector'
import { openMovieById, updateMovieById } from '../../../app/redux/Movie/movie.actions'
import { MovieEditActorOpenById, MovieEditCastBySearch, MovieEditCastDeleteActor, MovieEditCastInsertActor, MovieEditCastUpdateActor, MovieEditCategoryBySearch, MovieEditCountryBySearch, MovieEditCountryDelete, MovieEditCountryInsert, MovieEditCountryOpenById, MovieEditCountryUpdate, MovieEditDirectorBySearch, MovieEditDirectorDelete, MovieEditDirectorInsert, MovieEditDirectorOpenById, MovieEditDirectorUpdate, MovieEditStreamBySearch, MovieEditStreamDelete, MovieEditStreamInsert, MovieEditStreamOpenById, MovieEditStreamUpdate } from './actions'
import { getDirectorAll } from '../../../app/redux/Director/director.actions'
import { getDirectorsAll, getDirectorsAllFilter, getDirectorSingle } from '../../../app/redux/Director/director.selector'
import { getActorAll } from '../../../app/redux/Actor/actor.actions'
import { getCountryAll } from '../../../app/redux/Country/country.actions'
import { getStreamAll } from '../../../app/redux/Stream/stream.actions'
import { getActorsAll, getActorsAllFilter, getActorSingle } from '../../../app/redux/Actor/actor.selector'
import { getCountriesAll, getCountriesAllFilter, getCountrySingle } from '../../../app/redux/Country/country.selector'
import { getStreamsAll, getStreamsAllFilter, getStreamSingle } from '../../../app/redux/Stream/stream.selector'
import { showStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function MovieEdit() {

    const dispatch = useDispatch()

    const getMovie = useSelector(getMovieSingle)
    const getLoading = useSelector(showStatusLoading)

    const { movieId } = useParams()

    const directors = useSelector(getDirectorsAllFilter)
    const directorsGeneral = useSelector(getDirectorsAll)
    const director = useSelector(getDirectorSingle)

    const actors = useSelector(getActorsAllFilter)
    const actorsGeneral = useSelector(getActorsAll)
    const actor = useSelector(getActorSingle)

    const categories = useSelector(getCategoriesAllFilter)
    const categoriesGeneral = useSelector(getCategoriesAll)

    const countries = useSelector(getCountriesAllFilter)
    const countriesGeneral = useSelector(getCountriesAll)
    const country = useSelector(getCountrySingle)

    const streams = useSelector(getStreamsAllFilter)
    const streamsGeneral = useSelector(getStreamsAll)
    const stream = useSelector(getStreamSingle)

    React.useEffect(() => {
        if (typeof movieId !== "undefined" && movieId !== null) {
            dispatch(showLoadingPattern(true))
            dispatch(getActorAll(null, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingPattern(false))
            }, 0, ""))
            dispatch(getDirectorAll(null, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingPattern(false))
            }, 0, ""))
            dispatch(getCategoryAll(null, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingPattern(false))
            }, ""))
            dispatch(getCountryAll(null, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingPattern(false))
            }, 0, ""))
            dispatch(getStreamAll(null, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingPattern(false))
            }, 0, ""))
            dispatch(openMovieById(movieId.toString(), () => dispatch(showLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingPattern(false))
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function refreshListDirector(searchText: string, callbackSucess: () => void) {
        await dispatch(showLoadingPattern(true))
        await dispatch(getDirectorAll(() => dispatch(showLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, 0, searchText))
        callbackSucess()
    }

    async function refreshListCast(searchText: string, callbackSucess: () => void) {
        await dispatch(showLoadingPattern(true))
        await dispatch(getActorAll(() => dispatch(showLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, 0, searchText))
        callbackSucess()
    }

    async function refreshListCategory(searchText: string, callbackSucess: () => void) {
        await dispatch(showLoadingPattern(true))
        await dispatch(getCategoryAll(() => dispatch(showLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, searchText))
        callbackSucess()
    }

    async function refreshListCountry(searchText: string, callbackSucess: () => void) {
        await dispatch(showLoadingPattern(true))
        await dispatch(getCountryAll(() => dispatch(showLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, 0, searchText))
        callbackSucess()
    }

    async function refreshListStream(searchText: string, callbackSucess: () => void) {
        await dispatch(showLoadingPattern(true))
        await dispatch(getStreamAll(() => dispatch(showLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, 0, searchText))
        callbackSucess()
    }

    async function updateRegister(titleValue: string, releaseValue: string, directorsValue: [], castsValue: [], durationValue: string, categoriesValue: [], countriesValue: [], streamsValue: [], movieTheaterValue: string, resumeValue: string) {
        if (typeof movieId !== "undefined" && movieId !== null) {
            await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
            await dispatch(updateMovieById(movieId, titleValue, releaseValue, directorsValue, castsValue, durationValue, categoriesValue, countriesValue, streamsValue, movieTheaterValue, resumeValue, () => {
                dispatch(showLoadingPattern(false))
                dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success", null, "reload_page"))
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingPattern(false))
            }))
        }
    }

    function getIsLoading() {
        if (typeof getLoading !== "undefined" && typeof getLoading.statusPattern !== "undefined") {
            return getLoading.statusPattern
        }
        return false
    }

    return (
        <MovieEditView getMovie={getMovie} isLoading={getIsLoading()}

            streams={streams} stream={stream}
            openStream={(idStream: string) => dispatch(MovieEditStreamOpenById(idStream))}
            actionChangeSearchStream={(searchText: string) => dispatch(MovieEditStreamBySearch(searchText, streamsGeneral))}
            actionRefreshListStream={(searchText: string, callbackSucess: () => void) => refreshListStream(searchText, callbackSucess)}
            actionInsertRegisterStream={(nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => dispatch(MovieEditStreamInsert(nameValue, callbackSuccess, calllbackError))}
            actionUpdateRegisterStream={(idStream: string, nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => dispatch(MovieEditStreamUpdate(idStream, nameValue, callbackSuccess, calllbackError))}
            actionDeleteRegisterStream={(streamId: string, searchText: string, successDestroy: () => void) => dispatch(MovieEditStreamDelete(streamId, searchText, successDestroy))}

            countries={countries} country={country}
            openCountry={(idCountry: string) => dispatch(MovieEditCountryOpenById(idCountry))}
            actionChangeSearchCountry={(searchText: string) => dispatch(MovieEditCountryBySearch(searchText, countriesGeneral))}
            actionRefreshListCountry={(searchText: string, callbackSucess: () => void) => refreshListCountry(searchText, callbackSucess)}
            actionInsertRegisterCountry={(nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => dispatch(MovieEditCountryInsert(nameValue, callbackSuccess, calllbackError))}
            actionUpdateRegisterCountry={(idCountry: string, nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => dispatch(MovieEditCountryUpdate(idCountry, nameValue, callbackSuccess, calllbackError))}
            actionDeleteRegisterCountry={(countryId: string, searchText: string, successDestroy: () => void) => dispatch(MovieEditCountryDelete(countryId, searchText, successDestroy))}

            categories={categories} actionChangeSearchCategory={(searchText: string) => dispatch(MovieEditCategoryBySearch(searchText, categoriesGeneral))}
            actionRefreshListCategory={(searchText: string, callbackSucess: () => void) => refreshListCategory(searchText, callbackSucess)}

            actors={actors} actor={actor}
            openActor={(idActor: string) => dispatch(MovieEditActorOpenById(idActor))}
            actionChangeSearchCast={(searchText: string) => dispatch(MovieEditCastBySearch(searchText, actorsGeneral))}
            actionInsertRegisterActor={(nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => dispatch(MovieEditCastInsertActor(nameValue, callbackSuccess, calllbackError))}
            actionUpdateRegisterActor={(idActor: string, nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => dispatch(MovieEditCastUpdateActor(idActor, nameValue, callbackSuccess, calllbackError))}
            actionRefreshListCast={(searchText: string, callbackSucess: () => void) => refreshListCast(searchText, callbackSucess)}
            actionDeleteRegisterActor={(actorId: string, searchText: string, successDestroy: () => void) => dispatch(MovieEditCastDeleteActor(actorId, searchText, successDestroy))}

            directors={directors} director={director}
            actionInsertRegisterDirector={(nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => dispatch(MovieEditDirectorInsert(nameValue, callbackSuccess, calllbackError))}
            actionUpdateRegisterDirector={(idDirector: string, nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => dispatch(MovieEditDirectorUpdate(idDirector, nameValue, callbackSuccess, calllbackError))}
            openDirector={(idDirector: string) => dispatch(MovieEditDirectorOpenById(idDirector))}
            actionRefreshListDirector={(searchText: string, callbackSucess: () => void) => refreshListDirector(searchText, callbackSucess)}
            actionChangeSearchDirector={(searchText: string) => dispatch(MovieEditDirectorBySearch(searchText, directorsGeneral))}
            actionDeleteRegisterDirector={(directorId: string, searchText: string, successDestroy: () => void) => dispatch(MovieEditDirectorDelete(directorId, searchText, successDestroy))}

            update={(titleValue: string, releaseValue: string, directorsValue: [], castsValue: [], durationValue: string, categoriesValue: [], countriesValue: [], streamsValue: [], movieTheaterValue: string, resumeValue: string) => updateRegister(titleValue, releaseValue, directorsValue, castsValue, durationValue, categoriesValue, countriesValue, streamsValue, movieTheaterValue, resumeValue)} />
    )
}

export default MovieEdit
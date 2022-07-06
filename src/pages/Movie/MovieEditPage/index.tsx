import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import { getCategoriesAll, getCategoriesAllFilter } from '../../../app/redux/Category/category.selector'
import { openAllInCategory } from '../../../app/redux/Category/category.actions'
import MovieEditPageView from './view'
import { getMovieSingle } from '../../../app/redux/Movie/movie.selector'
import { openInMovie, updateByIdInMovie } from '../../../app/redux/Movie/movie.actions'
import {
    MovieEditPageActorOpenById, MovieEditPageCastBySearch, MovieEditPageCastDeleteActor, MovieEditPageCastInsertActor,
    MovieEditPageCastUpdateActor, MovieEditPageCategoryBySearch, MovieEditPageCountryBySearch, MovieEditPageCountryDelete,
    MovieEditPageCountryInsert, MovieEditPageCountryOpenById, MovieEditPageCountryUpdate, MovieEditPageDirectorBySearch,
    MovieEditPageDirectorDelete, MovieEditPageDirectorInsert, MovieEditPageDirectorOpenById, MovieEditPageDirectorUpdate,
    MovieEditPageStreamBySearch, MovieEditPageStreamDelete, MovieEditPageStreamInsert, MovieEditPageStreamOpenById, MovieEditPageStreamUpdate
} from './actions'
import { openAllByAuthorizedInDirector } from '../../../app/redux/Director/director.actions'
import { getDirectorsAll, getDirectorsAllFilter, getDirectorSingle } from '../../../app/redux/Director/director.selector'
import { openAllByAuthorizedInActor } from '../../../app/redux/Actor/actor.actions'
import { openAllByAuthorizedInCountry } from '../../../app/redux/Country/country.actions'
import { openAllByAuthorizedInStream } from '../../../app/redux/Stream/stream.actions'
import { getActorsAll, getActorsAllFilter, getActorSingle } from '../../../app/redux/Actor/actor.selector'
import { getCountriesAll, getCountriesAllFilter, getCountrySingle } from '../../../app/redux/Country/country.selector'
import { getStreamsAll, getStreamsAllFilter, getStreamSingle } from '../../../app/redux/Stream/stream.selector'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function MovieEditPage() {
    const dispatch = useDispatch()

    const getMovie = useSelector(getMovieSingle)
    const getLoading = useSelector(isStatusLoading)

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
            dispatch(setLoadingPattern(true))
            dispatch(openAllByAuthorizedInActor(null, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }, ""))
            dispatch(openAllByAuthorizedInDirector(null, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }, ""))
            dispatch(openAllInCategory(null, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }, ""))
            dispatch(openAllByAuthorizedInCountry(null, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }, ""))
            dispatch(openAllByAuthorizedInStream(null, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }, ""))
            dispatch(openInMovie(movieId.toString(), () => dispatch(setLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function refreshListDirector(searchText: string, callbackSucess: () => void) {
        await dispatch(setLoadingPattern(true))
        await dispatch(openAllByAuthorizedInDirector(() => dispatch(setLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }, searchText))
        callbackSucess()
    }

    async function refreshListCast(searchText: string, callbackSucess: () => void) {
        await dispatch(setLoadingPattern(true))
        await dispatch(openAllByAuthorizedInActor(() => dispatch(setLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }, searchText))
        callbackSucess()
    }

    async function refreshListCategory(searchText: string, callbackSucess: () => void) {
        await dispatch(setLoadingPattern(true))
        await dispatch(openAllInCategory(() => dispatch(setLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }, searchText))
        callbackSucess()
    }

    async function refreshListCountry(searchText: string, callbackSucess: () => void) {
        await dispatch(setLoadingPattern(true))
        await dispatch(openAllByAuthorizedInCountry(() => dispatch(setLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }, searchText))
        callbackSucess()
    }

    async function refreshListStream(searchText: string, callbackSucess: () => void) {
        await dispatch(setLoadingPattern(true))
        await dispatch(openAllByAuthorizedInStream(() => dispatch(setLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }, searchText))
        callbackSucess()
    }

    async function updateRegister(titleValue: string, releaseValue: string, directorsValue: [], castsValue: [],
        durationValue: string, categoriesValue: [], countriesValue: [], streamsValue: [], movieTheaterValue: string, resumeValue: string) {
        if (typeof movieId !== "undefined" && movieId !== null) {
            await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
            await dispatch(updateByIdInMovie(movieId, titleValue, releaseValue, directorsValue, castsValue, durationValue,
                categoriesValue, countriesValue, streamsValue, movieTheaterValue, resumeValue, () => {
                    dispatch(setLoadingPattern(false))
                    dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success", null, "reload_page"))
                }, (errorsMsg) => {
                    dispatch(insertMsgs(errorsMsg, 'error'))
                    dispatch(setLoadingPattern(false))
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
        <MovieEditPageView getMovie={getMovie} isLoading={getIsLoading()}

            streams={streams} stream={stream}
            openStream={(idStream: string) => dispatch(MovieEditPageStreamOpenById(idStream))}
            actionChangeSearchStream={(searchText: string) => dispatch(MovieEditPageStreamBySearch(searchText, streamsGeneral))}
            actionRefreshListStream={(searchText: string, callbackSucess: () => void) =>
                refreshListStream(searchText, callbackSucess)}
            actionInsertcreateInStream={(nameValue: string, callbackSuccess: () => void, calllbackError: () => void) =>
                dispatch(MovieEditPageStreamInsert(nameValue, callbackSuccess, calllbackError))}
            actionUpdatecreateInStream={(idStream: string, nameValue: string, callbackSuccess: () => void,
                calllbackError: () => void) => dispatch(MovieEditPageStreamUpdate(idStream, nameValue, callbackSuccess, calllbackError))}
            actionDeletecreateInStream={(streamId: string, searchText: string, successDestroy: () => void) =>
                dispatch(MovieEditPageStreamDelete(streamId, searchText, successDestroy))}

            countries={countries} country={country}
            openCountry={(idCountry: string) => dispatch(MovieEditPageCountryOpenById(idCountry))}
            actionChangeSearchCountry={(searchText: string) => dispatch(MovieEditPageCountryBySearch(searchText, countriesGeneral))}
            actionRefreshListCountry={(searchText: string, callbackSucess: () => void) => refreshListCountry(searchText, callbackSucess)}
            actionInsertcreateInCountry={(nameValue: string, callbackSuccess: () => void,
                calllbackError: () => void) => dispatch(MovieEditPageCountryInsert(nameValue, callbackSuccess, calllbackError))}
            actionUpdatecreateInCountry={(idCountry: string, nameValue: string, callbackSuccess: () => void,
                calllbackError: () => void) => dispatch(MovieEditPageCountryUpdate(idCountry, nameValue, callbackSuccess, calllbackError))}
            actionDeletecreateInCountry={(countryId: string, searchText: string, successDestroy: () => void) =>
                dispatch(MovieEditPageCountryDelete(countryId, searchText, successDestroy))}

            categories={categories} actionChangeSearchCategory={(searchText: string) =>
                dispatch(MovieEditPageCategoryBySearch(searchText, categoriesGeneral))}
            actionRefreshListCategory={(searchText: string, callbackSucess: () => void) =>
                refreshListCategory(searchText, callbackSucess)}

            actors={actors} actor={actor}
            openActor={(idActor: string) => dispatch(MovieEditPageActorOpenById(idActor))}
            actionChangeSearchCast={(searchText: string) => dispatch(MovieEditPageCastBySearch(searchText, actorsGeneral))}
            actionInsertcreateInActor={(nameValue: string, callbackSuccess: () => void,
                calllbackError: () => void) => dispatch(MovieEditPageCastInsertActor(nameValue, callbackSuccess, calllbackError))}
            actionUpdatecreateInActor={(idActor: string, nameValue: string, callbackSuccess: () => void,
                calllbackError: () => void) => dispatch(MovieEditPageCastUpdateActor(idActor, nameValue, callbackSuccess, calllbackError))}
            actionRefreshListCast={(searchText: string, callbackSucess: () => void) => refreshListCast(searchText, callbackSucess)}
            actionDeletecreateInActor={(actorId: string, searchText: string, successDestroy: () => void) =>
                dispatch(MovieEditPageCastDeleteActor(actorId, searchText, successDestroy))}

            directors={directors} director={director}
            actionInsertRegisterDirector={(nameValue: string, callbackSuccess: () => void, calllbackError: () => void) =>
                dispatch(MovieEditPageDirectorInsert(nameValue, callbackSuccess, calllbackError))}
            actionUpdateRegisterDirector={(idDirector: string, nameValue: string, callbackSuccess: () => void,
                calllbackError: () => void) => dispatch(MovieEditPageDirectorUpdate(idDirector, nameValue, callbackSuccess, calllbackError))}
            openDirector={(idDirector: string) => dispatch(MovieEditPageDirectorOpenById(idDirector))}
            actionRefreshListDirector={(searchText: string, callbackSucess: () => void) => refreshListDirector(searchText, callbackSucess)}
            actionChangeSearchDirector={(searchText: string) => dispatch(MovieEditPageDirectorBySearch(searchText, directorsGeneral))}
            actionDeleteRegisterDirector={(directorId: string, searchText: string, successDestroy: () => void) =>
                dispatch(MovieEditPageDirectorDelete(directorId, searchText, successDestroy))}

            update={(titleValue: string, releaseValue: string, directorsValue: [], castsValue: [], durationValue: string,
                categoriesValue: [], countriesValue: [], streamsValue: [], movieTheaterValue: string, resumeValue: string) =>
                updateRegister(titleValue, releaseValue, directorsValue, castsValue, durationValue, categoriesValue, countriesValue,
                    streamsValue, movieTheaterValue, resumeValue)} />
    )
}

export default MovieEditPage
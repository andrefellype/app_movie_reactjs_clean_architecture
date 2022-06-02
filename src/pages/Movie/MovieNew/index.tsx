/* eslint-disable prefer-destructuring */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MSG_NEW_REGISTER_SUCCESS, MSG_SAVED_DATA } from '../../../app/core/consts'
import { getActorAll } from '../../../app/redux/Actor/actor.actions'
import { getActorsAll, getActorsAllFilter, getActorSingle } from '../../../app/redux/Actor/actor.selector'
import { getCategoryAll } from '../../../app/redux/Category/category.actions'
import { getCategoriesAll, getCategoriesAllFilter } from '../../../app/redux/Category/category.selector'
import { getCountryAll } from '../../../app/redux/Country/country.actions'
import { getCountriesAll, getCountriesAllFilter, getCountrySingle } from '../../../app/redux/Country/country.selector'
import { getDirectorAll } from '../../../app/redux/Director/director.actions'
import { getDirectorsAll, getDirectorsAllFilter, getDirectorSingle } from '../../../app/redux/Director/director.selector'
import { showLoadingMain } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { registerMovie } from '../../../app/redux/Movie/movie.actions'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'
import { getStreamAll } from '../../../app/redux/Stream/stream.actions'
import { getStreamsAll, getStreamsAllFilter, getStreamSingle } from '../../../app/redux/Stream/stream.selector'
import { MovieNewCastInsertActor, MovieNewCastBySearch, MovieNewDirectorBySearch, MovieNewDirectorOpenById, MovieNewCastUpdateActor, MovieNewCastDeleteActor, MovieNewDirectorDelete, MovieNewDirectorUpdate, MovieNewDirectorInsert, MovieNewActorOpenById, MovieNewCategoryBySearch, MovieNewCountryBySearch, MovieNewCountryInsert, MovieNewCountryUpdate, MovieNewCountryDelete, MovieNewCountryOpenById, MovieNewStreamDelete, MovieNewStreamInsert, MovieNewStreamUpdate, MovieNewStreamBySearch, MovieNewStreamOpenById } from './actions'
import MovieNewView from './view'

function MovieNew() {

    const dispatch = useDispatch()

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
        dispatch(showLoadingMain(true))
        dispatch(getActorAll(null, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 0, ""))
        dispatch(getDirectorAll(null, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 0, ""))
        dispatch(getCategoryAll(null, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, ""))
        dispatch(getCountryAll(null, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 0, ""))
        dispatch(getStreamAll(() => dispatch(showLoadingMain(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 0, ""))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function refreshListDirector(searchText: string, callbackSucess: () => void) {
        await dispatch(showLoadingMain(true))
        await dispatch(getDirectorAll(() => dispatch(showLoadingMain(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 0, searchText))
        callbackSucess()
    }

    async function refreshListCast(searchText: string, callbackSucess: () => void) {
        await dispatch(showLoadingMain(true))
        await dispatch(getActorAll(() => dispatch(showLoadingMain(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 0, searchText))
        callbackSucess()
    }

    async function refreshListCategory(searchText: string, callbackSucess: () => void) {
        await dispatch(showLoadingMain(true))
        await dispatch(getCategoryAll(() => dispatch(showLoadingMain(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, searchText))
        callbackSucess()
    }

    async function refreshListCountry(searchText: string, callbackSucess: () => void) {
        await dispatch(showLoadingMain(true))
        await dispatch(getCountryAll(() => dispatch(showLoadingMain(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 0, searchText))
        callbackSucess()
    }

    async function refreshListStream(searchText: string, callbackSucess: () => void) {
        await dispatch(showLoadingMain(true))
        await dispatch(getStreamAll(() => dispatch(showLoadingMain(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 0, searchText))
        callbackSucess()
    }

    async function insertMovie(titleValue: string, releaseValue: string, directorsValue: [], castsValue: [], durationValue: string, categoriesValue: [], countriesValue: [], streamsValue: [], movieTheaterValue: string, resumeValue: string) {
        await dispatch(showLoadingMain(true, MSG_SAVED_DATA))
        await dispatch(registerMovie(
            titleValue, releaseValue, directorsValue, castsValue, durationValue,
            categoriesValue, countriesValue, streamsValue, movieTheaterValue, resumeValue, () => {
                dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
                dispatch(showLoadingMain(false))
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingMain(false))
            }))
    }

    return (
        <MovieNewView
            streams={streams} stream={stream}
            openStream={(idStream: string) => dispatch(MovieNewStreamOpenById(idStream))}
            actionChangeSearchStream={(searchText: string) => dispatch(MovieNewStreamBySearch(searchText, streamsGeneral))}
            actionRefreshListStream={(searchText: string, callbackSucess: () => void) => refreshListStream(searchText, callbackSucess)}
            actionInsertRegisterStream={(nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => dispatch(MovieNewStreamInsert(nameValue, searchText, callbackSuccess, calllbackError))}
            actionUpdateRegisterStream={(idStream: string, nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => dispatch(MovieNewStreamUpdate(idStream, nameValue, searchText, callbackSuccess, calllbackError))}
            actionDeleteRegisterStream={(streamId: string, searchText: string, successDestroy: () => void) => dispatch(MovieNewStreamDelete(streamId, searchText, successDestroy))}

            countries={countries} country={country}
            openCountry={(idCountry: string) => dispatch(MovieNewCountryOpenById(idCountry))}
            actionChangeSearchCountry={(searchText: string) => dispatch(MovieNewCountryBySearch(searchText, countriesGeneral))}
            actionRefreshListCountry={(searchText: string, callbackSucess: () => void) => refreshListCountry(searchText, callbackSucess)}
            actionInsertRegisterCountry={(nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => dispatch(MovieNewCountryInsert(nameValue, searchText, callbackSuccess, calllbackError))}
            actionUpdateRegisterCountry={(idCountry: string, nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => dispatch(MovieNewCountryUpdate(idCountry, nameValue, searchText, callbackSuccess, calllbackError))}
            actionDeleteRegisterCountry={(countryId: string, searchText: string, successDestroy: () => void) => dispatch(MovieNewCountryDelete(countryId, searchText, successDestroy))}

            categories={categories} actionChangeSearchCategory={(searchText: string) => dispatch(MovieNewCategoryBySearch(searchText, categoriesGeneral))}
            actionRefreshListCategory={(searchText: string, callbackSucess: () => void) => refreshListCategory(searchText, callbackSucess)}

            actors={actors} actor={actor}
            openActor={(idActor: string) => dispatch(MovieNewActorOpenById(idActor))}
            actionChangeSearchCast={(searchText: string) => dispatch(MovieNewCastBySearch(searchText, actorsGeneral))}
            actionInsertRegisterActor={(nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => dispatch(MovieNewCastInsertActor(nameValue, searchText, callbackSuccess, calllbackError))}
            actionUpdateRegisterActor={(idActor: string, nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => dispatch(MovieNewCastUpdateActor(idActor, nameValue, searchText, callbackSuccess, calllbackError))}
            actionRefreshListCast={(searchText: string, callbackSucess: () => void) => refreshListCast(searchText, callbackSucess)}
            actionDeleteRegisterActor={(actorId: string, searchText: string, successDestroy: () => void) => dispatch(MovieNewCastDeleteActor(actorId, searchText, successDestroy))}

            directors={directors} director={director}
            actionInsertRegisterDirector={(nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => dispatch(MovieNewDirectorInsert(nameValue, searchText, callbackSuccess, calllbackError))}
            actionUpdateRegisterDirector={(idDirector: string, nameValue: string, searchText: string, callbackSuccess: () => void, calllbackError: () => void) => dispatch(MovieNewDirectorUpdate(idDirector, nameValue, searchText, callbackSuccess, calllbackError))}
            openDirector={(idDirector: string) => dispatch(MovieNewDirectorOpenById(idDirector))}
            actionRefreshListDirector={(searchText: string, callbackSucess: () => void) => refreshListDirector(searchText, callbackSucess)}
            actionChangeSearchDirector={(searchText: string) => dispatch(MovieNewDirectorBySearch(searchText, directorsGeneral))}
            actionDeleteRegisterDirector={(directorId: string, searchText: string, successDestroy: () => void) => dispatch(MovieNewDirectorDelete(directorId, searchText, successDestroy))}

            saveRegister={(titleValue: string, releaseValue: string, directorsValue: [], castsValue: [], durationValue: string, categoriesValue: [], countriesValue: [], streamsValue: [], movieTheaterValue: string, resumeValue: string) => insertMovie(titleValue, releaseValue, directorsValue, castsValue, durationValue, categoriesValue, countriesValue, streamsValue, movieTheaterValue, resumeValue)} />
    )
}

export default MovieNew
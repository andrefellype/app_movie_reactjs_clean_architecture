import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MSG_NEW_REGISTER_SUCCESS, MSG_SAVED_DATA } from '../../../app/core/consts'
import { getCategoryAll } from '../../../app/redux/Category/category.actions'
import { getCategoriesAll, getCategoriesAllFilter } from '../../../app/redux/Category/category.selector'
import { getCountryAll } from '../../../app/redux/Country/country.actions'
import { getCountriesAll, getCountriesAllFilter, getCountrySingle } from '../../../app/redux/Country/country.selector'
import { showLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { getStreamAll } from '../../../app/redux/Stream/stream.actions'
import { getStreamsAll, getStreamsAllFilter, getStreamSingle } from '../../../app/redux/Stream/stream.selector'
import { registerTvShow } from '../../../app/redux/TvShow/tvshow.actions'
import { TvShowNewCategoryBySearch, TvShowNewCountryBySearch, TvShowNewCountryInsert, TvShowNewCountryUpdate, TvShowNewCountryDelete, TvShowNewCountryOpenById, TvShowNewStreamDelete, TvShowNewStreamInsert, TvShowNewStreamUpdate, TvShowNewStreamBySearch, TvShowNewStreamOpenById } from './actions'
import TvShowNewView from './view'

function TvShowNew() {

    const dispatch = useDispatch()

    const categories = useSelector(getCategoriesAllFilter)
    const categoriesGeneral = useSelector(getCategoriesAll)

    const countries = useSelector(getCountriesAllFilter)
    const countriesGeneral = useSelector(getCountriesAll)
    const country = useSelector(getCountrySingle)

    const streams = useSelector(getStreamsAllFilter)
    const streamsGeneral = useSelector(getStreamsAll)
    const stream = useSelector(getStreamSingle)

    React.useEffect(() => {
        dispatch(showLoadingPattern(true))
        dispatch(getCategoryAll(null, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, ""))
        dispatch(getCountryAll(null, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, 0, ""))
        dispatch(getStreamAll(() => dispatch(showLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }, 0, ""))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

    async function insertMovie(titleValue: string, releaseValue: string, categoriesValue: [], countriesValue: [], streamsValue: [], resumeValue: string) {
        await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(registerTvShow(titleValue, releaseValue, categoriesValue, countriesValue, streamsValue, resumeValue, () => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingPattern(false))
        }))
    }

    return (
        <TvShowNewView
            streams={streams} stream={stream}
            openStream={(idStream: string) => dispatch(TvShowNewStreamOpenById(idStream))}
            actionChangeSearchStream={(searchText: string) => dispatch(TvShowNewStreamBySearch(searchText, streamsGeneral))}
            actionRefreshListStream={(searchText: string, callbackSucess: () => void) => refreshListStream(searchText, callbackSucess)}
            actionInsertRegisterStream={(nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => dispatch(TvShowNewStreamInsert(nameValue, callbackSuccess, calllbackError))}
            actionUpdateRegisterStream={(idStream: string, nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => dispatch(TvShowNewStreamUpdate(idStream, nameValue, callbackSuccess, calllbackError))}
            actionDeleteRegisterStream={(streamId: string, searchText: string, successDestroy: () => void) => dispatch(TvShowNewStreamDelete(streamId, searchText, successDestroy))}

            countries={countries} country={country}
            openCountry={(idCountry: string) => dispatch(TvShowNewCountryOpenById(idCountry))}
            actionChangeSearchCountry={(searchText: string) => dispatch(TvShowNewCountryBySearch(searchText, countriesGeneral))}
            actionRefreshListCountry={(searchText: string, callbackSucess: () => void) => refreshListCountry(searchText, callbackSucess)}
            actionInsertRegisterCountry={(nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => dispatch(TvShowNewCountryInsert(nameValue, callbackSuccess, calllbackError))}
            actionUpdateRegisterCountry={(idCountry: string, nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => dispatch(TvShowNewCountryUpdate(idCountry, nameValue, callbackSuccess, calllbackError))}
            actionDeleteRegisterCountry={(countryId: string, searchText: string, successDestroy: () => void) => dispatch(TvShowNewCountryDelete(countryId, searchText, successDestroy))}

            categories={categories} actionChangeSearchCategory={(searchText: string) => dispatch(TvShowNewCategoryBySearch(searchText, categoriesGeneral))}
            actionRefreshListCategory={(searchText: string, callbackSucess: () => void) => refreshListCategory(searchText, callbackSucess)}

            saveRegister={(titleValue: string, releaseValue: string, categoriesValue: [], countriesValue: [], streamsValue: [], resumeValue: string) => insertMovie(titleValue, releaseValue, categoriesValue, countriesValue, streamsValue, resumeValue)} />
    )
}

export default TvShowNew
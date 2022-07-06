import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MSG_NEW_REGISTER_SUCCESS, MSG_SAVED_DATA } from '../../../app/core/consts'
import { openAllInCategory } from '../../../app/redux/Category/category.actions'
import { getCategoriesAll, getCategoriesAllFilter } from '../../../app/redux/Category/category.selector'
import { openAllByAuthorizedInCountry } from '../../../app/redux/Country/country.actions'
import { getCountriesAll, getCountriesAllFilter, getCountrySingle } from '../../../app/redux/Country/country.selector'
import { setLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { openAllByAuthorizedInStream } from '../../../app/redux/Stream/stream.actions'
import { getStreamsAll, getStreamsAllFilter, getStreamSingle } from '../../../app/redux/Stream/stream.selector'
import { createInTvShow } from '../../../app/redux/TvShow/tvshow.actions'
import {
    TvShowNewPageCategoryBySearch, TvShowNewPageCountryBySearch, TvShowNewPageCountryInsert, TvShowNewPageCountryUpdate, TvShowNewPageCountryDelete,
    TvShowNewPageCountryOpenById, TvShowNewPageStreamDelete, TvShowNewPageStreamInsert, TvShowNewPageStreamUpdate, TvShowNewPageStreamBySearch, TvShowNewPageStreamOpenById
} from './actions'
import TvShowNewPageView from './view'

function TvShowNewPage() {
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
        dispatch(setLoadingPattern(true))
        dispatch(openAllInCategory(null, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }, ""))
        dispatch(openAllByAuthorizedInCountry(null, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }, ""))
        dispatch(openAllByAuthorizedInStream(() => dispatch(setLoadingPattern(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }, ""))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

    async function insertMovie(titleValue: string, releaseValue: string, categoriesValue: [], countriesValue: [], streamsValue: [], resumeValue: string) {
        await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(createInTvShow(titleValue, releaseValue, categoriesValue, countriesValue, streamsValue, resumeValue, () => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingPattern(false))
        }))
    }

    return (
        <TvShowNewPageView
            streams={streams} stream={stream}
            openStream={(idStream: string) => dispatch(TvShowNewPageStreamOpenById(idStream))}
            actionChangeSearchStream={(searchText: string) => dispatch(TvShowNewPageStreamBySearch(searchText, streamsGeneral))}
            actionRefreshListStream={(searchText: string, callbackSucess: () => void) => refreshListStream(searchText, callbackSucess)}
            actionInsertcreateInStream={(nameValue: string, callbackSuccess: () => void, calllbackError: () => void) =>
                dispatch(TvShowNewPageStreamInsert(nameValue, callbackSuccess, calllbackError))}
            actionUpdatecreateInStream={(idStream: string, nameValue: string, callbackSuccess: () => void, calllbackError: () => void) =>
                dispatch(TvShowNewPageStreamUpdate(idStream, nameValue, callbackSuccess, calllbackError))}
            actionDeletecreateInStream={(streamId: string, searchText: string, successDestroy: () => void) =>
                dispatch(TvShowNewPageStreamDelete(streamId, searchText, successDestroy))}

            countries={countries} country={country}
            openCountry={(idCountry: string) => dispatch(TvShowNewPageCountryOpenById(idCountry))}
            actionChangeSearchCountry={(searchText: string) => dispatch(TvShowNewPageCountryBySearch(searchText, countriesGeneral))}
            actionRefreshListCountry={(searchText: string, callbackSucess: () => void) => refreshListCountry(searchText, callbackSucess)}
            actionInsertcreateInCountry={(nameValue: string, callbackSuccess: () => void, calllbackError: () => void) =>
                dispatch(TvShowNewPageCountryInsert(nameValue, callbackSuccess, calllbackError))}
            actionUpdatecreateInCountry={(idCountry: string, nameValue: string, callbackSuccess: () => void, calllbackError: () => void) =>
                dispatch(TvShowNewPageCountryUpdate(idCountry, nameValue, callbackSuccess, calllbackError))}
            actionDeletecreateInCountry={(countryId: string, searchText: string, successDestroy: () => void) =>
                dispatch(TvShowNewPageCountryDelete(countryId, searchText, successDestroy))}

            categories={categories} actionChangeSearchCategory={(searchText: string) =>
                dispatch(TvShowNewPageCategoryBySearch(searchText, categoriesGeneral))}
            actionRefreshListCategory={(searchText: string, callbackSucess: () => void) =>
                refreshListCategory(searchText, callbackSucess)}

            saveRegister={(titleValue: string, releaseValue: string, categoriesValue: [], countriesValue: [], streamsValue: [], resumeValue: string) =>
                insertMovie(titleValue, releaseValue, categoriesValue, countriesValue, streamsValue, resumeValue)} />
    )
}

export default TvShowNewPage
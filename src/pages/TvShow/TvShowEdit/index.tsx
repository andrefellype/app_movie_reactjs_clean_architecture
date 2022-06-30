/* eslint-disable prefer-destructuring */
import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { showLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import { getCategoriesAll, getCategoriesAllFilter } from '../../../app/redux/Category/category.selector'
import { getCategoryAll } from '../../../app/redux/Category/category.actions'
import TvShowEditView from './view'
import { TvShowEditCategoryBySearch, TvShowEditCountryBySearch, TvShowEditCountryDelete, TvShowEditCountryInsert, TvShowEditCountryOpenById, TvShowEditCountryUpdate, TvShowEditStreamBySearch, TvShowEditStreamDelete, TvShowEditStreamInsert, TvShowEditStreamOpenById, TvShowEditStreamUpdate } from './actions'
import { getCountryAll } from '../../../app/redux/Country/country.actions'
import { getStreamAll } from '../../../app/redux/Stream/stream.actions'
import { getCountriesAll, getCountriesAllFilter, getCountrySingle } from '../../../app/redux/Country/country.selector'
import { getStreamsAll, getStreamsAllFilter, getStreamSingle } from '../../../app/redux/Stream/stream.selector'
import { getTvShowSingle } from '../../../app/redux/TvShow/tvshow.selector'
import { openTvShowById, updateTvShowById } from '../../../app/redux/TvShow/tvshow.actions'
import { showStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function TvShowEdit() {

    const dispatch = useDispatch()

    const getTvShow = useSelector(getTvShowSingle)
    const getLoading = useSelector(showStatusLoading)

    const { tvShowId } = useParams()

    const categories = useSelector(getCategoriesAllFilter)
    const categoriesGeneral = useSelector(getCategoriesAll)

    const countries = useSelector(getCountriesAllFilter)
    const countriesGeneral = useSelector(getCountriesAll)
    const country = useSelector(getCountrySingle)

    const streams = useSelector(getStreamsAllFilter)
    const streamsGeneral = useSelector(getStreamsAll)
    const stream = useSelector(getStreamSingle)

    React.useEffect(() => {
        if (typeof tvShowId !== "undefined" && tvShowId !== null) {
            dispatch(showLoadingPattern(true))
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
            dispatch(openTvShowById(tvShowId.toString(), () => dispatch(showLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingPattern(false))
            }))
        }
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

    async function updateRegister(titleValue: string, releaseValue: string, categoriesValue: [], countriesValue: [], streamsValue: [], resumeValue: string) {
        if (typeof tvShowId !== "undefined" && tvShowId !== null) {
            await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
            await dispatch(updateTvShowById(tvShowId, titleValue, releaseValue, categoriesValue, countriesValue, streamsValue, resumeValue, () => {
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
        <TvShowEditView getTvShow={getTvShow} isLoading={getIsLoading()}

            streams={streams} stream={stream}
            openStream={(idStream: string) => dispatch(TvShowEditStreamOpenById(idStream))}
            actionChangeSearchStream={(searchText: string) => dispatch(TvShowEditStreamBySearch(searchText, streamsGeneral))}
            actionRefreshListStream={(searchText: string, callbackSucess: () => void) => refreshListStream(searchText, callbackSucess)}
            actionInsertRegisterStream={(nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => dispatch(TvShowEditStreamInsert(nameValue, callbackSuccess, calllbackError))}
            actionUpdateRegisterStream={(idStream: string, nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => dispatch(TvShowEditStreamUpdate(idStream, nameValue, callbackSuccess, calllbackError))}
            actionDeleteRegisterStream={(streamId: string, searchText: string, successDestroy: () => void) => dispatch(TvShowEditStreamDelete(streamId, searchText, successDestroy))}

            countries={countries} country={country}
            openCountry={(idCountry: string) => dispatch(TvShowEditCountryOpenById(idCountry))}
            actionChangeSearchCountry={(searchText: string) => dispatch(TvShowEditCountryBySearch(searchText, countriesGeneral))}
            actionRefreshListCountry={(searchText: string, callbackSucess: () => void) => refreshListCountry(searchText, callbackSucess)}
            actionInsertRegisterCountry={(nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => dispatch(TvShowEditCountryInsert(nameValue, callbackSuccess, calllbackError))}
            actionUpdateRegisterCountry={(idCountry: string, nameValue: string, callbackSuccess: () => void, calllbackError: () => void) => dispatch(TvShowEditCountryUpdate(idCountry, nameValue, callbackSuccess, calllbackError))}
            actionDeleteRegisterCountry={(countryId: string, searchText: string, successDestroy: () => void) => dispatch(TvShowEditCountryDelete(countryId, searchText, successDestroy))}

            categories={categories} actionChangeSearchCategory={(searchText: string) => dispatch(TvShowEditCategoryBySearch(searchText, categoriesGeneral))}
            actionRefreshListCategory={(searchText: string, callbackSucess: () => void) => refreshListCategory(searchText, callbackSucess)}

            update={(titleValue: string, releaseValue: string, categoriesValue: [], countriesValue: [], streamsValue: [], resumeValue: string) => updateRegister(titleValue, releaseValue, categoriesValue, countriesValue, streamsValue, resumeValue)} />
    )
}

export default TvShowEdit
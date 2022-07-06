import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import { getCategoriesAll, getCategoriesAllFilter } from '../../../app/redux/Category/category.selector'
import { openAllInCategory } from '../../../app/redux/Category/category.actions'
import TvShowEditPageView from './view'
import {
    TvShowEditPageCategoryBySearch, TvShowEditPageCountryBySearch, TvShowEditPageCountryDelete, TvShowEditPageCountryInsert,
    TvShowEditPageCountryOpenById, TvShowEditPageCountryUpdate, TvShowEditPageStreamBySearch, TvShowEditPageStreamDelete,
    TvShowEditPageStreamInsert, TvShowEditPageStreamOpenById, TvShowEditPageStreamUpdate
} from './actions'
import { openAllByAuthorizedInCountry } from '../../../app/redux/Country/country.actions'
import { openAllByAuthorizedInStream } from '../../../app/redux/Stream/stream.actions'
import { getCountriesAll, getCountriesAllFilter, getCountrySingle } from '../../../app/redux/Country/country.selector'
import { getStreamsAll, getStreamsAllFilter, getStreamSingle } from '../../../app/redux/Stream/stream.selector'
import { getTvShowSingle } from '../../../app/redux/TvShow/tvshow.selector'
import { openInTvShow, updateByIdInTvShow } from '../../../app/redux/TvShow/tvshow.actions'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function TvShowEditPage() {
    const dispatch = useDispatch()

    const getTvShow = useSelector(getTvShowSingle)
    const getLoading = useSelector(isStatusLoading)

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
            dispatch(setLoadingPattern(true))
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
            dispatch(openInTvShow(tvShowId.toString(), () => dispatch(setLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }))
        }
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

    async function updateRegister(titleValue: string, releaseValue: string,
        categoriesValue: [], countriesValue: [], streamsValue: [], resumeValue: string) {
        if (typeof tvShowId !== "undefined" && tvShowId !== null) {
            await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
            await dispatch(updateByIdInTvShow(tvShowId, titleValue, releaseValue,
                categoriesValue, countriesValue, streamsValue, resumeValue, () => {
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
        <TvShowEditPageView getTvShow={getTvShow} isLoading={getIsLoading()}

            streams={streams} stream={stream}
            openStream={(idStream: string) => dispatch(TvShowEditPageStreamOpenById(idStream))}
            actionChangeSearchStream={(searchText: string) =>
                dispatch(TvShowEditPageStreamBySearch(searchText, streamsGeneral))}
            actionRefreshListStream={(searchText: string, callbackSucess: () => void) =>
                refreshListStream(searchText, callbackSucess)}
            actionInsertcreateInStream={(nameValue: string, callbackSuccess: () => void,
                calllbackError: () => void) => dispatch(TvShowEditPageStreamInsert(nameValue,
                    callbackSuccess, calllbackError))}
            actionUpdatecreateInStream={(idStream: string, nameValue: string,
                callbackSuccess: () => void, calllbackError: () => void) =>
                dispatch(TvShowEditPageStreamUpdate(idStream, nameValue, callbackSuccess, calllbackError))}
            actionDeletecreateInStream={(streamId: string, searchText: string,
                successDestroy: () => void) => dispatch(TvShowEditPageStreamDelete(streamId,
                    searchText, successDestroy))}

            countries={countries} country={country}
            openCountry={(idCountry: string) => dispatch(TvShowEditPageCountryOpenById(idCountry))}
            actionChangeSearchCountry={(searchText: string) =>
                dispatch(TvShowEditPageCountryBySearch(searchText, countriesGeneral))}
            actionRefreshListCountry={(searchText: string, callbackSucess: () => void) =>
                refreshListCountry(searchText, callbackSucess)}
            actionInsertcreateInCountry={(nameValue: string, callbackSuccess: () => void,
                calllbackError: () => void) => dispatch(TvShowEditPageCountryInsert(nameValue,
                    callbackSuccess, calllbackError))}
            actionUpdatecreateInCountry={(idCountry: string, nameValue: string,
                callbackSuccess: () => void, calllbackError: () => void) =>
                dispatch(TvShowEditPageCountryUpdate(idCountry, nameValue, callbackSuccess, calllbackError))}
            actionDeletecreateInCountry={(countryId: string, searchText: string,
                successDestroy: () => void) =>
                dispatch(TvShowEditPageCountryDelete(countryId, searchText, successDestroy))}

            categories={categories} actionChangeSearchCategory={(searchText: string) =>
                dispatch(TvShowEditPageCategoryBySearch(searchText, categoriesGeneral))}
            actionRefreshListCategory={(searchText: string, callbackSucess: () => void) =>
                refreshListCategory(searchText, callbackSucess)}

            update={(titleValue: string, releaseValue: string, categoriesValue: [], countriesValue: [],
                streamsValue: [], resumeValue: string) => updateRegister(titleValue, releaseValue,
                    categoriesValue, countriesValue, streamsValue, resumeValue)} />
    )
}

export default TvShowEditPage
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { insertMsgs, setLoadingTable } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import DirectorListPageView from './view'
import { openAllInDirector } from '../../../app/redux/Director/director.actions'
import { getDirectorsAll, getDirectorsAllFilter } from '../../../app/redux/Director/director.selector'
import {
    DirectorListPageApproved, DirectorListPageBySearch, DirectorListPageDeleteBatch, DirectorListPageDelete
} from './actions'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function DirectorListPage() {
    const dispatch = useDispatch()

    const directors = useSelector(getDirectorsAllFilter)
    const directorsGeneral = useSelector(getDirectorsAll)
    const isLoading = useSelector(isStatusLoading)

    async function refreshList(searchText = "", callbackSuccess: (() => void) | null = null) {
        await dispatch(setLoadingTable(true))
        await dispatch(openAllInDirector(() => {
            dispatch(setLoadingTable(false))
            if (callbackSuccess !== null)
                callbackSuccess()
        }, (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(setLoadingTable(false))
        }, searchText))
    }

    React.useEffect(() => {
        refreshList()
        // eslint-disable-next-line
    }, [])

    function updateGetListScroll(position) {
        return directors.slice(0, position)
    }

    return (
        <DirectorListPageView getListScroll={(positionScroll) => updateGetListScroll(positionScroll)} directors={directors}
            showLoading={isLoading} actionChangeSearchText={(searchText: string, callbackSuccess: () => void) =>
                dispatch(DirectorListPageBySearch(searchText, callbackSuccess, directorsGeneral))}
            actionRefreshList={(searchText: string, callbackSuccess: () => void) => refreshList(searchText, callbackSuccess)}
            actionDeleteRegister={(directorId: string, searchText: string) =>
                dispatch(DirectorListPageDelete(directorId, searchText))}
            actionApprovedRegister={(directorId: string, searchText: string) =>
                dispatch(DirectorListPageApproved(directorId, searchText))}
            actionDeleteBatch={(arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) =>
                dispatch(DirectorListPageDeleteBatch(arrayDeleteBatch, searchText, dispatchEraseBatch))} />
    )
}

export default DirectorListPage
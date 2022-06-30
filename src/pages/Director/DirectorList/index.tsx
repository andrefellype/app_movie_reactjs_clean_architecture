/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { insertMsgs, showLoadingTable } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import DirectorListView from './view'
import { getDirectorAll } from '../../../app/redux/Director/director.actions'
import { getDirectorsAll, getDirectorsAllFilter } from '../../../app/redux/Director/director.selector'
import { DirectorListApproved, DirectorListBySearch, DirectorListDeleteBatch, DirectorListDelete } from './actions'
import { showStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function DirectorList() {

    const dispatch = useDispatch()

    const directors = useSelector(getDirectorsAllFilter)
    const directorsGeneral = useSelector(getDirectorsAll)
    const isLoading = useSelector(showStatusLoading)

    async function refreshList(searchText = "") {
        await dispatch(showLoadingTable(true))
        await dispatch(getDirectorAll(() => dispatch(showLoadingTable(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingTable(false))
        }, 1, searchText))
    }

    React.useEffect(() => {
        refreshList()
        // eslint-disable-next-line
    }, [])

    function updateGetListScroll(position) {
        return directors.slice(0, position)
    }

    return (
        <DirectorListView getListScroll={(positionScroll) => updateGetListScroll(positionScroll)} directors={directors} showLoading={isLoading}
            actionChangeSearchText={(searchText: string, callbackSuccess: () => void) => dispatch(DirectorListBySearch(searchText, callbackSuccess, directorsGeneral))}
            actionRefreshList={(searchText: string) => refreshList(searchText)}
            actionDeleteRegister={(directorId: string, searchText: string) => dispatch(DirectorListDelete(directorId, searchText))}
            actionApprovedRegister={(directorId: string, searchText: string) => dispatch(DirectorListApproved(directorId, searchText))}
            actionDeleteBatch={(arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) => dispatch(DirectorListDeleteBatch(arrayDeleteBatch, searchText, dispatchEraseBatch))} />
    )
}

export default DirectorList
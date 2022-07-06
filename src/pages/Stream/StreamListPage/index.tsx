/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { insertMsgs, setLoadingTable } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { openAllInStream } from '../../../app/redux/Stream/stream.actions'
import { getStreamsAll, getStreamsAllFilter } from '../../../app/redux/Stream/stream.selector'
import { StreamListPageApproved, StreamListPageBySearch, StreamListPageDelete, StreamListPageDeleteBatch } from './actions'
import StreamListPageView from './view'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function StreamListPage() {
    const dispatch = useDispatch()

    const streams = useSelector(getStreamsAllFilter)
    const streamsGeneral = useSelector(getStreamsAll)
    const isLoading = useSelector(isStatusLoading)

    async function refreshList(searchText = "", callbackSuccess: (() => void) | null = null) {
        await dispatch(setLoadingTable(true))
        await dispatch(openAllInStream(() => {
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
        return streams.slice(0, position)
    }

    return (
        <StreamListPageView getListScroll={(positionScroll) => updateGetListScroll(positionScroll)}
            showLoading={isLoading} streams={streams}
            actionChangeSearchText={(searchText: string, callbackSuccess: () => void) =>
                dispatch(StreamListPageBySearch(searchText, callbackSuccess, streamsGeneral))}
            actionRefreshList={(searchText: string, callbackSuccess: () => void) =>
                refreshList(searchText, callbackSuccess)}
            actionDeleteRegister={(streamId: string, searchText: string) =>
                dispatch(StreamListPageDelete(streamId, searchText))}
            actionApprovedRegister={(streamId: string, searchText: string) =>
                dispatch(StreamListPageApproved(streamId, searchText))}
            actionDeleteBatch={(arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) =>
                dispatch(StreamListPageDeleteBatch(arrayDeleteBatch, searchText, dispatchEraseBatch))} />
    )
}

export default StreamListPage
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { insertMsgs, showLoadingTable } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { getStreamAll } from '../../../app/redux/Stream/stream.actions'
import { getStreamsAll, getStreamsAllFilter } from '../../../app/redux/Stream/stream.selector'
import { StreamListApproved, StreamListBySearch, StreamListDelete, StreamListDeleteBatch } from './actions'
import StreamListView from './view'
import { showStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function StreamList() {

    const dispatch = useDispatch()

    const streams = useSelector(getStreamsAllFilter)
    const streamsGeneral = useSelector(getStreamsAll)
    const isLoading = useSelector(showStatusLoading)

    async function refreshList(searchText = "") {
        await dispatch(showLoadingTable(true))
        await dispatch(getStreamAll(() => dispatch(showLoadingTable(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingTable(false))
        }, 1, searchText))
    }

    React.useEffect(() => {
        refreshList()
        // eslint-disable-next-line
    }, [])

    function updateGetListScroll(position) {
        return streams.slice(0, position)
    }

    return (
        <StreamListView getListScroll={(positionScroll) => updateGetListScroll(positionScroll)} showLoading={isLoading} streams={streams}
            actionChangeSearchText={(searchText: string, callbackSuccess: () => void) => dispatch(StreamListBySearch(searchText, callbackSuccess, streamsGeneral))}
            actionRefreshList={(searchText: string) => refreshList(searchText)}
            actionDeleteRegister={(streamId: string, searchText: string) => dispatch(StreamListDelete(streamId, searchText))}
            actionApprovedRegister={(streamId: string, searchText: string) => dispatch(StreamListApproved(streamId, searchText))}
            actionDeleteBatch={(arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) => dispatch(StreamListDeleteBatch(arrayDeleteBatch, searchText, dispatchEraseBatch))} />
    )
}

export default StreamList
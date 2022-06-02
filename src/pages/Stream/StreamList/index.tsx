/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GetListPaginate from '../../../app/components/Utils/GetListPaginate'
import { showLoadingMain } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'
import { getStreamAll } from '../../../app/redux/Stream/stream.actions'
import { getStreamsAll, getStreamsAllFilter } from '../../../app/redux/Stream/stream.selector'
import { StreamListApproved, StreamListBySearch, StreamListDelete, StreamListDeleteBatch } from './actions'
import StreamListView from './view'

function StreamList() {

    const dispatch = useDispatch()

    const valueListPaginate = 6
    const [positionPagination, setPositionPagination] = React.useState(1)
    const streams = useSelector(getStreamsAllFilter)
    const streamsGeneral = useSelector(getStreamsAll)

    async function refreshList(searchText = "") {
        await dispatch(showLoadingMain(true))
        await dispatch(getStreamAll(() => dispatch(showLoadingMain(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingMain(false))
        }, 1, searchText))
    }

    React.useEffect(() => {
        refreshList()
        // eslint-disable-next-line
    }, [])

    React.useEffect(() => {
        if (positionPagination > 1) {
            if (GetListPaginate(streams, positionPagination, valueListPaginate).length === 0) {
                setPositionPagination((positionPagination - 1))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [streams])

    function getCountPaginate() {
        if (streams) {
            let divid = (streams.length / valueListPaginate)
            if (!Number.isInteger(divid)) {
                divid = Math.floor(divid) + 1
            }
            return divid
        }
        return 0
    }

    return (
        <StreamListView streamsBatch={streams} positionPage={positionPagination} streams={GetListPaginate(streams, positionPagination, valueListPaginate)} countStream={getCountPaginate()}
            changePagination={(value: number) => setPositionPagination(value)}
            actionChangeSearchText={(searchText: string) => dispatch(StreamListBySearch(searchText, streamsGeneral))}
            actionRefreshList={(searchText: string) => refreshList(searchText)}
            actionDeleteRegister={(streamId: string, searchText: string) => dispatch(StreamListDelete(streamId, searchText))}
            actionApprovedRegister={(streamId: string, searchText: string) => dispatch(StreamListApproved(streamId, searchText))}
            actionDeleteBatch={(arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) => dispatch(StreamListDeleteBatch(arrayDeleteBatch, searchText, dispatchEraseBatch))} />
    )
}

export default StreamList
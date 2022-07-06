/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openAllInActor } from '../../../app/redux/Actor/actor.actions'
import { getActorsAll, getActorsAllFilter } from '../../../app/redux/Actor/actor.selector'
import { insertMsgs, setLoadingTable } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'
import {
    ActorListPageApproved, ActorListPageBySearch, ActorListPageDelete, ActorListPageDeleteBatch
} from './actions'
import ActorListPageView from './view'

function ActorListPage() {
    const dispatch = useDispatch()

    const actors = useSelector(getActorsAllFilter)
    const actorsGeneral = useSelector(getActorsAll)
    const isLoading = useSelector(isStatusLoading)

    async function refreshList(searchText = "", callbackSuccess: (() => void) | null = null) {
        await dispatch(setLoadingTable(true))
        await dispatch(openAllInActor(() => {
            dispatch(setLoadingTable(false))
            if (callbackSuccess !== null)
                callbackSuccess()
        }, (errorMsg) => {
            dispatch(setLoadingTable(false))
            dispatch(insertMsgs(errorMsg, 'error'))
        }, searchText))
    }

    React.useEffect(() => {
        refreshList()
        // eslint-disable-next-line
    }, [])

    function updateGetListScroll(position) {
        return actors.slice(0, position)
    }

    return (
        <ActorListPageView showLoading={isLoading} getListScroll={(positionScroll) => updateGetListScroll(positionScroll)}
            actors={actors} actionChangeSearchText={(searchText: string, callbackSuccess: () => void) =>
                dispatch(ActorListPageBySearch(searchText, callbackSuccess, actorsGeneral))}
            actionRefreshList={(searchText: string, callbackSuccess: () => void) => refreshList(searchText, callbackSuccess)}
            actionDeleteRegister={(actorId: string, searchText: string) => dispatch(ActorListPageDelete(actorId, searchText))}
            actionApprovedRegister={(actorId: string, searchText: string) => dispatch(ActorListPageApproved(actorId, searchText))}
            actionDeleteBatch={(arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) =>
                dispatch(ActorListPageDeleteBatch(arrayDeleteBatch, searchText, dispatchEraseBatch))} />
    )
}

export default ActorListPage
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getActorAll } from '../../../app/redux/Actor/actor.actions'
import { getActorsAll, getActorsAllFilter } from '../../../app/redux/Actor/actor.selector'
import { insertMsgs, showLoadingTable } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { showStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'
import { ActorListApproved, ActorListBySearch, ActorListDelete, ActorListDeleteBatch } from './actions'
import ActorListView from './view'

function ActorList() {

    const dispatch = useDispatch()

    const actors = useSelector(getActorsAllFilter)
    const actorsGeneral = useSelector(getActorsAll)
    const isLoading = useSelector(showStatusLoading)

    async function refreshList(searchText = "") {
        await dispatch(showLoadingTable(true))
        await dispatch(getActorAll(() => dispatch(showLoadingTable(false)), (errorMsg) => {
            dispatch(showLoadingTable(false))
            dispatch(insertMsgs(errorMsg, 'error'))
        }, 1, searchText))
    }

    React.useEffect(() => {
        refreshList()
        // eslint-disable-next-line
    }, [])

    function updateGetListScroll(position) {
        return actors.slice(0, position)
    }

    return (
        <ActorListView showLoading={isLoading} getListScroll={(positionScroll) => updateGetListScroll(positionScroll)} actors={actors}
            actionChangeSearchText={(searchText: string, callbackSuccess: () => void) => dispatch(ActorListBySearch(searchText, callbackSuccess, actorsGeneral))}
            actionRefreshList={(searchText: string) => refreshList(searchText)}
            actionDeleteRegister={(actorId: string, searchText: string) => dispatch(ActorListDelete(actorId, searchText))}
            actionApprovedRegister={(actorId: string, searchText: string) => dispatch(ActorListApproved(actorId, searchText))}
            actionDeleteBatch={(arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) => dispatch(ActorListDeleteBatch(arrayDeleteBatch, searchText, dispatchEraseBatch))} />
    )
}

export default ActorList
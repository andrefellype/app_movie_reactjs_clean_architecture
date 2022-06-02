/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GetListPaginate from '../../../app/components/Utils/GetListPaginate'
import { getActorAll } from '../../../app/redux/Actor/actor.actions'
import { getActorsAll, getActorsAllFilter } from '../../../app/redux/Actor/actor.selector'
import { showLoadingMain } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'
import { ActorListApproved, ActorListBySearch, ActorListDelete, ActorListDeleteBatch } from './actions'
import ActorListView from './view'

function ActorList() {

    const dispatch = useDispatch()

    const valueListPaginate = 6
    const [positionPagination, setPositionPagination] = React.useState(1)
    const actors = useSelector(getActorsAllFilter)
    const actorsGeneral = useSelector(getActorsAll)

    async function refreshList(searchText = "") {
        await dispatch(showLoadingMain(true))
        await dispatch(getActorAll(() => dispatch(showLoadingMain(false)), (errorMsg) => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs(errorMsg, 'error'))
        }, 1, searchText))
    }

    React.useEffect(() => {
        refreshList()
        // eslint-disable-next-line
    }, [])

    React.useEffect(() => {
        if (positionPagination > 1) {
            if (GetListPaginate(actors, positionPagination, valueListPaginate).length === 0) {
                setPositionPagination((positionPagination - 1))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [actors])

    function getCountPaginate() {
        if (actors) {
            let divid = (actors.length / valueListPaginate)
            if (!Number.isInteger(divid)) {
                divid = Math.floor(divid) + 1
            }
            return divid
        }
        return 0
    }

    return (
        <ActorListView actorsBatch={actors} positionPage={positionPagination} actors={GetListPaginate(actors, positionPagination, valueListPaginate)} countActor={getCountPaginate()}
            changePagination={(value: number) => setPositionPagination(value)}
            actionChangeSearchText={(searchText: string) => dispatch(ActorListBySearch(searchText, actorsGeneral))}
            actionRefreshList={(searchText: string) => refreshList(searchText)}
            actionDeleteRegister={(actorId: string, searchText: string) => dispatch(ActorListDelete(actorId, searchText))}
            actionApprovedRegister={(actorId: string, searchText: string) => dispatch(ActorListApproved(actorId, searchText))}
            actionDeleteBatch={(arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) => dispatch(ActorListDeleteBatch(arrayDeleteBatch, searchText, dispatchEraseBatch))} />
    )
}

export default ActorList
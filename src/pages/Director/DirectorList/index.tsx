/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading } from '../../../app/redux/LoadingMain/loadingMain.actions'
import DirectorListView from './view'
import { getDirectorAll } from '../../../app/redux/Director/director.actions'
import { getDirectorsAll, getDirectorsAllFilter } from '../../../app/redux/Director/director.selector'
import { DirectorListApproved, DirectorListBySearch, DirectorListDeleteBatch, DirectorListDelete } from './actions'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'
import GetListPaginate from '../../../app/components/Utils/GetListPaginate'

function DirectorList() {

    const dispatch = useDispatch()

    const valueListPaginate = 6
    const [positionPagination, setPositionPagination] = React.useState(1)
    const directors = useSelector(getDirectorsAllFilter)
    const directorsGeneral = useSelector(getDirectorsAll)

    async function refreshList(searchText = "") {
        await dispatch(showLoading(true))
        await dispatch(getDirectorAll(() => dispatch(showLoading(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, 1, searchText))
    }

    React.useEffect(() => {
        refreshList()
        // eslint-disable-next-line
    }, [])

    React.useEffect(() => {
        if (positionPagination > 1) {
            if (GetListPaginate(directors, positionPagination, valueListPaginate).length === 0) {
                setPositionPagination((positionPagination - 1))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [directors])

    function getCountPaginate() {
        if (directors) {
            let divid = (directors.length / valueListPaginate)
            if (!Number.isInteger(divid)) {
                divid = Math.floor(divid) + 1
            }
            return divid
        }
        return 0
    }

    return (
        <DirectorListView directorsBatch={directors} positionPage={positionPagination} directors={GetListPaginate(directors, positionPagination, valueListPaginate)} countDirector={getCountPaginate()}
            changePagination={(value: number) => setPositionPagination(value)}
            actionChangeSearchText={(searchText: string) => dispatch(DirectorListBySearch(searchText, directorsGeneral))}
            actionRefreshList={(searchText: string) => refreshList(searchText)}
            actionDeleteRegister={(directorId: string, searchText: string) => dispatch(DirectorListDelete(directorId, searchText))}
            actionApprovedRegister={(directorId: string, searchText: string) => dispatch(DirectorListApproved(directorId, searchText))}
            actionDeleteBatch={(arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) => dispatch(DirectorListDeleteBatch(arrayDeleteBatch, searchText, dispatchEraseBatch))} />
    )
}

export default DirectorList
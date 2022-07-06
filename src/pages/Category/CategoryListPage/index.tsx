/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { insertMsgs, setLoadingTable } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import CategoryListPageView from './view'
import { getCategoriesAll, getCategoriesAllFilter } from '../../../app/redux/Category/category.selector'
import { openAllInCategory } from '../../../app/redux/Category/category.actions'
import {
    CategoryListPageBySearch, CategoryListPageDeleteBatch, CategoryListPageDelete
} from './actions'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function CategoryListPage() {
    const dispatch = useDispatch()

    const categories = useSelector(getCategoriesAllFilter)
    const categoriesGeneral = useSelector(getCategoriesAll)
    const isLoading = useSelector(isStatusLoading)

    async function refreshList(searchText = "", callbackSuccess: (() => void) | null = null) {
        await dispatch(setLoadingTable(true))
        await dispatch(openAllInCategory(() => {
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
        return categories.slice(0, position)
    }

    return (
        <CategoryListPageView getListScroll={(positionScroll) => updateGetListScroll(positionScroll)}
            showLoading={isLoading} categories={categories}
            actionChangeSearchText={(searchText: string, callbackSuccess: () => void) =>
                dispatch(CategoryListPageBySearch(searchText, callbackSuccess, categoriesGeneral))}
            actionRefreshList={(searchText: string, callbackSuccess: () => void) => refreshList(searchText, callbackSuccess)}
            actionDeleteRegister={(categoryId: string, searchText: string) =>
                dispatch(CategoryListPageDelete(categoryId, searchText))}
            actionDeleteBatch={(arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) =>
                dispatch(CategoryListPageDeleteBatch(arrayDeleteBatch, searchText, dispatchEraseBatch))} />
    )
}

export default CategoryListPage
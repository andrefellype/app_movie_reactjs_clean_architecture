/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { insertMsgs, showLoadingTable } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import CategoryListView from './view'
import { getCategoriesAll, getCategoriesAllFilter } from '../../../app/redux/Category/category.selector'
import { getCategoryAll } from '../../../app/redux/Category/category.actions'
import { CategoryListBySearch, CategoryListDeleteBatch, CategoryListDelete } from './actions'
import { showStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function CategoryList() {

    const dispatch = useDispatch()

    const categories = useSelector(getCategoriesAllFilter)
    const categoriesGeneral = useSelector(getCategoriesAll)
    const isLoading = useSelector(showStatusLoading)

    async function refreshList(searchText = "") {
        await dispatch(showLoadingTable(true))
        await dispatch(getCategoryAll(() => dispatch(showLoadingTable(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoadingTable(false))
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
        <CategoryListView getListScroll={(positionScroll) => updateGetListScroll(positionScroll)} showLoading={isLoading} categories={categories}
            actionChangeSearchText={(searchText: string, callbackSuccess: () => void) => dispatch(CategoryListBySearch(searchText, callbackSuccess, categoriesGeneral))} actionRefreshList={(searchText: string) => refreshList(searchText)}
            actionDeleteRegister={(categoryId: string, searchText: string) => dispatch(CategoryListDelete(categoryId, searchText))}
            actionDeleteBatch={(arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) => dispatch(CategoryListDeleteBatch(arrayDeleteBatch, searchText, dispatchEraseBatch))} />
    )
}

export default CategoryList
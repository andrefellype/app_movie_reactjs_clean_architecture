/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading } from '../../../app/redux/LoadingMain/loadingMain.actions'
import CategoryListView from './view'
import { getCategoriesAll, getCategoriesAllFilter } from '../../../app/redux/Category/category.selector'
import { getCategoryAll } from '../../../app/redux/Category/category.actions'
import { CategoryListBySearch, CategoryListDeleteBatch, CategoryListDelete } from './actions'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'
import GetListPaginate from '../../../app/components/Utils/GetListPaginate'

function CategoryList() {

    const dispatch = useDispatch()

    const valueListPaginate = 6
    const [positionPagination, setPositionPagination] = React.useState(1)
    const categories = useSelector(getCategoriesAllFilter)
    const categoriesGeneral = useSelector(getCategoriesAll)

    async function refreshList(searchText = "") {
        await dispatch(showLoading(true))
        await dispatch(getCategoryAll(() => dispatch(showLoading(false)), (errorsMsg) => {
            dispatch(insertMsgs(errorsMsg, 'error'))
            dispatch(showLoading(false))
        }, searchText))
    }

    React.useEffect(() => {
        refreshList()
        // eslint-disable-next-line
    }, [])

    React.useEffect(() => {
        if (positionPagination > 1) {
            if (GetListPaginate(categories, positionPagination, valueListPaginate).length === 0) {
                setPositionPagination((positionPagination - 1))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories])

    function getCountPaginate() {
        if (categories) {
            let divid = (categories.length / valueListPaginate)
            if (!Number.isInteger(divid)) {
                divid = Math.floor(divid) + 1
            }
            return divid
        }
        return 0
    }

    return (
        <CategoryListView categoriesBatch={categories} positionPage={positionPagination} categories={GetListPaginate(categories, positionPagination, valueListPaginate)} countCategory={getCountPaginate()}
            changePagination={(value: number) => setPositionPagination(value)}
            actionChangeSearchText={(searchText: string) => dispatch(CategoryListBySearch(searchText, categoriesGeneral))}
            actionRefreshList={(searchText: string) => refreshList(searchText)}
            actionDeleteRegister={(categoryId: string, searchText: string) => dispatch(CategoryListDelete(categoryId, searchText))}
            actionDeleteBatch={(arrayDeleteBatch: any, searchText: string, dispatchEraseBatch: any) => dispatch(CategoryListDeleteBatch(arrayDeleteBatch, searchText, dispatchEraseBatch))} />
    )
}

export default CategoryList
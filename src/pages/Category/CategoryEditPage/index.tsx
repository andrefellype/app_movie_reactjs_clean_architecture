import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import { getCategorySingle } from '../../../app/redux/Category/category.selector'
import { openInCategory, updateByIdInCategory } from '../../../app/redux/Category/category.actions'
import CategoryEditPageView from './view'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function CategoryEditPage() {
    const dispatch = useDispatch()

    const getCategory = useSelector(getCategorySingle)
    const getLoading = useSelector(isStatusLoading)

    const { categoryId } = useParams()

    React.useEffect(() => {
        if (typeof categoryId !== "undefined" && categoryId !== null) {
            dispatch(setLoadingPattern(true))
            dispatch(openInCategory(categoryId.toString(), () => dispatch(setLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }))
        }
        // eslint-disable-next-line
    }, [])

    async function updateRegister(nameField: string) {
        if (typeof categoryId !== "undefined" && categoryId !== null) {
            await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
            await dispatch(updateByIdInCategory(categoryId.toString(), nameField, () => {
                dispatch(setLoadingPattern(false))
                dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success", null, "reload_page"))
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }))
        }
    }

    function getIsLoading() {
        if (typeof getLoading !== "undefined" && typeof getLoading.statusPattern !== "undefined") {
            return getLoading.statusPattern
        }
        return false
    }

    return (
        <CategoryEditPageView isLoading={getIsLoading()} getCategory={getCategory} update={(nameField: string) => updateRegister(nameField)} />
    )
}

export default CategoryEditPage
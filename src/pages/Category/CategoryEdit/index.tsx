/* eslint-disable prefer-destructuring */
import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { showLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import { getCategorySingle } from '../../../app/redux/Category/category.selector'
import { openCategoryById, updateCategoryById } from '../../../app/redux/Category/category.actions'
import CategoryEditView from './view'
import { showStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function CategoryEdit() {

    const dispatch = useDispatch()

    const getCategory = useSelector(getCategorySingle)
    const getLoading = useSelector(showStatusLoading)

    const { categoryId } = useParams()

    React.useEffect(() => {
        if (typeof categoryId !== "undefined" && categoryId !== null) {
            dispatch(showLoadingPattern(true))
            dispatch(openCategoryById(categoryId.toString(), () => dispatch(showLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingPattern(false))
            }))
        }
        // eslint-disable-next-line
    }, [])

    async function updateRegister(nameField: string) {
        if (typeof categoryId !== "undefined" && categoryId !== null) {
            await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
            await dispatch(updateCategoryById(categoryId.toString(), nameField, () => {
                dispatch(showLoadingPattern(false))
                dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success", null, "reload_page"))
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingPattern(false))
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
        <CategoryEditView isLoading={getIsLoading()} getCategory={getCategory} update={(nameField: string) => updateRegister(nameField)} />
    )
}

export default CategoryEdit
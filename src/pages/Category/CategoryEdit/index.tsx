/* eslint-disable prefer-destructuring */
import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { showLoadingMain } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import { getCategorySingle } from '../../../app/redux/Category/category.selector'
import { openCategoryById, updateCategory } from '../../../app/redux/Category/category.actions'
import CategoryEditView from './view'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'

function CategoryEdit() {

    const dispatch = useDispatch()

    const getCategory = useSelector(getCategorySingle)

    const { categoryId } = useParams()

    React.useEffect(() => {
        if (typeof categoryId !== "undefined" && categoryId !== null) {
            dispatch(showLoadingMain(true))
            dispatch(openCategoryById(categoryId.toString(), () => dispatch(showLoadingMain(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingMain(false))
            }))
        }
        // eslint-disable-next-line
    }, [])

    async function updateRegister(nameField: string) {
        if (typeof categoryId !== "undefined" && categoryId !== null) {
            await dispatch(showLoadingMain(true, MSG_SAVED_DATA))
            await dispatch(updateCategory(categoryId.toString(), nameField, () => {
                dispatch(showLoadingMain(false))
                dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success", null, "reload_page"))
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingMain(false))
            }))
        }
    }

    return (
        <CategoryEditView getCategory={getCategory} update={(nameField: string) => updateRegister(nameField)} />
    )
}

export default CategoryEdit
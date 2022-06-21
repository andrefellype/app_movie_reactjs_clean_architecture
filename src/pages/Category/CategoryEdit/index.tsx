/* eslint-disable prefer-destructuring */
import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import { getCategorySingle } from '../../../app/redux/Category/category.selector'
import { openCategoryById, updateCategoryById } from '../../../app/redux/Category/category.actions'
import CategoryEditView from './view'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'

function CategoryEdit() {

    const dispatch = useDispatch()

    const getCategory = useSelector(getCategorySingle)

    const { categoryId } = useParams()

    React.useEffect(() => {
        if (typeof categoryId !== "undefined" && categoryId !== null) {
            dispatch(showLoading(true))
            dispatch(openCategoryById(categoryId.toString(), () => dispatch(showLoading(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoading(false))
            }))
        }
        // eslint-disable-next-line
    }, [])

    async function updateRegister(nameField: string) {
        if (typeof categoryId !== "undefined" && categoryId !== null) {
            await dispatch(showLoading(true, MSG_SAVED_DATA))
            await dispatch(updateCategoryById(categoryId.toString(), nameField, () => {
                dispatch(showLoading(false))
                dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success", null, "reload_page"))
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoading(false))
            }))
        }
    }

    return (
        <CategoryEditView getCategory={getCategory} update={(nameField: string) => updateRegister(nameField)} />
    )
}

export default CategoryEdit
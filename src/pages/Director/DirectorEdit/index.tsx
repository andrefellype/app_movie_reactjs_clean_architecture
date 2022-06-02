/* eslint-disable prefer-destructuring */
import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { showLoadingMain } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import DirectorEditView from './view'
import { getDirectorSingle } from '../../../app/redux/Director/director.selector'
import { openDirectorById, updateDirector } from '../../../app/redux/Director/director.actions'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'

function DirectorEdit() {

    const dispatch = useDispatch()

    const getDirector = useSelector(getDirectorSingle)

    const { directorId } = useParams()

    React.useEffect(() => {
        if (typeof directorId !== "undefined" && directorId !== null) {
            dispatch(showLoadingMain(true))
            dispatch(openDirectorById(directorId.toString(), () => dispatch(showLoadingMain(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingMain(false))
            }))
        }
        // eslint-disable-next-line
    }, [])

    async function updateRegister(nameField: string) {
        if (typeof directorId !== "undefined" && directorId !== null) {
            await dispatch(showLoadingMain(true, MSG_SAVED_DATA))
            await dispatch(updateDirector(directorId.toString(), nameField, () => {
                dispatch(showLoadingMain(false))
                dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success", null, "reload_page"))
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingMain(false))
            }))
        }
    }

    return (
        <DirectorEditView getDirector={getDirector} update={(nameField: string) => updateRegister(nameField)} />
    )
}

export default DirectorEdit
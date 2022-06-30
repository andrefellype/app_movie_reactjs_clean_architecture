/* eslint-disable prefer-destructuring */
import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { showLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import DirectorEditView from './view'
import { getDirectorSingle } from '../../../app/redux/Director/director.selector'
import { openDirectorById, updateDirectorById } from '../../../app/redux/Director/director.actions'
import { showStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function DirectorEdit() {

    const dispatch = useDispatch()

    const getDirector = useSelector(getDirectorSingle)
    const getLoading = useSelector(showStatusLoading)

    const { directorId } = useParams()

    React.useEffect(() => {
        if (typeof directorId !== "undefined" && directorId !== null) {
            dispatch(showLoadingPattern(true))
            dispatch(openDirectorById(directorId.toString(), () => dispatch(showLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingPattern(false))
            }))
        }
        // eslint-disable-next-line
    }, [])

    async function updateRegister(nameField: string) {
        if (typeof directorId !== "undefined" && directorId !== null) {
            await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
            await dispatch(updateDirectorById(directorId.toString(), nameField, () => {
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
        <DirectorEditView isLoading={getIsLoading()} getDirector={getDirector} update={(nameField: string) => updateRegister(nameField)} />
    )
}

export default DirectorEdit
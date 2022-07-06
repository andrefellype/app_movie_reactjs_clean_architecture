import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import DirectorEditPageView from './view'
import { getDirectorSingle } from '../../../app/redux/Director/director.selector'
import { openInDirector, updateByIdInDirector } from '../../../app/redux/Director/director.actions'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function DirectorEditPage() {
    const dispatch = useDispatch()

    const getDirector = useSelector(getDirectorSingle)
    const getLoading = useSelector(isStatusLoading)

    const { directorId } = useParams()

    React.useEffect(() => {
        if (typeof directorId !== "undefined" && directorId !== null) {
            dispatch(setLoadingPattern(true))
            dispatch(openInDirector(directorId.toString(), () => dispatch(setLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }))
        }
        // eslint-disable-next-line
    }, [])

    async function updateRegister(nameField: string) {
        if (typeof directorId !== "undefined" && directorId !== null) {
            await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
            await dispatch(updateByIdInDirector(directorId.toString(), nameField, () => {
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
        <DirectorEditPageView isLoading={getIsLoading()} getDirector={getDirector} update={(nameField: string) => updateRegister(nameField)} />
    )
}

export default DirectorEditPage
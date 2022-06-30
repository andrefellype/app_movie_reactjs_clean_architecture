/* eslint-disable prefer-destructuring */
import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { showLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import StreamEditView from './view'
import { getStreamSingle } from '../../../app/redux/Stream/stream.selector'
import { openStreamById, updateStreamById } from '../../../app/redux/Stream/stream.actions'
import { showStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function StreamEdit() {

    const dispatch = useDispatch()

    const getStream = useSelector(getStreamSingle)
    const getLoading = useSelector(showStatusLoading)

    const { streamId } = useParams()

    React.useEffect(() => {
        if (typeof streamId !== "undefined" && streamId !== null) {
            dispatch(showLoadingPattern(true))
            dispatch(openStreamById(streamId.toString(), () => dispatch(showLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoadingPattern(false))
            }))
        }
        // eslint-disable-next-line
    }, [])

    async function updateRegister(nameField: string) {
        if (typeof streamId !== "undefined" && streamId !== null) {
            await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
            await dispatch(updateStreamById(streamId.toString(), nameField, () => {
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
        <StreamEditView isLoading={getIsLoading()} getStream={getStream} update={(nameField: string) => updateRegister(nameField)} />
    )
}

export default StreamEdit
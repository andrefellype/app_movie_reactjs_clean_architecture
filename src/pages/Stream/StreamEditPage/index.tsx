import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import StreamEditPageView from './view'
import { getStreamSingle } from '../../../app/redux/Stream/stream.selector'
import { openInStream, updateByIdInStream } from '../../../app/redux/Stream/stream.actions'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function StreamEditPage() {
    const dispatch = useDispatch()

    const getStream = useSelector(getStreamSingle)
    const getLoading = useSelector(isStatusLoading)

    const { streamId } = useParams()

    React.useEffect(() => {
        if (typeof streamId !== "undefined" && streamId !== null) {
            dispatch(setLoadingPattern(true))
            dispatch(openInStream(streamId.toString(), () => dispatch(setLoadingPattern(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(setLoadingPattern(false))
            }))
        }
        // eslint-disable-next-line
    }, [])

    async function updateRegister(nameField: string) {
        if (typeof streamId !== "undefined" && streamId !== null) {
            await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
            await dispatch(updateByIdInStream(streamId.toString(), nameField, () => {
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
        <StreamEditPageView isLoading={getIsLoading()} getStream={getStream} update={(nameField: string) => updateRegister(nameField)} />
    )
}

export default StreamEditPage
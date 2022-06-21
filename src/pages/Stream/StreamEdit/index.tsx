/* eslint-disable prefer-destructuring */
import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import StreamEditView from './view'
import { getStreamSingle } from '../../../app/redux/Stream/stream.selector'
import { openStreamById, updateStreamById } from '../../../app/redux/Stream/stream.actions'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'

function StreamEdit() {

    const dispatch = useDispatch()

    const getStream = useSelector(getStreamSingle)

    const { streamId } = useParams()

    React.useEffect(() => {
        if (typeof streamId !== "undefined" && streamId !== null) {
            dispatch(showLoading(true))
            dispatch(openStreamById(streamId.toString(), () => dispatch(showLoading(false)), (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoading(false))
            }))
        }
        // eslint-disable-next-line
    }, [])

    async function updateRegister(nameField: string) {
        if (typeof streamId !== "undefined" && streamId !== null) {
            await dispatch(showLoading(true, MSG_SAVED_DATA))
            await dispatch(updateStreamById(streamId.toString(), nameField, () => {
                dispatch(showLoading(false))
                dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success", null, "reload_page"))
            }, (errorsMsg) => {
                dispatch(insertMsgs(errorsMsg, 'error'))
                dispatch(showLoading(false))
            }))
        }
    }

    return (
        <StreamEditView getStream={getStream} update={(nameField: string) => updateRegister(nameField)} />
    )
}

export default StreamEdit
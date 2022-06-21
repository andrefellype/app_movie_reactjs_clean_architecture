/* eslint-disable prefer-destructuring */
import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import { getActorSingle } from '../../../app/redux/Actor/actor.selector'
import ActorEditView from './view'
import { openActorById, updateActorById } from '../../../app/redux/Actor/actor.actions'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'

function ActorEdit() {

    const dispatch = useDispatch()

    const getActor = useSelector(getActorSingle)

    const { actorId } = useParams()

    React.useEffect(() => {
        if (typeof actorId !== "undefined" && actorId !== null) {
            dispatch(showLoading(true))
            dispatch(openActorById(actorId.toString(), () => dispatch(showLoading(false)), (errorMsg) => {
                dispatch(showLoading(false))
                dispatch(insertMsgs(errorMsg, 'error'))
            }))
        }
        // eslint-disable-next-line
    }, [])

    async function updateRegister(nameField: string) {
        if (typeof actorId !== "undefined" && actorId !== null) {
            await dispatch(showLoading(true, MSG_SAVED_DATA))
            await dispatch(updateActorById(actorId.toString(), nameField, () => {
                dispatch(showLoading(false))
                dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success", null, "reload_page"))
            }, (errorMsg) => {
                dispatch(showLoading(false))
                dispatch(insertMsgs(errorMsg, 'error'))
            }))
        }
    }

    return (
        <ActorEditView getActor={getActor} update={(nameField: string) => updateRegister(nameField)} />
    )
}

export default ActorEdit
/* eslint-disable prefer-destructuring */
import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { showLoadingMain } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import { getActorSingle } from '../../../app/redux/Actor/actor.selector'
import ActorEditView from './view'
import { openActorById, updateActor } from '../../../app/redux/Actor/actor.actions'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'

function ActorEdit() {

    const dispatch = useDispatch()

    const getActor = useSelector(getActorSingle)

    const { actorId } = useParams()

    React.useEffect(() => {
        if (typeof actorId !== "undefined" && actorId !== null) {
            dispatch(showLoadingMain(true))
            dispatch(openActorById(actorId.toString(), () => dispatch(showLoadingMain(false)), (errorMsg) => {
                dispatch(showLoadingMain(false))
                dispatch(insertMsgs(errorMsg, 'error'))
            }))
        }
        // eslint-disable-next-line
    }, [])

    async function updateRegister(nameField: string) {
        if (typeof actorId !== "undefined" && actorId !== null) {
            await dispatch(showLoadingMain(true, MSG_SAVED_DATA))
            await dispatch(updateActor(actorId.toString(), nameField, () => {
                dispatch(showLoadingMain(false))
                dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success", null, "reload_page"))
            }, (errorMsg) => {
                dispatch(showLoadingMain(false))
                dispatch(insertMsgs(errorMsg, 'error'))
            }))
        }
    }

    return (
        <ActorEditView getActor={getActor} update={(nameField: string) => updateRegister(nameField)} />
    )
}

export default ActorEdit
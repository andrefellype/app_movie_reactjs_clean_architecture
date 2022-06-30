/* eslint-disable prefer-destructuring */
import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { showLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import { getActorSingle } from '../../../app/redux/Actor/actor.selector'
import ActorEditView from './view'
import { openActorById, updateActorById } from '../../../app/redux/Actor/actor.actions'
import { showStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function ActorEdit() {

    const dispatch = useDispatch()

    const getActor = useSelector(getActorSingle)
    const getLoading = useSelector(showStatusLoading)

    const { actorId } = useParams()

    React.useEffect(() => {
        if (typeof actorId !== "undefined" && actorId !== null) {
            dispatch(showLoadingPattern(true))
            dispatch(openActorById(actorId.toString(), () => dispatch(showLoadingPattern(false)), (errorMsg) => {
                dispatch(showLoadingPattern(false))
                dispatch(insertMsgs(errorMsg, 'error'))
            }))
        }
        // eslint-disable-next-line
    }, [])

    async function updateRegister(nameField: string) {
        if (typeof actorId !== "undefined" && actorId !== null) {
            await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
            await dispatch(updateActorById(actorId.toString(), nameField, () => {
                dispatch(showLoadingPattern(false))
                dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success", null, "reload_page"))
            }, (errorMsg) => {
                dispatch(showLoadingPattern(false))
                dispatch(insertMsgs(errorMsg, 'error'))
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
        <ActorEditView getActor={getActor} isLoading={getIsLoading()} update={(nameField: string) => updateRegister(nameField)} />
    )
}

export default ActorEdit
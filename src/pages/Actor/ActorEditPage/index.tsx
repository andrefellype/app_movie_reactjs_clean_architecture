import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import { getActorSingle } from '../../../app/redux/Actor/actor.selector'
import ActorEditPageView from './view'
import { openInActor, updateByIdInActor } from '../../../app/redux/Actor/actor.actions'
import { isStatusLoading } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.selector'

function ActorEditPage() {
    const dispatch = useDispatch()

    const getActor = useSelector(getActorSingle)
    const getLoading = useSelector(isStatusLoading)

    const { actorId } = useParams()

    React.useEffect(() => {
        if (typeof actorId !== "undefined" && actorId !== null) {
            dispatch(setLoadingPattern(true))
            dispatch(openInActor(actorId.toString(), () => dispatch(setLoadingPattern(false)), (errorMsg) => {
                dispatch(setLoadingPattern(false))
                dispatch(insertMsgs(errorMsg, 'error'))
            }))
        }
        // eslint-disable-next-line
    }, [])

    async function updateRegister(nameField: string) {
        if (typeof actorId !== "undefined" && actorId !== null) {
            await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
            await dispatch(updateByIdInActor(actorId.toString(), nameField, () => {
                dispatch(setLoadingPattern(false))
                dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success", null, "reload_page"))
            }, (errorMsg) => {
                dispatch(setLoadingPattern(false))
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
        <ActorEditPageView getActor={getActor} isLoading={getIsLoading()} update={(nameField: string) => updateRegister(nameField)} />
    )
}

export default ActorEditPage
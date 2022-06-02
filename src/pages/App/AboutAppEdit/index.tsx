import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showLoadingMain } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { getInformationAboutUs, updateInformationAboutUs } from '../../../app/redux/App/app.actions'
import { getInformationApp } from '../../../app/redux/App/app.selector'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import AboutAppEditView from './view'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'

function AboutAppEdit() {

    const dispatch = useDispatch()

    const informationApp = useSelector(getInformationApp)

    React.useEffect(() => {
        dispatch(showLoadingMain(true))
        dispatch(getInformationAboutUs(() => dispatch(showLoadingMain(false)), (errorsMsgs) => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs(errorsMsgs, 'error'))
        }))
        // eslint-disable-next-line
    }, [])

    async function updateApp(informationAppField: string, informationWebField: string) {
        await dispatch(showLoadingMain(true, MSG_SAVED_DATA))
        await dispatch(updateInformationAboutUs(informationAppField, informationWebField, () => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsgs) => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs(errorsMsgs, 'error'))
        }))
    }

    return (
        <AboutAppEditView informationApp={informationApp} saveRegister={(informationAppField: string, informationWebField: string) => updateApp(informationAppField, informationWebField)} />
    )
}

export default AboutAppEdit
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showLoadingMain } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { getInformationAboutUs, registerInformationAboutUs } from '../../../app/redux/App/app.actions'
import { getInformationApp } from '../../../app/redux/App/app.selector'
import { MSG_NEW_REGISTER_SUCCESS, MSG_SAVED_DATA, URL_ABOUT } from '../../../app/core/consts'
import AboutAppNewView from './view'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'

function AboutAppNew() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const informationApp = useSelector(getInformationApp)

    React.useEffect(() => {
        dispatch(showLoadingMain(true))
        dispatch(getInformationAboutUs(() => dispatch(showLoadingMain(false)), (errorsMsgs) => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs(errorsMsgs, 'error'))
        }))
        // eslint-disable-next-line
    }, [])

    React.useEffect(() => {
        if (informationApp) {
            navigate(URL_ABOUT)
        }
        // eslint-disable-next-line
    }, [informationApp])

    async function insertApp(informationAppField: string, informationWebField: string) {
        await dispatch(showLoadingMain(true, MSG_SAVED_DATA))
        await dispatch(registerInformationAboutUs(informationAppField, informationWebField, () => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsgs) => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs(errorsMsgs, 'error'))
        }))
    }

    return (
        <AboutAppNewView saveRegister={(informationAppField: string, informationWebField: string) => insertApp(informationAppField, informationWebField)} />
    )
}

export default AboutAppNew
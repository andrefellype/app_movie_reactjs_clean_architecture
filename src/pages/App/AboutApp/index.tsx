/* eslint-disable react/no-danger */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAccess } from "../../../app/redux/User/user.selector"
import { getInformationApp } from "../../../app/redux/App/app.selector"
import { getInformationAboutUs, deleteInformationAboutUs } from '../../../app/redux/App/app.actions'
import { showLoadingMain } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTER_SUCCESS } from '../../../app/core/consts'
import AboutAppView from './view'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'

function AboutApp() {

    const dispatch = useDispatch()

    const getAutenticate = useSelector(getUserAccess)
    const informationApp = useSelector(getInformationApp)

    React.useEffect(() => {
        dispatch(showLoadingMain(true))
        dispatch(getInformationAboutUs(() => dispatch(showLoadingMain(false)), (errorsMsgs) => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs(errorsMsgs, 'error'))
        }))
        // eslint-disable-next-line
    }, [])

    async function deleteApp() {
        await dispatch(showLoadingMain(true, MSG_DELETE_REGISTER))
        await dispatch(deleteInformationAboutUs(() => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsgs) => {
            dispatch(showLoadingMain(false))
            dispatch(insertMsgs(errorsMsgs, 'error'))
        }))
    }

    return (
        <AboutAppView getAutenticate={getAutenticate} informationApp={informationApp} actionDeleteApp={() => deleteApp()} />
    )
}

export default AboutApp
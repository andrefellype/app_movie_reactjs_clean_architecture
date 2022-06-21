import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading } from '../../../app/redux/LoadingMain/loadingMain.actions'
import { openAboutUs, updateAboutUs } from '../../../app/redux/AboutUs/aboutUs.actions'
import { getAboutUsSingle } from '../../../app/redux/AboutUs/aboutUs.selector'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import AboutUsEditView from './view'
import { insertMsgs } from '../../../app/redux/MsgAlert/msgAlert.actions'

function AboutUsEdit() {

    const dispatch = useDispatch()

    const getAboutUs = useSelector(getAboutUsSingle)

    React.useEffect(() => {
        dispatch(showLoading(true))
        dispatch(openAboutUs(() => dispatch(showLoading(false)), (errorsMsgs) => {
            dispatch(showLoading(false))
            dispatch(insertMsgs(errorsMsgs, 'error'))
        }))
        // eslint-disable-next-line
    }, [])

    async function updateRegisterAboutUs(informationAppField: string, informationWebField: string) {
        await dispatch(showLoading(true, MSG_SAVED_DATA))
        await dispatch(updateAboutUs(informationAppField, informationWebField, () => {
            dispatch(showLoading(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsgs) => {
            dispatch(showLoading(false))
            dispatch(insertMsgs(errorsMsgs, 'error'))
        }))
    }

    return (
        <AboutUsEditView getAboutUs={getAboutUs} saveRegister={(informationAppField: string, informationWebField: string) => updateRegisterAboutUs(informationAppField, informationWebField)} />
    )
}

export default AboutUsEdit
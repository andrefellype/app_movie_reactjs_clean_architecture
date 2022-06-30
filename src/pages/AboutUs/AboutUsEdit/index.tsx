import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { openAboutUs, updateAboutUs } from '../../../app/redux/AboutUs/aboutUs.actions'
import { getAboutUsSingle } from '../../../app/redux/AboutUs/aboutUs.selector'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import AboutUsEditView from './view'

function AboutUsEdit() {

    const dispatch = useDispatch()

    const getAboutUs = useSelector(getAboutUsSingle)

    React.useEffect(() => {
        dispatch(showLoadingPattern(true))
        dispatch(openAboutUs(() => dispatch(showLoadingPattern(false)), (errorsMsgs) => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs(errorsMsgs, 'error'))
        }))
        // eslint-disable-next-line
    }, [])

    async function updateRegisterAboutUs(informationAppField: string, informationWebField: string) {
        await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(updateAboutUs(informationAppField, informationWebField, () => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsgs) => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs(errorsMsgs, 'error'))
        }))
    }

    return (
        <AboutUsEditView getAboutUs={getAboutUs} saveRegister={(informationAppField: string, informationWebField: string) => updateRegisterAboutUs(informationAppField, informationWebField)} />
    )
}

export default AboutUsEdit
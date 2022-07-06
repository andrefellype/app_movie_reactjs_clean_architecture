import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { openInAboutUs, updateAllInAboutUs } from '../../../app/redux/AboutUs/aboutUs.actions'
import { getAboutUsSingle } from '../../../app/redux/AboutUs/aboutUs.selector'
import { MSG_SAVED_DATA, MSG_UPDATE_REGISTER_SUCCESS } from '../../../app/core/consts'
import AboutUsEditPageView from './view'

function AboutUsEditPage() {
    const dispatch = useDispatch()

    const getAboutUs = useSelector(getAboutUsSingle)

    React.useEffect(() => {
        dispatch(setLoadingPattern(true))
        dispatch(openInAboutUs(() => dispatch(setLoadingPattern(false)), (errorsMsgs) => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs(errorsMsgs, 'error'))
        }))
        // eslint-disable-next-line
    }, [])

    async function updateRegisterAboutUs(informationAppField: string, informationWebField: string) {
        await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(updateAllInAboutUs(informationAppField, informationWebField, () => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs([MSG_UPDATE_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsgs) => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs(errorsMsgs, 'error'))
        }))
    }

    return (
        <AboutUsEditPageView getAboutUs={getAboutUs} saveRegister={(informationAppField: string,
            informationWebField: string) => updateRegisterAboutUs(informationAppField, informationWebField)} />
    )
}

export default AboutUsEditPage
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { openAboutUs, registerAboutUs } from '../../../app/redux/AboutUs/aboutUs.actions'
import { getAboutUsSingle } from '../../../app/redux/AboutUs/aboutUs.selector'
import { MSG_NEW_REGISTER_SUCCESS, MSG_SAVED_DATA, URL_ABOUT_US } from '../../../app/core/consts'
import AboutUsNewView from './view'

function AboutUsNew() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getAboutUs = useSelector(getAboutUsSingle)

    React.useEffect(() => {
        dispatch(showLoadingPattern(true))
        dispatch(openAboutUs(() => dispatch(showLoadingPattern(false)), (errorsMsgs) => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs(errorsMsgs, 'error'))
        }))
        // eslint-disable-next-line
    }, [])

    React.useEffect(() => {
        if (getAboutUs) {
            navigate(URL_ABOUT_US)
        }
        // eslint-disable-next-line
    }, [getAboutUs])

    async function insertAboutUs(informationAppField: string, informationWebField: string) {
        await dispatch(showLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(registerAboutUs(informationAppField, informationWebField, () => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsgs) => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs(errorsMsgs, 'error'))
        }))
    }

    return (
        <AboutUsNewView saveRegister={(informationAppField: string, informationWebField: string) => insertAboutUs(informationAppField, informationWebField)} />
    )
}

export default AboutUsNew
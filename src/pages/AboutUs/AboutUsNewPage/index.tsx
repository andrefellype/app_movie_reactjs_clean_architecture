import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { openInAboutUs, registerInAboutUs } from '../../../app/redux/AboutUs/aboutUs.actions'
import { getAboutUsSingle } from '../../../app/redux/AboutUs/aboutUs.selector'
import {
    MSG_NEW_REGISTER_SUCCESS, MSG_SAVED_DATA, URL_ABOUT_US
} from '../../../app/core/consts'
import AboutUsNewPageView from './view'

function AboutUsNewPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getAboutUs = useSelector(getAboutUsSingle)

    React.useEffect(() => {
        dispatch(setLoadingPattern(true))
        dispatch(openInAboutUs(() => dispatch(setLoadingPattern(false)), (errorsMsgs) => {
            dispatch(setLoadingPattern(false))
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
        await dispatch(setLoadingPattern(true, MSG_SAVED_DATA))
        await dispatch(registerInAboutUs(informationAppField, informationWebField, () => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs([MSG_NEW_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsgs) => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs(errorsMsgs, 'error'))
        }))
    }

    return (
        <AboutUsNewPageView saveRegister={(informationAppField: string, informationWebField: string) =>
            insertAboutUs(informationAppField, informationWebField)} />
    )
}

export default AboutUsNewPage
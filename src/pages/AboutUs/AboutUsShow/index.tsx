/* eslint-disable react/no-danger */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAccess } from "../../../app/redux/User/user.selector"
import { getAboutUsSingle } from "../../../app/redux/AboutUs/aboutUs.selector"
import { openAboutUs, deleteAboutUs } from '../../../app/redux/AboutUs/aboutUs.actions'
import { showLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTER_SUCCESS } from '../../../app/core/consts'
import AboutUsShowView from './view'

function AboutUsShow() {

    const dispatch = useDispatch()

    const getAutenticate = useSelector(getUserAccess)
    const getAboutUs = useSelector(getAboutUsSingle)

    React.useEffect(() => {
        dispatch(showLoadingPattern(true))
        dispatch(openAboutUs(() => dispatch(showLoadingPattern(false)), (errorsMsgs) => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs(errorsMsgs, 'error'))
        }))
        // eslint-disable-next-line
    }, [])

    async function destroyAboutUs() {
        await dispatch(showLoadingPattern(true, MSG_DELETE_REGISTER))
        await dispatch(deleteAboutUs(() => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsgs) => {
            dispatch(showLoadingPattern(false))
            dispatch(insertMsgs(errorsMsgs, 'error'))
        }))
    }

    return (
        <AboutUsShowView getAutenticate={getAutenticate} getAboutUs={getAboutUs} actionDeleteAboutUs={() => destroyAboutUs()} />
    )
}

export default AboutUsShow
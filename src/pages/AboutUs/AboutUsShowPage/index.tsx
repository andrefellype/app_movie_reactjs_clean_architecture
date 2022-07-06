import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAccess } from "../../../app/redux/User/user.selector"
import { getAboutUsSingle } from "../../../app/redux/AboutUs/aboutUs.selector"
import { openInAboutUs, deleteAllInAboutUs } from '../../../app/redux/AboutUs/aboutUs.actions'
import { setLoadingPattern, insertMsgs } from '../../../app/redux/UtlisAppRedux/utlisAppRedux.actions'
import { MSG_DELETE_REGISTER, MSG_DELETE_REGISTER_SUCCESS } from '../../../app/core/consts'
import AboutUsShowPageView from './view'

function AboutUsShowPage() {
    const dispatch = useDispatch()

    const getAutenticate = useSelector(getUserAccess)
    const getAboutUs = useSelector(getAboutUsSingle)

    React.useEffect(() => {
        dispatch(setLoadingPattern(true))
        dispatch(openInAboutUs(() => dispatch(setLoadingPattern(false)), (errorsMsgs) => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs(errorsMsgs, 'error'))
        }))
        // eslint-disable-next-line
    }, [])

    async function destroyAboutUs() {
        await dispatch(setLoadingPattern(true, MSG_DELETE_REGISTER))
        await dispatch(deleteAllInAboutUs(() => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs([MSG_DELETE_REGISTER_SUCCESS], "success", null, "reload_page"))
        }, (errorsMsgs) => {
            dispatch(setLoadingPattern(false))
            dispatch(insertMsgs(errorsMsgs, 'error'))
        }))
    }

    return (
        <AboutUsShowPageView getAutenticate={getAutenticate} getAboutUs={getAboutUs} actionDeleteAboutUs={() => destroyAboutUs()} />
    )
}

export default AboutUsShowPage
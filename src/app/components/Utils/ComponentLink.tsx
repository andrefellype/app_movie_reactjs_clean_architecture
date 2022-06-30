/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Ref } from 'react'
import { NavLink as NavLinkBase } from 'react-router-dom'

const ComponentLink = React.forwardRef((props: any, refValue: Ref<HTMLAnchorElement>) => (
    <NavLinkBase ref={refValue} {...props} />
))

export default ComponentLink
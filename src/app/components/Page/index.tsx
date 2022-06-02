/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Helmet } from 'react-helmet'

export class Page extends React.Component<{ title: string, className?: any, style?: object }> {

    render() {
        const { title, children, ...other } = this.props

        return (
            <div {...other}>
                <Helmet>{title}</Helmet>
                {children}
            </div>
        )
    }
}
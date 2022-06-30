/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prefer-stateless-function */
import { TableHead } from "@mui/material"
import React from "react"

export default class TableHeadStyle extends React.Component<any> {
    render() {
        const { children, ...other } = this.props
        return (<TableHead {...other}>{children}</TableHead>)
    }
}
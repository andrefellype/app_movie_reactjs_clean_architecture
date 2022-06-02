/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { TableRow, styled } from "@mui/material"

const StyledTableRow = styled(TableRow)(() => ({
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))

export default class TableRowStyle extends React.Component<any> {
    render() {
        const { children, ...other } = this.props

        return (
            <StyledTableRow {...other}>
                {children}
            </StyledTableRow>
        )
    }
}
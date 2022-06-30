/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { TableCell, styled } from "@mui/material"
import { tableCellClasses } from '@mui/material/TableCell'

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#D3D3D3",
        color: "#000000",
        fontWeight: 'bolder',
        textTransform: 'uppercase'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}))

export default class TableCellStyle extends React.Component<any> {
    render() {
        const { children, ...other } = this.props
        return (
            <StyledTableCell {...other}>
                {children}
            </StyledTableCell>
        )
    }
}
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prefer-stateless-function */
import { TableBody } from "@mui/material"
import React from "react"
import { MSG_EMPTY_LIST, MSG_FAIL_SYSTEM } from "../../core/consts"
import TableCellStyle from "./TableCellStyle"
import TableRowStyle from "./TableRowStyle"

export default class TableBodyStyle extends React.Component<{ isLoading?: any | null, colSpanValue?: number, listData?: any }> {
    render() {
        const { isLoading, colSpanValue = 1, listData = [], children, ...other } = this.props

        function verifyLoading(showStatusLoadingPattern) {
            if (typeof showStatusLoadingPattern !== "undefined" && showStatusLoadingPattern !== null && typeof showStatusLoadingPattern.statusTable !== "undefined") {
                return showStatusLoadingPattern.statusTable ? 1 : 0
            }
            return -1
        }

        function rowMsg(msg) {
            return (<TableRowStyle hover>
                <TableCellStyle colSpan={colSpanValue} scope="row" align="left" style={{ fontWeight: 'bold' }}>
                    {msg.toUpperCase()}
                </TableCellStyle>
            </TableRowStyle>)
        }

        function titleLoading(showStatusLoadingPattern) {
            let msgTitle = ""
            if (typeof showStatusLoadingPattern !== "undefined" && showStatusLoadingPattern !== null && typeof showStatusLoadingPattern.statusTable !== "undefined") {
                if (showStatusLoadingPattern.statusTable)
                    msgTitle = showStatusLoadingPattern.titleTable
            } else
                msgTitle = MSG_FAIL_SYSTEM

            return rowMsg(msgTitle)
        }

        function bodyFields() {
            if (!listData || listData.length === 0)
                return rowMsg(MSG_EMPTY_LIST)
            return children
        }

        return (<TableBody {...other}>
            {(typeof isLoading !== "undefined") && (verifyLoading(isLoading) !== 0 ? titleLoading(isLoading) : (bodyFields()))}
        </TableBody>)
    }
}
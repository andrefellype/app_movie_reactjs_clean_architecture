/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-fragments */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { CardActions, Pagination } from "@mui/material"

export default class PaginationList extends React.Component<{
    isLoading?: any | null, dataList: any, valuePage: number, countList: number, actionClick?: (value: number) => void | null, style?: object
}> {

    render() {
        const { isLoading, dataList, valuePage = 1, countList, actionClick = null, ...other } = this.props

        function verifyLoading(showStatusLoadingPattern) {
            if (typeof showStatusLoadingPattern !== "undefined" && showStatusLoadingPattern !== null && typeof showStatusLoadingPattern.statusTable !== "undefined") {
                return showStatusLoadingPattern.statusTable ? 1 : 0
            }
            return -1
        }

        return (
            <React.Fragment>
                {(verifyLoading(isLoading) === 0 && countList > 1 && dataList && dataList.length > 0) ? <CardActions {...other}>
                    <Pagination count={countList} page={valuePage} variant="outlined" color='primary' onChange={(event: React.ChangeEvent<unknown>, value: number) => (actionClick !== null ? actionClick(value) : null)} />
                </CardActions> : null}
            </React.Fragment>
        )
    }
}
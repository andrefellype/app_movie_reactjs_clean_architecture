/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-fragments */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { CardActions, Pagination } from "@mui/material"

export default class PaginationList extends React.Component<{
    dataList: any, valuePage: number, countList: number, actionClick?: (value: number) => void | null, style?: object
}> {

    render() {
        const { dataList, valuePage = 1, countList, actionClick = null, ...other } = this.props

        return (
            <React.Fragment>
                {(countList > 1 && dataList && dataList.length > 0) ? <CardActions {...other}>
                    <Pagination count={countList} page={valuePage} variant="outlined" color='primary' onChange={(event: React.ChangeEvent<unknown>, value: number) => (actionClick !== null ? actionClick(value) : null)} />
                </CardActions> : null}
            </React.Fragment>
        )
    }
}
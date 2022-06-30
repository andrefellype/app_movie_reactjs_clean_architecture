/* eslint-disable dot-notation */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { Card, CardContent, Grid, Backdrop, CircularProgress } from '@mui/material'
import { withStyles } from "@mui/styles"

const styles = (theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    }
})

class LoadingBackdrop extends React.Component<{ loadingObject: { titlePattern: string } }> {

    render() {

        const { loadingObject } = this.props

        return (
            <Backdrop className={this.props['classes'].backdrop} open>
                <Card>
                    <CardContent style={{ margin: 0, paddingLeft: 30, paddingTop: 30, paddingRight: 20 }}>
                        <Grid container spacing={2} style={{ alignItems: 'center' }}>
                            <Grid item>
                                <CircularProgress color="primary" size={30} />
                            </Grid>
                            <Grid item style={{ fontWeight: 'bold', fontSize: 20 }}>
                                {loadingObject.titlePattern}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Backdrop>
        )
    }
}

export default withStyles(styles)(LoadingBackdrop)
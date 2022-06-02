/* eslint-disable dot-notation */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Typography, Card, CardActions, Container, Grid, GridSize, GridSpacing } from "@mui/material"

import { withStyles } from "@mui/styles"
import { Page } from "../Page"

const styles = (theme) => ({
    root: {
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    flex_center: {
        display: 'flex',
        justifyContent: 'center'
    },
    flex_end: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
})

class PageCard extends React.Component<{
    children?, title: string, spacingContainer?: GridSpacing, colorTitle?: string, sizeXl?: GridSize, sizeLg?: GridSize, sizeMd?: GridSize, sizeSm?: GridSize, sizeXs?: GridSize, style?: object
}> {

    render() {
        const { title, spacingContainer = 2, colorTitle, sizeXl, sizeLg, sizeMd, sizeSm, sizeXs = 12, children, ...other } = this.props

        function valueGrid(type: string | null = null) {
            if (type === "xl" && sizeXl) {
                return sizeXl
            }
            if ((type === "lg" || (type === "xl" && !sizeXl)) && sizeLg) {
                return sizeLg
            }
            if ((type === "md" || (type === "lg" && !sizeLg) || (type === "xl" && !sizeXl && !sizeLg)) && sizeMd) {
                return sizeMd
            }
            if ((type === "sm" || (type === "md" && !sizeMd) || (type === "lg" && !sizeLg && !sizeMd) || (type === "xl" && !sizeXl && !sizeLg && !sizeMd)) && sizeSm) {
                return sizeSm
            }
            return sizeXs
        }

        return (
            <Page title={title} className={this.props['classes'].root} {...other}>
                <Container maxWidth={false}>
                    <Grid container spacing={spacingContainer} style={{ marginBottom: 8 }}>
                        <Grid item xl={valueGrid("xl")} lg={valueGrid("lg")} md={valueGrid("md")} sm={valueGrid("sm")} xs={valueGrid("xs")}>
                            <Card>
                                <CardActions className={this.props['classes'].flex_center}>
                                    <Typography style={{ fontWeight: 'bold', color: colorTitle }} variant="h6" component="h6">
                                        {title}
                                    </Typography>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                    {children}
                </Container>
            </Page>
        )
    }
}

export default withStyles(styles)(PageCard)
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Card, CardActions, Grid, Hidden } from "@mui/material"
import { makeStyles } from "@material-ui/styles"
import { useNavigate } from 'react-router'

import PageCard from "../../../app/components/PageCard"
import ButtonBlueGray from '../../../app/components/Button/ButtonBlueGray'
import ButtonSuccess from '../../../app/components/Button/ButtonSuccess'
import FormControlFieldMask from '../../../app/components/FormControl/FormControlFieldMask'
import ICON_OBJECT_LIST from '../../../app/components/IconList/ICON_OBJECT_LIST'
import { URL_SIGN_IN } from '../../../app/core/consts'

const useStyles = makeStyles(() => ({
    button_end: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}))

const ForgotPasswordView: React.FC<{ recovery: any }> = function({ recovery }) {

    const classes = useStyles()
    const navigate = useNavigate()

    const [cellphoneField, setCellphoneField] = React.useState("")

    return (
        <PageCard title="RECUPERAR SENHA" sizeLg={4} sizeMd={5} sizeSm={8} sizeXs={12}>
            <Grid container spacing={2}>
                <Grid item lg={4} md={5} sm={8} xs={12}>
                    <Card>
                        <CardActions>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControlFieldMask valueMask="(99) 99999-9999" labelValue="CELULAR*" valueDefault={cellphoneField} onChangeForm={(e) => setCellphoneField(e.target.value)} />
                                </Grid>
                            </Grid>
                        </CardActions>
                        <CardActions className={classes.button_end}>
                            <Hidden mdDown>
                                <ButtonSuccess title="ENVIAR LINK" iconStart={ICON_OBJECT_LIST.CHECK_ICON} actionClick={() => recovery(cellphoneField)} />
                                <ButtonBlueGray title="ÁREA DE ACESSO" iconStart={ICON_OBJECT_LIST.ACCOUNT_CIRCLE_ICON} actionClick={() => navigate(URL_SIGN_IN)} />
                            </Hidden>
                            <Hidden lgUp>
                                <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
                                    <Grid item xs={12}>
                                        <ButtonSuccess isFullWidth title="ENVIAR LINK" iconStart={ICON_OBJECT_LIST.CHECK_ICON} actionClick={() => recovery(cellphoneField)} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ButtonBlueGray isFullWidth title="ÁREA DE ACESSO" iconStart={ICON_OBJECT_LIST.ACCOUNT_CIRCLE_ICON} actionClick={() => navigate(URL_SIGN_IN)} />
                                    </Grid>
                                </Grid>
                            </Hidden>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </PageCard>
    )
}

export default ForgotPasswordView
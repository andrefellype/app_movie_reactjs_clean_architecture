/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Card, CardActions, Grid, Hidden } from "@mui/material"
import { makeStyles } from "@material-ui/styles"
import { useNavigate } from 'react-router'

import PageCard from "../../../app/components/PageCard"
import ButtonBlueGray from '../../../app/components/Button/ButtonBlueGray'
import ButtonDanger from '../../../app/components/Button/ButtonDanger'
import ButtonSuccess from '../../../app/components/Button/ButtonSuccess'
import FormControlField from '../../../app/components/FormControl/FormControlField'
import FormControlFieldMask from '../../../app/components/FormControl/FormControlFieldMask'

import ICON_OBJECT_LIST from '../../../app/components/IconList/ICON_OBJECT_LIST'
import { URL_FORGOT_PASSWORD, URL_SIGN_UP } from '../../../app/core/consts'

const useStyles = makeStyles(() => ({
    button_end: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}))

const SignInView: React.FC<{ signIn: any }> = function ({ signIn }) {

    const classes = useStyles()
    const navigate = useNavigate()

    const [cellphoneField, setCellphoneField] = React.useState("")
    const [passwordField, setPasswordField] = React.useState("")

    return (
        <PageCard title="ÁREA DE ACESSO" sizeLg={5} sizeMd={6} sizeSm={8} sizeXs={12}>
            <Grid container spacing={2} direction="row">
                <Grid item lg={5} md={6} sm={8} xs={12}>
                    <Card>
                        <CardActions>
                            <Grid container spacing={2}>
                                <Grid item xs={12} lg={6}>
                                    <FormControlFieldMask valueMask="(99) 99999-9999" labelValue="CELULAR*" valueDefault={cellphoneField} onChangeForm={(e) => setCellphoneField(e.target.value)} />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <FormControlField typeField="password" labelValue="SENHA*" valueDefault={passwordField} onChangeForm={(e) => setPasswordField(e.target.value)} />
                                </Grid>
                            </Grid>
                        </CardActions>
                        <CardActions className={classes.button_end}>
                            <Hidden mdDown>
                                <ButtonSuccess title="ENTRAR" iconStart={ICON_OBJECT_LIST.CHECK_ICON} actionClick={() => signIn(cellphoneField, passwordField)} />
                                <ButtonDanger title="ESQUECEU A SENHA" iconStart={ICON_OBJECT_LIST.VPN_KEY_ICON} actionClick={() => navigate(URL_FORGOT_PASSWORD)} />
                                <ButtonBlueGray title="NOVO USUÁRIO" iconStart={ICON_OBJECT_LIST.ADD_CIRCLE_OUTLINE_ICON} actionClick={() => navigate(URL_SIGN_UP)} />
                            </Hidden>
                            <Hidden lgUp>
                                <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
                                    <Grid item xs={12}>
                                        <ButtonSuccess isFullWidth title="ENTRAR" iconStart={ICON_OBJECT_LIST.CHECK_ICON} actionClick={() => signIn(cellphoneField, passwordField)} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ButtonDanger isFullWidth title="ESQUECEU A SENHA" iconStart={ICON_OBJECT_LIST.VPN_KEY_ICON} actionClick={() => navigate(URL_FORGOT_PASSWORD)} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ButtonBlueGray isFullWidth title="NOVO USUÁRIO" iconStart={ICON_OBJECT_LIST.ADD_CIRCLE_OUTLINE_ICON} actionClick={() => navigate(URL_SIGN_UP)} />
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

export default SignInView
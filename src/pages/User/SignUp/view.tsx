/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Card, CardActions, Grid, InputAdornment, IconButton, Hidden } from "@mui/material"
import { makeStyles } from "@material-ui/styles"
import { useNavigate } from 'react-router'

import PageCard from "../../../app/components/PageCard"
import ButtonSuccess from '../../../app/components/Button/ButtonSuccess'
import ButtonBlueGray from '../../../app/components/Button/ButtonBlueGray'
import FormControlField from '../../../app/components/FormControl/FormControlField'
import FormControlFieldMask from '../../../app/components/FormControl/FormControlFieldMask'

import IconList from '../../../app/components/IconList'
import ICON_OBJECT_LIST from '../../../app/components/IconList/ICON_OBJECT_LIST'
import { URL_SIGN_IN } from '../../../app/core/consts'

const useStyles = makeStyles(() => ({
    button_end: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}))

const SignUpView: React.FC<{ register: any }> = function ({ register }) {

    const classes = useStyles()
    const navigate = useNavigate()

    const [nameField, setNameField] = React.useState("")
    const [birthField, setBirthField] = React.useState("")
    const [emailField, setEmailField] = React.useState("")
    const [cellphoneField, setCellphoneField] = React.useState("")

    const [passwordField, setPasswordField] = React.useState("")
    const [confirmPasswordField, setConfirmPasswordField] = React.useState("")
    const [viewPassword, setViewPassword] = React.useState(false)
    const [confirmViewPassword, setConfirmViewPassword] = React.useState(false)

    return (
        <PageCard title="NOVO USUÁRIO" sizeLg={10} sizeXs={12}>
            <Grid container spacing={2}>
                <Grid item lg={10} xs={12}>
                    <Card>
                        <CardActions>
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12}>
                                    <FormControlField labelValue="NOME*" valueDefault={nameField} onChangeForm={(e) => setNameField(e.target.value)} />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlFieldMask valueMask="99/99/9999" labelValue="NASCIMENTO*" valueDefault={birthField} onChangeForm={(e) => setBirthField(e.target.value)} />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlFieldMask valueMask="(99) 99999-9999" labelValue="CELULAR*" valueDefault={cellphoneField} onChangeForm={(e) => setCellphoneField(e.target.value)} />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <FormControlField labelValue="EMAIL" valueDefault={emailField} onChangeForm={(e) => setEmailField(e.target.value)} />
                                </Grid>
                                <Grid item sm={3} xs={12}>
                                    <FormControlField typeField={viewPassword ? "text" : "password"} labelValue="SENHA*" valueDefault={passwordField} InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setViewPassword(!viewPassword)} edge="end">
                                                    <IconList icon={viewPassword ? ICON_OBJECT_LIST.VISIBILITY_ICON : ICON_OBJECT_LIST.VISIBILITY_OFF_ICON} />
                                                </IconButton>
                                            </InputAdornment>
                                    }} onChangeForm={(e) => setPasswordField(e.target.value)} />
                                </Grid>
                                <Grid item sm={3} xs={12}>
                                    <FormControlField typeField={confirmViewPassword ? "text" : "password"} labelValue="CONFIRMAÇÃO*" valueDefault={confirmPasswordField} InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setConfirmViewPassword(!confirmViewPassword)} edge="end">
                                                    <IconList icon={confirmViewPassword ? ICON_OBJECT_LIST.VISIBILITY_ICON : ICON_OBJECT_LIST.VISIBILITY_OFF_ICON} />
                                                </IconButton>
                                            </InputAdornment>
                                    }} onChangeForm={(e) => setConfirmPasswordField(e.target.value)} />
                                </Grid>
                            </Grid>
                        </CardActions>
                        <CardActions className={classes.button_end}>
                            <Hidden smDown>
                                <ButtonSuccess title="REGISTRAR" iconStart={ICON_OBJECT_LIST.CHECK_ICON} actionClick={() => register(nameField, birthField, cellphoneField, emailField, passwordField, confirmPasswordField)} />
                                <ButtonBlueGray title="ÁREA DE ACESSO" iconStart={ICON_OBJECT_LIST.ACCOUNT_CIRCLE_ICON} actionClick={() => navigate(URL_SIGN_IN)} />
                            </Hidden>
                            <Hidden mdUp>
                                <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
                                    <Grid item xs={12}>
                                        <ButtonSuccess isFullWidth title="REGISTRAR" iconStart={ICON_OBJECT_LIST.CHECK_ICON} actionClick={() => register(nameField, birthField, cellphoneField, emailField, passwordField, confirmPasswordField)} />
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
        </PageCard >
    )
}

export default SignUpView
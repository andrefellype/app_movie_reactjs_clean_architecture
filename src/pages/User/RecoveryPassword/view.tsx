/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Card, CardActions, Grid, InputAdornment, IconButton } from "@mui/material"
import { makeStyles } from "@material-ui/styles"

import PageCard from "../../../app/components/PageCard"
import ButtonSuccess from '../../../app/components/Button/ButtonSuccess'
import FormControlField from '../../../app/components/FormControl/FormControlField'
import FormControlFieldMask from '../../../app/components/FormControl/FormControlFieldMask'
import IconList from '../../../app/components/IconList'
import ICON_OBJECT_LIST from '../../../app/components/IconList/ICON_OBJECT_LIST'

const useStyles = makeStyles(() => ({
    button_end: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}))

const RecoveryPasswordView: React.FC<{ getUser: any, updatePassword: any }> = function ({ getUser, updatePassword }) {

    const classes = useStyles()

    const [passwordField, setPasswordField] = React.useState("")
    const [confirmPasswordField, setConfirmPasswordField] = React.useState("")
    const [viewPassword, setViewPassword] = React.useState(false)
    const [confirmViewPassword, setConfirmViewPassword] = React.useState(false)

    return (
        <PageCard title="ALTERAR A SUA SENHA" sizeMd={5} sizeSm={8} sizeXs={12}>
            <Grid container spacing={2}>
                <Grid item md={5} sm={8} xs={12}>
                    <Card>
                        <CardActions>
                            <Grid container spacing={2}>
                                <Grid item xs={12} lg={6}>
                                    <FormControlField labelValue="NOME" valueDefault={getUser ? getUser.name : ""} InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <FormControlFieldMask labelValue="CELULAR" valueMask="(99) 99999-9999" valueDefault={getUser ? getUser.cellphone : ""} InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <FormControlField typeField={viewPassword ? "text" : "password"} labelValue="SENHA*" valueDefault={passwordField} InputProps={{
                                        disabled: !getUser,
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setViewPassword(!viewPassword)} edge="end">
                                                    <IconList icon={viewPassword ? ICON_OBJECT_LIST.VISIBILITY_ICON : ICON_OBJECT_LIST.VISIBILITY_OFF_ICON} />
                                                </IconButton>
                                            </InputAdornment>
                                    }} onChangeForm={(e) => setPasswordField(e.target.value)} />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <FormControlField typeField={confirmViewPassword ? "text" : "password"} labelValue="CONFIRMAÇÃO*" valueDefault={confirmPasswordField} InputProps={{
                                        disabled: !getUser,
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
                            <ButtonSuccess title="SALVAR" iconStart={ICON_OBJECT_LIST.CHECK_ICON} actionClick={() => updatePassword(passwordField, confirmPasswordField)} />
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </PageCard>
    )
}

export default RecoveryPasswordView
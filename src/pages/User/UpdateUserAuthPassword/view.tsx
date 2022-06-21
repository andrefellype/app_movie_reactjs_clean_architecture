/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Card, CardActions, Grid, InputAdornment, IconButton } from "@mui/material"
import { makeStyles } from "@material-ui/styles"

import PageCard from "../../../app/components/PageCard"
import ButtonSuccess from '../../../app/components/Button/ButtonSuccess'
import IconList from '../../../app/components/IconList'
import ICON_OBJECT_LIST from '../../../app/components/IconList/ICON_OBJECT_LIST'
import FormControlField from '../../../app/components/FormControl/FormControlField'
import FormControlFieldMask from '../../../app/components/FormControl/FormControlFieldMask'
import ConvertDate from '../../../app/components/Utils/ConvertDate'

const useStyles = makeStyles(() => ({
    button_end: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}))

const UpdateUserAuthPasswordView: React.FC<{ getUser: any, update: any }> = function ({ getUser, update }) {

    const classes = useStyles()

    const [passwordField, setPasswordField] = React.useState("")
    const [confirmPasswordField, setConfirmPasswordField] = React.useState("")
    const [viewPassword, setViewPassword] = React.useState(false)
    const [confirmViewPassword, setConfirmViewPassword] = React.useState(false)

    return (
        <PageCard title="EDITAR MINHA SENHA" sizeLg={9} sizeXs={12}>
            <Grid container spacing={2}>
                <Grid item lg={9} xs={12}>
                    <Card>
                        <CardActions>
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12}>
                                    <FormControlField isDisabled={!getUser} labelValue="NOME" valueDefault={getUser ? getUser.name : ""} />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlFieldMask isDisabled={!getUser} valueMask="99/99/9999" labelValue={getUser ? "NASCIMENTO" : ""} valueDefault={getUser ? ConvertDate(getUser.birth, "stringEUAToStringBR") : ""} />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlFieldMask isDisabled={!getUser} valueMask="(99) 99999-9999" labelValue={getUser ? "CELULAR" : ""} valueDefault={getUser ? getUser.cellphone : ""} />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <FormControlField isDisabled={!getUser} labelValue={getUser ? "EMAIL" : ""} valueDefault={(getUser && getUser.email) ? getUser.email : ""} />
                                </Grid>
                                <Grid item sm={3} xs={12}>
                                    <FormControlField isDisabled={!getUser} typeField={viewPassword ? "text" : "password"} labelValue="SENHA*" valueDefault={passwordField} InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <IconButton disabled={!getUser} onClick={() => setViewPassword(!viewPassword)} edge="end">
                                                    <IconList icon={viewPassword ? ICON_OBJECT_LIST.VISIBILITY_ICON : ICON_OBJECT_LIST.VISIBILITY_OFF_ICON} />
                                                </IconButton>
                                            </InputAdornment>
                                    }} onChangeForm={(e) => setPasswordField(e.target.value)} />
                                </Grid>
                                <Grid item sm={3} xs={12}>
                                    <FormControlField isDisabled={!getUser} typeField={confirmViewPassword ? "text" : "password"} labelValue="CONFIRMAÇÃO*" valueDefault={confirmPasswordField} InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <IconButton disabled={!getUser} onClick={() => setConfirmViewPassword(!confirmViewPassword)} edge="end">
                                                    <IconList icon={confirmViewPassword ? ICON_OBJECT_LIST.VISIBILITY_ICON : ICON_OBJECT_LIST.VISIBILITY_OFF_ICON} />
                                                </IconButton>
                                            </InputAdornment>
                                    }} onChangeForm={(e) => setConfirmPasswordField(e.target.value)} />
                                </Grid>
                            </Grid>
                        </CardActions>
                        <CardActions className={classes.button_end}>
                            <ButtonSuccess title="SALVAR" iconStart={ICON_OBJECT_LIST.CHECK_ICON} isDisabled={!getUser} actionClick={() => update(passwordField, confirmPasswordField)} />
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </PageCard>
    )
}

export default UpdateUserAuthPasswordView
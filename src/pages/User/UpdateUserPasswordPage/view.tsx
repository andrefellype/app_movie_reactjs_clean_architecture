/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Card, CardActions, Grid, InputAdornment, IconButton } from "@mui/material"
import { makeStyles } from "@material-ui/styles"
import { useNavigate } from 'react-router'
import PageCard from "../../../app/components/PageCard"
import ButtonSuccess from '../../../app/components/Button/ButtonSuccess'
import IconList from '../../../app/components/IconList'
import FormControlField from '../../../app/components/FormControl/FormControlField'
import ButtonIndigo from '../../../app/components/Button/ButtonIndigo'
import ICON_OBJECT_LIST from '../../../app/components/IconList/ICON_OBJECT_LIST'
import FormControlFieldMask from '../../../app/components/FormControl/FormControlFieldMask'
import ConvertDate from '../../../app/components/Utils/ConvertDate'
import { URL_USERS } from '../../../app/core/consts'

const useStyles = makeStyles(() => ({
    button_end: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}))

const UpdateUserPasswordPageView: React.FC<{ getUser: any, isLoading: boolean, update: any }> =
    function ({ getUser, isLoading, update }) {
        const classes = useStyles()
        const navigate = useNavigate()

        const [passwordField, setPasswordField] = React.useState("")
        const [confirmPasswordField, setConfirmPasswordField] = React.useState("")
        const [viewPassword, setViewPassword] = React.useState(false)
        const [confirmViewPassword, setConfirmViewPassword] = React.useState(false)

        return (
            <PageCard title="EDITAR SENHA" sizeLg={9} sizeXs={12}>
                <Grid container spacing={2}>
                    <Grid item lg={9} xs={12}>
                        <Card>
                            <CardActions>
                                <Grid container spacing={2}>
                                    <Grid item md={6} xs={12}>
                                        <FormControlField labelValue="NOME"
                                            valueDefault={(getUser && !isLoading) ? getUser.name : ""}
                                            InputProps={{ readOnly: true }} />
                                    </Grid>
                                    <Grid item md={3} xs={12}>
                                        <FormControlFieldMask valueMask="99/99/9999"
                                            labelValue={(getUser && !isLoading && getUser.birth) ? "NASCIMENTO" : ""}
                                            valueDefault={(getUser && getUser.birth) ? ConvertDate(getUser.birth, "stringEUAToStringBR") : ""}
                                            InputProps={{ readOnly: true }} />
                                    </Grid>
                                    <Grid item md={3} xs={12}>
                                        <FormControlFieldMask valueMask="(99) 99999-9999"
                                            labelValue={(getUser && !isLoading && getUser.cellphone) ? "CELULAR" : ""}
                                            valueDefault={(getUser && getUser.cellphone) ? getUser.cellphone : ""}
                                            InputProps={{ readOnly: true }} />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <FormControlField labelValue={(getUser && getUser.email) ? "EMAIL" : ""}
                                            valueDefault={(getUser && !isLoading && getUser.email) ? getUser.email : ""}
                                            InputProps={{ readOnly: true }} />
                                    </Grid>
                                    <Grid item sm={3} xs={12}>
                                        <FormControlField isDisabled={(!getUser || isLoading)}
                                            typeField={viewPassword ? "text" : "password"} labelValue="SENHA*"
                                            valueDefault={passwordField} InputProps={{
                                                endAdornment:
                                                    <InputAdornment position="end">
                                                        <IconButton disabled={(!getUser || isLoading)}
                                                            onClick={() => setViewPassword(!viewPassword)} edge="end">
                                                            <IconList icon={viewPassword ? ICON_OBJECT_LIST.VISIBILITY_ICON
                                                                : ICON_OBJECT_LIST.VISIBILITY_OFF_ICON} />
                                                        </IconButton>
                                                    </InputAdornment>
                                            }} onChangeForm={(e) => setPasswordField(e.target.value)} />
                                    </Grid>
                                    <Grid item sm={3} xs={12}>
                                        <FormControlField isDisabled={(!getUser || isLoading)}
                                            typeField={confirmViewPassword ? "text" : "password"} labelValue="CONFIRMAÇÃO*"
                                            valueDefault={confirmPasswordField} InputProps={{
                                                endAdornment:
                                                    <InputAdornment position="end">
                                                        <IconButton disabled={(!getUser || isLoading)}
                                                            onClick={() => setConfirmViewPassword(!confirmViewPassword)} edge="end">
                                                            <IconList icon={confirmViewPassword ? ICON_OBJECT_LIST.VISIBILITY_ICON
                                                                : ICON_OBJECT_LIST.VISIBILITY_OFF_ICON} />
                                                        </IconButton>
                                                    </InputAdornment>
                                            }} onChangeForm={(e) => setConfirmPasswordField(e.target.value)} />
                                    </Grid>
                                </Grid>
                            </CardActions>
                            <CardActions className={classes.button_end}>
                                <ButtonSuccess title="SALVAR" iconStart={ICON_OBJECT_LIST.CHECK_ICON}
                                    isDisabled={(!getUser || isLoading)} actionClick={() =>
                                        update(passwordField, confirmPasswordField)} />
                                <ButtonIndigo title="VOLTAR" iconStart={ICON_OBJECT_LIST.ARROW_BACK_IOS_NEW_ICON}
                                    actionClick={() => navigate(URL_USERS)} />
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </PageCard>
        )
    }

export default UpdateUserPasswordPageView
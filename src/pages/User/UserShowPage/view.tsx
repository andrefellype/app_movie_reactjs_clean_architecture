/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Card, CardActions, Grid } from "@mui/material"
import { makeStyles } from "@material-ui/styles"
import { useNavigate } from 'react-router'
import PageCard from "../../../app/components/PageCard"
import FormControlField from '../../../app/components/FormControl/FormControlField'
import ButtonIndigo from '../../../app/components/Button/ButtonIndigo'
import ConvertDate from '../../../app/components/Utils/ConvertDate'
import ICON_OBJECT_LIST from '../../../app/components/IconList/ICON_OBJECT_LIST'
import FormControlFieldMask from '../../../app/components/FormControl/FormControlFieldMask'
import { URL_USERS } from '../../../app/core/consts'

const useStyles = makeStyles(() => ({
    button_end: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}))

const UserShowPageView: React.FC<{ getUser: any, isLoading: boolean }> = function ({ getUser, isLoading }) {
    const classes = useStyles()
    const navigate = useNavigate()

    const levels = [
        { label: "ADMINISTRADOR", value: "ADMIN" },
        { label: "COMUM", value: "COMMON" }
    ]

    return (
        <PageCard title="DADOS DO USUÁRIO" sizeLg={9} sizeXs={12}>
            <Grid container spacing={2}>
                <Grid item lg={9} xs={12}>
                    <Card>
                        <CardActions>
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12}>
                                    <FormControlField labelValue="NOME"
                                        valueDefault={(getUser && !isLoading) ? getUser.name : ""} InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlFieldMask valueMask="99/99/9999" labelValue="NASCIMENTO"
                                        valueDefault={(getUser && !isLoading)
                                            ? ConvertDate(getUser.birth, "stringEUAToStringBR") : ""}
                                        InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlFieldMask valueMask="(99) 99999-9999" labelValue="CELULAR"
                                        valueDefault={(getUser && !isLoading) ? getUser.cellphone : ""} InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <FormControlField labelValue="EMAIL" valueDefault={((getUser && !isLoading)
                                        && getUser.email) ? getUser.email : ""} InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <FormControlField labelValue="NÍVEL" valueDefault={(getUser && !isLoading)
                                        ? levels.filter(level => level.value === getUser.level)[0].label : ""} InputProps={{ readOnly: true }} />
                                </Grid>
                            </Grid>
                        </CardActions>
                        <CardActions className={classes.button_end}>
                            <ButtonIndigo title="VOLTAR" iconStart={ICON_OBJECT_LIST.ARROW_BACK_IOS_NEW_ICON}
                                actionClick={() => navigate(URL_USERS)} />
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </PageCard>
    )
}

export default UserShowPageView
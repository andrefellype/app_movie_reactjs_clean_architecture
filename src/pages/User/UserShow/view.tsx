/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
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

const UserShowView: React.FC<{ getUser: any }> = function ({ getUser }) {

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
                                    <FormControlField labelValue="NOME" valueDefault={getUser ? getUser.name : ""} />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlFieldMask valueMask="99/99/9999" labelValue="NASCIMENTO" valueDefault={getUser ? ConvertDate(getUser.birth, "stringEUAToStringBR") : ""} />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlFieldMask valueMask="(99) 99999-9999" labelValue="CELULAR" valueDefault={getUser ? getUser.cellphone : ""} />
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <FormControlField labelValue="EMAIL" valueDefault={(getUser && getUser.email) ? getUser.email : ""} />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <FormControlField labelValue="NÍVEL" valueDefault={getUser ? levels.filter(level => level.value === getUser.level)[0].label : ""} />
                                </Grid>
                            </Grid>
                        </CardActions>
                        <CardActions className={classes.button_end}>
                            <ButtonIndigo title="VOLTAR" iconStart={ICON_OBJECT_LIST.ARROW_BACK_IOS_NEW_ICON} actionClick={() => navigate(URL_USERS)} />
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </PageCard>
    )
}

export default UserShowView
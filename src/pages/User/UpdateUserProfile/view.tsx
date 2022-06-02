/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-destructuring */
import React from 'react'
import { Card, CardActions, Grid } from "@mui/material"
import { makeStyles } from "@material-ui/styles"

import PageCard from "../../../app/components/PageCard"
import ButtonSuccess from '../../../app/components/Button/ButtonSuccess'
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

const UpdateUserProfileView: React.FC<{ getUser: any, update: any }> = function ({ getUser, update }) {

    const classes = useStyles()

    const [nameField, setNameField] = React.useState("")
    const [birthField, setBirthField] = React.useState("")
    const [emailField, setEmailField] = React.useState("")
    const [cellphoneField, setCellphoneField] = React.useState("")

    React.useEffect(() => {
        if (getUser) {
            setNameField(getUser.name)
            setBirthField(ConvertDate(getUser.birth, "stringEUAToStringBR").toString())
            setEmailField(getUser.email ? getUser.email : "")
            setCellphoneField(getUser.cellphone)
        }
    }, [getUser])

    return (
        <PageCard title="EDITAR PERFIL" sizeMd={9} sizeXs={12}>
            <Grid container spacing={2}>
                <Grid item md={9} xs={12}>
                    <Card>
                        <CardActions>
                            <Grid container spacing={2}>
                                <Grid item md={8} xs={12}>
                                    <FormControlField isDisabled={!getUser} labelValue="NOME*" valueDefault={nameField} onChangeForm={(e) => setNameField(e.target.value)} />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <FormControlFieldMask isDisabled={!getUser} valueMask="99/99/9999" labelValue="NASCIMENTO*" valueDefault={birthField} onChangeForm={(e) => setBirthField(e.target.value)} />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <FormControlFieldMask isDisabled={!getUser} valueMask="(99) 99999-9999" labelValue="CELULAR*" valueDefault={cellphoneField} onChangeForm={(e) => setCellphoneField(e.target.value)} />
                                </Grid>
                                <Grid item xs={8}>
                                    <FormControlField isDisabled={!getUser} labelValue="EMAIL" valueDefault={emailField} onChangeForm={(e) => setEmailField(e.target.value)} />
                                </Grid>
                            </Grid>
                        </CardActions>
                        <CardActions className={classes.button_end}>
                            <ButtonSuccess title="SALVAR" iconStart={ICON_OBJECT_LIST.CHECK_ICON} isDisabled={!getUser} actionClick={() => update(nameField, birthField, emailField, cellphoneField)} />
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </PageCard>
    )
}

export default UpdateUserProfileView
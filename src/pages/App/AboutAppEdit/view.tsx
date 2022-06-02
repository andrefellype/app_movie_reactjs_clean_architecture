/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Card, CardActions, Grid } from "@mui/material"
import { makeStyles } from "@material-ui/styles"
import { useNavigate } from 'react-router-dom'

import ButtonSuccess from '../../../app/components/Button/ButtonSuccess'
import FormControlField from '../../../app/components/FormControl/FormControlField'

import ButtonIndigo from '../../../app/components/Button/ButtonIndigo'
import PageCard from '../../../app/components/PageCard'
import ICON_OBJECT_LIST from '../../../app/components/IconList/ICON_OBJECT_LIST'
import { URL_ABOUT } from '../../../app/core/consts'

const useStyles = makeStyles(() => ({
    button_end: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}))

const AboutAppEditView: React.FC<{ informationApp: any, saveRegister: any }> = function ({ informationApp, saveRegister }) {

    const classes = useStyles()
    const navigate = useNavigate()

    const [informationAppField, setInformationAppField] = React.useState("")
    const [informationWebField, setInformationWebField] = React.useState("")

    React.useEffect(() => {
        if (informationApp) {
            setInformationAppField(informationApp.app)
            setInformationWebField(informationApp.web)
        }
    }, [informationApp])

    return (
        <PageCard title="EDITAR CONTEÚDO SOBRE NÓS" sizeMd={6} sizeSm={8} sizeXs={12}>
            <Grid container spacing={2}>
                <Grid item md={6} sm={8} xs={12}>
                    <Card>
                        <CardActions>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControlField isMultiline totalRows={8} labelValue="INFORMAÇÃO APP" valueDefault={informationAppField} isDisabled={!informationApp} onChangeForm={(e) => setInformationAppField(e.target.value)} />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlField isMultiline totalRows={8} labelValue="INFORMAÇÃO WEB" valueDefault={informationWebField} isDisabled={!informationApp} onChangeForm={(e) => setInformationWebField(e.target.value)} />
                                </Grid>
                            </Grid>
                        </CardActions>
                        <CardActions className={classes.button_end}>
                            <ButtonSuccess title="SALVAR" iconStart={ICON_OBJECT_LIST.CHECK_ICON} actionClick={() => saveRegister(informationAppField, informationWebField)} />
                            <ButtonIndigo title="VOLTAR" iconStart={ICON_OBJECT_LIST.ARROW_BACK_IOS_NEW_ICON} actionClick={() => navigate(URL_ABOUT)} />
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </PageCard>
    )
}

export default AboutAppEditView
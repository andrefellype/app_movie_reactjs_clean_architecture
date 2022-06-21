/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Card, CardActions, Grid } from "@mui/material"
import { makeStyles } from "@material-ui/styles"
import ButtonSuccess from '../../../app/components/Button/ButtonSuccess'
import FormControlField from '../../../app/components/FormControl/FormControlField'
import PageCard from '../../../app/components/PageCard'
import ICON_OBJECT_LIST from '../../../app/components/IconList/ICON_OBJECT_LIST'

const useStyles = makeStyles(() => ({
    button_end: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}))

const AboutUsNewView: React.FC<{ saveRegister: any }> = function ({ saveRegister }) {

    const classes = useStyles()

    const [informationAppField, setInformationAppField] = React.useState("")
    const [informationWebField, setInformationWebField] = React.useState("")

    return (
        <PageCard title="ADICIONAR CONTEÚDO SOBRE NÓS" sizeMd={6} sizeSm={8} sizeXs={12}>
            <Grid container spacing={2}>
                <Grid item md={6} sm={8} xs={12}>
                    <Card>
                        <CardActions>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControlField isMultiline totalRows={8} labelValue="INFORMAÇÃO APP" valueDefault={informationAppField} onChangeForm={(e) => setInformationAppField(e.target.value)} />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlField isMultiline totalRows={8} labelValue="INFORMAÇÃO WEB" valueDefault={informationWebField} onChangeForm={(e) => setInformationWebField(e.target.value)} />
                                </Grid>
                            </Grid>
                        </CardActions>
                        <CardActions className={classes.button_end}>
                            <ButtonSuccess title="SALVAR" iconStart={ICON_OBJECT_LIST.CHECK_ICON} actionClick={() => saveRegister(informationAppField, informationWebField)} />
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </PageCard>
    )
}

export default AboutUsNewView
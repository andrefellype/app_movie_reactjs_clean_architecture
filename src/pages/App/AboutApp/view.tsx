/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-danger */
import React from 'react'
import { Typography, Card, CardActions, Grid } from "@mui/material"
import { makeStyles } from "@material-ui/styles"
import { useNavigate } from 'react-router-dom'

import ButtonSuccess from '../../../app/components/Button/ButtonSuccess'
import ButtonDanger from '../../../app/components/Button/ButtonDanger'
import DialogYesOrNot from '../../../app/components/Dialog/DialogYesOrNot'
import PageCard from '../../../app/components/PageCard'
import ICON_OBJECT_LIST from '../../../app/components/IconList/ICON_OBJECT_LIST'
import { MSG_DELETE_REGISTER_QUESTION, URL_ABOUT_EDIT, URL_ABOUT_NEW } from '../../../app/core/consts'

const useStyles = makeStyles(() => ({
    flex_center: {
        display: 'flex',
        justifyContent: 'center'
    },
    flex_end: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}))

const AboutAppView: React.FC<{ getAutenticate: any, informationApp: any, actionDeleteApp: any }> = function ({ getAutenticate, informationApp, actionDeleteApp }) {

    const classes = useStyles()
    const navigate = useNavigate()

    const [isDelete, setIsDelete] = React.useState(false)

    async function deleteApp() {
        await setIsDelete(false)
        actionDeleteApp()
    }

    return (
        <PageCard title="SOBRE NÓS" sizeMd={6} sizeXs={12}>
            {(getAutenticate && getAutenticate.level === "ADMIN") && <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                    <Card>
                        <CardActions className={classes.flex_end}>
                            <ButtonSuccess title={!informationApp ? "ADICIONAR CONTEÚDO" : "EDITAR CONTEÚDO"}
                                iconStart={!informationApp ? ICON_OBJECT_LIST.ADD_ICON : ICON_OBJECT_LIST.EDIT_ICON} actionClick={() => navigate(!informationApp ? URL_ABOUT_NEW : URL_ABOUT_EDIT)} />
                            {informationApp && <ButtonDanger title="APAGAR CONTEÚDO" iconStart={ICON_OBJECT_LIST.DELETE_ICON} actionClick={() => setIsDelete(true)} />}
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>}
            {informationApp && <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                    <Card>
                        <CardActions className={classes.flex_center}>
                            <Typography style={{ marginTop: 5, marginBottom: 5, fontWeight: 'bold' }} variant="h5" component="h5">
                                <div dangerouslySetInnerHTML={{ __html: informationApp.web }} />
                            </Typography>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>}
            <DialogYesOrNot showDialog={isDelete} onCloseDialog={() => setIsDelete(false)} clickDialogNot={() => setIsDelete(false)}
                titleDialog={MSG_DELETE_REGISTER_QUESTION} clickDialogYes={() => deleteApp()} />
        </PageCard>
    )
}

export default AboutAppView
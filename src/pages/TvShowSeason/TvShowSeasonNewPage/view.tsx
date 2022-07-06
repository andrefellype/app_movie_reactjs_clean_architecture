/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Card, CardActions, Grid } from "@mui/material"
import { makeStyles } from "@material-ui/styles"
import { useNavigate } from 'react-router-dom'
import PageCard from "../../../app/components/PageCard"
import ButtonSuccess from '../../../app/components/Button/ButtonSuccess'
import FormControlField from '../../../app/components/FormControl/FormControlField'
import ButtonIndigo from '../../../app/components/Button/ButtonIndigo'
import ICON_OBJECT_LIST from '../../../app/components/IconList/ICON_OBJECT_LIST'
import { URL_TV_SHOW_SEASONS } from '../../../app/core/consts'

const useStyles = makeStyles(() => ({
    button_end: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}))

const TvShowSeasonNewPageView: React.FC<{ getTvShow: any, saveRegister: any }> =
    function ({ getTvShow, saveRegister }) {
        const classes = useStyles()
        const navigate = useNavigate()

        const [nameField, setNameField] = React.useState("")

        return (
            <PageCard title={`NOVA TEMPORADA${(typeof getTvShow !== "undefined" && getTvShow !== null)
                ? ` - ${getTvShow.title}` : ""}`} sizeMd={6} sizeXs={12}>
                <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                        <Card>
                            <CardActions>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormControlField labelValue="NOME*" valueDefault={nameField}
                                            onChangeForm={(e) => setNameField(e.target.value)} />
                                    </Grid>
                                </Grid>
                            </CardActions>
                            <CardActions className={classes.button_end}>
                                <ButtonSuccess title="SALVAR" iconStart={ICON_OBJECT_LIST.CHECK_ICON}
                                    actionClick={() => saveRegister(nameField)} />
                                {getTvShow && <ButtonIndigo title="VOLTAR" iconStart={ICON_OBJECT_LIST.ARROW_BACK_IOS_NEW_ICON}
                                    actionClick={() => navigate(`${URL_TV_SHOW_SEASONS}/${getTvShow ? getTvShow._id : ""}`)} />}
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </PageCard>
        )
    }

export default TvShowSeasonNewPageView
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Card, CardActions, Grid } from "@mui/material"
import { makeStyles } from "@material-ui/styles"
import { useNavigate } from 'react-router'
import PageCard from "../../../app/components/PageCard"
import ButtonSuccess from '../../../app/components/Button/ButtonSuccess'
import ICON_OBJECT_LIST from '../../../app/components/IconList/ICON_OBJECT_LIST'
import FormControlField from '../../../app/components/FormControl/FormControlField'
import ButtonIndigo from '../../../app/components/Button/ButtonIndigo'
import { URL_TV_SHOW_EPISODES } from '../../../app/core/consts'

const useStyles = makeStyles(() => ({
    button_end: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}))

const TvShowEpisodeEditView: React.FC<{ getTvShow: any, getTvShowSeason: any, getEpisode: any, isLoading: boolean, update: any }> = function ({ getTvShow, getTvShowSeason, getEpisode, isLoading, update }) {

    const classes = useStyles()
    const navigate = useNavigate()

    const [nameField, setNameField] = React.useState("")

    React.useEffect(() => {
        if (getEpisode) {
            if(!getEpisode.enabledEdit){
                navigate(`${URL_TV_SHOW_EPISODES}/${getTvShowSeason._id}/${getTvShow._id}`)
            }
            setNameField(getEpisode.name)
        }
    }, [getEpisode])

    return (
        <PageCard title={`EDITAR EPISÓDIO${(typeof getTvShow !== "undefined" && getTvShow !== null) ? ` - ${getTvShow.title}` : ""}${(typeof getTvShowSeason !== "undefined" && getTvShowSeason !== null) ? ` - ${getTvShowSeason.name}` : ""}`} sizeMd={7} sizeXs={12}>
            <Grid container spacing={2}>
                <Grid item md={7} xs={12}>
                    <Card>
                        <CardActions>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControlField isDisabled={(!getEpisode || isLoading)} labelValue="NOME*" valueDefault={nameField} onChangeForm={(e) => setNameField(e.target.value)} />
                                </Grid>
                            </Grid>
                        </CardActions>
                        <CardActions className={classes.button_end}>
                            <ButtonSuccess title="SALVAR" iconStart={ICON_OBJECT_LIST.CHECK_ICON} isDisabled={(!getEpisode || isLoading)} actionClick={() => update(nameField)} />
                            <ButtonIndigo title="VOLTAR" iconStart={ICON_OBJECT_LIST.ARROW_BACK_IOS_NEW_ICON} actionClick={() => navigate(`${URL_TV_SHOW_EPISODES}/${getTvShowSeason._id}/${getTvShow ? getTvShow._id : ""}`)} />
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </PageCard>
    )
}

export default TvShowEpisodeEditView
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
import { URL_COUNTRIES } from '../../../app/core/consts'

const useStyles = makeStyles(() => ({
    button_end: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}))

const CountryEditPageView: React.FC<{ getCountry: any, isLoading: boolean, update: any }> =
    function ({ getCountry, isLoading, update }) {
        const classes = useStyles()
        const navigate = useNavigate()

        const [nameField, setNameField] = React.useState("")

        React.useEffect(() => {
            if (getCountry) {
                setNameField(getCountry.initial)
            }
        }, [getCountry])

        return (
            <PageCard title="EDITAR PAÍS" sizeMd={4} sizeXs={12}>
                <Grid container spacing={2}>
                    <Grid item md={4} xs={12}>
                        <Card>
                            <CardActions>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormControlField isDisabled={(!getCountry || isLoading)}
                                            labelValue="NOME*" valueDefault={nameField}
                                            onChangeForm={(e) => setNameField(e.target.value)} />
                                    </Grid>
                                </Grid>
                            </CardActions>
                            <CardActions className={classes.button_end}>
                                <ButtonSuccess title="SALVAR" iconStart={ICON_OBJECT_LIST.CHECK_ICON}
                                    isDisabled={(!getCountry || isLoading)} actionClick={() => update(nameField)} />
                                <ButtonIndigo title="VOLTAR" iconStart={ICON_OBJECT_LIST.ARROW_BACK_IOS_NEW_ICON}
                                    actionClick={() => navigate(URL_COUNTRIES)} />
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </PageCard>
        )
    }

export default CountryEditPageView
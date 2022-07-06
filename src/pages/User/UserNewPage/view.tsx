/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Card, CardActions, Grid, InputAdornment, IconButton } from "@mui/material"
import { makeStyles } from "@material-ui/styles"
import { useNavigate } from 'react-router-dom'
import PageCard from "../../../app/components/PageCard"
import ButtonSuccess from '../../../app/components/Button/ButtonSuccess'
import IconList from '../../../app/components/IconList'
import FormControlField from '../../../app/components/FormControl/FormControlField'
import ButtonIndigo from '../../../app/components/Button/ButtonIndigo'
import ICON_OBJECT_LIST from '../../../app/components/IconList/ICON_OBJECT_LIST'
import FormControlFieldMask from '../../../app/components/FormControl/FormControlFieldMask'
import FormControlFieldSelect from '../../../app/components/FormControl/FormControlFieldSelect'
import { URL_USERS } from '../../../app/core/consts'

const useStyles = makeStyles(() => ({
    button_end: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}))

const UserNewPageView: React.FC<{ saveRegister: any }> = function ({ saveRegister }) {
    const classes = useStyles()
    const navigate = useNavigate()

    const [nameField, setNameField] = React.useState("")
    const [birthField, setBirthField] = React.useState("")
    const [emailField, setEmailField] = React.useState("")
    const [cellphoneField, setCellphoneField] = React.useState("")
    const [levelField, setLevelField] = React.useState("")
    const [passwordField, setPasswordField] = React.useState("")
    const [confirmPasswordField, setConfirmPasswordField] = React.useState("")
    const [viewPassword, setViewPassword] = React.useState(false)
    const [confirmViewPassword, setConfirmViewPassword] = React.useState(false)

    return (
        <PageCard title="NOVO USUÁRIO" sizeLg={9} sizeXs={12}>
            <Grid container spacing={2}>
                <Grid item lg={9} xs={12}>
                    <Card>
                        <CardActions>
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12}>
                                    <FormControlField labelValue="NOME*" valueDefault={nameField}
                                        onChangeForm={(e) => setNameField(e.target.value)} />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlFieldMask valueMask="99/99/9999" labelValue="NASCIMENTO*"
                                        valueDefault={birthField} onChangeForm={(e) => setBirthField(e.target.value)} />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlFieldMask valueMask="(99) 99999-9999" labelValue="CELULAR*"
                                        valueDefault={cellphoneField}
                                        onChangeForm={(e) => setCellphoneField(e.target.value)} />
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <FormControlField labelValue="EMAIL" valueDefault={emailField}
                                        onChangeForm={(e) => setEmailField(e.target.value)} />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <FormControlFieldSelect labelValue="NÍVEL*" valueDefault={levelField}
                                        onChangeForm={(e) => setLevelField(e.target.value)}
                                        selectList={[{ label: "ADMINISTRADOR", value: "ADMIN" }]} />
                                </Grid>
                                <Grid item sm={4} xs={12}>
                                    <FormControlField typeField={viewPassword ? "text" : "password"} labelValue="SENHA*"
                                        valueDefault={passwordField} InputProps={{
                                            endAdornment:
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setViewPassword(!viewPassword)} edge="end">
                                                        <IconList icon={viewPassword ? ICON_OBJECT_LIST.VISIBILITY_ICON :
                                                            ICON_OBJECT_LIST.VISIBILITY_OFF_ICON} />
                                                    </IconButton>
                                                </InputAdornment>
                                        }} onChangeForm={(e) => setPasswordField(e.target.value)} />
                                </Grid>
                                <Grid item sm={4} xs={12}>
                                    <FormControlField typeField={confirmViewPassword ? "text" : "password"}
                                        labelValue="CONFIRMAÇÃO*" valueDefault={confirmPasswordField} InputProps={{
                                            endAdornment:
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setConfirmViewPassword(!confirmViewPassword)}
                                                        edge="end">
                                                        <IconList icon={confirmViewPassword ? ICON_OBJECT_LIST.VISIBILITY_ICON
                                                            : ICON_OBJECT_LIST.VISIBILITY_OFF_ICON} />
                                                    </IconButton>
                                                </InputAdornment>
                                        }} onChangeForm={(e) => setConfirmPasswordField(e.target.value)} />
                                </Grid>
                            </Grid>
                        </CardActions>
                        <CardActions className={classes.button_end}>
                            <ButtonSuccess title="SALVAR" iconStart={ICON_OBJECT_LIST.CHECK_ICON} actionClick={() =>
                                saveRegister(nameField, birthField, emailField, cellphoneField, passwordField, confirmPasswordField, levelField)} />
                            <ButtonIndigo title="VOLTAR" iconStart={ICON_OBJECT_LIST.ARROW_BACK_IOS_NEW_ICON} actionClick={() => navigate(URL_USERS)} />
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </PageCard>
    )
}

export default UserNewPageView
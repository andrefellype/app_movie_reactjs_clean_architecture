/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {
    Card, CardActions, Dialog, DialogActions, DialogContent, Grid, IconButton, InputAdornment,
    Paper, Table, TableBody, TableContainer
} from "@mui/material"
import { makeStyles } from "@material-ui/styles"
import { useNavigate } from 'react-router'
import PageCard from "../../../app/components/PageCard"
import ICON_OBJECT_LIST from '../../../app/components/IconList/ICON_OBJECT_LIST'
import FormControlField from '../../../app/components/FormControl/FormControlField'
import ButtonIndigo from '../../../app/components/Button/ButtonIndigo'
import { MONTHS, URL_TV_SHOWS } from '../../../app/core/consts'
import IconList from '../../../app/components/IconList'
import ButtonDanger from '../../../app/components/Button/ButtonDanger'
import TableRowStyle from '../../../app/components/Table/TableRowStyle'
import TableCellStyle from '../../../app/components/Table/TableCellStyle'

const useStyles = makeStyles(() => ({
    button_end: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}))

const TvShowShowPageView: React.FC<{ getTvShow: any, isLoading: boolean }> = function ({
    getTvShow, isLoading }) {
    const classes = useStyles()
    const navigate = useNavigate()

    const [showCategory, setShowCategory] = React.useState(false)
    const [showCountry, setShowCountry] = React.useState(false)
    const [showStream, setShowStream] = React.useState(false)

    function getReleaseStr() {
        if (getTvShow) {
            if (getTvShow.release.length === 4) {
                const year = parseInt(getTvShow.release, 10)
                return `${year}`
            }
            if (getTvShow.release.length === 7) {
                const year = parseInt(getTvShow.release, 10)
                const month = parseInt(getTvShow.release.substring(5, 7), 10)
                return `${MONTHS.filter((m, key) => (key + 1) === month)[0].substring(0, 3)}. de ${year}`
            }
            if (getTvShow.release.length === 10) {
                const year = parseInt(getTvShow.release, 10)
                const month = parseInt(getTvShow.release.substring(5, 7), 10)
                const day = parseInt(getTvShow.release.substring(8, 10), 10)

                return `${(day >= 1 && day <= 9) ? `0${day}` : day} de ${MONTHS.filter((m, key) => (key + 1) === month)[0].substring(0, 3)}. de ${year}`
            }
        }
        return ""
    }

    function getShowCategories() {
        if (getTvShow && getTvShow.categories.length > 0) {
            return getTvShow.categories.reduce((actual, categoryValue) => `${actual}${actual.length > 0 ? ", " : ""}${categoryValue.name}`, "")
        }
        return "NÃO POSSUÍ CATEGORIA"
    }

    function getShowCountries() {
        if (getTvShow && getTvShow.countries.length > 0) {
            return getTvShow.countries.reduce((actual, countryValue) => `${actual}${actual.length > 0 ? ", " : ""}${countryValue.initial}`, "")
        }
        return "NÃO POSSUÍ PAÍS"
    }

    function getShowStreams() {
        if (getTvShow && getTvShow.streams.length > 0) {
            return getTvShow.streams.reduce((actual, streamValue) => `${actual}${actual.length > 0 ? ", " : ""}${streamValue.name}`, "")
        }
        return "NÃO POSSUÍ STREAM"
    }

    function dialogCategories() {
        return (<Dialog fullWidth maxWidth="sm" open={showCategory} onClose={() =>
            setShowCategory(true)} aria-labelledby="form-dialog-title">
            {(getTvShow && getTvShow.categories && getTvShow.categories.length > 0)
                && <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableBody>
                                        {getTvShow.categories.map((row, key) => (
                                            <TableRowStyle hover key={key}>
                                                <TableCellStyle scope="row" align="left"
                                                    style={{ fontWeight: 'bold' }}>
                                                    {row.name}
                                                </TableCellStyle>
                                            </TableRowStyle>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </DialogContent>}
            <DialogActions>
                <ButtonDanger title="FECHAR" actionClick={() => setShowCategory(false)} />
            </DialogActions>
        </Dialog>)
    }

    function dialogCountry() {
        return (<Dialog fullWidth maxWidth="sm" open={showCountry} onClose={() => setShowCountry(true)}
            aria-labelledby="form-dialog-title">
            {(getTvShow && getTvShow.countries && getTvShow.countries.length > 0) && <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table aria-label="customized table">
                                <TableBody>
                                    {getTvShow.countries.map((row, key) => (
                                        <TableRowStyle hover key={key}>
                                            <TableCellStyle scope="row" align="left"
                                                style={{ fontWeight: 'bold' }}>
                                                {row.name}
                                            </TableCellStyle>
                                        </TableRowStyle>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </DialogContent>}
            <DialogActions>
                <ButtonDanger title="FECHAR" actionClick={() => setShowCountry(false)} />
            </DialogActions>
        </Dialog>)
    }

    function dialogStream() {
        return (<Dialog fullWidth maxWidth="sm" open={showStream}
            onClose={() => setShowStream(true)} aria-labelledby="form-dialog-title">
            {(getTvShow && getTvShow.streams && getTvShow.streams.length > 0) && <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table aria-label="customized table">
                                <TableBody>
                                    {getTvShow.streams.map((row, key) => (
                                        <TableRowStyle hover key={key}>
                                            <TableCellStyle scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                                {row.name}
                                            </TableCellStyle>
                                        </TableRowStyle>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </DialogContent>}
            <DialogActions>
                <ButtonDanger title="FECHAR" actionClick={() => setShowStream(false)} />
            </DialogActions>
        </Dialog>)
    }

    return (
        <PageCard title="DADOS DA SÉRIE" sizeXs={12}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <CardActions>
                            <Grid container spacing={2}>
                                <Grid item md={4} xs={12}>
                                    <FormControlField labelValue="TÍTULO" isDisabled={(!getTvShow || isLoading)}
                                        InputProps={{ readOnly: true }} valueDefault={getTvShow ? getTvShow.title : ""} />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlField labelValue="LANÇAMENTO" isDisabled={(!getTvShow || isLoading)} InputProps={{ readOnly: true }}
                                        valueDefault={getReleaseStr()} />
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControlField labelValue="CATEGORIA"
                                        isDisabled={(!getTvShow || isLoading)}
                                        valueDefault={getShowCategories()} InputProps={{
                                            readOnly: true,
                                            endAdornment: (getTvShow && !isLoading)
                                                ? <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowCategory(true)} edge="end">
                                                        <IconList icon={ICON_OBJECT_LIST.ARROW_FORWARD_IOS_ICON} />
                                                    </IconButton>
                                                </InputAdornment> : null
                                        }} />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlField labelValue="PAÍS DE ORIGEM"
                                        isDisabled={(!getTvShow || isLoading)}
                                        valueDefault={getShowCountries()} InputProps={{
                                            readOnly: true,
                                            endAdornment: (getTvShow && !isLoading)
                                                ? <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowCountry(true)} edge="end">
                                                        <IconList icon={ICON_OBJECT_LIST.ARROW_FORWARD_IOS_ICON} />
                                                    </IconButton>
                                                </InputAdornment> : null
                                        }} />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlField labelValue="STREAM"
                                        isDisabled={(!getTvShow || isLoading)}
                                        valueDefault={getShowStreams()} InputProps={{
                                            readOnly: true,
                                            endAdornment: (getTvShow && !isLoading)
                                                ? <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowStream(true)} edge="end">
                                                        <IconList icon={ICON_OBJECT_LIST.ARROW_FORWARD_IOS_ICON} />
                                                    </IconButton>
                                                </InputAdornment> : null
                                        }} />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <FormControlField labelValue="SINOPSE" isDisabled={(!getTvShow || isLoading)}
                                        InputProps={{ readOnly: true }} valueDefault={getTvShow ? getTvShow.resume : ""} />
                                </Grid>
                            </Grid>
                        </CardActions>
                        <CardActions className={classes.button_end}>
                            <ButtonIndigo title="VOLTAR"
                                iconStart={ICON_OBJECT_LIST.ARROW_BACK_IOS_NEW_ICON}
                                actionClick={() => navigate(URL_TV_SHOWS)} />
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            {dialogCategories()}
            {dialogCountry()}
            {dialogStream()}
        </PageCard>
    )
}

export default TvShowShowPageView
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
import { MONTHS, URL_MOVIES } from '../../../app/core/consts'
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

const MovieShowPageView: React.FC<{ getMovie: any, isLoading: boolean }> = function ({
    getMovie, isLoading }) {
    const classes = useStyles()
    const navigate = useNavigate()

    const [showDirector, setShowDirector] = React.useState(false)
    const [showCast, setShowCast] = React.useState(false)
    const [showCategory, setShowCategory] = React.useState(false)
    const [showCountry, setShowCountry] = React.useState(false)
    const [showStream, setShowStream] = React.useState(false)

    function getReleaseStr() {
        if (getMovie) {
            if (getMovie.release.length === 4) {
                const year = parseInt(getMovie.release, 10)
                return `${year}`
            }
            if (getMovie.release.length === 7) {
                const year = parseInt(getMovie.release, 10)
                const month = parseInt(getMovie.release.substring(5, 7), 10)
                return `${MONTHS.filter((m, key) => (key + 1) === month)[0].substring(0, 3)}. de ${year}`
            }
            if (getMovie.release.length === 10) {
                const year = parseInt(getMovie.release, 10)
                const month = parseInt(getMovie.release.substring(5, 7), 10)
                const day = parseInt(getMovie.release.substring(8, 10), 10)

                return `${(day >= 1 && day <= 9) ? `0${day}` : day} de ${MONTHS.filter((m, key) => (key + 1) === month)[0].substring(0, 3)}. de ${year}`
            }
        }
        return ""
    }

    function getMovieTheaterStr() {
        if (getMovie) {
            return getMovie.movie_theater ? "SIM" : "NÃO"
        }
        return ""
    }

    function getShowDirectors() {
        if (getMovie && getMovie.directors.length > 0) {
            return getMovie.directors.reduce((actual, directorValue) => `${actual}${actual.length > 0 ? ", " : ""}${directorValue.name}`, "")
        }
        return "NÃO POSSUÍ DIRETOR"
    }

    function getShowCasts() {
        if (getMovie && getMovie.casts.length > 0) {
            return getMovie.casts.reduce((actual, castValue) => `${actual}${actual.length > 0 ? ", " : ""}${castValue.name}`, "")
        }
        return "NÃO POSSUÍ ELENCO"
    }

    function getShowCategories() {
        if (getMovie && getMovie.categories.length > 0) {
            return getMovie.categories.reduce((actual, categoryValue) => `${actual}${actual.length > 0 ? ", " : ""}${categoryValue.name}`, "")
        }
        return "NÃO POSSUÍ CATEGORIA"
    }

    function getShowCountries() {
        if (getMovie && getMovie.countries.length > 0) {
            return getMovie.countries.reduce((actual, countryValue) => `${actual}${actual.length > 0 ? ", " : ""}${countryValue.initial}`, "")
        }
        return "NÃO POSSUÍ PAÍS"
    }

    function getShowStreams() {
        if (getMovie && getMovie.streams.length > 0) {
            return getMovie.streams.reduce((actual, streamValue) => `${actual}${actual.length > 0 ? ", " : ""}${streamValue.name}`, "")
        }
        return "NÃO POSSUÍ STREAM"
    }

    function dialogDirectors() {
        return (<Dialog fullWidth maxWidth="sm" open={showDirector} onClose={() => setShowDirector(true)} aria-labelledby="form-dialog-title">
            {(getMovie && getMovie.directors && getMovie.directors.length > 0) && <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table aria-label="customized table">
                                <TableBody>
                                    {getMovie.directors.map((row, key) => (
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
                <ButtonDanger title="FECHAR" actionClick={() => setShowDirector(false)} />
            </DialogActions>
        </Dialog>)
    }

    function dialogCast() {
        return (<Dialog fullWidth maxWidth="sm" open={showCast} onClose={() => setShowCast(true)} aria-labelledby="form-dialog-title">
            {(getMovie && getMovie.casts && getMovie.casts.length > 0) && <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table aria-label="customized table">
                                <TableBody>
                                    {getMovie.casts.map((row, key) => (
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
                <ButtonDanger title="FECHAR" actionClick={() => setShowCast(false)} />
            </DialogActions>
        </Dialog>)
    }

    function dialogCategories() {
        return (<Dialog fullWidth maxWidth="sm" open={showCategory} onClose={() => setShowCategory(true)} aria-labelledby="form-dialog-title">
            {(getMovie && getMovie.categories && getMovie.categories.length > 0) && <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table aria-label="customized table">
                                <TableBody>
                                    {getMovie.categories.map((row, key) => (
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
                <ButtonDanger title="FECHAR" actionClick={() => setShowCategory(false)} />
            </DialogActions>
        </Dialog>)
    }

    function dialogCountry() {
        return (<Dialog fullWidth maxWidth="sm" open={showCountry} onClose={() => setShowCountry(true)} aria-labelledby="form-dialog-title">
            {(getMovie && getMovie.countries && getMovie.countries.length > 0) && <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table aria-label="customized table">
                                <TableBody>
                                    {getMovie.countries.map((row, key) => (
                                        <TableRowStyle hover key={key}>
                                            <TableCellStyle scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                                {row.initial}
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
        return (<Dialog fullWidth maxWidth="sm" open={showStream} onClose={() => setShowStream(true)} aria-labelledby="form-dialog-title">
            {(getMovie && getMovie.streams && getMovie.streams.length > 0) && <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table aria-label="customized table">
                                <TableBody>
                                    {getMovie.streams.map((row, key) => (
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
        <PageCard title="DADOS DO FILME" sizeXs={12}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <CardActions>
                            <Grid container spacing={2}>
                                <Grid item md={4} xs={12}>
                                    <FormControlField isDisabled={(!getMovie || isLoading)} labelValue="TÍTULO"
                                        valueDefault={getMovie ? getMovie.title : ""} InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlField isDisabled={(!getMovie || isLoading)} labelValue="LANÇAMENTO"
                                        valueDefault={getReleaseStr()} InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid item md={5} xs={12}>
                                    <FormControlField isDisabled={(!getMovie || isLoading)} labelValue="DIRETOR"
                                        valueDefault={getShowDirectors()} InputProps={{
                                            readOnly: true,
                                            endAdornment: (getMovie && !isLoading) ? <InputAdornment position="end">
                                                <IconButton onClick={() => setShowDirector(true)} edge="end">
                                                    <IconList icon={ICON_OBJECT_LIST.ARROW_FORWARD_IOS_ICON} />
                                                </IconButton>
                                            </InputAdornment> : null
                                        }} />
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControlField isDisabled={(!getMovie || isLoading)} labelValue="ELENCO"
                                        valueDefault={getShowCasts()} InputProps={{
                                            readOnly: true,
                                            endAdornment: (getMovie && !isLoading) ? <InputAdornment position="end">
                                                <IconButton onClick={() => setShowCast(true)} edge="end">
                                                    <IconList icon={ICON_OBJECT_LIST.ARROW_FORWARD_IOS_ICON} />
                                                </IconButton>
                                            </InputAdornment> : null
                                        }} />
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControlField isDisabled={(!getMovie || isLoading)} InputProps={{ readOnly: true }}
                                        labelValue="DURAÇÃO" valueDefault={getMovie ? getMovie.duration.substring(0, 5) : ""} />
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControlField isDisabled={(!getMovie || isLoading)} labelValue="CATEGORIA"
                                        valueDefault={getShowCategories()} InputProps={{
                                            readOnly: true,
                                            endAdornment: (getMovie && !isLoading) ? <InputAdornment position="end">
                                                <IconButton onClick={() => setShowCategory(true)} edge="end">
                                                    <IconList icon={ICON_OBJECT_LIST.ARROW_FORWARD_IOS_ICON} />
                                                </IconButton>
                                            </InputAdornment> : null
                                        }} />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlField isDisabled={(!getMovie || isLoading)} labelValue="PAÍS DE ORIGEM"
                                        valueDefault={getShowCountries()} InputProps={{
                                            readOnly: true,
                                            endAdornment: (getMovie && !isLoading) ? <InputAdornment position="end">
                                                <IconButton onClick={() => setShowCountry(true)} edge="end">
                                                    <IconList icon={ICON_OBJECT_LIST.ARROW_FORWARD_IOS_ICON} />
                                                </IconButton>
                                            </InputAdornment> : null
                                        }} />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlField isDisabled={(!getMovie || isLoading)} labelValue="STREAM"
                                        valueDefault={getShowStreams()} InputProps={{
                                            readOnly: true,
                                            endAdornment: (getMovie && !isLoading) ? <InputAdornment position="end">
                                                <IconButton onClick={() => setShowStream(true)} edge="end">
                                                    <IconList icon={ICON_OBJECT_LIST.ARROW_FORWARD_IOS_ICON} />
                                                </IconButton>
                                            </InputAdornment> : null
                                        }} />
                                </Grid>
                                <Grid item md={1} xs={12}>
                                    <FormControlField isDisabled={(!getMovie || isLoading)} labelValue="CINEMA"
                                        valueDefault={getMovieTheaterStr()} InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid item md={5} xs={12}>
                                    <FormControlField isDisabled={(!getMovie || isLoading)} labelValue="SINOPSE"
                                        valueDefault={getMovie ? getMovie.resume : ""} InputProps={{ readOnly: true }} />
                                </Grid>
                            </Grid>
                        </CardActions>
                        <CardActions className={classes.button_end}>
                            <ButtonIndigo title="VOLTAR" iconStart={ICON_OBJECT_LIST.ARROW_BACK_IOS_NEW_ICON}
                                actionClick={() => navigate(URL_MOVIES)} />
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            {dialogDirectors()}
            {dialogCast()}
            {dialogCategories()}
            {dialogCountry()}
            {dialogStream()}
        </PageCard>
    )
}

export default MovieShowPageView
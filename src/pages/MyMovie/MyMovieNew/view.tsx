/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { ButtonGroup, Card, CardActions, Dialog, DialogActions, DialogContent, Grid, IconButton, InputAdornment, Paper, Table, TableContainer, TableRow } from "@mui/material"
import { makeStyles } from "@material-ui/styles"
import { useNavigate } from 'react-router-dom'
import PageCard from "../../../app/components/PageCard"
import ButtonSuccess from '../../../app/components/Button/ButtonSuccess'
import FormControlField from '../../../app/components/FormControl/FormControlField'
import ButtonIndigo from '../../../app/components/Button/ButtonIndigo'
import ICON_OBJECT_LIST from '../../../app/components/IconList/ICON_OBJECT_LIST'
import { MONTHS, MSG_REMOVE_FILME_QUESTION, URL_MY_MOVIES } from '../../../app/core/consts'
import IconList from '../../../app/components/IconList'
import ButtonDanger from '../../../app/components/Button/ButtonDanger'
import TableRowStyle from '../../../app/components/Table/TableRowStyle'
import TableCellStyle from '../../../app/components/Table/TableCellStyle'
import DialogYesOrNot from '../../../app/components/Dialog/DialogYesOrNot'
import ButtonWarning from '../../../app/components/Button/ButtonWarning'
import PaginationList from '../../../app/components/PaginationList'
import TableBodyStyle from '../../../app/components/Table/TableBodyStyle'
import TableHeadStyle from '../../../app/components/Table/TableHeadStyle'

const useStyles = makeStyles(() => ({
    button_end: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}))

const MyMovieNewView: React.FC<{
    movies: any, actionChangeSearchMovie: any, actionRefreshListMovie: any, saveRegister: any, removeRegister: any,
    positionPage: number, countMovie: any, changePagination: any, showLoading: boolean
}> =
    function ({
        movies, actionChangeSearchMovie, actionRefreshListMovie, saveRegister, removeRegister,
        positionPage, countMovie, changePagination, showLoading
    }) {

        const classes = useStyles()
        const navigate = useNavigate()

        const [movieIdField, setMovieIdField] = React.useState("")
        const [movieTitleField, setMovieTitleField] = React.useState("")

        const [showMovie, setShowMovie] = React.useState(false)
        const [searchTextMovie, setSearchTextMovie] = React.useState("")

        const [idMovieRemove, setIdMovieRemove] = React.useState("")

        async function refreshListMovie() {
            actionRefreshListMovie(searchTextMovie)
        }
        
        const [typingTimeout, setTypingTimeout] = React.useState<any>(0)
       
        function searchFinish(search: string) {
            actionChangeSearchMovie(search)
        }

        function changeSearchMovie(search: string) {
            setSearchTextMovie(search)
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
            // eslint-disable-next-line prefer-arrow-callback
            setTypingTimeout(setTimeout(() => searchFinish(search), 500))
        }

        function getShowCategories(rowMovie) {
            if (rowMovie.categories.length > 0) {
                return rowMovie.categories.reduce((actual, categoryOb) => `${actual.length > 0 ? `${actual}, ` : ""}${categoryOb.name}`, "")
            }
            return "SEM CATEGORIA"
        }

        function getShowCountries(rowMovie) {
            if (rowMovie.countries.length > 0) {
                return rowMovie.countries.reduce((actual, countryOb) => `${actual.length > 0 ? `${actual}, ` : ""}${countryOb.initial}`, "")
            }
            return "SEM PAÍS DE ORIGEM"
        }

        function getRelease(release) {
            if (release.length === 10) {
                return `${release.substring(8, 10)} de ${MONTHS[(parseInt(release.substring(5, 7), 10) - 1)]} de ${release.substring(0, 4)}`
            }
            if (release.length === 7) {
                return `${MONTHS[(parseInt(release.substring(5, 7), 10) - 1)]} de ${release.substring(0, 4)}`
            }
            return release
        }

        function dialogMovies() {
            return (<Dialog fullWidth maxWidth="xl" open={showMovie} onClose={() => setShowMovie(true)} aria-labelledby="form-dialog-title">
                <DialogContent style={{ marginLeft: 10, marginRight: 10 }}>
                    <FormControlField style={{ marginBottom: 20 }} valueDefault={searchTextMovie} labelValue="DIGITE O NOME" onChangeForm={(e) => changeSearchMovie(e.target.value)} InputProps={{
                        endAdornment: <InputAdornment position="end">
                            {searchTextMovie.length > 0 && <IconButton edge="end" onClick={() => changeSearchMovie("")}><IconList icon={ICON_OBJECT_LIST.CLEAR_ICON} /></IconButton>}
                            <IconButton edge="end" onClick={() => refreshListMovie()}>
                                <IconList icon={ICON_OBJECT_LIST.REFRESH_ICON} />
                            </IconButton>
                        </InputAdornment>
                    }} />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHeadStyle>
                                        <TableRow>
                                            <TableCellStyle>Título</TableCellStyle>
                                            <TableCellStyle width={350}>Categoria</TableCellStyle>
                                            <TableCellStyle width={200}>Lançamento</TableCellStyle>
                                            <TableCellStyle width={50}>Duração</TableCellStyle>
                                            <TableCellStyle width={200}>Origem</TableCellStyle>
                                            <TableCellStyle width={50} />
                                        </TableRow>
                                    </TableHeadStyle>
                                    <TableBodyStyle colSpanValue={6} listData={movies} isLoading={showLoading}>
                                        {movies && movies.map((row, key) => (
                                            <TableRowStyle hover key={key}>
                                                <TableCellStyle scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                                    {row.title}
                                                </TableCellStyle>
                                                <TableCellStyle align="left">
                                                    {getShowCategories(row)}
                                                </TableCellStyle>
                                                <TableCellStyle align="left">
                                                    {getRelease(row.release)}
                                                </TableCellStyle>
                                                <TableCellStyle align="left">
                                                    {row.duration.substring(0, 5)}
                                                </TableCellStyle>
                                                <TableCellStyle align="left">
                                                    {getShowCountries(row)}
                                                </TableCellStyle>
                                                <TableCellStyle width={100} align="center">
                                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                        {((movieIdField.length === 0 || movieIdField !== row._id) ? <ButtonSuccess sizeBtn='small' titleIcon={ICON_OBJECT_LIST.CHECK_ICON} actionClick={() => {
                                                            setShowMovie(false)
                                                            setMovieIdField(row._id)
                                                            setMovieTitleField(row.title)
                                                        }} /> : <ButtonWarning sizeBtn='small' titleIcon={ICON_OBJECT_LIST.REMOVE_ICON} actionClick={() => {
                                                            setMovieIdField("")
                                                            setMovieTitleField("")
                                                        }} />)}
                                                        <ButtonDanger sizeBtn='small' titleIcon={ICON_OBJECT_LIST.CANCEL_ICON} actionClick={() => setIdMovieRemove(row._id)} />
                                                    </ButtonGroup>
                                                </TableCellStyle>
                                            </TableRowStyle>
                                        ))}
                                    </TableBodyStyle>
                                </Table>
                            </TableContainer>
                            <PaginationList isLoading={showLoading} valuePage={positionPage} dataList={movies} countList={countMovie} style={{ marginTop: 10 }}
                                actionClick={(value: number) => changePagination(value)} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <ButtonDanger title="FECHAR" actionClick={() => setShowMovie(false)} />
                </DialogActions>
            </Dialog>)
        }

        return (
            <PageCard title="ADICIONAR NOVO FILME" sizeMd={6} sizeXs={12}>
                <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                        <Card>
                            <CardActions>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormControlField labelValue="FILME" valueDefault={movieTitleField} InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton onClick={() => setShowMovie(true)} edge="end">
                                                    <IconList icon={ICON_OBJECT_LIST.ARROW_FORWARD_IOS_ICON} />
                                                </IconButton>
                                            </InputAdornment>
                                        }} />
                                    </Grid>
                                </Grid>
                            </CardActions>
                            <CardActions className={classes.button_end}>
                                <ButtonSuccess title="JÁ ASSISTIR" iconStart={ICON_OBJECT_LIST.CHECK_ICON} actionClick={() => saveRegister(movieIdField)} />
                                <ButtonIndigo title="VOLTAR" iconStart={ICON_OBJECT_LIST.ARROW_BACK_IOS_NEW_ICON} actionClick={() => navigate(URL_MY_MOVIES)} />
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
                {dialogMovies()}
                <DialogYesOrNot showDialog={idMovieRemove.length > 0} onCloseDialog={() => setIdMovieRemove(idMovieRemove)} clickDialogNot={() => setIdMovieRemove("")}
                    titleDialog={MSG_REMOVE_FILME_QUESTION} clickDialogYes={() => {
                        const idRemove = idMovieRemove
                        setIdMovieRemove("")
                        setShowMovie(false)
                        removeRegister(idRemove)
                    }} />
            </PageCard>
        )
    }

export default MyMovieNewView
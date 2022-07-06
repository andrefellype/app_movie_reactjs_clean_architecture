/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {
    ButtonGroup, Card, CardActions, Dialog, DialogActions, DialogContent, Grid, IconButton, InputAdornment, Paper, Table, TableContainer, TableRow
} from "@mui/material"
import { makeStyles } from "@material-ui/styles"
import { useNavigate } from 'react-router-dom'
import PageCard from "../../../app/components/PageCard"
import ButtonSuccess from '../../../app/components/Button/ButtonSuccess'
import FormControlField from '../../../app/components/FormControl/FormControlField'
import ButtonIndigo from '../../../app/components/Button/ButtonIndigo'
import ICON_OBJECT_LIST from '../../../app/components/IconList/ICON_OBJECT_LIST'
import {
    MONTHS, MSG_REMOVE_TV_SHOW_EPISODE_QUESTION, MSG_REMOVE_TV_SHOW_QUESTION, MSG_REMOVE_TV_SHOW_SEASON_QUESTION, URL_MY_TV_SHOWS
} from '../../../app/core/consts'
import IconList from '../../../app/components/IconList'
import ButtonDanger from '../../../app/components/Button/ButtonDanger'
import TableRowStyle from '../../../app/components/Table/TableRowStyle'
import TableCellStyle from '../../../app/components/Table/TableCellStyle'
import DialogYesOrNot from '../../../app/components/Dialog/DialogYesOrNot'
import ButtonWarning from '../../../app/components/Button/ButtonWarning'
import ButtonBlueGray from '../../../app/components/Button/ButtonBlueGray'
import TableHeadStyle from '../../../app/components/Table/TableHeadStyle'
import PaginationList from '../../../app/components/PaginationList'
import TableBodyStyle from '../../../app/components/Table/TableBodyStyle'

const useStyles = makeStyles(() => ({
    button_end: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}))

function reducerEpisode(state, action) {
    switch (action.type) {
        case 'add':
            let episodesAdd = state.episodes
            if (episodesAdd.filter(e => (e.season === action.season_id && e.tv_show_id === action.tv_show_id)).length > 0) {
                episodesAdd.push({ _id: action._id, name: action.name, season: action.season_id, tv_show_id: action.tv_show_id })
            } else {
                episodesAdd = [{ _id: action._id, name: action.name, season: action.season_id, tv_show_id: action.tv_show_id }]
            }
            return { episodes: episodesAdd }
        case 'removeAllAndAddEpisode':
            const episodesAddAll: object[] = []
            const episodesAll = action.episodesInsert
            for (let e = 0; e < episodesAll.length; e++) {
                episodesAddAll.push({ _id: episodesAll[e]._id, name: episodesAll[e].name, season: action.season_id, tv_show_id: action.tv_show_id })
            }
            return { episodes: episodesAddAll }
        case 'remove':
            let episodesRemove = state.episodes
            episodesRemove = episodesRemove.filter((value) => value._id !== action._id)
            return { episodes: episodesRemove }
        case 'removeAll':
            return { episodes: [] }
        default:
            throw new Error()
    }
}

const MyTvShowNewPageView: React.FC<{
    tvShows: any, seasons: any, episodes: any, refreshListEpisode: any, refreshListSeason: any, actionChangeSearchTvShow: any, actionRefreshListTvShow: any,
    saveRegister: any, removeEpisodeRegister: any, removeSeasonRegister: any, removeRegisterTvShow: any, showLoading: boolean, positionPageTvShow: number,
    countTvShow: any, changePaginationTvShow: any, positionPageSeason: number, countSeason: any, changePaginationSeason: any, positionPageEpisode: number,
    countEpisode: any, changePaginationEpisode: any
}> =
    function ({
        tvShows, seasons, episodes, refreshListEpisode, refreshListSeason, actionChangeSearchTvShow, actionRefreshListTvShow, saveRegister,
        removeEpisodeRegister, removeSeasonRegister, removeRegisterTvShow, showLoading, positionPageTvShow, countTvShow, changePaginationTvShow,
        positionPageSeason, countSeason, changePaginationSeason, positionPageEpisode, countEpisode, changePaginationEpisode }) {
        const classes = useStyles()
        const navigate = useNavigate()

        const [tvShowIdField, setTvShowIdField] = React.useState("")
        const [tvShowIdTemp, setTvShowIdTemp] = React.useState("")
        const [tvShowTitleField, setTvShowTitleField] = React.useState("")
        const [seasonIdField, setSeasonIdField] = React.useState("")
        const [seasonIdTemp, setSeasonIdTemp] = React.useState("")
        const [seasonNameField, setSeasonNameField] = React.useState("")

        const [stateEpisode, dispatchEpisode] = React.useReducer(reducerEpisode, { episodes: [] })

        const [showTvShow, setShowTvShow] = React.useState(false)
        const [showSeason, setShowSeason] = React.useState(false)
        const [showEpisode, setShowEpisode] = React.useState(false)
        const [searchTextTvShow, setSearchTextTvShow] = React.useState("")

        const [idTvShowRemove, setIdTvShowRemove] = React.useState("")
        const [idSeasonRemove, setIdSeasonRemove] = React.useState("")
        const [idEpisodeRemove, setIdEpisodeRemove] = React.useState("")
        const [statusInsertSeason, setStatusInsertSeason] = React.useState("")

        React.useEffect(() => {
            if (tvShowIdTemp.length > 0) {
                setTvShowIdField(tvShowIdTemp)
                refreshListSeason(tvShowIdTemp)
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [tvShowIdTemp])

        React.useEffect(() => {
            if (seasonIdTemp.length > 0) {
                setSeasonIdField(seasonIdTemp)
                setShowEpisode(true)
                refreshListEpisode(seasonIdTemp)
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [seasonIdTemp])

        React.useEffect(() => {
            if (statusInsertSeason.length > 0 && episodes && episodes.length > 0) {
                dispatchEpisode({
                    type: 'removeAllAndAddEpisode', episodesInsert: episodes, season_id: statusInsertSeason,
                    tv_show_id: tvShowIdField
                })
                setStatusInsertSeason("")
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [episodes])

        function insertSeason(seasonId: string, name: string) {
            setShowSeason(false)
            setStatusInsertSeason(seasonId)
            setSeasonIdField(seasonId)
            setSeasonNameField(name)
            refreshListEpisode(seasonId)
        }

        async function refreshListTvShow() {
            changePaginationTvShow(1)
            actionRefreshListTvShow(searchTextTvShow)
        }

        const [typingTimeout, setTypingTimeout] = React.useState<any>(0)

        function searchFinishTvShow(search: string) {
            changePaginationTvShow(1)
            actionChangeSearchTvShow(search)
        }

        function changeSearchTvShow(search: string, typeAction: "typing" | "click") {
            setSearchTextTvShow(search)
            if (typeAction === "typing") {
                if (typingTimeout) {
                    clearTimeout(typingTimeout)
                }
                // eslint-disable-next-line prefer-arrow-callback
                setTypingTimeout(setTimeout(() => searchFinishTvShow(search), 500))
            } else if (typeAction === "click") {
                searchFinishTvShow(search)
            }
        }

        function getShowCategories(rowTvShow) {
            if (rowTvShow.categories.length > 0) {
                return rowTvShow.categories.reduce((actual, categoryOb) => `${actual.length > 0 ? `${actual}, ` : ""}${categoryOb.name}`, "")
            }
            return "SEM CATEGORIA"
        }

        function getShowCountries(rowTvShow) {
            if (rowTvShow.countries.length > 0) {
                return rowTvShow.countries.reduce((actual, countryOb) => `${actual.length > 0 ? `${actual}, ` : ""}${countryOb.initial}`, "")
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

        function getTvShowField() {
            let fieldStr = ""
            if (stateEpisode.episodes.length > 0) {
                const seasonClass = seasons.filter(s => s._id === stateEpisode.episodes[0].season)[0]
                const tvShowClass = tvShows.filter(s => s._id === stateEpisode.episodes[0].tv_show_id)[0]
                fieldStr = `${tvShowClass.title} - ${seasonClass.name}`
                if (stateEpisode.episodes.length < episodes.length) {
                    if (stateEpisode.episodes.length === 1)
                        fieldStr += ` - ${stateEpisode.episodes[0].name}`
                    else {
                        fieldStr += ` - ${stateEpisode.episodes.reduce((actual, episodeOb) => `${actual.length > 0
                            ? `${actual}, ` : ""}${episodeOb.name}`, "")}`
                    }
                }
            }
            return fieldStr
        }

        function dialogTvShowEpisode() {
            return (<Dialog fullWidth maxWidth="xl" open={showEpisode && seasonIdField.length > 0}
                onClose={() => setSeasonIdField(seasonIdField)} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHeadStyle>
                                        <TableRow>
                                            <TableCellStyle colSpan={2}>{`${tvShowTitleField} - ${seasonNameField}`}</TableCellStyle>
                                        </TableRow>
                                        <TableRow>
                                            <TableCellStyle>Nome</TableCellStyle>
                                            <TableCellStyle width={50} />
                                        </TableRow>
                                    </TableHeadStyle>
                                    <TableBodyStyle colSpanValue={2} listData={episodes} isLoading={showLoading}>
                                        {episodes && episodes.map((row, keyV) => (
                                            <TableRowStyle hover key={keyV}>
                                                <TableCellStyle scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                                    {row.name}
                                                </TableCellStyle>
                                                <TableCellStyle width={100} align="center">
                                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                        {stateEpisode.episodes.filter(e => (e.tv_show_id === tvShowIdField
                                                            && seasonIdField === e.season && e._id === row._id)).length === 0
                                                            ? <ButtonSuccess sizeBtn='small' titleIcon={ICON_OBJECT_LIST.CHECK_ICON} actionClick={() => {
                                                                setShowEpisode(false)
                                                                dispatchEpisode({
                                                                    type: 'add', _id: row._id, name: row.name, season_id: seasonIdField,
                                                                    tv_show_id: tvShowIdField
                                                                })
                                                            }} /> : <ButtonWarning sizeBtn='small' titleIcon={ICON_OBJECT_LIST.REMOVE_ICON}
                                                                actionClick={() => {
                                                                    dispatchEpisode({ type: 'remove', _id: row._id })
                                                                }} />}
                                                        <ButtonDanger sizeBtn='small' titleIcon={ICON_OBJECT_LIST.CANCEL_ICON}
                                                            actionClick={() => setIdEpisodeRemove(row._id)} />
                                                    </ButtonGroup>
                                                </TableCellStyle>
                                            </TableRowStyle>
                                        ))}
                                    </TableBodyStyle>
                                </Table>
                            </TableContainer>
                            <PaginationList isLoading={showLoading} valuePage={positionPageEpisode} dataList={episodes}
                                countList={countEpisode} style={{ margin: 5 }}
                                actionClick={(value: number) => changePaginationEpisode(value)} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <ButtonIndigo title="VOLTAR" actionClick={() => {
                        setShowEpisode(false)
                        setSeasonIdTemp("")
                        setSeasonIdField("")
                        setShowSeason(true)
                    }} />
                    <ButtonDanger title="FECHAR" actionClick={() => setShowEpisode(false)} />
                </DialogActions>
            </Dialog>)
        }

        function dialogTvShowSeason() {
            return (<Dialog fullWidth maxWidth="xl" open={showSeason && tvShowIdField.length > 0}
                onClose={() => setTvShowIdField(tvShowIdField)} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHeadStyle>
                                        <TableRow>
                                            <TableCellStyle colSpan={2}>{tvShowTitleField}</TableCellStyle>
                                        </TableRow>
                                        <TableRow>
                                            <TableCellStyle>Nome</TableCellStyle>
                                            <TableCellStyle width={50} />
                                        </TableRow>
                                    </TableHeadStyle>
                                    <TableBodyStyle colSpanValue={2} listData={seasons} isLoading={showLoading}>
                                        {seasons && seasons.map((row, key) => (
                                            <TableRowStyle hover key={key}>
                                                <TableCellStyle scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                                    {row.name} {row.countEpisode}
                                                </TableCellStyle>
                                                <TableCellStyle width={100} align="center">
                                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                        <ButtonSuccess sizeBtn='small' titleIcon={ICON_OBJECT_LIST.ARROW_FORWARD_IOS_ICON}
                                                            actionClick={() => {
                                                                setShowSeason(false)
                                                                setSeasonIdTemp(row._id)
                                                                setSeasonNameField(row.name)
                                                            }} />
                                                        {(stateEpisode.episodes.filter(e => e.season === row._id).length !== row.countEpisode)
                                                            ? <ButtonBlueGray sizeBtn='small' titleIcon={ICON_OBJECT_LIST.CHECK_ICON}
                                                                actionClick={() => insertSeason(row._id, row.name)} /> :
                                                            <ButtonWarning sizeBtn='small' titleIcon={ICON_OBJECT_LIST.REMOVE_ICON}
                                                                actionClick={() => dispatchEpisode({ type: "removeAll" })} />}
                                                        <ButtonDanger sizeBtn='small' titleIcon={ICON_OBJECT_LIST.CANCEL_ICON}
                                                            actionClick={() => setIdSeasonRemove(row._id)} />
                                                    </ButtonGroup>
                                                </TableCellStyle>
                                            </TableRowStyle>
                                        ))}
                                    </TableBodyStyle>
                                </Table>
                            </TableContainer>
                            <PaginationList isLoading={showLoading} valuePage={positionPageSeason} dataList={seasons}
                                countList={countSeason} style={{ margin: 5 }}
                                actionClick={(value: number) => changePaginationSeason(value)} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <ButtonIndigo title="VOLTAR" actionClick={() => {
                        setShowSeason(false)
                        setTvShowIdField("")
                        setShowTvShow(true)
                    }} />
                    <ButtonDanger title="FECHAR" actionClick={() => setShowSeason(false)} />
                </DialogActions>
            </Dialog>)
        }

        function dialogTvShows() {
            return (<Dialog fullWidth maxWidth="xl" open={showTvShow} onClose={() => setShowTvShow(true)} aria-labelledby="form-dialog-title">
                <DialogActions style={{ marginLeft: 10, marginRight: 10 }}>
                    <FormControlField valueDefault={searchTextTvShow} labelValue="DIGITE O NOME"
                        onChangeForm={(e) => changeSearchTvShow(e.target.value, "typing")} InputProps={{
                            endAdornment: <InputAdornment position="end">
                                {searchTextTvShow.length > 0 && <IconButton edge="end" onClick={() => changeSearchTvShow("", "click")}>
                                    <IconList icon={ICON_OBJECT_LIST.CLEAR_ICON} /></IconButton>}
                                <IconButton edge="end" onClick={() => refreshListTvShow()}>
                                    <IconList icon={ICON_OBJECT_LIST.REFRESH_ICON} />
                                </IconButton>
                            </InputAdornment>
                        }} />
                </DialogActions>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHeadStyle>
                                        <TableRow>
                                            <TableCellStyle>Título</TableCellStyle>
                                            <TableCellStyle width={350}>Categoria</TableCellStyle>
                                            <TableCellStyle width={200}>Lançamento</TableCellStyle>
                                            <TableCellStyle width={200}>Origem</TableCellStyle>
                                            <TableCellStyle width={50} />
                                        </TableRow>
                                    </TableHeadStyle>
                                    <TableBodyStyle colSpanValue={5} listData={tvShows} isLoading={showLoading}>
                                        {tvShows && tvShows.map((row, key) => (
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
                                                    {getShowCountries(row)}
                                                </TableCellStyle>
                                                <TableCellStyle width={100} align="center">
                                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                        <ButtonSuccess sizeBtn='small' titleIcon={ICON_OBJECT_LIST.ARROW_FORWARD_IOS_ICON} actionClick={() => {
                                                            setShowTvShow(false)
                                                            if (tvShowIdTemp !== row._id) {
                                                                setTvShowIdTemp(row._id)
                                                                setTvShowTitleField(row.title)
                                                            } else {
                                                                setTvShowIdField(row._id)
                                                            }
                                                            setShowSeason(true)
                                                        }} />
                                                        <ButtonDanger sizeBtn='small' titleIcon={ICON_OBJECT_LIST.CANCEL_ICON}
                                                            actionClick={() => setIdTvShowRemove(row._id)} />
                                                    </ButtonGroup>
                                                </TableCellStyle>
                                            </TableRowStyle>
                                        ))}
                                    </TableBodyStyle>
                                </Table>
                            </TableContainer>
                            <PaginationList isLoading={showLoading} valuePage={positionPageTvShow} dataList={tvShows} countList={countTvShow} style={{ margin: 5 }}
                                actionClick={(value: number) => changePaginationTvShow(value)} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <ButtonDanger title="FECHAR" actionClick={() => setShowTvShow(false)} />
                </DialogActions>
            </Dialog>)
        }

        return (
            <PageCard title="ADICIONAR NOVO EPISÓDIO" sizeMd={6} sizeXs={12}>
                <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                        <Card>
                            <CardActions>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormControlField labelValue="EPISÓDIO" valueDefault={getTvShowField()} InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton onClick={() => {
                                                    if (tvShowIdField.length === 0 && seasonIdField.length === 0) {
                                                        setShowTvShow(true)
                                                    } else if (tvShowIdField.length > 0 && seasonIdField.length === 0) {
                                                        setShowSeason(true)
                                                    } else if (tvShowIdField.length > 0 && seasonIdField.length > 0) {
                                                        setShowEpisode(true)
                                                    }
                                                }} edge="end">
                                                    <IconList icon={ICON_OBJECT_LIST.ARROW_FORWARD_IOS_ICON} />
                                                </IconButton>
                                            </InputAdornment>
                                        }} />
                                    </Grid>
                                </Grid>
                            </CardActions>
                            <CardActions className={classes.button_end}>
                                <ButtonSuccess title="JÁ ASSISTIR" iconStart={ICON_OBJECT_LIST.CHECK_ICON}
                                    actionClick={() => saveRegister(stateEpisode.episodes, seasonIdField, tvShowIdField)} />
                                <ButtonIndigo title="VOLTAR" iconStart={ICON_OBJECT_LIST.ARROW_BACK_IOS_NEW_ICON}
                                    actionClick={() => navigate(URL_MY_TV_SHOWS)} />
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
                {dialogTvShows()}
                {dialogTvShowSeason()}
                {dialogTvShowEpisode()}
                <DialogYesOrNot showDialog={idTvShowRemove.length > 0} onCloseDialog={() => setIdTvShowRemove(idTvShowRemove)}
                    clickDialogNot={() => setIdTvShowRemove("")}
                    titleDialog={MSG_REMOVE_TV_SHOW_QUESTION} clickDialogYes={() => {
                        const idRemove = idTvShowRemove
                        setIdTvShowRemove("")
                        setShowTvShow(false)
                        removeRegisterTvShow(idRemove)
                    }} />
                <DialogYesOrNot showDialog={idSeasonRemove.length > 0} onCloseDialog={() => setIdSeasonRemove(idSeasonRemove)}
                    clickDialogNot={() => setIdSeasonRemove("")}
                    titleDialog={MSG_REMOVE_TV_SHOW_SEASON_QUESTION} clickDialogYes={() => {
                        const idRemove = idSeasonRemove
                        setIdSeasonRemove("")
                        setShowSeason(false)
                        removeSeasonRegister(tvShowIdField, idRemove)
                    }} />
                <DialogYesOrNot showDialog={idEpisodeRemove.length > 0} onCloseDialog={() => setIdEpisodeRemove(idEpisodeRemove)}
                    clickDialogNot={() => setIdEpisodeRemove("")}
                    titleDialog={MSG_REMOVE_TV_SHOW_EPISODE_QUESTION} clickDialogYes={() => {
                        const idRemove = idEpisodeRemove
                        setIdEpisodeRemove("")
                        setShowEpisode(false)
                        removeEpisodeRegister(tvShowIdField, seasonIdField, idRemove)
                    }} />
            </PageCard>
        )
    }

export default MyTvShowNewPageView
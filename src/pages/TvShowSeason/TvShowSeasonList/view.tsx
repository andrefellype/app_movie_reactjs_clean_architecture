/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import { Card, CardActions, Grid, TableContainer, Paper, Table, TableHead, TableRow, TableBody, ButtonGroup, InputAdornment, IconButton, Dialog, DialogContent, DialogActions, Checkbox } from "@mui/material"
import { makeStyles } from "@material-ui/styles"
import { useNavigate } from 'react-router-dom'
import FormControlField from "../../../app/components/FormControl/FormControlField"
import ButtonIndigo from '../../../app/components/Button/ButtonIndigo'
import ButtonSuccess from '../../../app/components/Button/ButtonSuccess'
import ButtonDanger from '../../../app/components/Button/ButtonDanger'
import IconList from '../../../app/components/IconList'
import DialogYesOrNot from '../../../app/components/Dialog/DialogYesOrNot'
import TableCellStyle from '../../../app/components/Table/TableCellStyle'
import TableRowStyle from '../../../app/components/Table/TableRowStyle'
import PageCard from '../../../app/components/PageCard'
import ICON_OBJECT_LIST from '../../../app/components/IconList/ICON_OBJECT_LIST'
import { MSG_APPROVED_REVIEWED_REGISTER_QUESTION, MSG_DELETE_REGISTERS_QUESTION, MSG_DELETE_REGISTER_QUESTION, MSG_EMPTY_LIST, URL_TV_SHOWS, URL_TV_SHOW_EPISODES, URL_TV_SHOW_SEASON_EDIT, URL_TV_SHOW_SEASON_NEW } from '../../../app/core/consts'
import ButtonPink from '../../../app/components/Button/ButtonPink'
import PaginationList from '../../../app/components/PaginationList'

const useStyles = makeStyles(() => ({
    flex_center: {
        display: 'flex',
        justifyContent: 'center'
    }
}))

function reducerArrayDeleteBatch(state, action) {
    switch (action.type) {
        case 'add':
            const deletesAdd = state.arrayDeleteBatch
            deletesAdd.push(action._id)
            return { arrayDeleteBatch: deletesAdd }
        case 'remove':
            let deletesRemove = state.arrayDeleteBatch
            deletesRemove = deletesRemove.filter((value) => value !== action._id)
            return { arrayDeleteBatch: deletesRemove }
        case 'erase':
            return { arrayDeleteBatch: [] }
        default:
            throw new Error()
    }
}

const TvShowSeasonListView: React.FC<{ getTvShow: any, seasons: any, positionPage: number, seasonsBatch: any, countSeason: number, changePagination: any, actionRefreshList: any, actionChangeSearchText: any, actionDeleteRegister: any, actionDeleteBatch: any, actionApprovedRegister: any }> =
    function ({ getTvShow, seasons, positionPage, seasonsBatch, countSeason, changePagination, actionRefreshList, actionChangeSearchText, actionDeleteRegister, actionDeleteBatch, actionApprovedRegister }) {

        const classes = useStyles()
        const navigate = useNavigate()

        const [idDelete, setIdDelete] = React.useState("")
        const [isDeleteBatch, setIsDeleteBatch] = React.useState(false)
        const [idReviewed, setIdReviewed] = React.useState("")
        const [isDeleteBatchShow, setIsDeleteBatchShow] = React.useState(false)
        const [stateArrayDeleteBatch, dispatchArrayDeleteBatch] = React.useReducer(reducerArrayDeleteBatch, { arrayDeleteBatch: [] })
        const [searchText, setSearchText] = React.useState("")

        function changeSearchText(search: string) {
            setSearchText(search)
            actionChangeSearchText(search)
        }

        async function refreshList() {
            actionRefreshList(searchText)
        }

        function changeDeleteBatch(checked, idSeason) {
            if (checked) {
                dispatchArrayDeleteBatch({ type: 'add', _id: idSeason })
            } else {
                dispatchArrayDeleteBatch({ type: 'remove', _id: idSeason })
            }
        }

        async function deleteRegister() {
            const seasonId = idDelete
            setIdDelete("")
            actionDeleteRegister(seasonId, searchText)
        }

        async function deleteBatch() {
            setIsDeleteBatchShow(false)
            setIsDeleteBatch(false)
            actionDeleteBatch(stateArrayDeleteBatch.arrayDeleteBatch, () => dispatchArrayDeleteBatch({ type: 'erase' }), searchText)
        }

        async function approvedRegister() {
            const idStream = idReviewed
            setIdReviewed("")
            actionApprovedRegister(idStream, searchText)
        }

        function filterListSeasons() {
            return (<CardActions className={classes.flex_center}>
                <FormControlField valueDefault={searchText} labelValue="DIGITE O NOME" onChangeForm={(e) => changeSearchText(e.target.value)} InputProps={{
                    endAdornment: <InputAdornment position="end">
                        {searchText.length > 0 && <IconButton edge="end" onClick={() => changeSearchText("")}><IconList icon={ICON_OBJECT_LIST.CLEAR_ICON} /></IconButton>}
                        <IconButton edge="end" onClick={() => refreshList()}>
                            <IconList icon={ICON_OBJECT_LIST.REFRESH_ICON} />
                        </IconButton>
                    </InputAdornment>
                }} />
                <ButtonSuccess style={{ marginLeft: 10 }} titleIcon={ICON_OBJECT_LIST.ADD_ICON} iconTitleSize="medium" actionClick={() => navigate(`${URL_TV_SHOW_SEASON_NEW}/${getTvShow._id}`)} />
                <ButtonDanger isDisabled={(!seasonsBatch || seasonsBatch.length === 0)} titleIcon={ICON_OBJECT_LIST.DELETE_ICON} iconTitleSize="medium" actionClick={() => setIsDeleteBatch(true)} />
                <ButtonIndigo titleIcon={ICON_OBJECT_LIST.ARROW_BACK_IOS_NEW_ICON} iconTitleSize="medium" actionClick={() => navigate(URL_TV_SHOWS)} />
            </CardActions>)
        }

        function getListSeasons() {
            return <CardActions className={classes.flex_center}>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCellStyle>Nome</TableCellStyle>
                                <TableCellStyle width={100} />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(!seasons || seasons.length === 0) ? <TableRowStyle hover>
                                <TableCellStyle colSpan={2} scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                    {MSG_EMPTY_LIST.toUpperCase()}
                                </TableCellStyle>
                            </TableRowStyle> :
                                seasons.map((row, key) => (
                                    <TableRowStyle hover key={key}>
                                        <TableCellStyle scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                            {row.name}
                                        </TableCellStyle>
                                        <TableCellStyle align="center">
                                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                <ButtonPink sizeBtn='small' actionClick={() => navigate(`${URL_TV_SHOW_EPISODES}/${row._id}/${getTvShow._id}`)} title="EPISÓDIOS" />
                                                {row.enabledApproved && <ButtonSuccess sizeBtn='small' actionClick={() => setIdReviewed(row._id)} titleIcon={ICON_OBJECT_LIST.CHECK_ICON} />}
                                                {row.enabledEdit && <ButtonIndigo sizeBtn='small' actionClick={() => navigate(`${URL_TV_SHOW_SEASON_EDIT}/${row._id}/${getTvShow._id}`)} titleIcon={ICON_OBJECT_LIST.EDIT_ICON} />}
                                                {row.enabledEdit && <ButtonDanger actionClick={() => setIdDelete(row._id)} titleIcon={ICON_OBJECT_LIST.DELETE_ICON} />}
                                            </ButtonGroup>
                                        </TableCellStyle>
                                    </TableRowStyle>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardActions>
        }

        function dialogDeleteBatch() {
            return (<Dialog fullWidth maxWidth="sm" open={isDeleteBatch} onClose={() => setIsDeleteBatch(true)} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableBody>
                                        {seasonsBatch && seasonsBatch.filter(row => row.enabledEdit).map((row, key) => (
                                            <TableRowStyle hover key={key}
                                                onClick={() => changeDeleteBatch(!(stateArrayDeleteBatch.arrayDeleteBatch.filter(value => value === row._id).length > 0), row._id)}>
                                                <TableCellStyle width={25} align="center">
                                                    <Checkbox checked={stateArrayDeleteBatch.arrayDeleteBatch.filter(value => value === row._id).length > 0}
                                                        onChange={(e) => changeDeleteBatch(e.target.checked, row._id)} />
                                                </TableCellStyle>
                                                <TableCellStyle scope="row" align="left">
                                                    {row.name}
                                                </TableCellStyle>
                                            </TableRowStyle>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <ButtonSuccess title="APAGAR" actionClick={() => setIsDeleteBatchShow(true)} />
                    <ButtonDanger title="FECHAR" actionClick={() => setIsDeleteBatch(false)} />
                </DialogActions>
            </Dialog>)
        }

        return (
            <PageCard title={`LISTA DE TEMPORADAS${(typeof getTvShow !== "undefined" && getTvShow !== null) ? ` - ${getTvShow.title}` : ""}`}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card>
                            {filterListSeasons()}
                            {getListSeasons()}
                            <PaginationList dataList={seasons} valuePage={positionPage} countList={countSeason} style={{ margin: 5 }}
                                actionClick={(value: number) => changePagination(value)} />
                        </Card>
                    </Grid>
                </Grid>
                <DialogYesOrNot showDialog={idDelete.length > 0} onCloseDialog={() => setIdDelete("")} clickDialogNot={() => setIdDelete("")}
                    titleDialog={MSG_DELETE_REGISTER_QUESTION} clickDialogYes={() => deleteRegister()} />
                <DialogYesOrNot showDialog={isDeleteBatchShow} onCloseDialog={() => setIsDeleteBatchShow(false)} clickDialogNot={() => setIsDeleteBatchShow(false)}
                    titleDialog={MSG_DELETE_REGISTERS_QUESTION} clickDialogYes={() => deleteBatch()} />
                <DialogYesOrNot showDialog={idReviewed.length > 0} onCloseDialog={() => setIdReviewed("")} clickDialogNot={() => setIdReviewed("")}
                    titleDialog={MSG_APPROVED_REVIEWED_REGISTER_QUESTION} clickDialogYes={() => approvedRegister()} />
                {dialogDeleteBatch()}
            </PageCard >
        )
    }

export default TvShowSeasonListView
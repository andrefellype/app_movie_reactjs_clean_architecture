/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import {
    Card, CardActions, Grid, TableContainer, Paper, Table, TableRow, TableBody, ButtonGroup, InputAdornment, IconButton,
    Dialog, DialogContent, DialogActions, Checkbox
} from "@mui/material"
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
import {
    MSG_APPROVED_REVIEWED_REGISTER_QUESTION, MSG_DELETE_REGISTERS_QUESTION, MSG_DELETE_REGISTER_QUESTION, URL_TV_SHOW_EPISODE_EDIT,
    URL_TV_SHOW_EPISODE_NEW, URL_TV_SHOW_SEASONS
} from '../../../app/core/consts'
import ScrollInfiniteList from '../../../app/components/ScrollInfiniteList'
import TableHeadStyle from '../../../app/components/Table/TableHeadStyle'
import TableBodyStyle from '../../../app/components/Table/TableBodyStyle'

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

const TvShowEpisodeListPageView: React.FC<{
    getTvShow: any, getTvShowSeason: any, episodes: any, actionRefreshList: any,
    actionChangeSearchText: any, actionDeleteRegister: any, actionDeleteBatch: any, actionApprovedRegister: any,
    getListScroll: (valueScroll: number) => any[], showLoading: boolean
}> =
    function ({ getTvShow, getTvShowSeason, episodes, actionRefreshList, actionChangeSearchText, actionDeleteRegister,
        actionDeleteBatch, actionApprovedRegister, getListScroll, showLoading }) {
        const classes = useStyles()
        const navigate = useNavigate()

        const valueInitialScroll = 20
        const valueInitialScrollBatch = 15

        const [positionScroll, setPositionScroll] = React.useState(0)
        const [positionScrollBatch, setPositionScrollBatch] = React.useState(0)
        const [listScroll, setListScroll] = React.useState<any[]>([])
        const [idDelete, setIdDelete] = React.useState("")
        const [isDeleteBatch, setIsDeleteBatch] = React.useState(false)
        const [idReviewed, setIdReviewed] = React.useState("")
        const [isDeleteBatchShow, setIsDeleteBatchShow] = React.useState(false)
        const [stateArrayDeleteBatch, dispatchArrayDeleteBatch] = React.useReducer(reducerArrayDeleteBatch, { arrayDeleteBatch: [] })
        const [searchText, setSearchText] = React.useState("")

        React.useEffect(() => {
            if (episodes) {
                setListScroll(getListScroll((positionScroll * valueInitialScroll)))
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [positionScroll, episodes])

        const [typingTimeout, setTypingTimeout] = React.useState<any>(0)

        function searchFinish(search: string) {
            actionChangeSearchText(search, () => setPositionScroll(1))
        }

        function changeSearchText(search: string, typeAction: "typing" | "click") {
            setSearchText(search)
            if (typeAction === "typing") {
                if (typingTimeout) {
                    clearTimeout(typingTimeout)
                }
                // eslint-disable-next-line prefer-arrow-callback
                setTypingTimeout(setTimeout(() => searchFinish(search), 500))
            } else if (typeAction === "click") {
                searchFinish(search)
            }
        }

        async function refreshList() {
            actionRefreshList(searchText, () => setPositionScroll(1))
        }

        function changeDeleteBatch(checked, idEpisode) {
            if (checked) {
                dispatchArrayDeleteBatch({ type: 'add', _id: idEpisode })
            } else {
                dispatchArrayDeleteBatch({ type: 'remove', _id: idEpisode })
            }
        }

        async function deleteRegister() {
            const episodeId = idDelete
            setIdDelete("")
            actionDeleteRegister(episodeId, searchText)
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

        function filterListEpisodes() {
            return (<CardActions className={classes.flex_center}>
                <FormControlField valueDefault={searchText} labelValue="DIGITE O NOME" onChangeForm={(e) =>
                    changeSearchText(e.target.value, "typing")} InputProps={{
                        endAdornment: <InputAdornment position="end">
                            {searchText.length > 0 && <IconButton edge="end" onClick={() => changeSearchText("", "click")}>
                                <IconList icon={ICON_OBJECT_LIST.CLEAR_ICON} /></IconButton>}
                            <IconButton edge="end" onClick={() => refreshList()}>
                                <IconList icon={ICON_OBJECT_LIST.REFRESH_ICON} />
                            </IconButton>
                        </InputAdornment>
                    }} />
                <ButtonSuccess style={{ marginLeft: 10 }} titleIcon={ICON_OBJECT_LIST.ADD_ICON} iconTitleSize="medium"
                    actionClick={() => navigate(`${URL_TV_SHOW_EPISODE_NEW}/${getTvShowSeason._id}/${getTvShow._id}`)} />
                <ButtonDanger isDisabled={(!episodes || episodes.length === 0)} titleIcon={ICON_OBJECT_LIST.DELETE_ICON}
                    iconTitleSize="medium" actionClick={() => setIsDeleteBatch(true)} />
                <ButtonIndigo titleIcon={ICON_OBJECT_LIST.ARROW_BACK_IOS_NEW_ICON} iconTitleSize="medium" actionClick={() =>
                    navigate(`${URL_TV_SHOW_SEASONS}/${getTvShow._id}`)} />
            </CardActions>)
        }

        function getListEpisodes() {
            return <ScrollInfiniteList isShowScroll={(!episodes || (positionScroll * valueInitialScroll) < episodes.length)}
                updateScroll={() => setPositionScroll((positionScroll + 1))}>
                <CardActions className={classes.flex_center}>
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHeadStyle>
                                <TableRow>
                                    <TableCellStyle>Nome</TableCellStyle>
                                    {(episodes && episodes.filter(s => (s.enabledApproved || s.enabledEdit)).length > 0) && <TableCellStyle width={100} />}
                                </TableRow>
                            </TableHeadStyle>
                            <TableBodyStyle isLoading={showLoading} colSpanValue={2} listData={episodes}>
                                {listScroll.map((row, key) => (
                                    <TableRowStyle hover key={key}>
                                        <TableCellStyle scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                            {row.name}
                                        </TableCellStyle>
                                        {(episodes && episodes.filter(s => (s.enabledApproved || s.enabledEdit)).length > 0) && <TableCellStyle align="center">
                                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                {row.enabledApproved && <ButtonSuccess sizeBtn='small' actionClick={() =>
                                                    setIdReviewed(row._id)} titleIcon={ICON_OBJECT_LIST.CHECK_ICON} />}
                                                {row.enabledEdit && <ButtonIndigo sizeBtn='small' actionClick={() =>
                                                    navigate(`${URL_TV_SHOW_EPISODE_EDIT}/${row._id}/${getTvShowSeason._id}/${getTvShow._id}`)}
                                                    titleIcon={ICON_OBJECT_LIST.EDIT_ICON} />}
                                                {row.enabledEdit && <ButtonDanger actionClick={() => setIdDelete(row._id)}
                                                    titleIcon={ICON_OBJECT_LIST.DELETE_ICON} />}
                                            </ButtonGroup>
                                        </TableCellStyle>}
                                    </TableRowStyle>
                                ))}
                            </TableBodyStyle>
                        </Table>
                    </TableContainer>
                </CardActions>
            </ScrollInfiniteList>
        }

        function dialogDeleteBatch() {
            return (<Dialog fullWidth maxWidth="sm" open={isDeleteBatch} onClose={() => setIsDeleteBatch(true)} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ScrollInfiniteList isShowScroll={(!episodes || (positionScrollBatch * valueInitialScrollBatch) < episodes.length)}
                                updateScroll={() => setPositionScrollBatch((positionScrollBatch + 1))}>
                                <TableContainer component={Paper}>
                                    <Table aria-label="customized table">
                                        <TableBody>
                                            {episodes && getListScroll((positionScrollBatch * valueInitialScrollBatch))
                                                .filter(row => row.enabledEdit).map((row, key) => (
                                                    <TableRowStyle hover key={key}
                                                        onClick={() => changeDeleteBatch(!(stateArrayDeleteBatch.arrayDeleteBatch
                                                            .filter(value => value === row._id).length > 0), row._id)}>
                                                        <TableCellStyle width={25} align="center">
                                                            <Checkbox checked={stateArrayDeleteBatch.arrayDeleteBatch
                                                                .filter(value => value === row._id).length > 0}
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
                            </ScrollInfiniteList>
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
            <PageCard title={`LISTA DE EPISÓDIOS${(typeof getTvShow !== "undefined" && getTvShow !== null) ? ` - ${getTvShow.title}`
                : ""}${(typeof getTvShowSeason !== "undefined" && getTvShowSeason !== null) ? ` - ${getTvShowSeason.name}` : ""}`}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card>
                            {filterListEpisodes()}
                            {getListEpisodes()}
                        </Card>
                    </Grid>
                </Grid>
                <DialogYesOrNot showDialog={idDelete.length > 0} onCloseDialog={() => setIdDelete("")} clickDialogNot={() => setIdDelete("")}
                    titleDialog={MSG_DELETE_REGISTER_QUESTION} clickDialogYes={() => deleteRegister()} />
                <DialogYesOrNot showDialog={isDeleteBatchShow} onCloseDialog={() => setIsDeleteBatchShow(false)}
                    clickDialogNot={() => setIsDeleteBatchShow(false)}
                    titleDialog={MSG_DELETE_REGISTERS_QUESTION} clickDialogYes={() => deleteBatch()} />
                <DialogYesOrNot showDialog={idReviewed.length > 0} onCloseDialog={() => setIdReviewed("")}
                    clickDialogNot={() => setIdReviewed("")}
                    titleDialog={MSG_APPROVED_REVIEWED_REGISTER_QUESTION} clickDialogYes={() => approvedRegister()} />
                {dialogDeleteBatch()}
            </PageCard >
        )
    }

export default TvShowEpisodeListPageView
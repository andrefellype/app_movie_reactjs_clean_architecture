/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import {
    Card, CardActions, Grid, TableContainer, Paper, Table, TableHead, TableRow,
    TableBody, ButtonGroup, InputAdornment, IconButton, Dialog, DialogContent, DialogActions, Radio, RadioGroup, FormControlLabel,
    FormControl, Checkbox
} from "@mui/material"
import { makeStyles } from "@material-ui/styles"
import { useNavigate } from 'react-router-dom'

import FormControlField from "../../../app/components/FormControl/FormControlField"
import ButtonBlueGray from '../../../app/components/Button/ButtonBlueGray'
import ButtonIndigo from '../../../app/components/Button/ButtonIndigo'
import ButtonSuccess from '../../../app/components/Button/ButtonSuccess'
import ButtonDanger from '../../../app/components/Button/ButtonDanger'
import ButtonPink from '../../../app/components/Button/ButtonPink'
import IconList from '../../../app/components/IconList'

import ConvertDate from '../../../app/components/Utils/ConvertDate'
import DialogYesOrNot from '../../../app/components/Dialog/DialogYesOrNot'
import TableCellStyle from '../../../app/components/Table/TableCellStyle'
import TableRowStyle from '../../../app/components/Table/TableRowStyle'
import PageCard from '../../../app/components/PageCard'
import ICON_OBJECT_LIST from '../../../app/components/IconList/ICON_OBJECT_LIST'
import FormControlFieldSelect from '../../../app/components/FormControl/FormControlFieldSelect'
import { MSG_DELETE_REGISTERS_QUESTION, MSG_DELETE_REGISTER_QUESTION, MSG_EMPTY_LIST, MSG_UPDATE_STATUS_REGISTER_QUESTION, URL_USERS, URL_USER_NEW } from '../../../app/core/consts'
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

const UserListView: React.FC<{
    users: any, usersBatch: any, countUser: number, positionPage: number, changePagination: any, orderDefault: string, actionChangeSearchText: any, actionClickFilter: any, actionEraseFilter: any, actionOrderList: any, actionRefreshList: any, showUpdatePassword: any,
    actionUpdateEnabled: any, actionDeleteRegister: any, actionDeleteBatch: any
}> = function ({ users, usersBatch, countUser, positionPage, changePagination, orderDefault, actionChangeSearchText, actionClickFilter, actionEraseFilter, actionOrderList, actionRefreshList, showUpdatePassword,
    actionUpdateEnabled, actionDeleteRegister, actionDeleteBatch }) {

        const classes = useStyles()
        const navigate = useNavigate()

        const [idDelete, setIdDelete] = React.useState(-1)
        const [isDeleteBatch, setIsDeleteBatch] = React.useState(false)
        const [isDeleteBatchShow, setIsDeleteBatchShow] = React.useState(false)
        const [stateArrayDeleteBatch, dispatchArrayDeleteBatch] = React.useReducer(reducerArrayDeleteBatch, { arrayDeleteBatch: [] })
        const [idEnabled, setIdEnabled] = React.useState(-1)
        const [searchText, setSearchText] = React.useState("")
        const [isFilter, setIsFilter] = React.useState(false)
        const [isOrder, setIsOrder] = React.useState(false)
        const [orderField, setOrderField] = React.useState(orderDefault)
        const [levelFilter, setLevelFilter] = React.useState("")
        const [levelNameFilter, setLevelNameFilter] = React.useState("")
        const [levelFilterTemp, setLevelFilterTemp] = React.useState("")

        const levels = [
            { label: "ADMINISTRADOR", value: "ADMIN" },
            { label: "COMUM", value: "COMMON" }
        ]

        function changeSearchText(search: string) {
            setSearchText(search)
            actionChangeSearchText(orderField, search, levelFilter)
        }

        function eraseFilter() {
            setIsFilter(false)
            setLevelFilterTemp("")
            setLevelFilter("")
            setLevelNameFilter("")
            actionEraseFilter(orderField, searchText)
        }

        function clickFilter() {
            setLevelFilter(levelFilterTemp)
            setLevelNameFilter(levels.filter(level => level.value === levelFilterTemp)[0].label)
            setIsFilter(false)
            actionClickFilter(orderField, searchText, levelFilterTemp)
        }

        function orderList(order) {
            setOrderField(order)
            setIsOrder(false)
            actionOrderList(order, searchText, levelFilter)
        }

        async function refreshList() {
            actionRefreshList(orderField, searchText, levelFilter)
        }

        async function updateEnabled() {
            const userId = idEnabled
            setIdEnabled(-1)
            actionUpdateEnabled(userId, orderField, searchText, levelFilter)
        }

        function changeDeleteBatch(checked, idUser) {
            if (checked) {
                dispatchArrayDeleteBatch({ type: 'add', _id: idUser })
            } else {
                dispatchArrayDeleteBatch({ type: 'remove', _id: idUser })
            }
        }

        async function deleteRegister() {
            const userId = idDelete
            setIdDelete(-1)
            actionDeleteRegister(userId, orderField, searchText, levelFilter)
        }

        async function deleteBatch() {
            setIsDeleteBatchShow(false)
            setIsDeleteBatch(false)
            actionDeleteBatch(stateArrayDeleteBatch.arrayDeleteBatch, orderField, searchText, levelFilter, () => dispatchArrayDeleteBatch({ type: 'erase' }))
        }

        function filterListUsers() {
            return (<>
                <CardActions className={classes.flex_center}>
                    <FormControlField valueDefault={searchText} labelValue="DIGITE O NOME" onChangeForm={(e) => changeSearchText(e.target.value)} InputProps={{
                        endAdornment: <InputAdornment position="end">
                            {searchText.length > 0 && <IconButton edge="end" onClick={() => changeSearchText("")}><IconList icon={ICON_OBJECT_LIST.CLEAR_ICON} /></IconButton>}
                            <IconButton edge="end" onClick={() => setIsFilter(true)}><IconList icon={ICON_OBJECT_LIST.FILTER_LIST_ICON} /></IconButton>
                            <IconButton edge="end" onClick={() => setIsOrder(true)}>
                                <IconList icon={ICON_OBJECT_LIST.FORMAT_LIST_NUMBERED_RTL_ICON} />
                            </IconButton>
                            <IconButton edge="end" onClick={() => refreshList()}>
                                <IconList icon={ICON_OBJECT_LIST.REFRESH_ICON} />
                            </IconButton>
                        </InputAdornment>
                    }} />
                    <ButtonSuccess style={{ marginLeft: 10 }} titleIcon={ICON_OBJECT_LIST.ADD_ICON} iconTitleSize="medium" actionClick={() => navigate(URL_USER_NEW)} />
                    <ButtonDanger isDisabled={(!usersBatch || usersBatch.length === 0)} titleIcon={ICON_OBJECT_LIST.DELETE_ICON} iconTitleSize="medium" actionClick={() => setIsDeleteBatch(true)} />
                </CardActions>
                {levelNameFilter.length > 0 && <CardActions className={classes.flex_center}>
                    <Grid container spacing={2}>
                        <Grid item md={3} xs={12}>
                            <FormControlField labelValue="NÍVEL" valueDefault={levelNameFilter} InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton edge="end" onClick={() => eraseFilter()}>
                                        <IconList icon={ICON_OBJECT_LIST.CLEAR_ICON} />
                                    </IconButton>
                                </InputAdornment>
                            }} />
                        </Grid>
                    </Grid>
                </CardActions>}
            </>)
        }

        function formatDateStr(date) {
            return date ? ConvertDate(date, "stringEUAToStringBR") : ""
        }

        function getLevelStr(level) {
            if (level === "ADMIN") {
                return "ADMINISTRADOR"
            }
            return "COMUM"
        }

        function formatCellphone(cellphone) {
            let cellphoneStr = `(${cellphone[0]}${cellphone[1]}) ${cellphone[2]}${cellphone[3]}${cellphone[4]}${cellphone[5]}${cellphone[6]}`
            cellphoneStr += `-${cellphone[7]}${cellphone[8]}${cellphone[9]}${cellphone[10]}`
            return cellphoneStr
        }

        function formatDatetimeStr(date) {
            return ConvertDate((new Date(date)), "dateTimeNoSecondsToStringBR")
        }

        function getListUsers() {
            return <CardActions className={classes.flex_center}>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCellStyle>Nome</TableCellStyle>
                                <TableCellStyle width={125}>Nascimento</TableCellStyle>
                                <TableCellStyle width={140}>Celular</TableCellStyle>
                                <TableCellStyle width={150}>Nível</TableCellStyle>
                                <TableCellStyle width={150}>Criação</TableCellStyle>
                                <TableCellStyle width={150}>Acesso</TableCellStyle>
                                <TableCellStyle width={180} />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(!users || users.length === 0) ?
                                <TableRowStyle hover>
                                    <TableCellStyle colSpan={7} scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                        {MSG_EMPTY_LIST.toUpperCase()}
                                    </TableCellStyle>
                                </TableRowStyle> :
                                users.map((row, key) => (
                                    <TableRowStyle hover key={key}>
                                        <TableCellStyle scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                            {row.name}
                                        </TableCellStyle>
                                        <TableCellStyle align="left">
                                            {formatDateStr(row.birth)}
                                        </TableCellStyle>
                                        <TableCellStyle align="left">
                                            {row.cellphone !== null ? formatCellphone(row.cellphone) : "SEM NÚMERO"}
                                        </TableCellStyle>
                                        <TableCellStyle align="left">
                                            {getLevelStr(row.level)}
                                        </TableCellStyle>
                                        <TableCellStyle align="center">
                                            {formatDatetimeStr(row.created_at)}
                                        </TableCellStyle>
                                        <TableCellStyle align="center">
                                            {row.last_access_at !== null ? formatDatetimeStr(row.last_access_at) : "NÃO ACESSOU"}
                                        </TableCellStyle>
                                        <TableCellStyle align="center">
                                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                <ButtonIndigo sizeBtn='small' actionClick={() => navigate(`${URL_USERS}/${row._id}`)} titleIcon={ICON_OBJECT_LIST.REMOVE_RED_EYE_ICON} />
                                                <ButtonBlueGray actionClick={() => showUpdatePassword(row)} titleIcon={ICON_OBJECT_LIST.VPN_KEY_ICON} />
                                                {!row.enabled ? <ButtonPink actionClick={() => setIdEnabled(row._id)} titleIcon={ICON_OBJECT_LIST.LOCK_ICON} /> : <ButtonSuccess actionClick={() => setIdEnabled(row._id)} titleIcon={ICON_OBJECT_LIST.LOCK_OPEN_ICON} />}
                                                <ButtonDanger actionClick={() => setIdDelete(row._id)} titleIcon={ICON_OBJECT_LIST.DELETE_ICON} />
                                            </ButtonGroup>
                                        </TableCellStyle>
                                    </TableRowStyle>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardActions>
        }

        function dialogFilter() {
            return (<Dialog fullWidth maxWidth="xs" open={isFilter} onClose={() => setIsFilter(true)} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControlFieldSelect labelValue="NÍVEL" valueDefault={levelFilterTemp} onChangeForm={(e) => setLevelFilterTemp(e.target.value)} selectList={levels} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ marginRight: 18 }}>
                    <ButtonSuccess title="FILTRAR" actionClick={() => clickFilter()} />
                    <ButtonDanger title="LIMPAR FILTRO" actionClick={() => eraseFilter()} />
                </DialogActions>
            </Dialog>)
        }

        function dialogOrder() {
            return (<Dialog open={isOrder} onClose={() => setIsOrder(true)} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl>
                                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" value={orderField} name="radio-buttons-group">
                                    <FormControlLabel value="name" control={<Radio />} label="NOME" onChange={() => orderList("name")} />
                                    <FormControlLabel value="birth" control={<Radio />} label="NASCIMENTO" onChange={() => orderList("birth")} />
                                    <FormControlLabel value="cellphone" control={<Radio />} label="CELULAR" onChange={() => orderList("cellphone")} />
                                    <FormControlLabel value="last_access" control={<Radio />} label="ACESSO" onChange={() => orderList("last_access")} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <ButtonDanger title="FECHAR" actionClick={() => setIsOrder(false)} />
                </DialogActions>
            </Dialog>)
        }

        function dialogDeleteBatch() {
            return (<Dialog fullWidth maxWidth="md" open={isDeleteBatch} onClose={() => setIsDeleteBatch(true)} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableBody>
                                        {usersBatch && usersBatch.map((row, key) => (
                                            <TableRowStyle hover key={key}
                                                onClick={() => changeDeleteBatch(!(stateArrayDeleteBatch.arrayDeleteBatch.filter(value => value === row._id).length > 0), row._id)}>
                                                <TableCellStyle width={25} align="center">
                                                    <Checkbox checked={stateArrayDeleteBatch.arrayDeleteBatch.filter(value => value === row._id).length > 0}
                                                        onChange={(e) => changeDeleteBatch(e.target.checked, row._id)} />
                                                </TableCellStyle>
                                                <TableCellStyle scope="row" align="left">
                                                    {row.name}
                                                </TableCellStyle>
                                                <TableCellStyle width={100}>
                                                    {getLevelStr(row.level)}
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
            <PageCard title="LISTA DE USUÁRIOS">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card>
                            {filterListUsers()}
                            {getListUsers()}
                            <PaginationList valuePage={positionPage} dataList={users} countList={countUser} style={{ margin: 5 }}
                                actionClick={(value: number) => changePagination(value)} />
                        </Card>
                    </Grid>
                </Grid>
                <DialogYesOrNot showDialog={idDelete !== -1} onCloseDialog={() => setIdDelete(-1)} clickDialogNot={() => setIdDelete(-1)}
                    titleDialog={MSG_DELETE_REGISTER_QUESTION} clickDialogYes={() => deleteRegister()} />
                <DialogYesOrNot showDialog={isDeleteBatchShow} onCloseDialog={() => setIsDeleteBatchShow(false)} clickDialogNot={() => setIsDeleteBatchShow(false)}
                    titleDialog={MSG_DELETE_REGISTERS_QUESTION} clickDialogYes={() => deleteBatch()} />
                <DialogYesOrNot showDialog={idEnabled !== -1} onCloseDialog={() => setIdEnabled(-1)} clickDialogNot={() => setIdEnabled(-1)}
                    titleDialog={MSG_UPDATE_STATUS_REGISTER_QUESTION} clickDialogYes={() => updateEnabled()} />
                {dialogFilter()}
                {dialogOrder()}
                {dialogDeleteBatch()}
            </PageCard >
        )
    }

export default UserListView
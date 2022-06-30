/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import { Card, CardActions, Grid, TableContainer, Paper, Table, TableRow, InputAdornment, IconButton, Dialog, DialogContent, DialogActions, Radio, RadioGroup, FormControlLabel, FormControl, Checkbox } from "@mui/material"
import { makeStyles } from "@material-ui/styles"
import { useNavigate } from 'react-router-dom'

import FormControlField from "../../../app/components/FormControl/FormControlField"
import ButtonIndigo from '../../../app/components/Button/ButtonIndigo'
import ButtonSuccess from '../../../app/components/Button/ButtonSuccess'
import ButtonDanger from '../../../app/components/Button/ButtonDanger'
import IconList from '../../../app/components/IconList'

import ConvertDate from '../../../app/components/Utils/ConvertDate'
import DialogYesOrNot from '../../../app/components/Dialog/DialogYesOrNot'
import TableCellStyle from '../../../app/components/Table/TableCellStyle'
import TableRowStyle from '../../../app/components/Table/TableRowStyle'
import PageCard from '../../../app/components/PageCard'
import ICON_OBJECT_LIST from '../../../app/components/IconList/ICON_OBJECT_LIST'
import FormControlFieldSelect from "../../../app/components/FormControl/FormControlFieldSelect"
import { MSG_DELETE_REGISTERS_QUESTION, URL_USERS } from '../../../app/core/consts'
import TableHeadStyle from '../../../app/components/Table/TableHeadStyle'
import TableBodyStyle from '../../../app/components/Table/TableBodyStyle'
import ScrollInfiniteList from '../../../app/components/ScrollInfiniteList'

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

const UserListTrashView: React.FC<{
    users: any, orderDefault: string, actionChangeSearchText: any, actionClickFilter: any, actionEraseFilter: any, actionOrderList: any, actionRefreshList: any, actionDeleteBatch: any, showLoading: any | null, getListScroll: (valueScroll: number) => any[]
}> = function ({ users, orderDefault, actionChangeSearchText, actionClickFilter, actionEraseFilter, actionOrderList, actionRefreshList, actionDeleteBatch, showLoading, getListScroll }) {

    const classes = useStyles()
    const navigate = useNavigate()

    const valueInitialScroll = 30

    const [positionScroll, setPositionScroll] = React.useState(0)
    const [listScroll, setListScroll] = React.useState<any[]>([])
    const [isDeleteBatchShow, setIsDeleteBatchShow] = React.useState(false)
    const [stateArrayDeleteBatch, dispatchArrayDeleteBatch] = React.useReducer(reducerArrayDeleteBatch, { arrayDeleteBatch: [] })
    const [searchText, setSearchText] = React.useState("")
    const [isFilter, setIsFilter] = React.useState(false)
    const [isOrder, setIsOrder] = React.useState(false)
    const [orderField, setOrderField] = React.useState(orderDefault)
    const [levelFilter, setLevelFilter] = React.useState("")
    const [levelNameFilter, setLevelNameFilter] = React.useState("")
    const [levelFilterTemp, setLevelFilterTemp] = React.useState("")

    React.useEffect(() => {
        if (users) {
            setListScroll(getListScroll((positionScroll * valueInitialScroll)))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [positionScroll, users])

    const levels = [
        { label: "ADMINISTRADOR", value: "ADMIN" },
        { label: "COMUM", value: "COMMON" }
    ]

    function changeSearchText(search: string) {
        setSearchText(search)
        actionChangeSearchText(orderField, search, levelFilter, () => {
            setPositionScroll(1)
        })
    }

    function eraseFilter() {
        setIsFilter(false)
        setLevelFilterTemp("")
        setLevelFilter("")
        setLevelNameFilter("")
        actionEraseFilter(orderField, searchText, () => {
            setPositionScroll(1)
        })
    }

    function clickFilter() {
        setLevelFilter(levelFilterTemp)
        setLevelNameFilter(levels.filter(level => level.value === levelFilterTemp)[0].label)
        setIsFilter(false)
        actionClickFilter(orderField, searchText, levelFilterTemp, () => {
            setPositionScroll(1)
        })
    }

    function orderList(order) {
        setOrderField(order)
        setIsOrder(false)
        actionOrderList(order, searchText, levelFilter, () => {
            setPositionScroll(1)
        })
    }

    async function refreshList() {
        actionRefreshList(orderField, searchText, levelFilter)
    }

    function changeDeleteBatch(checked, idUser) {
        if (checked) {
            dispatchArrayDeleteBatch({ type: 'add', _id: idUser })
        } else {
            dispatchArrayDeleteBatch({ type: 'remove', _id: idUser })
        }
    }

    async function deleteBatch() {
        setIsDeleteBatchShow(false)
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
                <ButtonDanger style={{ marginLeft: 10 }} titleIcon={ICON_OBJECT_LIST.DELETE_ICON} iconTitleSize="medium" actionClick={() => setIsDeleteBatchShow(true)} />
                <ButtonIndigo titleIcon={ICON_OBJECT_LIST.ARROW_BACK_IOS_NEW_ICON} iconTitleSize="medium" actionClick={() => navigate(URL_USERS)} />
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
        return <ScrollInfiniteList isShowScroll={(!users || (positionScroll * valueInitialScroll) < users.length)}
            updateScroll={() => setPositionScroll((positionScroll + 1))}>
            <CardActions className={classes.flex_center}>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHeadStyle>
                            <TableRow>
                                <TableCellStyle width={25} />
                                <TableCellStyle>Nome</TableCellStyle>
                                <TableCellStyle width={125}>Nascimento</TableCellStyle>
                                <TableCellStyle width={140}>Celular</TableCellStyle>
                                <TableCellStyle width={150}>Nível</TableCellStyle>
                                <TableCellStyle width={150}>Criação</TableCellStyle>
                                <TableCellStyle width={150}>Acesso</TableCellStyle>
                            </TableRow>
                        </TableHeadStyle>
                        <TableBodyStyle isLoading={showLoading} colSpanValue={7} listData={users}>
                            {listScroll.map((row, key) => (
                                <TableRowStyle hover key={key} onClick={() => changeDeleteBatch(!(stateArrayDeleteBatch.arrayDeleteBatch.filter(value => value === row._id).length > 0), row._id)}>
                                    <TableCellStyle align="center">
                                        <Checkbox checked={stateArrayDeleteBatch.arrayDeleteBatch.filter(value => value === row._id).length > 0}
                                            onChange={(e) => changeDeleteBatch(e.target.checked, row._id)} />
                                    </TableCellStyle>
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
                                </TableRowStyle>
                            ))}
                        </TableBodyStyle>
                    </Table>
                </TableContainer>
            </CardActions>
        </ScrollInfiniteList>
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

    return (
        <PageCard title="APAGAR USUÁRIOS">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        {filterListUsers()}
                        {getListUsers()}
                    </Card>
                </Grid>
            </Grid>
            <DialogYesOrNot showDialog={isDeleteBatchShow} onCloseDialog={() => setIsDeleteBatchShow(false)} clickDialogNot={() => setIsDeleteBatchShow(false)}
                titleDialog={MSG_DELETE_REGISTERS_QUESTION} clickDialogYes={() => deleteBatch()} />
            {dialogFilter()}
            {dialogOrder()}
        </PageCard >
    )
}

export default UserListTrashView
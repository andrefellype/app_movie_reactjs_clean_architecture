/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import {
    Card, CardActions, Grid, TableContainer, Paper, Table, TableRow, TableBody, ButtonGroup, InputAdornment, IconButton, Dialog,
    DialogContent, DialogActions, Checkbox
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
    MSG_DELETE_REGISTERS_QUESTION, MSG_DELETE_REGISTER_QUESTION, URL_CATEGORY_EDIT, URL_CATEGORY_NEW
} from '../../../app/core/consts'
import ScrollInfiniteList from '../../../app/components/ScrollInfiniteList'
import TableBodyStyle from '../../../app/components/Table/TableBodyStyle'
import TableHeadStyle from '../../../app/components/Table/TableHeadStyle'

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

const CategoryListPageView: React.FC<{
    categories: any, showLoading: boolean, actionChangeSearchText: any, actionRefreshList: any, actionDeleteRegister: any,
    actionDeleteBatch: any, getListScroll: (valueScroll: number) => any[]
}> = function ({
    categories, showLoading, actionChangeSearchText, actionRefreshList, actionDeleteRegister, actionDeleteBatch, getListScroll
}) {
        const classes = useStyles()
        const navigate = useNavigate()

        const valueInitialScroll = 20
        const valueInitialScrollBatch = 15

        const [positionScroll, setPositionScroll] = React.useState(0)
        const [positionScrollBatch, setPositionScrollBatch] = React.useState(0)
        const [listScroll, setListScroll] = React.useState<any[]>([])
        const [idDelete, setIdDelete] = React.useState(-1)
        const [isDeleteBatch, setIsDeleteBatch] = React.useState(false)
        const [isDeleteBatchShow, setIsDeleteBatchShow] = React.useState(false)
        const [stateArrayDeleteBatch, dispatchArrayDeleteBatch] = React.useReducer(reducerArrayDeleteBatch, { arrayDeleteBatch: [] })
        const [searchText, setSearchText] = React.useState("")

        React.useEffect(() => {
            if (categories) {
                setListScroll(getListScroll((positionScroll * valueInitialScroll)))
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [positionScroll, categories])

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

        function changeDeleteBatch(checked, idCategory) {
            if (checked) {
                dispatchArrayDeleteBatch({ type: 'add', _id: idCategory })
            } else {
                dispatchArrayDeleteBatch({ type: 'remove', _id: idCategory })
            }
        }

        async function deleteRegister() {
            const categoryId = idDelete
            setIdDelete(-1)
            actionDeleteRegister(categoryId, searchText)
        }

        async function deleteBatch() {
            setIsDeleteBatchShow(false)
            setIsDeleteBatch(false)
            actionDeleteBatch(stateArrayDeleteBatch.arrayDeleteBatch, searchText, () => dispatchArrayDeleteBatch({ type: 'erase' }))
        }

        function filterListCategories() {
            return (<CardActions className={classes.flex_center}>
                <FormControlField valueDefault={searchText} labelValue="DIGITE O NOME"
                    onChangeForm={(e) => changeSearchText(e.target.value, "typing")} InputProps={{
                        endAdornment: <InputAdornment position="end">
                            {searchText.length > 0 && <IconButton edge="end" onClick={() =>
                                changeSearchText("", "click")}><IconList icon={ICON_OBJECT_LIST.CLEAR_ICON} /></IconButton>}
                            <IconButton edge="end" onClick={() => refreshList()}>
                                <IconList icon={ICON_OBJECT_LIST.REFRESH_ICON} />
                            </IconButton>
                        </InputAdornment>
                    }} />
                <ButtonSuccess style={{ marginLeft: 10 }} titleIcon={ICON_OBJECT_LIST.ADD_ICON} iconTitleSize="medium"
                    actionClick={() => navigate(URL_CATEGORY_NEW)} />
                <ButtonDanger isDisabled={(!categories || categories.length === 0)}
                    titleIcon={ICON_OBJECT_LIST.DELETE_ICON} iconTitleSize="medium" actionClick={() => setIsDeleteBatch(true)} />
            </CardActions>)
        }

        function getListCategories() {
            return <ScrollInfiniteList isShowScroll={(!categories || (positionScroll * valueInitialScroll) < categories.length)}
                updateScroll={() => setPositionScroll((positionScroll + 1))}>
                <CardActions className={classes.flex_center}>
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHeadStyle>
                                <TableRow>
                                    <TableCellStyle>Nome</TableCellStyle>
                                    <TableCellStyle width={100} />
                                </TableRow>
                            </TableHeadStyle>
                            <TableBodyStyle isLoading={showLoading} colSpanValue={2} listData={categories}>
                                {listScroll.map((row, key) => (
                                    <TableRowStyle hover key={key}>
                                        <TableCellStyle scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                            {row.name}
                                        </TableCellStyle>
                                        <TableCellStyle align="center">
                                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                <ButtonIndigo sizeBtn='small' actionClick={() =>
                                                    navigate(`${URL_CATEGORY_EDIT}/${row._id}`)} titleIcon={ICON_OBJECT_LIST.EDIT_ICON} />
                                                <ButtonDanger actionClick={() => setIdDelete(row._id)}
                                                    titleIcon={ICON_OBJECT_LIST.DELETE_ICON} />
                                            </ButtonGroup>
                                        </TableCellStyle>
                                    </TableRowStyle>
                                ))}
                            </TableBodyStyle>
                        </Table>
                    </TableContainer>
                </CardActions>
            </ScrollInfiniteList >
        }

        function dialogDeleteBatch() {
            return (<Dialog fullWidth maxWidth="sm" open={isDeleteBatch} onClose={() =>
                setIsDeleteBatch(true)} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ScrollInfiniteList isShowScroll={(!categories || (positionScrollBatch * valueInitialScrollBatch) < categories.length)}
                                updateScroll={() => setPositionScrollBatch((positionScrollBatch + 1))}>
                                <TableContainer component={Paper}>
                                    <Table aria-label="customized table">
                                        <TableBody>
                                            {categories && getListScroll((positionScrollBatch * valueInitialScrollBatch)).map((row, key) => (
                                                <TableRowStyle hover key={key}
                                                    onClick={() => changeDeleteBatch(!(stateArrayDeleteBatch
                                                        .arrayDeleteBatch.filter(value => value === row._id).length > 0), row._id)}>
                                                    <TableCellStyle width={25} align="center">
                                                        <Checkbox checked={stateArrayDeleteBatch
                                                            .arrayDeleteBatch.filter(value => value === row._id).length > 0}
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
            <PageCard title="LISTA DE CATEGORIAS">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card>
                            {filterListCategories()}
                            {getListCategories()}
                        </Card>
                    </Grid>
                </Grid>
                <DialogYesOrNot showDialog={idDelete !== -1} onCloseDialog={() => setIdDelete(-1)}
                    clickDialogNot={() => setIdDelete(-1)}
                    titleDialog={MSG_DELETE_REGISTER_QUESTION} clickDialogYes={() => deleteRegister()} />
                <DialogYesOrNot showDialog={isDeleteBatchShow} onCloseDialog={() => setIsDeleteBatchShow(false)}
                    clickDialogNot={() => setIsDeleteBatchShow(false)}
                    titleDialog={MSG_DELETE_REGISTERS_QUESTION} clickDialogYes={() => deleteBatch()} />
                {dialogDeleteBatch()}
            </PageCard >
        )
    }

export default CategoryListPageView
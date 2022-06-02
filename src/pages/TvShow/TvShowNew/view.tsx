/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { ButtonGroup, Card, CardActions, Dialog, DialogActions, DialogContent, Grid, IconButton, InputAdornment, Paper, Table, TableBody, TableContainer } from "@mui/material"
import { makeStyles } from "@material-ui/styles"
import { useNavigate } from 'react-router-dom'
import PageCard from "../../../app/components/PageCard"
import ButtonSuccess from '../../../app/components/Button/ButtonSuccess'
import FormControlField from '../../../app/components/FormControl/FormControlField'
import ButtonIndigo from '../../../app/components/Button/ButtonIndigo'
import ICON_OBJECT_LIST from '../../../app/components/IconList/ICON_OBJECT_LIST'
import { MONTHS, MSG_DELETE_REGISTER_QUESTION, URL_TV_SHOWS } from '../../../app/core/consts'
import IconList from '../../../app/components/IconList'
import FormControlFieldSelect from '../../../app/components/FormControl/FormControlFieldSelect'
import ConvertDate from '../../../app/components/Utils/ConvertDate'
import ButtonDanger from '../../../app/components/Button/ButtonDanger'
import TableRowStyle from '../../../app/components/Table/TableRowStyle'
import TableCellStyle from '../../../app/components/Table/TableCellStyle'
import DialogYesOrNot from '../../../app/components/Dialog/DialogYesOrNot'
import ButtonPink from '../../../app/components/Button/ButtonPink'
import ButtonWarning from '../../../app/components/Button/ButtonWarning'

const useStyles = makeStyles(() => ({
    button_end: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}))

function reducerCategory(state, action) {
    switch (action.type) {
        case 'add':
            const categoriesAdd = state.categories
            categoriesAdd.push({ _id: action._id, name: action.name })
            return { categories: categoriesAdd.reverse() }
        case 'remove':
            let categoriesRemove = state.categories
            categoriesRemove = categoriesRemove.filter((value) => value._id !== action._id)
            return { categories: categoriesRemove }
        default:
            throw new Error()
    }
}

function reducerCountry(state, action) {
    switch (action.type) {
        case 'add':
            const countriesAdd = state.countries
            countriesAdd.push({ _id: action._id, name: action.name })
            return { countries: countriesAdd.reverse() }
        case 'remove':
            let countriesRemove = state.countries
            countriesRemove = countriesRemove.filter((value) => value._id !== action._id)
            return { countries: countriesRemove }
        case 'replaceName':
            let countriesReplaceName = state.countries
            countriesReplaceName = countriesReplaceName.map((value) => {
                const valueX = value
                if (value._id === action._id) {
                    valueX.name = action.name
                }
                return valueX
            })
            return { countries: countriesReplaceName }
        default:
            throw new Error()
    }
}

function reducerStream(state, action) {
    switch (action.type) {
        case 'add':
            const streamsAdd = state.streams
            streamsAdd.push({ _id: action._id, name: action.name })
            return { streams: streamsAdd.reverse() }
        case 'remove':
            let streamsRemove = state.streams
            streamsRemove = streamsRemove.filter((value) => value._id !== action._id)
            return { streams: streamsRemove }
        case 'replaceName':
            let streamsReplaceName = state.streams
            streamsReplaceName = streamsReplaceName.map((value) => {
                const valueX = value
                if (value._id === action._id) {
                    valueX.name = action.name
                }
                return valueX
            })
            return { streams: streamsReplaceName }
        default:
            throw new Error()
    }
}

const TvShowNewView: React.FC<{
    streams: any, stream: any, actionChangeSearchStream: any, actionRefreshListStream: any, actionInsertRegisterStream: any, actionUpdateRegisterStream: any, actionDeleteRegisterStream: any, openStream: any,
    countries: any, country: any, actionChangeSearchCountry: any, actionRefreshListCountry: any, actionInsertRegisterCountry: any, actionUpdateRegisterCountry: any, actionDeleteRegisterCountry: any, openCountry: any,
    categories: any, actionRefreshListCategory: any, actionChangeSearchCategory: any,
    saveRegister: any
}> = function ({
    streams, stream, actionChangeSearchStream, actionRefreshListStream, actionInsertRegisterStream, actionUpdateRegisterStream, actionDeleteRegisterStream, openStream,
    countries, country, actionChangeSearchCountry, actionRefreshListCountry, actionInsertRegisterCountry, actionUpdateRegisterCountry, actionDeleteRegisterCountry, openCountry,
    categories, actionRefreshListCategory, actionChangeSearchCategory,
    saveRegister }) {

        const classes = useStyles()
        const navigate = useNavigate()

        const [titleField, setTitleField] = React.useState("")
        const [releaseField, setReleaseField] = React.useState("")
        const [releaseStrField, setReleaseStrField] = React.useState("")
        const [stateCategory, dispatchCategory] = React.useReducer(reducerCategory, { categories: [] })
        const [stateCountry, dispatchCountry] = React.useReducer(reducerCountry, { countries: [] })
        const [stateStream, dispatchStream] = React.useReducer(reducerStream, { streams: [] })
        const [resumeField, setResumeField] = React.useState("")

        const [dayRelease, setDayRelease] = React.useState(0)
        const [monthRelease, setMonthRelease] = React.useState(0)
        const [yearRelease, setYearRelease] = React.useState(0)

        const [showRelease, setShowRelease] = React.useState(false)
        const [searchTextCategory, setSearchTextCategory] = React.useState("")
        const [showCategory, setShowCategory] = React.useState(false)
        const [showCountry, setShowCountry] = React.useState(false)
        const [searchTextCountry, setSearchTextCountry] = React.useState("")
        const [idCountryEdit, setIdCountryEdit] = React.useState("")
        const [idCountryEditName, setIdCountryEditName] = React.useState("")
        const [idCountryDelete, setIdCountryDelete] = React.useState(-1)
        const [showStream, setShowStream] = React.useState(false)
        const [searchTextStream, setSearchTextStream] = React.useState("")
        const [idStreamEdit, setIdStreamEdit] = React.useState("")
        const [idStreamEditName, setIdStreamEditName] = React.useState("")
        const [idStreamDelete, setIdStreamDelete] = React.useState(-1)

        const [days, setDays] = React.useState<{ label: string, value: number }[]>([])
        const [months, setMonths] = React.useState<{ label: string, value: string }[]>([])
        const [years, setYears] = React.useState<{ label: string, value: string }[]>([])

        React.useEffect(() => {
            const year: { label: string, value: string }[] = [{ label: "", value: "" }]
            for (let y = 0; y < 100; y++) {
                year.push({ label: ((new Date()).getFullYear() - y).toString(), value: ((new Date()).getFullYear() - y).toString() })
            }
            setYears(year)
        }, [])

        React.useEffect(() => {
            if (yearRelease === 0) {
                setMonthRelease(0)
                setDayRelease(0)
            }
            if (yearRelease > 0 && months.length === 0) {
                const monthsValue: { label: string, value: string }[] = [{ label: "", value: "" }]
                MONTHS.forEach((valueMonth, keyMonth) => {
                    monthsValue.push({ label: valueMonth, value: (keyMonth + 1).toString() })
                })
                setMonths(monthsValue)
            }
            if (yearRelease > 0 && monthRelease > 0) {
                const dayMonth = ConvertDate(`${monthRelease >= 10 ? monthRelease : `0${monthRelease}`}_${yearRelease}`, "totalDayInMonthAndYear")
                const day: { label: string, value: number }[] = []
                for (let d = 1; d <= dayMonth; d++) {
                    day.push({ label: d.toString(), value: d })
                }
                setDays(day)
                if (dayRelease > dayMonth) {
                    setDayRelease(0)
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [yearRelease])

        React.useEffect(() => {
            if (monthRelease === 0) {
                setDayRelease(0)
            }
            if (monthRelease > 0) {
                const dayMonth = ConvertDate(`${monthRelease >= 10 ? monthRelease : `0${monthRelease}`}_${yearRelease}`, "totalDayInMonthAndYear")
                const day: { label: string, value: number }[] = []
                for (let d = 1; d <= dayMonth; d++) {
                    day.push({ label: d.toString(), value: d })
                }
                setDays(day)
                if (dayRelease > dayMonth) {
                    setDayRelease(0)
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [monthRelease])

        function cancelRelease() {
            setDayRelease(0)
            setMonthRelease(0)
            setYearRelease(0)
            setReleaseStrField("")
            setReleaseField("")
            setShowRelease(false)
        }

        function confirmRelease() {
            if (yearRelease > 0 && monthRelease === 0 && dayRelease === 0) {
                setReleaseField(`${yearRelease}`)
                setReleaseStrField(`${yearRelease}`)
            }
            if (yearRelease > 0 && monthRelease > 0 && dayRelease === 0) {
                setReleaseField(`${yearRelease}-${(monthRelease >= 1 && monthRelease <= 9) ? `0${monthRelease}` : monthRelease}`)
                setReleaseStrField(`${months.filter(m => parseInt(m.value, 10) === monthRelease)[0].label.substring(0, 3)}. de ${yearRelease}`)
            }
            if (yearRelease > 0 && monthRelease > 0 && dayRelease > 0) {
                setReleaseField(`${yearRelease}-${(monthRelease >= 1 && monthRelease <= 9) ? `0${monthRelease}` : monthRelease}-${(dayRelease >= 1 && dayRelease <= 9) ? `0${dayRelease}` : dayRelease}`)
                setReleaseStrField(`${(dayRelease >= 1 && dayRelease <= 9) ? `0${dayRelease}` : dayRelease} de ${months.filter(m => parseInt(m.value, 10) === monthRelease)[0].label.substring(0, 3)}. de ${yearRelease}`)
            }
            setShowRelease(false)
        }

        React.useEffect(() => {
            if (idCountryEdit.length > 0 && idCountryEdit !== "0") {
                openCountry(idCountryEdit)
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [idCountryEdit])

        React.useEffect(() => {
            if (country) {
                setIdCountryEditName(country.name)
            }
        }, [country])

        React.useEffect(() => {
            if (idStreamEdit.length > 0 && idStreamEdit !== "0") {
                openStream(idStreamEdit)
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [idStreamEdit])

        React.useEffect(() => {
            if (stream) {
                setIdStreamEditName(stream.name)
            }
        }, [stream])

        function changeSearchCategory(search: string) {
            setSearchTextCategory(search)
            actionChangeSearchCategory(search)
        }

        async function refreshListCategory() {
            await setShowCategory(false)
            actionRefreshListCategory(searchTextCategory, () => {
                setShowCategory(true)
            })
        }

        function changeCategories(checked, rowCategory) {
            if (checked) {
                dispatchCategory({ type: 'add', _id: rowCategory._id, name: rowCategory.name })
            } else {
                dispatchCategory({ type: 'remove', _id: rowCategory._id })
            }
        }

        function getShowCategories() {
            if (stateCategory.categories.length > 0) {
                return stateCategory.categories.reduce((actual, categoryValue) => `${actual}${actual.length > 0 ? ", " : ""}${categoryValue.name}`, "")
            }
            return "NÃO POSSUÍ CATEGORIA"
        }

        function changeCountry(checked, rowCountry) {
            if (checked) {
                dispatchCountry({ type: 'add', _id: rowCountry._id, name: rowCountry.name })
            } else {
                dispatchCountry({ type: 'remove', _id: rowCountry._id })
            }
        }

        async function refreshListCountry() {
            await setShowCountry(false)
            actionRefreshListCountry(searchTextCountry, () => {
                setShowCountry(true)
            })
        }

        function changeSearchCountry(search: string) {
            setSearchTextCountry(search)
            actionChangeSearchCountry(search)
        }

        function updateRegisterCountry() {
            const idCountry = idCountryEdit
            if (idCountry.length > 0) {
                setIdCountryEdit("")
                setShowCountry(false)
                if (idCountry === "0") {
                    actionInsertRegisterCountry(idCountryEditName, searchTextCountry, () => {
                        setIdCountryEditName("")
                        setIdCountryEdit("")
                        setShowCountry(true)
                    }, () => {
                        setShowCountry(true)
                        setIdCountryEdit(idCountry)
                    })
                } else {
                    actionUpdateRegisterCountry(idCountry, idCountryEditName, searchTextCountry, () => {
                        dispatchCountry({ type: 'replaceName', _id: idCountry, name: idCountryEditName })
                        setIdCountryEdit("")
                        setShowCountry(true)
                    }, () => {
                        setShowCountry(true)
                        setIdCountryEdit(idCountry)
                    })
                }
            }
        }

        async function deleteRegisterCountry() {
            const countryId = idCountryDelete
            setIdCountryDelete(-1)
            setShowCountry(false)
            actionDeleteRegisterCountry(countryId, searchTextCountry, () => {
                dispatchCountry({ type: 'remove', _id: countryId })
                setShowCountry(true)
            })
        }

        function getShowCountries() {
            if (stateCountry.countries.length > 0) {
                return stateCountry.countries.reduce((actual, countryValue) => `${actual}${actual.length > 0 ? ", " : ""}${countryValue.name}`, "")
            }
            return "NÃO POSSUÍ PAÍS"
        }

        function updateRegisterStream() {
            const idStream = idStreamEdit
            if (idStream.length > 0) {
                setIdStreamEdit("")
                setShowStream(false)
                if (idStream === "0") {
                    actionInsertRegisterStream(idStreamEditName, searchTextStream, () => {
                        setIdStreamEditName("")
                        setIdStreamEdit("")
                        setShowStream(true)
                    }, () => {
                        setShowStream(true)
                        setIdStreamEdit(idStream)
                    })
                } else {
                    actionUpdateRegisterStream(idStream, idStreamEditName, searchTextStream, () => {
                        dispatchStream({ type: 'replaceName', _id: idStream, name: idStreamEditName })
                        setIdStreamEdit("")
                        setShowStream(true)
                    }, () => {
                        setShowStream(true)
                        setIdStreamEdit(idStream)
                    })
                }
            }
        }

        async function refreshListStream() {
            await setShowStream(false)
            actionRefreshListStream(searchTextStream, () => {
                setShowStream(true)
            })
        }

        function changeSearchStream(search: string) {
            setSearchTextStream(search)
            actionChangeSearchStream(search)
        }

        function changeStream(checked, rowStream) {
            if (checked) {
                dispatchStream({ type: 'add', _id: rowStream._id, name: rowStream.name })
            } else {
                dispatchStream({ type: 'remove', _id: rowStream._id })
            }
        }

        async function deleteRegisterStream() {
            const streamId = idStreamDelete
            setIdStreamDelete(-1)
            setShowStream(false)
            actionDeleteRegisterStream(streamId, searchTextStream, () => {
                dispatchStream({ type: 'remove', _id: streamId })
                setShowStream(true)
            })
        }

        function getShowStreams() {
            if (stateStream.streams.length > 0) {
                return stateStream.streams.reduce((actual, streamValue) => `${actual}${actual.length > 0 ? ", " : ""}${streamValue.name}`, "")
            }
            return "NÃO POSSUÍ STREAM"
        }

        function dialogRelease() {
            return (<Dialog fullWidth maxWidth="sm" open={showRelease} onClose={() => setShowRelease(true)} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item md={4} xs={12}>
                                    <FormControlFieldSelect labelValue="DIA" isDisabled={(monthRelease === 0 || yearRelease === 0)} valueDefault={dayRelease > 0 ? dayRelease : ""} selectList={days} onChangeForm={(e) => setDayRelease(e.target.value > 0 ? e.target.value : 0)} />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <FormControlFieldSelect labelValue="MÊS" isDisabled={yearRelease === 0} valueDefault={monthRelease > 0 ? monthRelease : ""} selectList={months} onChangeForm={(e) => setMonthRelease(e.target.value.length > 0 ? parseInt(e.target.value, 10) : 0)} />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <FormControlFieldSelect labelValue="ANO*" valueDefault={yearRelease > 0 ? yearRelease : ""} selectList={years} onChangeForm={(e) => setYearRelease(e.target.value.length > 0 ? parseInt(e.target.value, 10) : 0)} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <ButtonSuccess title="CONFIRMAR DATA" actionClick={() => confirmRelease()} />
                    <ButtonDanger title="CANCELAR" actionClick={() => cancelRelease()} />
                </DialogActions>
            </Dialog>)
        }

        function dialogCategories() {
            return (<Dialog fullWidth maxWidth="sm" open={showCategory} onClose={() => setShowCategory(true)} aria-labelledby="form-dialog-title">
                <DialogActions style={{ marginLeft: 10, marginRight: 10 }}>
                    <FormControlField valueDefault={searchTextCategory} labelValue="DIGITE O NOME" onChangeForm={(e) => changeSearchCategory(e.target.value)} InputProps={{
                        endAdornment: <InputAdornment position="end">
                            {searchTextCategory.length > 0 && <IconButton edge="end" onClick={() => changeSearchCategory("")}><IconList icon={ICON_OBJECT_LIST.CLEAR_ICON} /></IconButton>}
                            <IconButton edge="end" onClick={() => refreshListCategory()}>
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
                                    <TableBody>
                                        {categories && categories.map((row, key) => (
                                            <TableRowStyle hover key={key}>
                                                <TableCellStyle scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                                    {row.name}
                                                </TableCellStyle>
                                                <TableCellStyle width={50} align="center">
                                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                        {stateCategory.categories.filter(d => d._id === row._id).length === 0 ? <ButtonSuccess sizeBtn='small' titleIcon={ICON_OBJECT_LIST.CHECK_ICON} actionClick={() => changeCategories(true, row)} />
                                                            : <ButtonWarning sizeBtn='small' titleIcon={ICON_OBJECT_LIST.REMOVE_ICON} actionClick={() => changeCategories(false, row)} />}
                                                    </ButtonGroup>
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
                    <ButtonDanger title="FECHAR" actionClick={() => setShowCategory(false)} />
                </DialogActions>
            </Dialog>)
        }

        function dialogEditCountry() {
            return (<Dialog fullWidth maxWidth="xs" open={idCountryEdit.length > 0} onClose={() => setIdCountryEdit(idCountryEdit)} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControlField labelValue="NOME*" valueDefault={idCountryEditName} onChangeForm={(e) => setIdCountryEditName(e.target.value)} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <ButtonSuccess title="SALVAR" actionClick={() => updateRegisterCountry()} />
                    <ButtonDanger title="CANCELAR" actionClick={() => setIdCountryEdit("")} />
                </DialogActions>
            </Dialog>)
        }

        function dialogCountry() {
            return (<Dialog fullWidth maxWidth="sm" open={showCountry} onClose={() => setShowCountry(true)} aria-labelledby="form-dialog-title">
                <DialogActions style={{ marginLeft: 10, marginRight: 10 }}>
                    <FormControlField valueDefault={searchTextCountry} labelValue="DIGITE O NOME" onChangeForm={(e) => changeSearchCountry(e.target.value)} InputProps={{
                        endAdornment: <InputAdornment position="end">
                            {searchTextCountry.length > 0 && <IconButton edge="end" onClick={() => changeSearchCountry("")}><IconList icon={ICON_OBJECT_LIST.CLEAR_ICON} /></IconButton>}
                            <IconButton edge="end" onClick={() => refreshListCountry()}>
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
                                    <TableBody>
                                        {countries && countries.map((row, key) => (
                                            <TableRowStyle hover key={key}>
                                                <TableCellStyle scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                                    {row.name}
                                                </TableCellStyle>
                                                <TableCellStyle width={100} align="center">
                                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                        {row.enabledEdit && <ButtonSuccess sizeBtn='small' titleIcon={ICON_OBJECT_LIST.EDIT_ICON} actionClick={() => setIdCountryEdit(row._id)} />}
                                                        {row.enabledEdit && <ButtonPink sizeBtn='small' titleIcon={ICON_OBJECT_LIST.DELETE_ICON} actionClick={() => setIdCountryDelete(row._id)} />}
                                                        {stateCountry.countries.filter(d => d._id === row._id).length === 0 ? <ButtonSuccess sizeBtn='small' titleIcon={ICON_OBJECT_LIST.CHECK_ICON} actionClick={() => changeCountry(true, row)} />
                                                            : <ButtonWarning sizeBtn='small' titleIcon={ICON_OBJECT_LIST.REMOVE_ICON} actionClick={() => changeCountry(false, row)} />}
                                                    </ButtonGroup>
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
                    <ButtonSuccess title="REGISTRAR NOVO PAÍS" actionClick={() => {
                        setIdCountryEditName("")
                        setIdCountryEdit("0")
                    }} />
                    <ButtonDanger title="FECHAR" actionClick={() => setShowCountry(false)} />
                </DialogActions>
            </Dialog>)
        }

        function dialogEditStream() {
            return (<Dialog fullWidth maxWidth="xs" open={idStreamEdit.length > 0} onClose={() => setIdCountryEdit(idStreamEdit)} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControlField labelValue="NOME*" valueDefault={idStreamEditName} onChangeForm={(e) => setIdStreamEditName(e.target.value)} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <ButtonSuccess title="SALVAR" actionClick={() => updateRegisterStream()} />
                    <ButtonDanger title="CANCELAR" actionClick={() => setIdStreamEdit("")} />
                </DialogActions>
            </Dialog>)
        }

        function dialogStream() {
            return (<Dialog fullWidth maxWidth="sm" open={showStream} onClose={() => setShowStream(true)} aria-labelledby="form-dialog-title">
                <DialogActions style={{ marginLeft: 10, marginRight: 10 }}>
                    <FormControlField valueDefault={searchTextStream} labelValue="DIGITE O NOME" onChangeForm={(e) => changeSearchStream(e.target.value)} InputProps={{
                        endAdornment: <InputAdornment position="end">
                            {searchTextStream.length > 0 && <IconButton edge="end" onClick={() => changeSearchStream("")}><IconList icon={ICON_OBJECT_LIST.CLEAR_ICON} /></IconButton>}
                            <IconButton edge="end" onClick={() => refreshListStream()}>
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
                                    <TableBody>
                                        {streams && streams.map((row, key) => (
                                            <TableRowStyle hover key={key}>
                                                <TableCellStyle scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                                    {row.name}
                                                </TableCellStyle>
                                                <TableCellStyle width={100} align="center">
                                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                        {row.enabledEdit && <ButtonSuccess sizeBtn='small' titleIcon={ICON_OBJECT_LIST.EDIT_ICON} actionClick={() => setIdStreamEdit(row._id)} />}
                                                        {row.enabledEdit && <ButtonPink sizeBtn='small' titleIcon={ICON_OBJECT_LIST.DELETE_ICON} actionClick={() => setIdStreamDelete(row._id)} />}
                                                        {stateStream.streams.filter(d => d._id === row._id).length === 0 ? <ButtonSuccess sizeBtn='small' titleIcon={ICON_OBJECT_LIST.CHECK_ICON} actionClick={() => changeStream(true, row)} />
                                                            : <ButtonWarning sizeBtn='small' titleIcon={ICON_OBJECT_LIST.REMOVE_ICON} actionClick={() => changeStream(false, row)} />}
                                                    </ButtonGroup>
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
                    <ButtonSuccess title="REGISTRAR NOVO STREAM" actionClick={() => {
                        setIdStreamEditName("")
                        setIdStreamEdit("0")
                    }} />
                    <ButtonDanger title="FECHAR" actionClick={() => setShowStream(false)} />
                </DialogActions>
            </Dialog>)
        }

        return (
            <PageCard title="NOVA SÉRIE" sizeXs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card>
                            <CardActions>
                                <Grid container spacing={2}>
                                    <Grid item md={4} xs={12}>
                                        <FormControlField labelValue="TÍTULO*" valueDefault={titleField} onChangeForm={(e) => setTitleField(e.target.value)} />
                                    </Grid>
                                    <Grid item md={3} xs={12}>
                                        <FormControlField labelValue="LANÇAMENTO*" valueDefault={releaseStrField} InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton onClick={() => setShowRelease(true)} edge="end">
                                                    <IconList icon={ICON_OBJECT_LIST.CALENDAR_MONTH_ICON} />
                                                </IconButton>
                                            </InputAdornment>
                                        }} />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <FormControlField labelValue="CATEGORIA" valueDefault={getShowCategories()} InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton onClick={() => setShowCategory(true)} edge="end">
                                                    <IconList icon={ICON_OBJECT_LIST.ARROW_FORWARD_IOS_ICON} />
                                                </IconButton>
                                            </InputAdornment>
                                        }} />
                                    </Grid>
                                    <Grid item md={3} xs={12}>
                                        <FormControlField labelValue="PAÍS DE ORIGEM" valueDefault={getShowCountries()} InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton onClick={() => setShowCountry(true)} edge="end">
                                                    <IconList icon={ICON_OBJECT_LIST.ARROW_FORWARD_IOS_ICON} />
                                                </IconButton>
                                            </InputAdornment>
                                        }} />
                                    </Grid>
                                    <Grid item md={3} xs={12}>
                                        <FormControlField labelValue="STREAM" valueDefault={getShowStreams()} InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton onClick={() => setShowStream(true)} edge="end">
                                                    <IconList icon={ICON_OBJECT_LIST.ARROW_FORWARD_IOS_ICON} />
                                                </IconButton>
                                            </InputAdornment>
                                        }} />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <FormControlField labelValue="RESUMO" valueDefault={resumeField} onChangeForm={(e) => setResumeField(e.target.value)} />
                                    </Grid>
                                </Grid>
                            </CardActions>
                            <CardActions className={classes.button_end}>
                                <ButtonSuccess title="SALVAR" iconStart={ICON_OBJECT_LIST.CHECK_ICON} actionClick={() =>
                                    saveRegister(titleField, releaseField, stateCategory.categories.map(c => c._id), stateCountry.countries.map(c => c._id), stateStream.streams.map(s => s._id), resumeField)} />
                                <ButtonIndigo title="VOLTAR" iconStart={ICON_OBJECT_LIST.ARROW_BACK_IOS_NEW_ICON} actionClick={() => navigate(URL_TV_SHOWS)} />
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
                {dialogRelease()}
                {dialogCategories()}
                {dialogEditCountry()}
                {dialogCountry()}
                {dialogEditStream()}
                {dialogStream()}
                <DialogYesOrNot showDialog={idCountryDelete !== -1} onCloseDialog={() => setIdCountryDelete(-1)} clickDialogNot={() => setIdCountryDelete(-1)}
                    titleDialog={MSG_DELETE_REGISTER_QUESTION} clickDialogYes={() => deleteRegisterCountry()} />
                <DialogYesOrNot showDialog={idStreamDelete !== -1} onCloseDialog={() => setIdStreamDelete(-1)} clickDialogNot={() => setIdStreamDelete(-1)}
                    titleDialog={MSG_DELETE_REGISTER_QUESTION} clickDialogYes={() => deleteRegisterStream()} />
            </PageCard>
        )
    }

export default TvShowNewView
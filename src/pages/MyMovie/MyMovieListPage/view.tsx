/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import {
    Card, CardActions, Grid, TableContainer, Paper, Table, TableRow, ButtonGroup, InputAdornment, IconButton,
    Dialog, DialogContent, DialogActions, FormControl, RadioGroup, FormControlLabel, Radio
} from "@mui/material"
import { makeStyles } from "@material-ui/styles"
import { useNavigate } from 'react-router-dom'
import FormControlField from "../../../app/components/FormControl/FormControlField"
import ButtonSuccess from '../../../app/components/Button/ButtonSuccess'
import ButtonDanger from '../../../app/components/Button/ButtonDanger'
import IconList from '../../../app/components/IconList'
import DialogYesOrNot from '../../../app/components/Dialog/DialogYesOrNot'
import TableCellStyle from '../../../app/components/Table/TableCellStyle'
import TableRowStyle from '../../../app/components/Table/TableRowStyle'
import PageCard from '../../../app/components/PageCard'
import ICON_OBJECT_LIST from '../../../app/components/IconList/ICON_OBJECT_LIST'
import { MONTHS, MSG_DELETE_REGISTER_QUESTION, URL_MY_MOVIE_NEW } from '../../../app/core/consts'
import FormControlFieldSelect from '../../../app/components/FormControl/FormControlFieldSelect'
import ConvertDate from '../../../app/components/Utils/ConvertDate'
import FormControlFieldMask from '../../../app/components/FormControl/FormControlFieldMask'
import PaginationList from '../../../app/components/PaginationList'
import TableBodyStyle from '../../../app/components/Table/TableBodyStyle'
import TableHeadStyle from '../../../app/components/Table/TableHeadStyle'

const useStyles = makeStyles(() => ({
    flex_center: {
        display: 'flex',
        justifyContent: 'center'
    }
}))

const MyMovieListPageView: React.FC<{
    orderDefault: string, myMovies: any, positionPage: number, countMyMovie: any, changePagination: any,
    getCategories: any, getCountries: any, actionOrderList: any, actionChangeSearchText: any, actionClickFilter: any, actionEraseFilter: any,
    actionRefreshList: any, actionDeleteRegister: any, showLoading: boolean
}> =
    function ({ orderDefault, myMovies, countMyMovie, positionPage, changePagination, getCategories, getCountries, actionOrderList,
        actionChangeSearchText, actionClickFilter, actionEraseFilter, actionRefreshList, actionDeleteRegister, showLoading }) {
        const classes = useStyles()
        const navigate = useNavigate()

        const [idDelete, setIdDelete] = React.useState(-1)
        const [searchText, setSearchText] = React.useState("")
        const [isFilter, setIsFilter] = React.useState(false)
        const [isOrder, setIsOrder] = React.useState(false)
        const [orderField, setOrderField] = React.useState(orderDefault)
        const [categoryFilter, setCategoryFilter] = React.useState("")
        const [categoryNameFilter, setCategoryNameFilter] = React.useState("")
        const [categoryFilterTemp, setCategoryFilterTemp] = React.useState("")
        const [releaseFilter, setReleaseFilter] = React.useState("")
        const [releaseFilterTemp, setReleaseFilterTemp] = React.useState("")
        const [releaseStrFilter, setReleaseStrFilter] = React.useState("")
        const [releaseStrFilterTemp, setReleaseStrFilterTemp] = React.useState("")
        const [durationMinFilter, setDurationMinFilter] = React.useState("")
        const [durationMinFilterTemp, setDurationMinFilterTemp] = React.useState("")
        const [durationMaxFilter, setDurationMaxFilter] = React.useState("")
        const [durationMaxFilterTemp, setDurationMaxFilterTemp] = React.useState("")
        const [countryFilter, setCountryFilter] = React.useState("")
        const [countryNameFilter, setCountryNameFilter] = React.useState("")
        const [countryFilterTemp, setCountryFilterTemp] = React.useState("")

        const [showReleaseFilter, setShowReleaseFilter] = React.useState(false)
        const [yearReleaseFilter, setYearReleaseFilter] = React.useState(0)
        const [monthReleaseFilter, setMonthReleaseFilter] = React.useState(0)
        const [dayReleaseFilter, setDayReleaseFilter] = React.useState(0)

        const [days, setDays] = React.useState<{ label: string, value: number }[]>([])
        const [months, setMonths] = React.useState<{ label: string, value: string }[]>([])
        const [years, setYears] = React.useState<{ label: string, value: string }[]>([])

        const [categories, setCategories] = React.useState<{ label: string, value: string }[]>([])
        const [countries, setCountries] = React.useState<{ label: string, value: string }[]>([])

        React.useEffect(() => {
            const year: { label: string, value: string }[] = [{ label: "", value: "" }]
            for (let y = 0; y < 100; y++) {
                year.push({ label: ((new Date()).getFullYear() - y).toString(), value: ((new Date()).getFullYear() - y).toString() })
            }
            setYears(year)
        }, [])

        React.useEffect(() => {
            if (yearReleaseFilter === 0) {
                setMonthReleaseFilter(0)
                setDayReleaseFilter(0)
            }
            if (yearReleaseFilter > 0 && months.length === 0) {
                const monthsValue: { label: string, value: string }[] = [{ label: "", value: "" }]
                MONTHS.forEach((valueMonth, keyMonth) => {
                    monthsValue.push({ label: valueMonth, value: (keyMonth + 1).toString() })
                })
                setMonths(monthsValue)
            }
            if (yearReleaseFilter > 0 && monthReleaseFilter > 0) {
                const dayMonth = ConvertDate(`${monthReleaseFilter >= 10 ? monthReleaseFilter : `0${monthReleaseFilter}`}_${yearReleaseFilter}`,
                    "totalDayInMonthAndYear")
                const day: { label: string, value: number }[] = []
                for (let d = 1; d <= dayMonth; d++) {
                    day.push({ label: d.toString(), value: d })
                }
                setDays(day)
                if (dayReleaseFilter > dayMonth) {
                    setDayReleaseFilter(0)
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [yearReleaseFilter])

        React.useEffect(() => {
            if (monthReleaseFilter === 0) {
                setDayReleaseFilter(0)
            }
            if (monthReleaseFilter > 0) {
                const dayMonth = ConvertDate(`${monthReleaseFilter >= 10 ? monthReleaseFilter : `0${monthReleaseFilter}`}_${yearReleaseFilter}`,
                    "totalDayInMonthAndYear")
                const day: { label: string, value: number }[] = []
                for (let d = 1; d <= dayMonth; d++) {
                    day.push({ label: d.toString(), value: d })
                }
                setDays(day)
                if (dayReleaseFilter > dayMonth) {
                    setDayReleaseFilter(0)
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [monthReleaseFilter])

        React.useEffect(() => {
            if (getCategories !== null && typeof getCategories !== "undefined") {
                const categoriesValue = [{ label: "SEM CATEGORIA", value: "-1" }]
                getCategories.forEach(category => {
                    categoriesValue.push({ label: category.name, value: category._id })
                })
                setCategories(categoriesValue)
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [getCategories])

        React.useEffect(() => {
            if (getCountries !== null && typeof getCountries !== "undefined") {
                const countriesValue = [{ label: "SEM PAÍS", value: "-1" }]
                getCountries.forEach(country => {
                    countriesValue.push({ label: country.initial, value: country._id })
                })
                setCountries(countriesValue)
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [getCountries])

        const [typingTimeout, setTypingTimeout] = React.useState<any>(0)

        function searchFinish(search: string) {
            changePagination(1)
            actionChangeSearchText(orderField, search, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter)
        }

        function changeSearchText(search: string, typeAction: "typing" | "click") {
            setSearchText(search)
            if (typeAction === "typing") {
                if (typingTimeout) {
                    clearTimeout(typingTimeout);
                }
                // eslint-disable-next-line prefer-arrow-callback
                setTypingTimeout(setTimeout(() => searchFinish(search), 500))
            } else if (typeAction === "click") {
                searchFinish(search)
            }
        }

        async function refreshList() {
            changePagination(1)
            actionRefreshList(orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter)
        }

        function cancelRelease() {
            setDayReleaseFilter(0)
            setMonthReleaseFilter(0)
            setYearReleaseFilter(0)
            setReleaseFilterTemp("")
            setShowReleaseFilter(false)
        }

        function confirmRelease() {
            if (yearReleaseFilter > 0 && monthReleaseFilter === 0 && dayReleaseFilter === 0) {
                setReleaseFilterTemp(`${yearReleaseFilter}`)
                setReleaseStrFilterTemp(`${yearReleaseFilter}`)
            }
            if (yearReleaseFilter > 0 && monthReleaseFilter > 0 && dayReleaseFilter === 0) {
                setReleaseFilterTemp(`${yearReleaseFilter}-${(monthReleaseFilter >= 1 && monthReleaseFilter <= 9) ? `0${monthReleaseFilter}`
                    : monthReleaseFilter}`)
                setReleaseStrFilterTemp(`${months.filter(m => parseInt(m.value, 10) === monthReleaseFilter)[0].label.substring(0, 3)}. de ${yearReleaseFilter}`)
            }
            if (yearReleaseFilter > 0 && monthReleaseFilter > 0 && dayReleaseFilter > 0) {
                setReleaseFilterTemp(`${yearReleaseFilter}-${(monthReleaseFilter >= 1 && monthReleaseFilter <= 9) ? `0${monthReleaseFilter}`
                    : monthReleaseFilter}-${(dayReleaseFilter >= 1 && dayReleaseFilter <= 9) ? `0${dayReleaseFilter}` : dayReleaseFilter}`)
                setReleaseStrFilterTemp(`${(dayReleaseFilter >= 1 && dayReleaseFilter <= 9) ? `0${dayReleaseFilter}` : dayReleaseFilter} de ${months.filter(m => parseInt(m.value, 10) === monthReleaseFilter)[0].label.substring(0, 3)}. de ${yearReleaseFilter}`)
            }
            setShowReleaseFilter(false)
        }

        function dialogRelease() {
            return (<Dialog fullWidth maxWidth="sm" open={showReleaseFilter} onClose={() => setShowReleaseFilter(true)} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item md={4} xs={12}>
                                    <FormControlFieldSelect labelValue="DIA" isDisabled={(monthReleaseFilter === 0 || yearReleaseFilter === 0)}
                                        valueDefault={dayReleaseFilter > 0 ? dayReleaseFilter : ""} selectList={days} onChangeForm={(e) => setDayReleaseFilter(e.target.value > 0 ? e.target.value : 0)} />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <FormControlFieldSelect labelValue="MÊS" isDisabled={yearReleaseFilter === 0} valueDefault={monthReleaseFilter > 0
                                        ? monthReleaseFilter : ""} selectList={months} onChangeForm={(e) => setMonthReleaseFilter(e.target.value.length > 0
                                            ? parseInt(e.target.value, 10) : 0)} />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <FormControlFieldSelect labelValue="ANO" valueDefault={yearReleaseFilter > 0 ? yearReleaseFilter : ""}
                                        selectList={years} onChangeForm={(e) => setYearReleaseFilter(e.target.value.length > 0
                                            ? parseInt(e.target.value, 10) : 0)} />
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

        async function deleteRegister() {
            const movieId = idDelete
            setIdDelete(-1)
            actionDeleteRegister(movieId, orderField, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter)
        }

        function eraseFilter(categoryId = "", release = "", durationMin = "", durationMax = "", countryId = "") {
            changePagination(1)
            setIsFilter(false)
            setCategoryFilter(categoryId)
            setCategoryFilterTemp(categoryId)
            if (!categoryId) {
                setCategoryNameFilter("")
            }
            setReleaseFilter(release)
            if (!release) {
                setReleaseStrFilter("")
            }
            setReleaseFilterTemp(release)
            if (!release) {
                setReleaseStrFilterTemp("")
                setReleaseStrFilter("")
                setReleaseStrFilterTemp("")
                setYearReleaseFilter(0)
                setMonthReleaseFilter(0)
                setDayReleaseFilter(0)
            }
            setDurationMinFilter(durationMin)
            setDurationMinFilterTemp(durationMin)
            setDurationMaxFilter(durationMax)
            setDurationMaxFilterTemp(durationMax)
            setCountryFilter(countryId)
            setCountryFilterTemp(countryId)
            if (!countryId) {
                setCountryNameFilter("")
            }
            actionEraseFilter(orderField, searchText, categoryId, release, durationMin, durationMax, countryId)
        }

        function validateDuration() {
            let statusDurationMin = true
            let hourMinStr = ""
            let minuteMinStr = ""
            if (durationMinFilterTemp.length > 0) {
                for (let d = 0; d < durationMinFilterTemp.length; d++) {
                    if (!isNaN(parseInt(durationMinFilterTemp[d], 10)) && hourMinStr.length < 2) {
                        hourMinStr += durationMinFilterTemp[d]
                    } else if (!isNaN(parseInt(durationMinFilterTemp[d], 10)) && hourMinStr.length === 2) {
                        minuteMinStr += durationMinFilterTemp[d]
                    }
                }
                statusDurationMin = (parseInt(minuteMinStr, 10) >= 0 && parseInt(minuteMinStr, 10) <= 59) && `${hourMinStr}:${minuteMinStr}`.length === 5
            }
            let statusDurationMax = true
            let hourMaxStr = ""
            let minuteMaxStr = ""
            if (durationMaxFilterTemp.length > 0) {
                for (let d = 0; d < durationMaxFilterTemp.length; d++) {
                    if (!isNaN(parseInt(durationMaxFilterTemp[d], 10)) && hourMaxStr.length < 2) {
                        hourMaxStr += durationMaxFilterTemp[d]
                    } else if (!isNaN(parseInt(durationMaxFilterTemp[d], 10)) && hourMaxStr.length === 2) {
                        minuteMaxStr += durationMaxFilterTemp[d]
                    }
                }
                statusDurationMax = (parseInt(minuteMaxStr, 10) >= 0 && parseInt(minuteMaxStr, 10) <= 59) && `${hourMaxStr}:${minuteMaxStr}`.length === 5
            }
            if (statusDurationMin && statusDurationMax) {
                return !((parseInt(hourMaxStr, 10) < parseInt(hourMinStr, 10)) || ((parseInt(hourMaxStr, 10) === parseInt(hourMinStr, 10)
                    && parseInt(minuteMaxStr, 10) < parseInt(minuteMinStr, 10))))
            }
            return false
        }

        function clickFilter() {
            if (validateDuration()) {
                changePagination(1)
                setCategoryFilter(categoryFilterTemp)
                if (categoryFilterTemp) {
                    setCategoryNameFilter(categories.filter(categoryValue => {
                        const category: any = categoryValue
                        return category.value === categoryFilterTemp
                    })[0].label)
                }
                setReleaseFilter(releaseFilterTemp)
                setReleaseStrFilter(releaseStrFilterTemp)
                setDurationMinFilter(durationMinFilterTemp)
                setDurationMaxFilter(durationMaxFilterTemp)
                setCountryFilter(countryFilterTemp)
                if (countryFilterTemp) {
                    setCountryNameFilter(countries.filter(countryValue => {
                        const country: any = countryValue
                        return country.value === countryFilterTemp
                    })[0].label)
                }
                setIsFilter(false)
            }
            actionClickFilter(orderField, searchText, categoryFilterTemp, releaseFilterTemp, durationMinFilterTemp, durationMaxFilterTemp, countryFilterTemp)
        }

        function orderList(order) {
            changePagination(1)
            setOrderField(order)
            setIsOrder(false)
            actionOrderList(order, searchText, categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, countryFilter)
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

        function getListMyMovies() {
            return <CardActions className={classes.flex_center}>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHeadStyle>
                            <TableRow>
                                <TableCellStyle>Título</TableCellStyle>
                                <TableCellStyle width={300}>Categoria</TableCellStyle>
                                <TableCellStyle width={225}>Lançamento</TableCellStyle>
                                <TableCellStyle width={100}>Duração</TableCellStyle>
                                <TableCellStyle width={300}>Origem</TableCellStyle>
                                <TableCellStyle width={75} />
                            </TableRow>
                        </TableHeadStyle>
                        <TableBodyStyle colSpanValue={6} listData={myMovies} isLoading={showLoading}>
                            {myMovies && myMovies.map((row, key) => (
                                <TableRowStyle hover key={key}>
                                    <TableCellStyle scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                        {row.movie ? row.movie.title : ""}
                                    </TableCellStyle>
                                    <TableCellStyle align="left">
                                        {row.movie ? getShowCategories(row.movie) : ""}
                                    </TableCellStyle>
                                    <TableCellStyle align="left">
                                        {row.movie ? getRelease(row.movie.release) : ""}
                                    </TableCellStyle>
                                    <TableCellStyle align="left">
                                        {row.movie ? row.movie.duration.substring(0, 5) : ""}
                                    </TableCellStyle>
                                    <TableCellStyle align="left">
                                        {row.movie ? getShowCountries(row.movie) : ""}
                                    </TableCellStyle>
                                    <TableCellStyle align="center">
                                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                            <ButtonDanger actionClick={() => setIdDelete(row.movie_id)} titleIcon={ICON_OBJECT_LIST.DELETE_ICON} />
                                        </ButtonGroup>
                                    </TableCellStyle>
                                </TableRowStyle>
                            ))}
                        </TableBodyStyle>
                    </Table>
                </TableContainer>
            </CardActions>
        }

        function filterListMyMovies() {
            return (<>
                <CardActions className={classes.flex_center}>
                    <FormControlField valueDefault={searchText} labelValue="DIGITE O NOME" onChangeForm={(e) => changeSearchText(e.target.value, "typing")} InputProps={{
                        endAdornment: <InputAdornment position="end">
                            {searchText.length > 0 && <IconButton edge="end" onClick={() => changeSearchText("", "click")}>
                                <IconList icon={ICON_OBJECT_LIST.CLEAR_ICON} /></IconButton>}
                            <IconButton edge="end" onClick={() => setIsFilter(true)}><IconList icon={ICON_OBJECT_LIST.FILTER_LIST_ICON} /></IconButton>
                            <IconButton edge="end" onClick={() => setIsOrder(true)}>
                                <IconList icon={ICON_OBJECT_LIST.FORMAT_LIST_NUMBERED_RTL_ICON} />
                            </IconButton>
                            <IconButton edge="end" onClick={() => refreshList()}>
                                <IconList icon={ICON_OBJECT_LIST.REFRESH_ICON} />
                            </IconButton>
                        </InputAdornment>
                    }} />
                    <ButtonSuccess style={{ marginLeft: 10 }} titleIcon={ICON_OBJECT_LIST.ADD_ICON} iconTitleSize="medium"
                        actionClick={() => navigate(URL_MY_MOVIE_NEW)} />
                </CardActions>
                {(categoryNameFilter.length > 0 || releaseFilter.length > 0 || durationMinFilter.length > 0
                    || durationMaxFilter.length > 0 || countryFilter.length > 0) && <CardActions className={classes.flex_center}>
                        <Grid container spacing={2}>
                            <Grid item md={3} xs={12}>
                                <FormControlField labelValue="CATEGORIA" valueDefault={categoryNameFilter} InputProps={{
                                    endAdornment: categoryNameFilter.length > 0 ? <InputAdornment position="end">
                                        <IconButton edge="end" onClick={() => eraseFilter("", releaseFilter, durationMinFilter, durationMaxFilter, countryFilter)}>
                                            <IconList icon={ICON_OBJECT_LIST.CLEAR_ICON} />
                                        </IconButton>
                                    </InputAdornment> : null
                                }} />
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <FormControlField labelValue="LANÇAMENTO" valueDefault={releaseStrFilter} InputProps={{
                                    endAdornment: releaseFilter.length > 0 ? <InputAdornment position="end">
                                        <IconButton edge="end" onClick={() => eraseFilter(categoryFilter, "", durationMinFilter, durationMaxFilter, countryFilter)}>
                                            <IconList icon={ICON_OBJECT_LIST.CLEAR_ICON} />
                                        </IconButton>
                                    </InputAdornment> : null
                                }} />
                            </Grid>
                            <Grid item md={2} xs={12}>
                                <FormControlField labelValue="DURAÇÃO MÍN." valueDefault={durationMinFilter} InputProps={{
                                    endAdornment: durationMinFilter.length > 0 ? <InputAdornment position="end">
                                        <IconButton edge="end" onClick={() => eraseFilter(categoryFilter, releaseFilter, "", durationMaxFilter, countryFilter)}>
                                            <IconList icon={ICON_OBJECT_LIST.CLEAR_ICON} />
                                        </IconButton>
                                    </InputAdornment> : null
                                }} />
                            </Grid>
                            <Grid item md={2} xs={12}>
                                <FormControlField labelValue="DURAÇÃO MÁX." valueDefault={durationMaxFilter} InputProps={{
                                    endAdornment: durationMaxFilter.length > 0 ? <InputAdornment position="end">
                                        <IconButton edge="end" onClick={() => eraseFilter(categoryFilter, releaseFilter, durationMinFilter, "", countryFilter)}>
                                            <IconList icon={ICON_OBJECT_LIST.CLEAR_ICON} />
                                        </IconButton>
                                    </InputAdornment> : null
                                }} />
                            </Grid>
                            <Grid item md={2} xs={12}>
                                <FormControlField labelValue="ORIGEM" valueDefault={countryNameFilter} InputProps={{
                                    endAdornment: countryFilter.length > 0 ? <InputAdornment position="end">
                                        <IconButton edge="end" onClick={() => eraseFilter(categoryFilter, releaseFilter, durationMinFilter, durationMaxFilter, "")}>
                                            <IconList icon={ICON_OBJECT_LIST.CLEAR_ICON} />
                                        </IconButton>
                                    </InputAdornment> : null
                                }} />
                            </Grid>
                        </Grid>
                    </CardActions>}
            </>)
        }

        function dialogFilter() {
            return (<Dialog fullWidth maxWidth="sm" open={isFilter} onClose={() => setIsFilter(true)} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControlFieldSelect labelValue="CATEGORIA" valueDefault={categoryFilterTemp}
                                onChangeForm={(e) => setCategoryFilterTemp(e.target.value)} selectList={categories} />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <FormControlField labelValue="LANÇAMENTO" valueDefault={releaseStrFilterTemp} InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton onClick={() => setShowReleaseFilter(true)} edge="end">
                                        <IconList icon={ICON_OBJECT_LIST.CALENDAR_MONTH_ICON} />
                                    </IconButton>
                                </InputAdornment>
                            }} />
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <FormControlFieldMask valueMask='99:99' labelValue="DUR. MÍN." valueDefault={durationMinFilterTemp}
                                onChangeForm={(e) => setDurationMinFilterTemp(e.target.value)} />
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <FormControlFieldMask valueMask='99:99' labelValue="DUR. MÁX." valueDefault={durationMaxFilterTemp}
                                onChangeForm={(e) => setDurationMaxFilterTemp(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlFieldSelect labelValue="ORIGEM" valueDefault={countryFilterTemp}
                                onChangeForm={(e) => setCountryFilterTemp(e.target.value)} selectList={countries} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ marginRight: 18 }}>
                    <ButtonSuccess title="FILTRAR" actionClick={() => clickFilter()} />
                    <ButtonDanger title="LIMPAR FILTRO" actionClick={() => eraseFilter("", "", "", "", "")} />
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
                                    <FormControlLabel value="title" control={<Radio />} label="TÍTULO" onChange={() => orderList("title")} />
                                    <FormControlLabel value="releaseUp" control={<Radio />} label="LANÇAMENTO CRES." onChange={() => orderList("releaseUp")} />
                                    <FormControlLabel value="releaseDown" control={<Radio />} label="LANÇAMENTO DEC." onChange={() => orderList("releaseDown")} />
                                    <FormControlLabel value="durationUp" control={<Radio />} label="DURAÇÃO CRES." onChange={() => orderList("durationUp")} />
                                    <FormControlLabel value="durationDown" control={<Radio />} label="DURAÇÃO DEC." onChange={() => orderList("durationDown")} />
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
            <PageCard title="MEUS FILMES ASSISTIDOS">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card>
                            {filterListMyMovies()}
                            {getListMyMovies()}
                            <PaginationList isLoading={showLoading} valuePage={positionPage} dataList={myMovies} countList={countMyMovie} style={{ margin: 5 }}
                                actionClick={(value: number) => changePagination(value)} />
                        </Card>
                    </Grid>
                </Grid>
                <DialogYesOrNot showDialog={idDelete !== -1} onCloseDialog={() => setIdDelete(-1)} clickDialogNot={() => setIdDelete(-1)}
                    titleDialog={MSG_DELETE_REGISTER_QUESTION} clickDialogYes={() => deleteRegister()} />
                {dialogFilter()}
                {dialogOrder()}
                {dialogRelease()}
            </PageCard >
        )
    }

export default MyMovieListPageView
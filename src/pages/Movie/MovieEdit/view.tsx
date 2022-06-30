/* eslint-disable arrow-body-style */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { ButtonGroup, Card, CardActions, Dialog, DialogActions, DialogContent, Grid, IconButton, InputAdornment, Paper, Table, TableBody, TableContainer } from "@mui/material"
import { makeStyles } from "@material-ui/styles"
import { useNavigate } from 'react-router'
import PageCard from "../../../app/components/PageCard"
import ButtonSuccess from '../../../app/components/Button/ButtonSuccess'
import ICON_OBJECT_LIST from '../../../app/components/IconList/ICON_OBJECT_LIST'
import FormControlField from '../../../app/components/FormControl/FormControlField'
import ButtonIndigo from '../../../app/components/Button/ButtonIndigo'
import { MONTHS, MSG_DELETE_REGISTER_QUESTION, URL_MOVIES } from '../../../app/core/consts'
import IconList from '../../../app/components/IconList'
import FormControlFieldMask from '../../../app/components/FormControl/FormControlFieldMask'
import FormControlFieldSelect from '../../../app/components/FormControl/FormControlFieldSelect'
import DialogYesOrNot from '../../../app/components/Dialog/DialogYesOrNot'
import ConvertDate from '../../../app/components/Utils/ConvertDate'
import ButtonDanger from '../../../app/components/Button/ButtonDanger'
import TableRowStyle from '../../../app/components/Table/TableRowStyle'
import TableCellStyle from '../../../app/components/Table/TableCellStyle'
import ButtonPink from '../../../app/components/Button/ButtonPink'
import ButtonWarning from '../../../app/components/Button/ButtonWarning'

const useStyles = makeStyles(() => ({
    button_end: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}))

function reducerDirector(state, action) {
    switch (action.type) {
        case 'add':
            const directorsAdd = state.directors
            directorsAdd.push({ _id: action._id, name: action.name })
            return { directors: directorsAdd.reverse() }
        case 'remove':
            let directorsRemove = state.directors
            directorsRemove = directorsRemove.filter((value) => value._id !== action._id)
            return { directors: directorsRemove }
        case 'replace':
            const directorsReplace = action.newDirectors
            return { directors: directorsReplace }
        case 'replaceName':
            let directorsReplaceName = state.directors
            directorsReplaceName = directorsReplaceName.map((value) => {
                const valueX = value
                if (value._id === action._id) {
                    valueX.name = action.name
                }
                return valueX
            })
            return { directors: directorsReplaceName }
        default:
            throw new Error()
    }
}

function reducerCast(state, action) {
    switch (action.type) {
        case 'add':
            const castsAdd = state.casts
            castsAdd.push({ _id: action._id, name: action.name })
            return { casts: castsAdd.reverse() }
        case 'remove':
            let castsRemove = state.casts
            castsRemove = castsRemove.filter((value) => value._id !== action._id)
            return { casts: castsRemove }
        case 'replace':
            const castsReplace = action.newCasts
            return { casts: castsReplace }
        case 'replaceName':
            let castsReplaceName = state.casts
            castsReplaceName = castsReplaceName.map((value) => {
                const valueX = value
                if (value._id === action._id) {
                    valueX.name = action.name
                }
                return valueX
            })
            return { casts: castsReplaceName }
        default:
            throw new Error()
    }
}

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
        case 'replace':
            const categoriesReplace = action.newCategories
            return { categories: categoriesReplace }
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
        case 'replace':
            const countriesReplace = action.newCountries
            return { countries: countriesReplace }
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
        case 'replace':
            const streamsReplace = action.newStreams
            return { streams: streamsReplace }
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

const MovieEditView: React.FC<{
    streams: any, stream: any, actionChangeSearchStream: any, actionRefreshListStream: any, actionInsertRegisterStream: any, actionUpdateRegisterStream: any, actionDeleteRegisterStream: any, openStream: any,
    countries: any, country: any, actionChangeSearchCountry: any, actionRefreshListCountry: any, actionInsertRegisterCountry: any, actionUpdateRegisterCountry: any, actionDeleteRegisterCountry: any, openCountry: any,
    categories: any, actionRefreshListCategory: any, actionChangeSearchCategory: any,
    actors: any, actor: any, actionChangeSearchCast: any, actionInsertRegisterActor: any, actionUpdateRegisterActor: any, actionRefreshListCast: any, openActor: any, actionDeleteRegisterActor: any,
    directors: any, director: any, actionChangeSearchDirector: any, actionInsertRegisterDirector: any, actionUpdateRegisterDirector: any, actionRefreshListDirector: any, openDirector: any, actionDeleteRegisterDirector: any,
    getMovie: any, isLoading: boolean, update: any
}> = function ({
    streams, stream, actionChangeSearchStream, actionRefreshListStream, actionInsertRegisterStream, actionUpdateRegisterStream, actionDeleteRegisterStream, openStream,
    countries, country, actionChangeSearchCountry, actionRefreshListCountry, actionInsertRegisterCountry, actionUpdateRegisterCountry, actionDeleteRegisterCountry, openCountry,
    categories, actionRefreshListCategory, actionChangeSearchCategory,
    actors, actor, actionChangeSearchCast, actionInsertRegisterActor, actionUpdateRegisterActor, actionRefreshListCast, openActor, actionDeleteRegisterActor,
    directors, director, actionChangeSearchDirector, actionRefreshListDirector, actionInsertRegisterDirector, actionUpdateRegisterDirector, openDirector, actionDeleteRegisterDirector,
    getMovie, isLoading, update
}) {
        const classes = useStyles()
        const navigate = useNavigate()

        const [titleField, setTitleField] = React.useState("")
        const [releaseField, setReleaseField] = React.useState("")
        const [releaseStrField, setReleaseStrField] = React.useState("")
        const [stateDirector, dispatchDirector] = React.useReducer(reducerDirector, { directors: [] })
        const [stateCast, dispatchCast] = React.useReducer(reducerCast, { casts: [] })
        const [stateCategory, dispatchCategory] = React.useReducer(reducerCategory, { categories: [] })
        const [durationField, setDurationField] = React.useState("")
        const [stateCountry, dispatchCountry] = React.useReducer(reducerCountry, { countries: [] })
        const [stateStream, dispatchStream] = React.useReducer(reducerStream, { streams: [] })
        const [movieTheaterField, setMovieTheaterField] = React.useState("")
        const [resumeField, setResumeField] = React.useState("")

        const [dayRelease, setDayRelease] = React.useState(0)
        const [monthRelease, setMonthRelease] = React.useState(0)
        const [yearRelease, setYearRelease] = React.useState(0)

        const [showRelease, setShowRelease] = React.useState(false)
        const [showDirector, setShowDirector] = React.useState(false)
        const [searchTextDirector, setSearchTextDirector] = React.useState("")
        const [idDirectorEdit, setIdDirectorEdit] = React.useState("")
        const [idDirectorEditName, setIdDirectorEditName] = React.useState("")
        const [idDirectorDelete, setIdDirectorDelete] = React.useState(-1)
        const [showCast, setShowCast] = React.useState(false)
        const [searchTextCast, setSearchTextCast] = React.useState("")
        const [idActorEdit, setIdActorEdit] = React.useState("")
        const [idActorEditName, setIdActorEditName] = React.useState("")
        const [idActorDelete, setIdActorDelete] = React.useState(-1)
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

        function setRelease() {
            if (getMovie.release.length === 4) {
                const year = parseInt(getMovie.release, 10)
                setReleaseField(`${year}`)
                setReleaseStrField(`${year}`)
                setYearRelease(year)
            }
            if (getMovie.release.length === 7) {
                const year = parseInt(getMovie.release, 10)
                const month = parseInt(getMovie.release.substring(5, 7), 10)
                setReleaseField(`${year}-${(month >= 1 && month <= 9) ? `0${month}` : month}`)
                setReleaseStrField(`${MONTHS.filter((m, key) => (key + 1) === month)[0].substring(0, 3)}. de ${year}`)
                setYearRelease(year)
                setMonthRelease(month)
            }
            if (getMovie.release.length === 10) {
                const year = parseInt(getMovie.release, 10)
                const month = parseInt(getMovie.release.substring(5, 7), 10)
                const day = parseInt(getMovie.release.substring(8, 10), 10)

                setReleaseField(`${year}-${(month >= 1 && month <= 9) ? `0${month}` : month}-${(day >= 1 && day <= 9) ? `0${day}` : day}`)
                setReleaseStrField(`${(day >= 1 && day <= 9) ? `0${day}` : day} de ${MONTHS.filter((m, key) => (key + 1) === month)[0].substring(0, 3)}. de ${year}`)

                setYearRelease(year)
                setMonthRelease(month)
                setDayRelease(day)
            }
        }

        React.useEffect(() => {
            if (getMovie) {
                if (!getMovie.enabledEdit) {
                    navigate(URL_MOVIES)
                }
                setTitleField(getMovie.title)
                setRelease()
                setDurationField(getMovie.duration.substring(0, 5))
                setMovieTheaterField(getMovie.movie_theater ? "YES" : "NOT")
                setResumeField(getMovie.resume)
                dispatchDirector({
                    type: "replace", newDirectors: getMovie.directors.map(directorV => {
                        return { _id: directorV._id, name: directorV.name }
                    })
                })
                dispatchCast({
                    type: "replace", newCasts: getMovie.casts.map(castV => {
                        return { _id: castV._id, name: castV.name }
                    })
                })
                dispatchCategory({
                    type: "replace", newCategories: getMovie.categories.map(categoryV => {
                        return { _id: categoryV._id, name: categoryV.name }
                    })
                })
                dispatchCountry({
                    type: "replace", newCountries: getMovie.countries.map(countryV => {
                        return { _id: countryV._id, name: countryV.initial }
                    })
                })
                dispatchStream({
                    type: "replace", newStreams: getMovie.streams.map(streamV => {
                        return { _id: streamV._id, name: streamV.name }
                    })
                })
            }
        }, [getMovie])

        React.useEffect(() => {
            if (idDirectorEdit.length > 0 && idDirectorEdit !== "0") {
                openDirector(idDirectorEdit)
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [idDirectorEdit])

        React.useEffect(() => {
            if (director) {
                setIdDirectorEditName(director.name)
            }
        }, [director])

        React.useEffect(() => {
            if (idActorEdit.length > 0 && idActorEdit !== "0") {
                openActor(idActorEdit)
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [idActorEdit])

        React.useEffect(() => {
            if (actor) {
                setIdActorEditName(actor.name)
            }
        }, [actor])

        React.useEffect(() => {
            if (idCountryEdit.length > 0 && idCountryEdit !== "0") {
                openCountry(idCountryEdit)
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [idCountryEdit])

        React.useEffect(() => {
            if (country) {
                setIdCountryEditName(country.initial)
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

        function updateRegisterDirector() {
            const idDirector = idDirectorEdit
            if (idDirectorEditName.length >= 3) {
                if (idDirector.length > 0) {
                    setIdDirectorEdit("")
                    setShowDirector(false)
                    if (idDirector === "0") {
                        actionInsertRegisterDirector(idDirectorEditName, () => {
                            setIdDirectorEditName("")
                            setIdDirectorEdit("")
                            setShowDirector(true)
                            setSearchTextDirector(idDirectorEditName)
                        }, () => {
                            setShowDirector(true)
                            setIdDirectorEdit(idDirector)
                        })
                    } else {
                        actionUpdateRegisterDirector(idDirector, idDirectorEditName, () => {
                            dispatchDirector({ type: 'replaceName', _id: idDirector, name: idDirectorEditName })
                            setIdDirectorEdit("")
                            setShowDirector(true)
                            setSearchTextDirector(idDirectorEditName)
                        }, () => {
                            setShowDirector(true)
                            setIdDirectorEdit(idDirector)
                        })
                    }
                }
            }
        }

        async function refreshListDirector() {
            await setShowDirector(false)
            actionRefreshListDirector(searchTextDirector, () => {
                setShowDirector(true)
            })
        }

        function changeSearchDirector(search: string) {
            setSearchTextDirector(search)
            actionChangeSearchDirector(search)
        }

        async function deleteRegisterDirector() {
            const directorId = idDirectorDelete
            setIdDirectorDelete(-1)
            setShowDirector(false)
            actionDeleteRegisterDirector(directorId, searchTextDirector, () => {
                dispatchDirector({ type: 'remove', _id: directorId })
                setShowDirector(true)
            })
        }

        function changeDirectors(checked, rowDirector) {
            if (checked) {
                dispatchDirector({ type: 'add', _id: rowDirector._id, name: rowDirector.name })
            } else {
                dispatchDirector({ type: 'remove', _id: rowDirector._id })
            }
        }

        function getShowDirectors() {
            if (stateDirector.directors.length > 0) {
                return stateDirector.directors.reduce((actual, directorValue) => `${actual}${actual.length > 0 ? ", " : ""}${directorValue.name}`, "")
            }
            return "NÃO POSSUÍ DIRETOR"
        }

        function updateRegisterActor() {
            const idActor = idActorEdit
            if (idActorEditName.length >= 3) {
                if (idActor.length > 0) {
                    setIdActorEdit("")
                    setShowCast(false)
                    if (idActor === "0") {
                        actionInsertRegisterActor(idActorEditName, () => {
                            setIdActorEditName("")
                            setIdActorEdit("")
                            setShowCast(true)
                            setSearchTextCast(idActorEditName)
                        }, () => {
                            setShowCast(true)
                            setIdActorEdit(idActor)
                        })
                    } else {
                        actionUpdateRegisterActor(idActor, idActorEditName, () => {
                            dispatchCast({ type: 'replaceName', _id: idActor, name: idActorEditName })
                            setIdActorEdit("")
                            setShowCast(true)
                            setSearchTextCast(idActorEditName)
                        }, () => {
                            setShowCast(true)
                            setIdActorEdit(idActor)
                        })
                    }
                }
            }
        }

        async function refreshListCast() {
            await setShowCast(false)
            actionRefreshListCast(searchTextCast, () => {
                setShowCast(true)
            })
        }

        async function deleteRegisterActor() {
            const actorId = idActorDelete
            setIdActorDelete(-1)
            setShowCast(false)
            actionDeleteRegisterActor(actorId, searchTextCast, () => {
                dispatchCast({ type: 'remove', _id: actorId })
                setShowCast(true)
            })
        }

        function changeSearchCast(search: string) {
            setSearchTextCast(search)
            actionChangeSearchCast(search)
        }

        function changeCasts(checked, rowActor) {
            if (checked) {
                dispatchCast({ type: 'add', _id: rowActor._id, name: rowActor.name })
            } else {
                dispatchCast({ type: 'remove', _id: rowActor._id })
            }
        }

        function getShowCasts() {
            if (stateCast.casts.length > 0) {
                return stateCast.casts.reduce((actual, castValue) => `${actual}${actual.length > 0 ? ", " : ""}${castValue.name}`, "")
            }
            return "NÃO POSSUÍ ELENCO"
        }

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
                dispatchCountry({ type: 'add', _id: rowCountry._id, name: rowCountry.initial })
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
            if (idCountryEditName.length >= 3) {
                if (idCountry.length > 0) {
                    setIdCountryEdit("")
                    setShowCountry(false)
                    if (idCountry === "0") {
                        actionInsertRegisterCountry(idCountryEditName, () => {
                            setIdCountryEditName("")
                            setIdCountryEdit("")
                            setShowCountry(true)
                            setSearchTextCountry(idCountryEditName)
                        }, () => {
                            setShowCountry(true)
                            setIdCountryEdit(idCountry)
                        })
                    } else {
                        actionUpdateRegisterCountry(idCountry, idCountryEditName, () => {
                            dispatchCountry({ type: 'replaceName', _id: idCountry, name: idCountryEditName })
                            setIdCountryEdit("")
                            setShowCountry(true)
                            setSearchTextCountry(idCountryEditName)
                        }, () => {
                            setShowCountry(true)
                            setIdCountryEdit(idCountry)
                        })
                    }
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
            if (idStreamEditName.length >= 3) {
                if (idStream.length > 0) {
                    setIdStreamEdit("")
                    setShowStream(false)
                    if (idStream === "0") {
                        actionInsertRegisterStream(idStreamEditName, () => {
                            setIdStreamEditName("")
                            setIdStreamEdit("")
                            setShowStream(true)
                            setSearchTextStream(idStreamEditName)
                        }, () => {
                            setShowStream(true)
                            setIdStreamEdit(idStream)
                        })
                    } else {
                        actionUpdateRegisterStream(idStream, idStreamEditName, () => {
                            dispatchStream({ type: 'replaceName', _id: idStream, name: idStreamEditName })
                            setIdStreamEdit("")
                            setShowStream(true)
                            setSearchTextStream(idStreamEditName)
                        }, () => {
                            setShowStream(true)
                            setIdStreamEdit(idStream)
                        })
                    }
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

        function dialogEditDirector() {
            return (<Dialog fullWidth maxWidth="xs" open={idDirectorEdit.length > 0} onClose={() => setIdDirectorEdit(idDirectorEdit)} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControlField labelValue="NOME*" valueDefault={idDirectorEditName} onChangeForm={(e) => setIdDirectorEditName(e.target.value)} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <ButtonSuccess title="SALVAR" actionClick={() => updateRegisterDirector()} />
                    <ButtonDanger title="CANCELAR" actionClick={() => setIdDirectorEdit("")} />
                </DialogActions>
            </Dialog>)
        }

        function dialogDirectors() {
            return (<Dialog fullWidth maxWidth="sm" open={showDirector} onClose={() => setShowDirector(true)} aria-labelledby="form-dialog-title">
                <DialogActions style={{ marginLeft: 10, marginRight: 10 }}>
                    <FormControlField valueDefault={searchTextDirector} labelValue="DIGITE O NOME" onChangeForm={(e) => changeSearchDirector(e.target.value)} InputProps={{
                        endAdornment: <InputAdornment position="end">
                            {searchTextDirector.length > 0 && <IconButton edge="end" onClick={() => changeSearchDirector("")}><IconList icon={ICON_OBJECT_LIST.CLEAR_ICON} /></IconButton>}
                            {searchTextDirector.length >= 3 && <IconButton edge="end" onClick={() => refreshListDirector()}>
                                <IconList icon={ICON_OBJECT_LIST.REFRESH_ICON} />
                            </IconButton>}
                        </InputAdornment>
                    }} />
                </DialogActions>
                {(stateDirector.directors.length > 0 || searchTextDirector.length >= 3) && <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableBody>
                                        {stateDirector.directors.map((row, key) => (
                                            <TableRowStyle hover key={key}>
                                                <TableCellStyle scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                                    {row.name}
                                                </TableCellStyle>
                                                <TableCellStyle width={100} align="center">
                                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                        <ButtonWarning sizeBtn='small' titleIcon={ICON_OBJECT_LIST.REMOVE_ICON} actionClick={() => changeDirectors(false, row)} />
                                                    </ButtonGroup>
                                                </TableCellStyle>
                                            </TableRowStyle>
                                        ))}
                                        {(searchTextDirector.length >= 3 && directors) && directors.filter(di => stateDirector.directors.filter(d => d._id === di._id).length === 0)
                                            .map((row, key) => (
                                                <TableRowStyle hover key={key}>
                                                    <TableCellStyle scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                                        {row.name}
                                                    </TableCellStyle>
                                                    <TableCellStyle width={100} align="center">
                                                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                            {row.enabledEdit && <ButtonSuccess sizeBtn='small' titleIcon={ICON_OBJECT_LIST.EDIT_ICON} actionClick={() => setIdDirectorEdit(row._id)} />}
                                                            {row.enabledEdit && <ButtonPink sizeBtn='small' titleIcon={ICON_OBJECT_LIST.DELETE_ICON} actionClick={() => setIdDirectorDelete(row._id)} />}
                                                            <ButtonSuccess sizeBtn='small' titleIcon={ICON_OBJECT_LIST.CHECK_ICON} actionClick={() => changeDirectors(true, row)} />
                                                        </ButtonGroup>
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
                    <ButtonSuccess title="REGISTRAR NOVO DIRETOR" actionClick={() => {
                        setIdDirectorEditName("")
                        setIdDirectorEdit("0")
                    }} />
                    <ButtonDanger title="FECHAR" actionClick={() => setShowDirector(false)} />
                </DialogActions>
            </Dialog>)
        }

        function dialogEditActor() {
            return (<Dialog fullWidth maxWidth="xs" open={idActorEdit.length > 0} onClose={() => setIdActorEdit(idActorEdit)} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControlField labelValue="NOME*" valueDefault={idActorEditName} onChangeForm={(e) => setIdActorEditName(e.target.value)} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <ButtonSuccess title="SALVAR" actionClick={() => updateRegisterActor()} />
                    <ButtonDanger title="CANCELAR" actionClick={() => setIdActorEdit("")} />
                </DialogActions>
            </Dialog>)
        }

        function dialogCast() {
            return (<Dialog fullWidth maxWidth="sm" open={showCast} onClose={() => setShowCast(true)} aria-labelledby="form-dialog-title">
                <DialogActions style={{ marginLeft: 10, marginRight: 10 }}>
                    <FormControlField valueDefault={searchTextCast} labelValue="DIGITE O NOME" onChangeForm={(e) => changeSearchCast(e.target.value)} InputProps={{
                        endAdornment: <InputAdornment position="end">
                            {searchTextCast.length > 0 && <IconButton edge="end" onClick={() => changeSearchCast("")}><IconList icon={ICON_OBJECT_LIST.CLEAR_ICON} /></IconButton>}
                            {searchTextCast.length >= 3 && <IconButton edge="end" onClick={() => refreshListCast()}>
                                <IconList icon={ICON_OBJECT_LIST.REFRESH_ICON} />
                            </IconButton>}
                        </InputAdornment>
                    }} />
                </DialogActions>
                {(stateCast.casts.length > 0 || searchTextCast.length >= 3) && <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableBody>
                                        {stateCast.casts.map((row, key) => (
                                            <TableRowStyle hover key={key}>
                                                <TableCellStyle scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                                    {row.name}
                                                </TableCellStyle>
                                                <TableCellStyle width={100} align="center">
                                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                        <ButtonWarning sizeBtn='small' titleIcon={ICON_OBJECT_LIST.REMOVE_ICON} actionClick={() => changeCasts(false, row)} />
                                                    </ButtonGroup>
                                                </TableCellStyle>
                                            </TableRowStyle>
                                        ))}
                                        {(searchTextCast.length >= 3 && actors) && actors.filter(ac => stateCast.casts.filter(c => c._id === ac._id).length === 0)
                                            .map((row, key) => (
                                                <TableRowStyle hover key={key}>
                                                    <TableCellStyle scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                                        {row.name}
                                                    </TableCellStyle>
                                                    <TableCellStyle width={100} align="center">
                                                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                            {row.enabledEdit && <ButtonSuccess sizeBtn='small' titleIcon={ICON_OBJECT_LIST.EDIT_ICON} actionClick={() => setIdActorEdit(row._id)} />}
                                                            {row.enabledEdit && <ButtonPink sizeBtn='small' titleIcon={ICON_OBJECT_LIST.DELETE_ICON} actionClick={() => setIdActorDelete(row._id)} />}
                                                            <ButtonSuccess sizeBtn='small' titleIcon={ICON_OBJECT_LIST.CHECK_ICON} actionClick={() => changeCasts(true, row)} />
                                                        </ButtonGroup>
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
                    <ButtonSuccess title="REGISTRAR NOVO ATOR" actionClick={() => {
                        setIdActorEditName("")
                        setIdActorEdit("0")
                    }} />
                    <ButtonDanger title="FECHAR" actionClick={() => setShowCast(false)} />
                </DialogActions>
            </Dialog>)
        }

        function dialogCategories() {
            return (<Dialog fullWidth maxWidth="sm" open={showCategory} onClose={() => setShowCategory(true)} aria-labelledby="form-dialog-title">
                <DialogActions style={{ marginLeft: 10, marginRight: 10 }}>
                    <FormControlField valueDefault={searchTextCategory} labelValue="DIGITE O NOME" onChangeForm={(e) => changeSearchCategory(e.target.value)} InputProps={{
                        endAdornment: <InputAdornment position="end">
                            {searchTextCategory.length > 0 && <IconButton edge="end" onClick={() => changeSearchCategory("")}><IconList icon={ICON_OBJECT_LIST.CLEAR_ICON} /></IconButton>}
                            {searchTextCategory.length >= 3 && <IconButton edge="end" onClick={() => refreshListCategory()}>
                                <IconList icon={ICON_OBJECT_LIST.REFRESH_ICON} />
                            </IconButton>}
                        </InputAdornment>
                    }} />
                </DialogActions>
                {(stateCategory.categories.length > 0 || searchTextCategory.length >= 3) && <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableBody>
                                        {stateCategory.categories.map((row, key) => (
                                            <TableRowStyle hover key={key}>
                                                <TableCellStyle scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                                    {row.name}
                                                </TableCellStyle>
                                                <TableCellStyle width={100} align="center">
                                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                        <ButtonWarning sizeBtn='small' titleIcon={ICON_OBJECT_LIST.REMOVE_ICON} actionClick={() => changeCategories(false, row)} />
                                                    </ButtonGroup>
                                                </TableCellStyle>
                                            </TableRowStyle>
                                        ))}
                                        {(searchTextCategory.length >= 3 && categories) && categories.filter(ca => stateCategory.categories.filter(c => c._id === ca._id).length === 0)
                                            .map((row, key) => (
                                                <TableRowStyle hover key={key}>
                                                    <TableCellStyle scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                                        {row.name}
                                                    </TableCellStyle>
                                                    <TableCellStyle width={50} align="center">
                                                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                            <ButtonSuccess sizeBtn='small' titleIcon={ICON_OBJECT_LIST.CHECK_ICON} actionClick={() => changeCategories(true, row)} />
                                                        </ButtonGroup>
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
                            {searchTextCountry.length >= 3 && <IconButton edge="end" onClick={() => refreshListCountry()}>
                                <IconList icon={ICON_OBJECT_LIST.REFRESH_ICON} />
                            </IconButton>}
                        </InputAdornment>
                    }} />
                </DialogActions>
                {(stateCountry.countries.length > 0 || searchTextCountry.length >= 3) && <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableBody>
                                        {stateCountry.countries.map((row, key) => (
                                            <TableRowStyle hover key={key}>
                                                <TableCellStyle scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                                    {row.name}
                                                </TableCellStyle>
                                                <TableCellStyle width={100} align="center">
                                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                        <ButtonWarning sizeBtn='small' titleIcon={ICON_OBJECT_LIST.REMOVE_ICON} actionClick={() => changeCountry(false, row)} />
                                                    </ButtonGroup>
                                                </TableCellStyle>
                                            </TableRowStyle>
                                        ))}
                                        {(countries && searchTextCountry.length >= 3) && countries.filter(co => stateCountry.countries.filter(c => c._id === co._id).length === 0)
                                            .map((row, key) => (
                                                <TableRowStyle hover key={key}>
                                                    <TableCellStyle scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                                        {row.initial}
                                                    </TableCellStyle>
                                                    <TableCellStyle width={100} align="center">
                                                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                            {row.enabledEdit && <ButtonSuccess sizeBtn='small' titleIcon={ICON_OBJECT_LIST.EDIT_ICON} actionClick={() => setIdCountryEdit(row._id)} />}
                                                            {row.enabledEdit && <ButtonPink sizeBtn='small' titleIcon={ICON_OBJECT_LIST.DELETE_ICON} actionClick={() => setIdCountryDelete(row._id)} />}
                                                            <ButtonSuccess sizeBtn='small' titleIcon={ICON_OBJECT_LIST.CHECK_ICON} actionClick={() => changeCountry(true, row)} />
                                                        </ButtonGroup>
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
                            {searchTextStream.length >= 3 && <IconButton edge="end" onClick={() => refreshListStream()}>
                                <IconList icon={ICON_OBJECT_LIST.REFRESH_ICON} />
                            </IconButton>}
                        </InputAdornment>
                    }} />
                </DialogActions>
                {(stateStream.streams.length > 0 || searchTextStream.length >= 3) && <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableBody>
                                        {stateStream.streams.map((row, key) => (
                                            <TableRowStyle hover key={key}>
                                                <TableCellStyle scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                                    {row.name}
                                                </TableCellStyle>
                                                <TableCellStyle width={100} align="center">
                                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                        <ButtonWarning sizeBtn='small' titleIcon={ICON_OBJECT_LIST.REMOVE_ICON} actionClick={() => changeStream(false, row)} />
                                                    </ButtonGroup>
                                                </TableCellStyle>
                                            </TableRowStyle>
                                        ))}
                                        {(searchTextStream.length >= 3 && streams) && streams.filter(st => stateStream.streams.filter(s => s._id === st._id).length === 0)
                                            .map((row, key) => (
                                                <TableRowStyle hover key={key}>
                                                    <TableCellStyle scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                                        {row.name}
                                                    </TableCellStyle>
                                                    <TableCellStyle width={100} align="center">
                                                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                            {row.enabledEdit && <ButtonSuccess sizeBtn='small' titleIcon={ICON_OBJECT_LIST.EDIT_ICON} actionClick={() => setIdStreamEdit(row._id)} />}
                                                            {row.enabledEdit && <ButtonPink sizeBtn='small' titleIcon={ICON_OBJECT_LIST.DELETE_ICON} actionClick={() => setIdStreamDelete(row._id)} />}
                                                            <ButtonSuccess sizeBtn='small' titleIcon={ICON_OBJECT_LIST.CHECK_ICON} actionClick={() => changeStream(true, row)} />
                                                        </ButtonGroup>
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
                    <ButtonSuccess title="REGISTRAR NOVO STREAM" actionClick={() => {
                        setIdStreamEditName("")
                        setIdStreamEdit("0")
                    }} />
                    <ButtonDanger title="FECHAR" actionClick={() => setShowStream(false)} />
                </DialogActions>
            </Dialog>)
        }

        return (
            <PageCard title="EDITAR FILME" sizeXs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card>
                            <CardActions>
                                <Grid container spacing={2}>
                                    <Grid item md={4} xs={12}>
                                        <FormControlField isDisabled={(!getMovie || isLoading)} labelValue="TÍTULO*" valueDefault={titleField} onChangeForm={(e) => setTitleField(e.target.value)} />
                                    </Grid>
                                    <Grid item md={3} xs={12}>
                                        <FormControlField isDisabled={(!getMovie || isLoading)} labelValue="LANÇAMENTO*" valueDefault={releaseStrField} InputProps={{
                                            endAdornment: (getMovie && !isLoading) ? <InputAdornment position="end">
                                                <IconButton onClick={() => setShowRelease(true)} edge="end">
                                                    <IconList icon={ICON_OBJECT_LIST.CALENDAR_MONTH_ICON} />
                                                </IconButton>
                                            </InputAdornment> : null
                                        }} />
                                    </Grid>
                                    <Grid item md={5} xs={12}>
                                        <FormControlField isDisabled={(!getMovie || isLoading)} labelValue="DIRETOR" valueDefault={getShowDirectors()} InputProps={{
                                            endAdornment: (getMovie && !isLoading) ? <InputAdornment position="end">
                                                <IconButton onClick={() => setShowDirector(true)} edge="end">
                                                    <IconList icon={ICON_OBJECT_LIST.ARROW_FORWARD_IOS_ICON} />
                                                </IconButton>
                                            </InputAdornment> : null
                                        }} />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <FormControlField isDisabled={(!getMovie || isLoading)} labelValue="ELENCO" valueDefault={getShowCasts()} InputProps={{
                                            endAdornment: (getMovie && !isLoading) ? <InputAdornment position="end">
                                                <IconButton onClick={() => setShowCast(true)} edge="end">
                                                    <IconList icon={ICON_OBJECT_LIST.ARROW_FORWARD_IOS_ICON} />
                                                </IconButton>
                                            </InputAdornment> : null
                                        }} />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <FormControlFieldMask isDisabled={(!getMovie || isLoading)} valueMask='99:99' labelValue="DURAÇÃO*" valueDefault={durationField} onChangeForm={(e) => setDurationField(e.target.value)} />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <FormControlField isDisabled={(!getMovie || isLoading)} labelValue="CATEGORIA" valueDefault={getShowCategories()} InputProps={{
                                            endAdornment: (getMovie && !isLoading) ? <InputAdornment position="end">
                                                <IconButton onClick={() => setShowCategory(true)} edge="end">
                                                    <IconList icon={ICON_OBJECT_LIST.ARROW_FORWARD_IOS_ICON} />
                                                </IconButton>
                                            </InputAdornment> : null
                                        }} />
                                    </Grid>
                                    <Grid item md={3} xs={12}>
                                        <FormControlField isDisabled={(!getMovie || isLoading)} labelValue="PAÍS DE ORIGEM" valueDefault={getShowCountries()} InputProps={{
                                            endAdornment: (getMovie && !isLoading) ? <InputAdornment position="end">
                                                <IconButton onClick={() => setShowCountry(true)} edge="end">
                                                    <IconList icon={ICON_OBJECT_LIST.ARROW_FORWARD_IOS_ICON} />
                                                </IconButton>
                                            </InputAdornment> : null
                                        }} />
                                    </Grid>
                                    <Grid item md={3} xs={12}>
                                        <FormControlField isDisabled={(!getMovie || isLoading)} labelValue="STREAM" valueDefault={getShowStreams()} InputProps={{
                                            endAdornment: (getMovie && !isLoading) ? <InputAdornment position="end">
                                                <IconButton onClick={() => setShowStream(true)} edge="end">
                                                    <IconList icon={ICON_OBJECT_LIST.ARROW_FORWARD_IOS_ICON} />
                                                </IconButton>
                                            </InputAdornment> : null
                                        }} />
                                    </Grid>
                                    <Grid item md={1} xs={12}>
                                        <FormControlFieldSelect isDisabled={(!getMovie || isLoading)} labelValue="CINEMA*" valueDefault={movieTheaterField} selectList={[{ label: 'SIM', value: 'YES' }, { label: 'NÃO', value: 'NOT' }]} onChangeForm={(e) => setMovieTheaterField(e.target.value)} />
                                    </Grid>
                                    <Grid item md={5} xs={12}>
                                        <FormControlField isDisabled={(!getMovie || isLoading)} labelValue="SINOPSE" valueDefault={resumeField} onChangeForm={(e) => setResumeField(e.target.value)} />
                                    </Grid>
                                </Grid>
                            </CardActions>
                            <CardActions className={classes.button_end}>
                                <ButtonSuccess title="SALVAR" isDisabled={(!getMovie || isLoading)} iconStart={ICON_OBJECT_LIST.CHECK_ICON} actionClick={() => update(titleField, releaseField, stateDirector.directors.map(d => d._id), stateCast.casts.map(c => c._id), durationField, stateCategory.categories.map(c => c._id), stateCountry.countries.map(c => c._id), stateStream.streams.map(c => c._id), movieTheaterField, resumeField)} />
                                <ButtonIndigo title="VOLTAR" iconStart={ICON_OBJECT_LIST.ARROW_BACK_IOS_NEW_ICON} actionClick={() => navigate(URL_MOVIES)} />
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
                {dialogRelease()}
                {dialogEditDirector()}
                {dialogDirectors()}
                {dialogEditActor()}
                {dialogCast()}
                {dialogCategories()}
                {dialogEditCountry()}
                {dialogCountry()}
                {dialogEditStream()}
                {dialogStream()}
                <DialogYesOrNot showDialog={idDirectorDelete !== -1} onCloseDialog={() => setIdDirectorDelete(-1)} clickDialogNot={() => setIdDirectorDelete(-1)}
                    titleDialog={MSG_DELETE_REGISTER_QUESTION} clickDialogYes={() => deleteRegisterDirector()} />
                <DialogYesOrNot showDialog={idActorDelete !== -1} onCloseDialog={() => setIdActorDelete(-1)} clickDialogNot={() => setIdActorDelete(-1)}
                    titleDialog={MSG_DELETE_REGISTER_QUESTION} clickDialogYes={() => deleteRegisterActor()} />
                <DialogYesOrNot showDialog={idCountryDelete !== -1} onCloseDialog={() => setIdCountryDelete(-1)} clickDialogNot={() => setIdCountryDelete(-1)}
                    titleDialog={MSG_DELETE_REGISTER_QUESTION} clickDialogYes={() => deleteRegisterCountry()} />
                <DialogYesOrNot showDialog={idStreamDelete !== -1} onCloseDialog={() => setIdStreamDelete(-1)} clickDialogNot={() => setIdStreamDelete(-1)}
                    titleDialog={MSG_DELETE_REGISTER_QUESTION} clickDialogYes={() => deleteRegisterStream()} />
            </PageCard>
        )
    }

export default MovieEditView
function timeNoSecondsToString(value: Date) {
    const hour = value.getHours()
    const hourStr = (hour >= 0 && hour <= 9) ? `0${hour}` : hour
    const minutes = value.getMinutes()
    const minutesStr = (minutes >= 0 && minutes <= 9) ? `0${minutes}` : minutes
    return `${hourStr}:${minutesStr}`
}

function dateToString(value: Date) {
    const yearStr = value.getFullYear()
    const month = value.getMonth() + 1
    const monthStr = (month >= 1 && month <= 9) ? `0${month}` : month
    const day = value.getDate()
    const dayStr = (day >= 1 && day <= 9) ? `0${day}` : day
    return `${yearStr}-${monthStr}-${dayStr}`
}

function stringEUAToArrayDateBRAndTime(
    value: string, isYear = true, isMonth = true, isDay = true, isHour = true, isMinutes = true, isSeconds = true) {
    const year = value.substring(0, 4)
    const month = value.substring(5, 7)
    const day = value.substring(8, 10)
    const hour = value.substring(11, 13)
    const minutes = value.substring(14, 16)
    const seconds = value.substring(17, 19)
    const dateStr = `${isDay ? day : ""}${isMonth ? `/${month}` : ""}${isYear ? `/${year}` : ""}`
    const hourStr = `${isHour ? hour : ""}${isMinutes ? `:${minutes}` : ""}${isSeconds ? `:${seconds}` : ""}`
    return [dateStr, hourStr]
}

function stringEUAToArrayDateBRAndTimeNoSeconds(
    value: string, isYear = true, isMonth = true, isDay = true, isHour = true, isMinutes = true) {
    const year = value.substring(0, 4)
    const month = value.substring(5, 7)
    const day = value.substring(8, 10)
    const hour = value.substring(11, 13)
    const minutes = value.substring(14, 16)
    const dateStr = `${isDay ? day : ""}${isMonth ? `/${month}` : ""}${isYear ? `/${year}` : ""}`
    const hourStr = `${isHour ? hour : ""}${isMinutes ? `:${minutes}` : ""}`
    return [dateStr, hourStr]
}

function dateTimeNoSecondsToString(value: Date) {
    const yearStr = value.getFullYear()
    const month = value.getMonth() + 1
    const monthStr = (month >= 1 && month <= 9) ? `0${month}` : month
    const day = value.getDate()
    const dayStr = (day >= 1 && day <= 9) ? `0${day}` : day
    const hours = value.getHours()
    const hoursStr = (hours >= 0 && hours <= 9) ? `0${hours}` : hours
    const minutes = value.getMinutes()
    const minutesStr = (minutes >= 0 && minutes <= 9) ? `0${minutes}` : minutes
    return `${dayStr}/${monthStr}/${yearStr} ${hoursStr}:${minutesStr}`
}

function stringToDateTime(value: string) {
    const year = Number(value.substring(0, 4))
    const month = Number(value.substring(5, 7)) - 1
    const day = Number(value.substring(8, 10))
    const hour = Number(value.substring(11, 13))
    const minutes = Number(value.substring(14, 16))
    const seconds = Number(value.substring(17, 19))
    return new Date(year, month, day, hour, minutes, seconds)
}

function stringToDate(value: string) {
    const year = Number(value.substring(0, 4))
    const month = Number(value.substring(5, 7)) - 1
    const day = Number(value.substring(8, 10))
    return new Date(year, month, day)
}

function stringEUAToStringBR(value: string) {
    const year = value.substring(0, 4)
    const month = value.substring(5, 7)
    const day = value.substring(8, 10)
    return `${day}/${month}/${year}`
}

function stringDateTimeEUAToStringDateTimeBRNotSeconds(value: string) {
    const year = value.substring(0, 4)
    const month = value.substring(5, 7)
    const day = value.substring(8, 10)
    const hour = value.substring(11, 13)
    const minutes = value.substring(14, 16)
    return `${day}/${month}/${year} ${hour}:${minutes}`
}

function isVerifyLeapYear(value: number) {
    if (value !== 400 && (value % 100) === 0) {
        return false
    }
    return (value % 4) === 0
}

function totalDayInMonthAndYear(value: string) {
    const month = parseInt(value.substring(0, 2), 10)
    const year = parseInt(value.substring(3, 7), 10)
    if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
        return 31
    }
    if (month === 4 || month === 6 || month === 9 || month === 11) {
        return 30
    }
    if (month === 2) {
        return isVerifyLeapYear(year) ? 29 : 28
    }
    return 0
}

const ConvertDate = function (value: string | Date | number, typeReturn: string) {
    if (typeReturn === "stringEuaToDate" && typeof value === "string") {
        return stringToDate(value)
    }
    if (typeReturn === "stringToDateTime" && typeof value === "string") {
        return stringToDateTime(value)
    }
    if (typeReturn === "dateTimeNoSecondsToStringBR" && typeof value === "object") {
        return dateTimeNoSecondsToString(value)
    }
    if (typeReturn === "stringEUAToArrayDateBRAndTime" && typeof value === "string") {
        return stringEUAToArrayDateBRAndTime(value)
    }
    if (typeReturn === "stringEUAToArrayDateBRAndTimeNoSeconds" && typeof value === "string") {
        return stringEUAToArrayDateBRAndTimeNoSeconds(value)
    }
    if (typeReturn === "dateToString" && typeof value === "object") {
        return dateToString(value)
    }
    if (typeReturn === "timeNoSecondsToString" && typeof value === "object") {
        return timeNoSecondsToString(value)
    }
    if (typeReturn === "stringEUAToStringBR" && typeof value === "string") {
        return stringEUAToStringBR(value)
    }
    if (typeReturn === "stringDateTimeEUAToStringDateTimeBRNotSeconds" && typeof value === "string") {
        return stringDateTimeEUAToStringDateTimeBRNotSeconds(value)
    }
    if (typeReturn === "totalDayInMonthAndYear" && typeof value === "string") {
        return totalDayInMonthAndYear(value)
    }
    if (typeReturn === "isVerifyLeapYear" && typeof value === "number") {
        return isVerifyLeapYear(value)
    }
    return value
}

export default ConvertDate
import { DateTime } from 'luxon'

export const getCurrentDate = () => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')
  const formattedDate = `${year}-${month}-${day}`
  console.log(formattedDate)
  return formattedDate
}

export const getCurrentoDateInISO = () => {
  const currentDateISO = DateTime.local().toISO()
  return currentDateISO
}

export const getFormattedDateFromISO = (isoString, format = 'dd-MM-yy') => {
  const date = DateTime.fromISO(isoString)
  if (date.isValid) {
    return date.toFormat(format)
  }
  return ''
}

export const getDateObject = (date, format = 'dd-MM-yy') => {
  const dateTime = DateTime.fromFormat(date, format)
  if (dateTime.isValid) {
    const day = dateTime.day
    const month = dateTime.month
    const monthName = dateTime.toFormat('MMMM')
    return {
      day,
      monthName,
      month
    }
  }
  return {
    day: 0,
    monthName: 'zzz',
    month: -1
  }
}

export const getDateInISO = (date, format) => {
  const dateTime = DateTime.fromFormat(date, format)
  return dateTime.toISO()
}

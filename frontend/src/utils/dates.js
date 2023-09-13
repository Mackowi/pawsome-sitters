import { DateTime } from 'luxon'

const formatDate = (date) => {
  const luxonDate = DateTime.fromJSDate(new Date(date))
  return luxonDate.toFormat('dd.MM.yyyy')
}

const formatDates = (dates) => {
  if (Array.isArray(dates) && dates.length === 2) {
    const [startDate, endDate] = dates
    const formattedStartDate = formatDate(startDate)
    const formattedEndDate = formatDate(endDate)
    if (formattedStartDate === formattedEndDate) {
      return `${formattedStartDate}`
    }
    return `${formattedStartDate} - ${formattedEndDate}`
  } else if (dates instanceof Date) {
    return formatDate(dates)
  } else {
    return 'Invalid date format'
  }
}

const formatDatesDb = (startTime, endTime, date) => {
  if (Array.isArray(date) && date.length === 2) {
    const [startDate, endDate] = date
    const formattedStartDate = formatDate(startDate)
    const formattedEndDate = formatDate(endDate)
    const formattedStartDateHour = combineDateTime(
      startTime,
      formattedStartDate
    )
    const formattedEndDateHour = combineDateTime(endTime, formattedEndDate)
    return { formattedStartDateHour, formattedEndDateHour }
  } else if (date instanceof Date) {
    return formatDate(date)
  } else {
    return 'Invalid date format'
  }
}

const combineDateTime = (timeString, dateString) => {
  const time = DateTime.fromFormat(timeString, 'HH:mm')
  const date = DateTime.fromFormat(dateString, 'dd.MM.yyyy')

  const combinedDateTime = date.set({
    hour: time.hour,
    minute: time.minute,
  })

  return combinedDateTime.toString()
}

export { formatDate, formatDates, formatDatesDb }

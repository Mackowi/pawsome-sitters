import { DateTime } from 'luxon'

const formatDate = (date) => {
  const luxonDate = DateTime.fromJSDate(new Date(date))
  return luxonDate.toFormat('dd.MM.yyyy')
}

const formatDatesToDisplay = (dates) => {
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

const processDates = (startTime, endTime, dates, reccuring) => {
  const combinedDatesTimes = []
  if (Array.isArray(dates) && dates.length === 2) {
    const [startDate, endDate] = dates
    const startDateString = formatDate(startDate)
    const endDateString = formatDate(endDate)
    if (startDateString === endDateString) {
      const combinedStartDateTime = combineDateTime(startTime, startDateString)
      const combinedEndDateTime = combineDateTime(endTime, endDateString)
      combinedDatesTimes.push({
        startDate: combinedStartDateTime,
        endDate: combinedEndDateTime,
      })
      return combinedDatesTimes
    }
    if (reccuring) {
      const dates = getDatesBetween(startDateString, endDateString)
      dates.forEach((date) => {
        const combinedStartDateTime = combineDateTime(startTime, date)
        const combinedEndDateTime = combineDateTime(endTime, date)
        combinedDatesTimes.push({
          startDate: combinedStartDateTime,
          endDate: combinedEndDateTime,
        })
      })
    } else {
      const combinedStartDateTime = combineDateTime(startTime, startDateString)
      const combinedEndDateTime = combineDateTime(endTime, endDateString)
      combinedDatesTimes.push({
        startDate: combinedStartDateTime,
        endDate: combinedEndDateTime,
      })
    }
  } else if (dates instanceof Date) {
    const date = formatDate(dates)
    const combinedStartDateTime = combineDateTime(startTime, date)
    const combinedEndDateTime = combineDateTime(endTime, date)
    combinedDatesTimes.push({
      startDate: combinedStartDateTime,
      endDate: combinedEndDateTime,
    })
  }
  return combinedDatesTimes
}

const isOverlapping = (datesInDB, datesToCheck) => {
  for (const dateToCheck of datesToCheck) {
    const proposedStartDate = DateTime.fromISO(dateToCheck.startDate)
    const proposedEndDate = DateTime.fromISO(dateToCheck.endDate)

    for (const dateInDB of datesInDB) {
      const startDate = DateTime.fromISO(dateInDB.startDate)
      const endDate = DateTime.fromISO(dateInDB.endDate)

      if (
        (proposedStartDate <= endDate && proposedEndDate >= startDate) ||
        proposedStartDate.equals(endDate) ||
        proposedEndDate.equals(startDate)
      ) {
        if (
          !proposedStartDate.equals(endDate) &&
          !proposedEndDate.equals(startDate)
        ) {
          return true
        }
      }
    }
  }

  return false
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

const getDatesBetween = (startDateString, endDateString) => {
  const startDate = DateTime.fromFormat(startDateString, 'dd.MM.yyyy')
  const endDate = DateTime.fromFormat(endDateString, 'dd.MM.yyyy')

  const datesArray = []
  let currentDate = startDate

  while (currentDate <= endDate) {
    datesArray.push(currentDate.toFormat('dd.MM.yyyy'))
    currentDate = currentDate.plus({ days: 1 })
  }

  return datesArray
}

const reccuranceHelper = (dates) => {
  if (Array.isArray(dates) && dates.length === 2) {
    const [startDate, endDate] = dates
    const formattedStartDate = formatDate(startDate)
    const formattedEndDate = formatDate(endDate)
    if (formattedStartDate === formattedEndDate) {
      return false
    } else {
      return true
    }
  } else if (dates instanceof Date) {
    return false
  }
}

const correctStartDateTime = (startTime, date) => {
  const now = DateTime.local()
  if (Array.isArray(date) && date.length === 2) {
    const formattedDate = formatDate(date[0])
    const providedDateTime = DateTime.fromFormat(
      formattedDate,
      'dd.MM.yyyy'
    ).set({
      hour: parseInt(startTime.split(':')[0], 10),
      minute: parseInt(startTime.split(':')[1], 10),
    })
    if (providedDateTime < now) {
      return false
    }
  } else {
    const formattedDate = formatDate(date)
    const providedDateTime = DateTime.fromFormat(
      formattedDate,
      'dd.MM.yyyy'
    ).set({
      hour: parseInt(startTime.split(':')[0], 10),
      minute: parseInt(startTime.split(':')[1], 10),
    })
    if (providedDateTime < now) {
      console.log('incorrect')
      return false
    }
  }
  console.log('correct')
  return true
}

export {
  formatDatesToDisplay,
  processDates,
  isOverlapping,
  reccuranceHelper,
  correctStartDateTime,
}

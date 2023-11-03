import { DateTime, Interval } from 'luxon'

const timeMarks = {
  0: '0:00',
  8: '2:00',
  16: '4:00',
  24: '6:00',
  32: '8:00',
  40: '10:00',
  48: '12:00',
  56: '14:00',
  64: '16:00',
  72: '18:00',
  80: '20:00',
  88: '22:00',
  96: '24:00',
}

const getCurrentHour = (difference = 0) => {
  const now = DateTime.local()
  const startTime = now.plus({ hours: 1 + difference })
  return `${startTime.hour}:00`
}

const calculateHourFromKey = (key) => {
  const minutesInAnHour = 60
  const stepsInAnHour = minutesInAnHour / 15
  const hour = Math.floor(key / stepsInAnHour)
  const minute = (key % stepsInAnHour) * 15

  const formattedHour = hour.toString().padStart(2, '0')
  const formattedMinute = minute.toString().padStart(2, '0')

  return `${formattedHour}:${formattedMinute}`
}

const calculateValuesForHours = (hours) => {
  const values = {}
  const hoursPerValue = 96 / 24
  for (let i = 0; i < 24; i++) {
    const key = i * hoursPerValue
    const hour = i < 10 ? `0${i}` : `${i}`
    values[`${hour}:00`] = key
  }
  const result = hours.map((hour) => values[hour])
  return result
}

const calculateTimeLeft = (serviceStartTime) => {
  const now = DateTime.local()
  const startTime = DateTime.fromISO(serviceStartTime)
  const interval = Interval.fromDateTimes(now, startTime)

  if (interval.invalid) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  }

  const { days, hours, minutes, seconds } = interval
    .toDuration(['days', 'hours', 'minutes', 'seconds'])
    .toObject()

  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  }
}

const formatTimeLeft = (time) => {
  const { hours, minutes, seconds } = time
  const roundedSeconds = Math.floor(seconds)
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${roundedSeconds.toString().padStart(2, '0')}`
}

export {
  timeMarks,
  getCurrentHour,
  calculateHourFromKey,
  calculateValuesForHours,
  calculateTimeLeft,
  formatTimeLeft,
}

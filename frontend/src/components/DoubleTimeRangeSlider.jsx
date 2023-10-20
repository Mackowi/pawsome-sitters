import Slider from 'rc-slider'
import '../assets/styles/slider.css'
import { useState } from 'react'

const DoubleTimeRangeSlider = ({ setStartTime, setEndTime }) => {
  const style = { maxWidth: `600px`, marginLeft: 'auto', marginRight: 'auto' }
  const marksBig = {
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

  const [time, setTime] = useState([`12:00`, '14:00'])

  const calculateTimePeriod = (type, value) => {
    if (type === 'start') {
      const startHour = calculateHourFromKey(value)
      setStartTime(startHour)
      setTime([startHour, time[1]])
    } else {
      const endHour = calculateHourFromKey(value)
      setEndTime(endHour)
      setTime([time[0], endHour])
    }
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

  return (
    <div style={style} className='d-flex flex-column'>
      <div className='mb-5 mt-2'>
        <p>Starting time of service</p>
        <Slider
          range
          min={0}
          max={96}
          step={1}
          marks={marksBig}
          onChange={(newValue) => calculateTimePeriod('start', newValue)}
          defaultValue={[48]}
          included={false}
        />
      </div>
      <div className='mb-4'>
        <p>Ending time of service</p>
        <Slider
          range
          min={0}
          max={96}
          step={1}
          marks={marksBig}
          onChange={(newValue) => calculateTimePeriod('end', newValue)}
          defaultValue={[56]}
          included={false}
        />
      </div>
      <p className='text-center fw-bold border-bottom mx-auto border-primary border-2 mt-5'>{`${time[0]} - ${time[1]}`}</p>
    </div>
  )
}

export default DoubleTimeRangeSlider

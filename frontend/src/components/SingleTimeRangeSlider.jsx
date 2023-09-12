import Slider from 'rc-slider'
import '../assets/styles/slider.css'
import { useState } from 'react'

const SingleTimeRangeSlider = ({
  handleStartTimeChange,
  handleEndTimeChange,
}) => {
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

  const calculateTimePeriod = (value) => {
    const startHour = calculateHourFromKey(value[0])
    const endHour = calculateHourFromKey(value[1])
    handleStartTimeChange(startHour)
    handleEndTimeChange(endHour)
    setTime([startHour, endHour])
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
      <p className='text-center fw-bold border-bottom mx-auto mb-5 border-primary'>{`${time[0]} - ${time[1]}`}</p>
      <Slider
        range
        min={0}
        max={96}
        step={1}
        marks={marksBig}
        onChange={calculateTimePeriod}
        defaultValue={[48, 56]}
      />
    </div>
  )
}

export default SingleTimeRangeSlider

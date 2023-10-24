import Slider from 'rc-slider'
import '../../assets/styles/slider.css'
import { useState } from 'react'
import {
  timeMarks,
  getCurrentHour,
  calculateHourFromKey,
  calculateValuesForHours,
} from '../../utils/time'

const SingleTimeRangeSlider = ({ setStartTime, setEndTime }) => {
  const style = { maxWidth: `600px`, marginLeft: 'auto', marginRight: 'auto' }

  const [time, setTime] = useState([getCurrentHour(), getCurrentHour(2)])

  const calculateTimePeriod = (value) => {
    const startHour = calculateHourFromKey(value[0])
    const endHour = calculateHourFromKey(value[1])
    setStartTime(startHour)
    setEndTime(endHour)
    setTime([startHour, endHour])
  }

  return (
    <div style={style} className='d-flex flex-column'>
      <div className='mb-4 mt-4'>
        <p>Starting and ending time of service</p>
        <Slider
          range
          min={0}
          max={96}
          step={1}
          marks={timeMarks}
          onChange={calculateTimePeriod}
          defaultValue={calculateValuesForHours(time)}
        />
      </div>
      <p className='text-center fw-bold border-bottom mx-auto mt-5 border-primary'>{`${time[0]} - ${time[1]}`}</p>
    </div>
  )
}

export default SingleTimeRangeSlider

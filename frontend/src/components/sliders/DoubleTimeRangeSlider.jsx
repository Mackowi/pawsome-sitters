import Slider from 'rc-slider'
import '../../assets/styles/slider.css'
import { useState } from 'react'
import {
  timeMarks,
  getCurrentHour,
  calculateHourFromKey,
  calculateValuesForHours,
} from '../../utils/time'

const DoubleTimeRangeSlider = ({ setStartTime, setEndTime }) => {
  const style = { maxWidth: `600px`, marginLeft: 'auto', marginRight: 'auto' }

  const [time, setTime] = useState([getCurrentHour(), getCurrentHour(2)])

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

  return (
    <div style={style} className='d-flex flex-column'>
      <div className='mb-5 mt-2'>
        <p>Starting time of service</p>
        <Slider
          range
          min={0}
          max={96}
          step={1}
          marks={timeMarks}
          onChange={(newValue) => calculateTimePeriod('start', newValue)}
          defaultValue={calculateValuesForHours(time)[0]}
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
          marks={timeMarks}
          onChange={(newValue) => calculateTimePeriod('end', newValue)}
          defaultValue={calculateValuesForHours(time)[1]}
          included={false}
        />
      </div>
      <p className='text-center fw-bold border-bottom mx-auto border-primary border-2 mt-5'>{`${time[0]} - ${time[1]}`}</p>
    </div>
  )
}

export default DoubleTimeRangeSlider

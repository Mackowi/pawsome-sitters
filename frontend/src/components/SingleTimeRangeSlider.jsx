import Slider from 'rc-slider'
import '../assets/styles/slider.css'

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
  const marksSmall = {
    0: '0:00',
    12: ' ',
    24: '6:00',
    36: ' ',
    48: '12:00',
    60: ' ',
    72: '18:00',
    84: ' ',
    96: '24:00',
  }

  const calculateTimePeriod = (value) => {
    const startHour = calculateHourFromKey(value[0])
    const endHour = calculateHourFromKey(value[1])
    handleStartTimeChange(startHour)
    handleEndTimeChange(endHour)
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
    <div style={style}>
      <p>Single</p>
      <Slider
        range
        min={0}
        max={96}
        step={1}
        marks={marksSmall}
        onChange={calculateTimePeriod}
        defaultValue={[48, 56]}
      />
    </div>
  )
}

export default SingleTimeRangeSlider

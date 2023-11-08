import { useState, useEffect } from 'react'
import { calculateTimeLeft, formatTimeLeft } from '../../utils/time'

function CountdownTimer({ serviceStartTime }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(serviceStartTime))
    }, 1000)

    return () => clearInterval(timer)
  }, [serviceStartTime])

  return (
    <span className='ms-1 text-decoration-underline fw-bold text-primary'>
      {formatTimeLeft(timeLeft)}
    </span>
  )
}

export default CountdownTimer

import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

function Rating({ value, text }) {
  return (
    <div className='rating'>
      <span>
        {value >= 1 ? (
          <FaStar fill='#CF6320' />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt fill='#CF6320' />
        ) : (
          <FaRegStar fill='#CF6320' />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <FaStar fill='#CF6320' />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt fill='#CF6320' />
        ) : (
          <FaRegStar fill='#CF6320' />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <FaStar fill='#CF6320' />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt fill='#CF6320' />
        ) : (
          <FaRegStar fill='#CF6320' />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <FaStar fill='#CF6320' />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt fill='#CF6320' />
        ) : (
          <FaRegStar fill='#CF6320' />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <FaStar fill='#CF6320' />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt fill='#CF6320' />
        ) : (
          <FaRegStar fill='#CF6320' />
        )}
      </span>
      <span className='d-block'>{text && text}</span>
    </div>
  )
}
export default Rating

import { FaStar, FaRegStar } from 'react-icons/fa'
import { useState } from 'react'

function Rating() {
  const [hoverRating, setHoverRating] = useState(0)
  const [rating, setRating] = useState(0)

  const handleMouse = (starNr, e) => {
    if (e.type === 'mouseenter') {
      setHoverRating(starNr)
    } else {
      setHoverRating(0)
    }
  }

  return (
    <div className='rating my-3'>
      {[1, 2, 3, 4, 5].map((starNr) => (
        <span
          key={starNr}
          onMouseEnter={(e) => handleMouse(starNr, e)}
          onMouseLeave={(e) => handleMouse(starNr, e)}
          onClick={() => setRating(starNr)}
        >
          {hoverRating > rating ? (
            hoverRating >= starNr ? (
              <FaStar size={40} fill='#CF6320' />
            ) : (
              <FaRegStar size={40} fill='#CF6320' />
            )
          ) : hoverRating > 0 ? (
            hoverRating >= starNr ? (
              <FaStar size={40} fill='#CF6320' />
            ) : (
              <FaRegStar size={40} fill='#CF6320' />
            )
          ) : rating >= starNr ? (
            <FaStar size={40} fill='#CF6320' />
          ) : (
            <FaRegStar size={40} fill='#CF6320' />
          )}
        </span>
      ))}
    </div>
  )
}
export default Rating

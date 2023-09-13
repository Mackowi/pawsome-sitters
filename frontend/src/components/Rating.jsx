import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa'
import { useState } from 'react'

function Rating({ view, avgRating }) {
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
    <div>
      {view === true ? (
        <div className='rating'>
          <span>
            {avgRating >= 1 ? (
              <FaStar size={35} fill='#CF6320' />
            ) : avgRating >= 0.5 ? (
              <FaStarHalfAlt size={35} fill='#CF6320' />
            ) : (
              <FaRegStar size={35} fill='#CF6320' />
            )}
          </span>
          <span>
            {avgRating >= 2 ? (
              <FaStar size={35} fill='#CF6320' />
            ) : avgRating >= 1.5 ? (
              <FaStarHalfAlt size={35} fill='#CF6320' />
            ) : (
              <FaRegStar size={35} fill='#CF6320' />
            )}
          </span>
          <span>
            {avgRating >= 3 ? (
              <FaStar size={35} fill='#CF6320' />
            ) : avgRating >= 2.5 ? (
              <FaStarHalfAlt size={35} fill='#CF6320' />
            ) : (
              <FaRegStar size={35} fill='#CF6320' />
            )}
          </span>
          <span>
            {avgRating >= 4 ? (
              <FaStar size={35} fill='#CF6320' />
            ) : avgRating >= 3.5 ? (
              <FaStarHalfAlt size={35} fill='#CF6320' />
            ) : (
              <FaRegStar size={35} fill='#CF6320' />
            )}
          </span>
          <span>
            {avgRating >= 5 ? (
              <FaStar size={35} fill='#CF6320' />
            ) : avgRating >= 4.5 ? (
              <FaStarHalfAlt size={35} fill='#CF6320' />
            ) : (
              <FaRegStar size={35} fill='#CF6320' />
            )}
          </span>
        </div>
      ) : (
        <div className='rating'>
          {[1, 2, 3, 4, 5].map((starNr) => (
            <span
              key={starNr}
              onMouseEnter={(e) => handleMouse(starNr, e)}
              onMouseLeave={(e) => handleMouse(starNr, e)}
              onClick={() => setRating(starNr)}
            >
              {hoverRating > rating ? (
                hoverRating >= starNr ? (
                  <FaStar size={35} fill='#CF6320' />
                ) : (
                  <FaRegStar size={35} fill='#CF6320' />
                )
              ) : hoverRating > 0 ? (
                hoverRating >= starNr ? (
                  <FaStar size={35} fill='#CF6320' />
                ) : (
                  <FaRegStar size={35} fill='#CF6320' />
                )
              ) : rating >= starNr ? (
                <FaStar size={35} fill='#CF6320' />
              ) : (
                <FaRegStar size={35} fill='#CF6320' />
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
export default Rating

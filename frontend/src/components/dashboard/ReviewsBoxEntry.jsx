import { useGetPetOwnerQuery } from '../../slices/petOwnersApiSlice'
import { formatDateToDisplay } from '../../utils/date'
import Loader from '../Loader'
import Rating from '../../components/Rating'

function ReviewsBoxEntry({ review }) {
  const { data: petOwner, isLoading } = useGetPetOwnerQuery(review.petOwner)

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <a href='#' className='list-group-item list-group-item-action'>
            <div className='d-flex flex-column'>
              <div className='d-flex w-100 justify-content-between'>
                <div className='d-flex flex-column align-items-center'>
                  <span>From:</span>
                  <span>{`${petOwner.firstName} ${petOwner.lastName}`}</span>
                </div>
                <div className='d-flex flex-column align-items-center'>
                  <small>Received:</small>
                  <small>{`${formatDateToDisplay(review.createdAt)}`}</small>
                </div>
              </div>
              <div className='d-flex flex-column justify-content-around align-items-center my-1'>
                <p className='fw-bold mb-1'>"{review.description}"</p>
                <Rating view={true} avgRating={review.rating} />
              </div>
            </div>
          </a>
        </div>
      )}
    </>
  )
}
export default ReviewsBoxEntry

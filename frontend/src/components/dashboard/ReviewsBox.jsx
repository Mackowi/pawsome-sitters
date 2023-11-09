import { Card, Row, Col } from 'react-bootstrap'
import { FaAddressCard } from 'react-icons/fa6'
import { useGetPatronReviewsQuery } from '../../slices/reviewsApiSlice'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Loader from '../Loader'
import ReviewsBoxEntry from './ReviewsBoxEntry'

function ReviewsBox() {
  const { patronInfo } = useSelector((state) => state.patron)

  const { data: reviews, isLoading } = useGetPatronReviewsQuery(patronInfo._id)

  useEffect(() => {
    if (reviews) {
      reviews.forEach((review) => {})
    }
  }, [reviews, isLoading])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Card className='p-3 border-primary border-3 message-box text-center bg-primary-light'>
          <h2 className='pb-1 text-primary fw-bold'>
            <FaAddressCard className='mb-1' /> Your Reviews
          </h2>
          <Row className='text-start d-flex justify-content-center mb-1 '>
            <Col>
              <div className='list-group message-box-list border border-primary'>
                {reviews.map((review, index) => (
                  <ReviewsBoxEntry key={index} review={review} />
                ))}
              </div>
            </Col>
          </Row>
        </Card>
      )}
    </>
  )
}
export default ReviewsBox

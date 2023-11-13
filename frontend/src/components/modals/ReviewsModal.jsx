import { Card, Row, Col } from 'react-bootstrap'
import { useGetPatronReviewsQuery } from '../../slices/reviewsApiSlice'
import Loader from '../Loader'
import ReviewsBoxEntry from '../dashboard/ReviewsBoxEntry'

import { Modal, Button } from 'react-bootstrap'

function ReviewsModal({ showReviewsModal, setShowReviewsModal, reviews }) {
  return (
    <Modal
      show={showReviewsModal}
      onHide={() => setShowReviewsModal(false)}
      centered
      size='xl'
    >
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className='d-flex justify-content-center'>
          <Col>
            <div className='list-group message-box-list '>
              {reviews.map((review, index) => (
                <ReviewsBoxEntry key={index} review={review} />
              ))}
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='btn btn-outline-primary'
          onClick={() => setShowReviewsModal(false)}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ReviewsModal

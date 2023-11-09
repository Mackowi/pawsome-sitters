import { Row, Col, Card, Form, Button, Badge } from 'react-bootstrap'
import { FaHistory } from 'react-icons/fa'
import Rating from './Rating'
import { useState } from 'react'
import { useGetPetOwnerServiceRequestsQuery } from '../../slices/petOwnersApiSlice'
import { useCreateReviewMutation } from '../../slices/reviewsApiSlice'
import { useSelector } from 'react-redux'
import { formatDateTimeToDisplay } from '../../utils/date'
import ConfirmReviewModal from '../modals/ConfirmReviewModal'
import { useFormik } from 'formik'
import { reviewSchema } from '../../validationSchemas'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'

function HistoryBox() {
  const { petOwnerInfo } = useSelector((state) => state.petOwner)

  const { data: petOwnerServiceRequests, refetch } =
    useGetPetOwnerServiceRequestsQuery(petOwnerInfo._id)
  const [createReview, { isLoading }] = useCreateReviewMutation()

  const [selectedService, setSelectedService] = useState(null)
  const [rating, setRating] = useState(0)

  const [showConfirmReviewModal, setShowConfirmReviewModal] = useState(false)
  const openConfirmReviewModal = () => setShowConfirmReviewModal(true)
  const closeConfirmReviewModal = () => setShowConfirmReviewModal(false)

  const submitHandler = async () => {
    if (!rating) {
      toast.error('Please select rating by clicking on the star symbols.')
      return
    }
    try {
      const service = petOwnerServiceRequests.find(
        (req) => req._id === selectedService
      )
      const reviewData = {
        patron: service.patron,
        petOwner: service.petOwner,
        serviceRequest: service._id,
        description: values.description,
        rating: rating,
      }
      await createReview(reviewData).unwrap()
      refetch()
      values.description = ''
      setRating(0)
      setSelectedService(null)
      closeConfirmReviewModal()
      toast.success('Review added')
    } catch (error) {
      toast.error(error?.data?.message || error?.error)
    }
  }

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      description: '',
    },
    validationSchema: reviewSchema,
    onSubmit: submitHandler,
  })

  if (petOwnerServiceRequests) {
    const servicesToReview = petOwnerServiceRequests.filter(
      (service) => !service.reviewed
    )
    if (!servicesToReview.length) {
      return <></>
    }
  }

  return (
    <>
      <Card className='my-2 p-3 bg-primary-light history-box border-primary border-3'>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h2 className='pb-1 text-primary fw-bold text-center'>
              <FaHistory className='mb-1' /> Past Services To Review
            </h2>
            <Row>
              <Col md={5} className='mb-2 mb-md-0'>
                <div className='list-group history-box-list'>
                  {petOwnerServiceRequests &&
                    petOwnerServiceRequests
                      // show only not reviewed services
                      .filter((service) => !service.reviewed)
                      .map((service, index) => (
                        <div
                          className={`list-group-item list-group-item-action ${
                            selectedService === service._id &&
                            'border border-primary border-3'
                          }`}
                          key={index}
                          onClick={() => {
                            setSelectedService(service._id)
                          }}
                        >
                          <div className='d-flex w-100 justify-content-between'>
                            <h5 className='mb-1 fw-bold'>{service.service}</h5>
                            <small>
                              {service.pets.map((pet) => (
                                <Badge bg='primary' key={pet} className='mx-1'>
                                  {pet}
                                </Badge>
                              ))}
                            </small>
                          </div>
                          <p className='mb-1 text-center'>
                            {formatDateTimeToDisplay(service.startDate)}
                            {' - '}
                            {formatDateTimeToDisplay(service.endDate)}
                          </p>
                        </div>
                      ))}
                </div>
              </Col>
              <Col
                md={7}
                className='d-flex flex-column justify-content-between'
              >
                <Row className='mb-2 mb-md-0'>
                  <Form noValidate onSubmit={handleSubmit} autoComplete='off'>
                    <Form.Group controlId='description'>
                      <Form.Label>
                        Tell us more about your experience, share your ideas for
                        future services.
                      </Form.Label>
                      <Form.Control
                        as='textarea'
                        rows={6}
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.description && !!errors.description}
                      ></Form.Control>
                      <Form.Control.Feedback type='invalid'>
                        {errors.description}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form>
                </Row>
                <Row className='mx-auto mb-2 mb-md-0'>
                  <Rating rating={rating} setRating={setRating} />
                </Row>
                <Row className='w-50 mx-auto '>
                  <Button
                    onClick={openConfirmReviewModal}
                    disabled={isSubmitting}
                  >
                    Submit Review
                  </Button>
                </Row>
              </Col>
            </Row>
          </>
        )}
      </Card>
      <ConfirmReviewModal
        showConfirmReviewModal={showConfirmReviewModal}
        closeConfirmReviewModal={closeConfirmReviewModal}
        submitHandler={submitHandler}
      />
    </>
  )
}
export default HistoryBox

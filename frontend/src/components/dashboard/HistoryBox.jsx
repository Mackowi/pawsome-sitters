import { Row, Col, Card, Form, Button, Badge } from 'react-bootstrap'
import { FaHistory } from 'react-icons/fa'
import Rating from './Rating'
import { useState } from 'react'
import { useGetPetOwnerServiceRequestsQuery } from '../../slices/petOwnersApiSlice'
import { useSelector } from 'react-redux'
import { formatDateTimeToDisplay } from '../../utils/date'

function HistoryBox() {
  const { petOwnerInfo } = useSelector((state) => state.petOwner)

  const { data: petOwnerServiceRequests, refetch } =
    useGetPetOwnerServiceRequestsQuery(petOwnerInfo._id)

  const [selectedService, setSelectedService] = useState(null)

  return (
    <Card className='my-2 p-3 bg-primary-light history-box border-primary border-3'>
      <h2 className='pb-1 text-primary fw-bold text-center'>
        <FaHistory className='mb-1' /> Past Services To Review
      </h2>
      <Row>
        <Col md={5} className='mb-2 mb-md-0'>
          <div className='list-group history-box-list'>
            {petOwnerServiceRequests &&
              petOwnerServiceRequests
                // show only not reviewed services
                .filter((service) => service.reviewed)
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
                          <Badge bg='primary' key={pet}>
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
        <Col md={7} className='d-flex flex-column justify-content-between'>
          <Row className='mb-2 mb-md-0'>
            <Form.Group controlId='description'>
              <Form.Label>
                Tell us more about your experience, share your ideas for future
                services.
              </Form.Label>
              <Form.Control as='textarea' rows={6}></Form.Control>
              <Form.Control.Feedback type='invalid'></Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className='mx-auto mb-2 mb-md-0'>
            <Rating />
          </Row>
          <Row className='w-50 mx-auto '>
            <Button>Submit Review</Button>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}
export default HistoryBox

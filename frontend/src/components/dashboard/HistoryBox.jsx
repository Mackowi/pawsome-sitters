import { Row, Col, Card, Form, Button } from 'react-bootstrap'
import { FaHistory } from 'react-icons/fa'
import Rating from './Rating'

function HistoryBox() {
  const services = [
    {
      fullName: 'Joe Smith',
      serivce: 'sitting',
      date: '3.02.2023',
    },
    {
      fullName: 'Alice Johnson',
      serivce: 'sitting, walking',
      date: '12.03.2023',
    },
    {
      fullName: 'Bob Anderson',
      serivce: 'sitting',
      date: '16.06.2023',
    },
    {
      fullName: 'Emily Davis',
      serivce: 'sitting, walking',
      date: '6.02.2023',
    },
    {
      fullName: 'Alex Wilson',
      serivce: 'sitting',
      date: '3.02.2023',
    },
    {
      fullName: 'Alice Johnson',
      serivce: 'daycare',
      date: '26.05.2023',
    },
    {
      fullName: 'Bob Anderson',
      serivce: 'daycare',
      date: '1.06.2023',
    },
    {
      fullName: 'Emily Davis',
      serivce: 'sitting, walking',
      date: '23.03.2023',
    },
    {
      fullName: 'Alex Wilson',
      serivce: 'walking',
      date: '13.01.2023',
    },
  ]

  return (
    <Card className='my-2 p-3 bg-secondary-light history-box border-primary border-2'>
      <h2 className='pb-1 text-primary fw-bold text-center'>
        <FaHistory /> Past Services
      </h2>
      <Row>
        <Col md={5} className='mb-2 mb-md-0'>
          <div className='list-group history-box-list'>
            {services.map((service, index) => (
              <div key={index}>
                <div className='list-group-item list-group-item-action '>
                  <div className='d-flex w-100 justify-content-between'>
                    <h5 className='mb-1'>{service.fullName}</h5>
                    <small>{service.date}</small>
                  </div>
                  <p className='mb-1'>{service.serivce}</p>
                </div>
              </div>
            ))}
          </div>
        </Col>
        <Col md={7} className='d-flex flex-column justify-content-between'>
          <Row className='mb-2 mb-md-0'>
            <Form.Group controlId='description'>
              <Form.Label>Tell us more about your experience</Form.Label>
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

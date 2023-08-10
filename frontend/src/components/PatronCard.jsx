import { Card, Button, Col, Row } from 'react-bootstrap'
import Rating from './Rating'

function PatronCard({ patron }) {
  return (
    <Card bg='secondary-light mb-3'>
      <Card.Body>
        <Row className='d-flex align-items-center'>
          <Col>
            <Card.Img
              variant='top'
              src={patron.image}
              style={{ width: '100px', height: '100px' }}
              className='rounded-circle shadow mb-3'
            />
            <Card.Title className='text-primary'>
              <strong>{patron.name}</strong>
            </Card.Title>
          </Col>
          <Col>
            <Card.Text className='mb-1'>{patron.description}</Card.Text>
            <Card.Text className='mb-1'>{patron.location}</Card.Text>
            <Card.Text as='div' className='mb-1'>
              <Rating value={patron.rating}></Rating>
            </Card.Text>
            <Button variant='primary'>Check</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}
export default PatronCard

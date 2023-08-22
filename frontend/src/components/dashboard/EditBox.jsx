import { Card, Row, Col, Button } from 'react-bootstrap'
import { FaDog, FaUserEdit, FaFileAlt } from 'react-icons/fa'

function EditBox() {
  const pets = true
  return (
    <Card className='py-3 my-2 bg-primary-light border-secondary border-2'>
      <Row className='text-center'>
        {pets ? (
          <>
            <Col md={4} className='mb-4 mb-md-0'>
              <FaDog size={30} className='text-primary fw-bold' />
              <h4 className='text-primary fw-bold mb-3'>Edit Pets</h4>
              <Button variant='secondary'>Pets Settings</Button>
            </Col>
            <Col md={4} className='mb-4 mb-md-0'>
              <FaFileAlt size={30} className='text-primary fw-bold' />
              <h4 className='text-primary fw-bold mb-3'>Account Settings</h4>
              <Button variant='secondary'>Edit Account</Button>
            </Col>
            <Col md={4} className='mb-4 mb-md-0'>
              <FaUserEdit size={30} className='text-primary fw-bold' />

              <h4 className='text-primary fw-bold mb-3'>Profile Settings</h4>
              <Button variant='secondary'>Edit Profile</Button>
            </Col>
          </>
        ) : (
          <>
            <Col md={6} className='mb-4 mb-md-0'>
              <FaFileAlt size={30} className='text-primary fw-bold' />
              <h4 className='text-primary fw-bold mb-3'>Account Settings</h4>
              <Button variant='secondary'>Edit Account</Button>
            </Col>
            <Col md={6} className='mb-4 mb-md-0'>
              <FaUserEdit size={30} className='text-primary fw-bold' />

              <h4 className='text-primary fw-bold mb-3'>Profile Settings</h4>
              <Button variant='secondary'>Edit Profile</Button>
            </Col>
          </>
        )}
      </Row>
    </Card>
  )
}
export default EditBox

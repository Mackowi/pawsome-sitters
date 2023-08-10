import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Img from '../assets/images/about3.jpg'

function Register() {
  const submitHandler = () => {
    console.log('Submit Handler ')
  }

  return (
    <Container>
      <Row className='py-5'>
        <Col md={6} className='d-none d-md-flex'>
          <img src={Img} alt='test' className='img-fluid rounded-4' />
        </Col>
        <Col
          md={6}
          className='text-center d-flex flex-column justify-content-center'
        >
          <h3 className='text-primary fw-bold mb-4 mb-md-3 mb-lg-5'>Sign Up</h3>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email' className='my-2 my-md-0 '>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value=''
                onChange={(e) => {
                  console.log(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value=''
                onChange={(e) => {
                  console.log(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='confirmPassword'
                placeholder='Confirm password'
                value=''
                onChange={(e) => {
                  console.log(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>
            <div className='d-grid mt-4 mt-md-3'>
              <Button
                type='submit'
                variant='secondary'
                className='w-50 mx-auto'
              >
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col className='text-center'>
          <p>
            Already an user?
            <Link to='/login' style={{ color: '#2A4344' }}>
              {' '}
              Login here
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  )
}
export default Register
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Img from '../assets/images/about3.jpg'
import Loader from '../components/Loader'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/userSlice'
import { toast } from 'react-toastify'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.user)

  const [register, { isLoading }] = useRegisterMutation()

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard')
    }
  }, [navigate, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      return
    } else {
      try {
        const res = await register({ name, email, password }).unwrap()
        dispatch(setCredentials({ ...res }))
        navigate('/dashboard')
      } catch (error) {
        toast.error(error?.data?.message || error?.error)
      }
    }
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
            <Form.Group controlId='name' className='my-2 my-md-1 '>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email' className='my-2 my-md-1 '>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password' className='my-2 my-md-1 '>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword' className='my-2 my-md-1 '>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
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
          {isLoading && <Loader />}
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

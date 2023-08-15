import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/userSlice'
import { toast } from 'react-toastify'
import Img from '../assets/images/about3.jpg'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector((state) => state.user)

  // const { search } = useLocation()
  // const sp = new URLSearchParams(search)
  // const redirect = sp.get('redirect') || '/'
  const redirect = '/profile'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate(redirect)
    } catch (error) {
      toast.error(error?.data?.message || error?.error)
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
          <h3 className='text-primary fw-bold mb-4 mb-md-3 mb-lg-5'>Sign In</h3>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email' className='my-2 my-md-0 '>
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
            <Form.Group controlId='password' className='mt-2'>
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
            <div className='mt-2'>
              <Link to='/forgotpassword' className='text-primary'>
                Forgot Password?
              </Link>
            </div>

            <div className='d-grid mt-4 mt-md-3'>
              <Button
                type='submit'
                variant='secondary'
                className='w-50 mx-auto'
              >
                Login
              </Button>
            </div>
          </Form>
          {isLoading && <Loader />}
        </Col>
      </Row>
      <Row>
        <Col className='text-center'>
          <p>
            Are you not a user yet?
            <Link to='/register' style={{ color: '#2A4344' }}>
              Register here
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  )
}
export default Login

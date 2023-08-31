import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap'
import { loginSchema } from '../../validationSchemas'
import { useFormik } from 'formik'
import Img from '../../assets/images/about3.jpg'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../../slices/usersApiSlice'
import { setCredentials } from '../../slices/userSlice'
import { useLazyGetUserProfileQuery } from '../../slices/usersApiSlice'
import { setPatronInfo } from '../../slices/patronSlice'
import { setPetOwnerInfo } from '../../slices/petOwnerSlice'

function Login() {
  const [showPassword, setShowPassword] = useState(false)

  const { userInfo } = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()
  const [getUserProfile, results] = useLazyGetUserProfileQuery()

  // const { search } = useLocation()
  // const sp = new URLSearchParams(search)
  // const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    if (userInfo && results && results.data) {
      if (userInfo.role === 'patron') {
        dispatch(setPatronInfo(results.data.profile[0]))
      } else {
        dispatch(setPetOwnerInfo(results.data.profile[0]))
      }
      navigate('/dashboard')
    }
  }, [navigate, dispatch, results, userInfo])

  const submitHandler = async () => {
    try {
      const user = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...user }))
      if (user.role) {
        getUserProfile(1)
      } else {
        navigate('/profile')
      }
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
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: submitHandler,
  })

  const { email, password } = values

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
          <Form noValidate onSubmit={handleSubmit} autoComplete='off'>
            <Form.Group controlId='email' className='my-2 my-md-0 '>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email && !!errors.email}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='password' className='mt-2'>
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.password && !!errors.password}
                ></Form.Control>
                <Button onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
                <Form.Control.Feedback type='invalid'>
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <div className='mt-2'>
              <Link to='/forgotpassword' className='text-primary'>
                Forgot Password?
              </Link>
            </div>

            <div className='d-grid mt-4 mt-md-3'>
              <Button
                disabled={isSubmitting}
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
              {' '}
              Register here
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  )
}
export default Login

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Img from '../assets/images/about3.jpg'
import Loader from '../components/Loader'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/userSlice'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { registerSchema } from '../schemas/registerSchema'

function Register() {
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.user)

  const [register, { isLoading }] = useRegisterMutation()

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard')
    }
  }, [navigate, userInfo])

  const submitHandler = async () => {
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
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: submitHandler,
  })

  const { name, email, password, confirmPassword } = values

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
          <Form noValidate onSubmit={handleSubmit} autoComplete='off'>
            <Form.Group controlId='name' className='my-2 my-md-1 '>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.name && !!errors.name}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='email' className='my-2 my-md-1 '>
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
            <Form.Group controlId='password' className='my-2 my-md-1 '>
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
              </InputGroup>
              <Form.Control.Feedback type='invalid'>
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='confirmPassword' className='my-2 my-md-1 '>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder='Confirm password'
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.confirmPassword && !!errors.confirmPassword}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
            <div className='d-grid mt-4 mt-md-3'>
              <Button
                disabled={isSubmitting}
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

import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { FaFileAlt } from 'react-icons/fa'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useUpdateUserMutation } from '../../slices/usersApiSlice'
import { setCredentials } from '../../slices/userSlice'

import { useFormik } from 'formik'
import { userSchema } from '../../validationSchemas'

function AccountSettings() {
  const { userInfo } = useSelector((state) => state.user)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [updatePatron, { isLoading }] = useUpdateUserMutation()

  const submitHandler = async () => {
    try {
      const userData = {
        name,
        email,
        password,
      }
      const updatedUserData = await updatePatron(userData).unwrap()
      dispatch(setCredentials(updatedUserData))
      toast.success('Account settings updated')
      navigate('/dashboard')
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
      name: userInfo.name,
      email: userInfo.email,
      password: '',
      confirmPassword: '',
    },
    validationSchema: userSchema,
    onSubmit: submitHandler,
  })

  const { name, email, password } = values

  return (
    <Container className='my-4 '>
      {isLoading && <Loader />}
      <h3 className='text-center mb-5 text-primary fw-bold'>
        <FaFileAlt size={45} className='me-3' />
        Please fill your details
      </h3>
      <Form noValidate onSubmit={handleSubmit} autoComplete='off'>
        <Row>
          <Col>
            <Form.Group className='mb-3' controlId='name'>
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
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='text'
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
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className='mb-3' controlId='password'>
              <Form.Label>New password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && !!errors.password}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className='mb-3' controlId='confirmPassword'>
              <Form.Label>Confirm new password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter new password again'
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.confirmPassword && !!errors.confirmPassword}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Button
            disabled={isSubmitting}
            variant='primary'
            type='submit'
            className='btn-block w-50 mx-auto mt-3'
          >
            Submit
          </Button>
        </Row>
      </Form>
    </Container>
  )
}
export default AccountSettings

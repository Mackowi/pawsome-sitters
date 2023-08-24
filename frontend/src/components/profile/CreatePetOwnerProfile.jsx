import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { FaRegAddressCard } from 'react-icons/fa'
import Loader from '../Loader'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { petOwnerSchema } from '../../validationSchemas'
import { useUpdateMutation } from '../../slices/usersApiSlice'
import { setCredentials } from '../../slices/userSlice'
import { useCreatePetOwnerMutation } from '../../slices/petOwnersApiSlice'
import { setPetOwnerInfo } from '../../slices/petOwnerSlice'

function CreatePetOwnerProfile() {
  const { userInfo } = useSelector((state) => state.user)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [createPetOwner, { isLoading }] = useCreatePetOwnerMutation()
  const [update] = useUpdateMutation()

  const submitHandler = async () => {
    try {
      const petOwner = {
        firstName,
        lastName,
        address: {
          street,
          houseNr,
          addition,
          city,
          postcode,
        },
        phone,
      }
      await createPetOwner(petOwner).unwrap()
      dispatch(setPetOwnerInfo(petOwner))
      const res = await update({
        name: firstName,
        role: 'petOwner',
      }).unwrap()
      dispatch(setCredentials({ ...res }))
      toast.success('Pet owner profile created')
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
      firstName: `${userInfo.name}`,
      lastName: '',
      street: '',
      houseNr: '',
      addition: '',
      city: '',
      postcode: '',
      phone: '',
    },
    validationSchema: petOwnerSchema,
    onSubmit: submitHandler,
  })

  const {
    firstName,
    lastName,
    street,
    houseNr,
    addition,
    city,
    postcode,
    phone,
  } = values

  return (
    <Container className='my-5'>
      {isLoading && <Loader />}
      <h3 className='text-center mb-5 text-primary fw-bold'>
        <FaRegAddressCard size={45} className='me-3' />
        Please fill your details
      </h3>
      <Form noValidate onSubmit={handleSubmit} autoComplete='off'>
        <Row>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='firstName'>
              <Form.Label>First name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter first name'
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.firstName && !!errors.firstName}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='lastName'>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter last name'
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.lastName && !!errors.lastName}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Form.Label className='text-center'>Address</Form.Label>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='street'>
              <Form.Label>Street</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter street'
                value={values.street}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.street && !!errors.street}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.street}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className='mb-3' controlId='houseNr'>
              <Form.Label>House number</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter house number'
                value={values.houseNr}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.houseNr && !!errors.houseNr}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.houseNr}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className='mb-3' controlId='addition'>
              <Form.Label>Addition</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter addition'
                value={values.addition}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.addition && !!errors.addition}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.addition}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='city'>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter city'
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.city && !!errors.city}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.city}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='postcode'>
              <Form.Label>Postcode</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter postcode'
                value={values.postcode}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.postcode && !!errors.postcode}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.postcode}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='phone'>
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type='number'
                placeholder='Phone number'
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.phone && !!errors.phone}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.phone}
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
export default CreatePetOwnerProfile

import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { FaRegAddressCard } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useState } from 'react'
import { patronSchema } from '../../validationSchemas'
import {
  useCreatePatronMutation,
  useUploadPatronImageMutation,
} from '../../slices/patronsApiSlice'
import { useUpdateUserMutation } from '../../slices/usersApiSlice'
import { setCredentials } from '../../slices/userSlice'
import { setPatronInfo } from '../../slices/patronSlice'
import { toast } from 'react-toastify'
import Loader from '../Loader'

function CreatePatronProfile() {
  const { userInfo } = useSelector((state) => state.user)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [createPatron, { isLoading: loadingCreation }] =
    useCreatePatronMutation()
  const [updateUser] = useUpdateUserMutation()
  const [uploadPatronImage, { isLoading: loadingUpload }] =
    useUploadPatronImageMutation()

  const [selectedImageFileName, setSelectedImageFileName] = useState('')

  const submitHandler = async () => {
    try {
      const patron = {
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
        gender,
        image: selectedImageFileName,
        description,
        acceptedPets: pets,
        service,
      }
      const patronData = await createPatron(patron).unwrap()
      dispatch(setPatronInfo(patronData))
      const res = await updateUser({ name: firstName, role: 'patron' }).unwrap()
      dispatch(setCredentials({ ...res }))
      toast.success('Patron profile created')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error?.data?.message || error?.error)
    }
  }

  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    const ext = e.target.files[0].name.match(/\.\w+/)
    formData.append('image', e.target.files[0], `${userInfo._id}${ext[0]}`)
    try {
      const res = await uploadPatronImage(formData).unwrap()
      setSelectedImageFileName(res.image)
      toast.success(res.message)
    } catch (err) {
      toast.error(err?.data?.message || err.error)
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
      gender: '',
      image: '',
      description: '',
      pets: [],
      service: [],
    },
    validationSchema: patronSchema,
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
    gender,
    description,
    pets,
    service,
  } = values

  return (
    <Container className='my-5'>
      {loadingCreation && <Loader />}
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
          <Col md={6} className='mb-3'>
            <Form.Label className='text-center mb-3'>Gender</Form.Label>
            <Form.Group>
              <Form.Check
                inline
                id='genderMale'
                label='Male'
                name='gender'
                type='radio'
                value='male'
                checked={values.gender === 'male' ? true : false}
                onChange={handleChange}
                isInvalid={touched.gender && !!errors.gender}
              />
              <Form.Check
                inline
                id='genderFemale'
                label='Female'
                name='gender'
                type='radio'
                value='female'
                checked={values.gender === 'female' ? true : false}
                onChange={handleChange}
                isInvalid={touched.gender && !!errors.gender}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.gender}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId='image' className='mb-3'>
          <Form.Label>Photo</Form.Label>
          <Form.Control
            type='file'
            value={values.image}
            onChange={(e) => {
              handleChange(e)
              uploadFileHandler(e)
            }}
            onBlur={handleBlur}
            isInvalid={touched.image && !!errors.image}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
            {errors.image}
          </Form.Control.Feedback>
          {loadingUpload && <Loader />}
        </Form.Group>

        <Form.Group className='mb-3' controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.description && !!errors.description}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
            {errors.description}
          </Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Col md={6} className='mb-4'>
            <Form.Label className='mb-3'>Accepted pets</Form.Label>
            <Form.Group>
              <Form.Check
                inline
                label='Dog'
                name='pets'
                type='checkbox'
                value='dog'
                checked={values.pets.includes('dog') ? true : false}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label='Cat'
                name='pets'
                type='checkbox'
                value='cat'
                checked={values.pets.includes('cat') ? true : false}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label='Rabbit'
                name='pets'
                type='checkbox'
                value='rabbit'
                checked={values.pets.includes('rabbit') ? true : false}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6} className='mb-5 '>
            <Form.Label className='mb-3'>Provided service</Form.Label>
            <Form.Group>
              <Form.Check
                inline
                label='Walking'
                name='service'
                type='checkbox'
                value='walking'
                checked={values.service.includes('walking') ? true : false}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label='Sitting'
                name='service'
                type='checkbox'
                value='sitting'
                checked={values.service.includes('sitting') ? true : false}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label='Daycare'
                name='service'
                type='checkbox'
                value='daycare'
                checked={values.service.includes('daycare') ? true : false}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Button
            disabled={isSubmitting}
            variant='primary'
            type='submit'
            className='btn-block w-50 mx-auto'
          >
            Submit
          </Button>
        </Row>
      </Form>
    </Container>
  )
}
export default CreatePatronProfile

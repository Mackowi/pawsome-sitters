import { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { FaRegAddressCard } from 'react-icons/fa'
import Loader from '../Loader'
import { toast } from 'react-toastify'
import { useUpdatePatronMutation } from '../../slices/patronsApiSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setPatronInfo } from '../../slices/patronSlice'
import { useFormik } from 'formik'
import { patronSchema } from '../../validationSchemas'

function EditPatronProfile() {
  const { patronInfo } = useSelector((state) => state.patron)

  const [gender, setGender] = useState(patronInfo.gender)
  const [pets, setPets] = useState(patronInfo.acceptedPets)
  const [service, setService] = useState(patronInfo.service)

  const handleGenderChange = (event) => {
    if (gender === event.target.value) {
      setGender(null)
      values.genderPick = ''
    } else {
      setGender(event.target.value)
      values.genderPick = event.target.value
    }
  }

  const handlePetsChange = (event) => {
    if (pets.includes(event.target.value)) {
      setPets(pets.filter((pet) => pet !== event.target.value))
      values.petsPicks.filter((pet) => pet !== event.target.value)
    } else {
      setPets([...pets, event.target.value])
      values.petsPicks = [...values.petsPicks, event.target.value]
    }
  }

  const handleServiceChange = (event) => {
    if (service.includes(event.target.value)) {
      setService(service.filter((service) => service !== event.target.value))
      values.servicePicks.filter((service) => service !== event.target.value)
    } else {
      setService([...service, event.target.value])
      values.servicePicks = [...values.servicePicks, event.target.value]
    }
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [updatePatron, { isLoading }] = useUpdatePatronMutation()

  const submitHandler = async () => {
    console.log('test')
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
        gender: genderPick,
        photo,
        description,
        pets: petsPicks,
        service: servicePicks,
      }
      const updatedPatronData = await updatePatron(patron).unwrap()
      dispatch(setPatronInfo(updatedPatronData))
      console.log(updatedPatronData)
      toast.success('Patron profile updated')
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
      firstName: `${patronInfo.firstName}`,
      lastName: `${patronInfo.lastName}`,
      street: `${patronInfo.address.street}`,
      houseNr: `${patronInfo.address.houseNr}`,
      addition: patronInfo.address.addition && `${patronInfo.address.addition}`,
      city: `${patronInfo.address.city}`,
      postcode: `${patronInfo.address.postcode}`,
      phone: `${patronInfo.phone}`,
      gender: `${patronInfo.gender}`,
      photo: `${patronInfo.photo}`,
      description: `${patronInfo.description}`,
      petsPicks: patronInfo.acceptedPets,
      servicePicks: patronInfo.service,
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
    genderPick,
    photo,
    description,
    petsPicks,
    servicePicks,
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
          <Col md={6} className='mb-3'>
            <Form.Label className='text-center mb-3'>Gender</Form.Label>
            <Form.Group>
              <Form.Check
                inline
                id='genderMale'
                label='Male'
                name='male'
                type='radio'
                value='male'
                checked={gender === 'male'}
                onChange={handleGenderChange}
                isInvalid={touched.gender && !!errors.gender}
              />
              <Form.Check
                inline
                id='genderFemale'
                label='Female'
                name='female'
                type='radio'
                value='female'
                checked={gender === 'female'}
                onChange={handleGenderChange}
                isInvalid={touched.gender && !!errors.gender}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.gender}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId='formFile' className='mb-3'>
          <Form.Label>Photo</Form.Label>
          <Form.Control
            type='file'
            value={values.file}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.file && !!errors.file}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
            {errors.file}
          </Form.Control.Feedback>
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
                name='dog'
                type='checkbox'
                value='dog'
                checked={pets.includes('dog')}
                onChange={handlePetsChange}
              />
              <Form.Check
                inline
                label='Cat'
                name='cat'
                type='checkbox'
                value='cat'
                checked={pets.includes('cat')}
                onChange={handlePetsChange}
              />
              <Form.Check
                inline
                label='Rabbit'
                name='rabbit'
                type='checkbox'
                value='rabbit'
                checked={pets.includes('rabbit')}
                onChange={handlePetsChange}
              />
            </Form.Group>
          </Col>
          <Col md={6} className='mb-5 '>
            <Form.Label className='mb-3'>Provided service</Form.Label>
            <Form.Group>
              <Form.Check
                inline
                label='Walking'
                name='walking'
                type='checkbox'
                value='walking'
                checked={service.includes('walking')}
                onChange={handleServiceChange}
              />
              <Form.Check
                inline
                label='Sitting'
                name='sitting'
                type='checkbox'
                value='sitting'
                checked={service.includes('sitting')}
                onChange={handleServiceChange}
              />
              <Form.Check
                inline
                label='Daycare'
                name='daycare'
                type='checkbox'
                value='daycare'
                checked={service.includes('daycare')}
                onChange={handleServiceChange}
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
export default EditPatronProfile

import { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { FaRegAddressCard } from 'react-icons/fa'
import Loader from './Loader'
import { toast } from 'react-toastify'
import { useCreatePatronMutation } from '../slices/patronsApiSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setPatronInfo } from '../slices/patronSlice'
import * as formik from 'formik'
import * as yup from 'yup'

function CreatePatronProfile() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [street, setStreet] = useState('')
  const [houseNr, setHouseNr] = useState(0)
  const [addition, setAddition] = useState('')
  const [city, setCity] = useState('')
  const [postcode, setPostcode] = useState('')
  const [phone, setPhone] = useState(0)
  const [gender, setGender] = useState(null)
  const [photo, setPhoto] = useState('')
  const [description, setDescription] = useState(null)
  const [pets, setPets] = useState([])
  const [service, setService] = useState([])

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [createPatron, { isLoading }] = useCreatePatronMutation()

  const { Formik } = formik

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
  })

  const submitHandler = async (e) => {
    e.preventDefault()
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
        photo,
        description,
        pets,
        service,
      }
      await createPatron(patron).unwrap()
      dispatch(setPatronInfo(patron))
      toast.success('Patron profile created')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error?.data?.message || error?.error)
    }
  }

  const handleGenderChange = (event) => {
    if (gender === event.target.value) {
      setGender(null)
    } else {
      setGender(event.target.value)
    }
  }

  const handlePetsChange = (event) => {
    if (pets.includes(event.target.value)) {
      setPets(pets.filter((pet) => pet !== event.target.value))
    } else {
      setPets([...pets, event.target.value])
    }
  }

  const handleServiceChange = (event) => {
    if (service.includes(event.target.value)) {
      setService(service.filter((service) => service !== event.target.value))
    } else {
      setService([...service, event.target.value])
    }
  }

  return (
    <Container>
      {isLoading && <Loader />}
      <h3 className='text-center mb-5 text-primary fw-bold'>
        <FaRegAddressCard size={45} className='me-3' />
        Please fill your details
      </h3>
      <Form noValidate onSubmit={submitHandler}>
        <Row>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='firstName'>
              <Form.Label>First name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter first name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='lastName'>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter last name'
                onChange={(e) => setLastName(e.target.value)}
              />
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
                onChange={(e) => setStreet(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className='mb-3' controlId='houseNumber'>
              <Form.Label>House number</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter house number'
                onChange={(e) => setHouseNr(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className='mb-3' controlId='addition'>
              <Form.Label>Addition</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter addition'
                onChange={(e) => setAddition(e.target.value)}
              />
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
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='postcode'>
              <Form.Label>Postcode</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter postcode'
                onChange={(e) => setPostcode(e.target.value)}
              />
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
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6} className='mb-3'>
            <Form.Label className='text-center mb-3'>Gender</Form.Label>
            <Form.Group className='' controlId='gender'>
              <Form.Check
                inline
                label='Male'
                name='male'
                type='radio'
                value='male'
                checked={gender === 'male'}
                onChange={handleGenderChange}
              />
              <Form.Check
                inline
                label='Female'
                name='female'
                type='radio'
                value='female'
                checked={gender === 'female'}
                onChange={handleGenderChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId='formFile' className='mb-3'>
          <Form.Label>Photo</Form.Label>
          <Form.Control
            type='file'
            onChange={(e) => setPhoto(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
          />
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

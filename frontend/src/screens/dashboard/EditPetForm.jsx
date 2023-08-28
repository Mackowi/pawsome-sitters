import { useState } from 'react'
import { Row, Col, Form, Button, Modal } from 'react-bootstrap'
import {
  FaCarrot,
  FaCat,
  FaDog,
  FaMars,
  FaVenus,
  FaFilePen,
} from 'react-icons/fa6'
import { petSchema } from '../../validationSchemas'
import { useFormik } from 'formik'

function EditPetForm({ pet }) {
  const submitHandler = async (e) => {
    e.preventDefault()
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
      type: '',
      name: '',
      gender: '',
      age: '',
      info: '',
    },
    validationSchema: petSchema,
    onSubmit: submitHandler,
  })

  const { type, name, gender, age, info } = values

  return (
    <>
      <Form noValidate onSubmit={handleSubmit} autoComplete='off'>
        <Row className='mb-3'>
          <Form.Group as={Col} md='6' controlId='name' className='mb-3 mb-md-0'>
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
          <Form.Group as={Col} md='6' controlId='type'>
            <Form.Label>Type of your pet</Form.Label>
            <Form.Group required>
              <Form.Check
                inline
                label={
                  <>
                    <FaDog className='mb-1 me-1' />
                    Dog
                  </>
                }
                name='type'
                type='radio'
                value='dog'
                checked={values.type === 'dog' ? true : false}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label={
                  <>
                    <FaCat className='mb-1 me-1' />
                    Cat
                  </>
                }
                name='type'
                type='radio'
                value='cat'
                checked={values.type === 'cat' ? true : false}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label={
                  <>
                    <FaCarrot className='mb-1 me-1' />
                    Rabbit
                  </>
                }
                name='type'
                type='radio'
                value='rabbit'
                checked={values.type === 'rabbit' ? true : false}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Control.Feedback type='invalid'>
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col} md='6' controlId='age' className='mb-3 mb-md-0'>
            <Form.Label>Age</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter age'
              value={values.age}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.age && !!errors.age}
            ></Form.Control>
            <Form.Control.Feedback type='invalid'>
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='6' controlId='gender'>
            <Form.Label className='text-center'>Gender</Form.Label>
            <Form.Group required>
              <Form.Check
                inline
                id='genderMale'
                label={
                  <>
                    <FaMars className='mb-1 me-1' />
                    Male
                  </>
                }
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
                label={
                  <>
                    <FaVenus className='mb-1 me-1' />
                    Female
                  </>
                }
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
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} md='12' controlId='info'>
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
        </Row>
        <div className='text-center'>
          <Button type='submit'>
            <FaFilePen className='mb-1' /> Edit Pet
          </Button>
        </div>
      </Form>
    </>
  )
}

export default EditPetForm

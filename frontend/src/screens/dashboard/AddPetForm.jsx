import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { petSchema } from '../../validationSchemas'
import { useFormik } from 'formik'

function AddPetForm() {
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
    <Form noValidate onSubmit={handleSubmit} autoComplete='off'>
      <Row className='mb-2'>
        <Form.Group as={Col} md='4' controlId='type'>
          <Form.Label className='mb-3'>Type of your pet</Form.Label>
          <Form.Group required>
            <Form.Check
              inline
              label='Dog'
              name='type'
              type='radio'
              value='dog'
              checked={values.type === 'dog' ? true : false}
              onChange={handleChange}
            />
            <Form.Check
              inline
              label='Cat'
              name='type'
              type='radio'
              value='cat'
              checked={values.type === 'cat' ? true : false}
              onChange={handleChange}
            />
            <Form.Check
              inline
              label='Rabbit'
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
        <Form.Group as={Col} md='4' controlId='name'>
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
        <Form.Group as={Col} md='4' controlId='gender'>
          <Form.Label className='text-center mb-3'>Gender</Form.Label>
          <Form.Group required>
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
        </Form.Group>
      </Row>

      <Row className='mb-3'>
        <Form.Group as={Col} md='4' controlId='age'>
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
        <Form.Group as={Col} md='8' controlId='info'>
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
      <div className='d-flex gap-4 justify-content-around'>
        <Button type='submit'>Edit Pet</Button>
        <Button variant='secondary'>Remove Pet</Button>
      </div>
    </Form>
  )
}
export default AddPetForm

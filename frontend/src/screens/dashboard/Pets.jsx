import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import {
  FaCarrot,
  FaCat,
  FaDog,
  FaMars,
  FaVenus,
  FaPaw,
  FaSquarePlus,
  FaSquareMinus,
} from 'react-icons/fa6'
import { useFormik } from 'formik'
import { petSchema } from '../../validationSchemas'

const pets = [
  {
    type: 'dog',
    name: 'Leszek',
    gender: 'male',
    age: 2,
    info: 'Incredibly stupid one, hard to deal with. Adorable but very annoying and stubborn. I love him a lot!',
  },
  {
    type: 'dog',
    name: 'Renatka',
    gender: 'female',
    age: 2,
    info: 'Introducing Renatka, a 6-month-old puppy brimming with playfulness and curiosity, ready to embark on adventures by your side.',
  },
  {
    type: 'rabbbit',
    name: 'Sunia',
    gender: 'female',
    age: 2,
    info: 'Discover Sunia, a serene 4-year-old rabbit with a penchant for leisurely hops and a gentle nature that brings a sense of calm to any space.',
  },
]

function Pets() {
  const submitHandler = (e) => {
    e.preventDefault()
    console.log('Submit handler')
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

  return (
    <Container>
      <h2 className='text-center mt-4 mt-md-5 text-secondary fw-bold'>
        <FaPaw className='mb-1' /> Your Pets
      </h2>
      <Row className='my-3 border border-2 border-secondary bg-primary-light'>
        <Col md={6} className='p-3 '>
          <div className='pets-box'>
            <div className='list-group pets-box-list'>
              {pets.map((pet, index) => (
                <div key={index}>
                  <div className='list-group-item list-group-item-action '>
                    <div className='d-flex w-100 justify-content-between'>
                      <div className='d-flex flex-column align-items-center'>
                        <span>
                          {pet.type === 'dog' ? (
                            <FaDog />
                          ) : pet.type === 'cat' ? (
                            <FaCat />
                          ) : (
                            <FaCarrot />
                          )}
                        </span>
                        <p className='mb-0 fw-bold text-secondary lead'>
                          {pet.name.toUpperCase()}
                        </p>
                      </div>
                      <p>{pet.gender === 'male' ? <FaMars /> : <FaVenus />}</p>
                    </div>
                    <p className='mb-1'>{pet.info}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className='d-flex justify-content-center gap-5 mt-3'>
              <Button>
                Add Pet <FaSquarePlus />
              </Button>
              <Button>
                Remove Pet <FaSquareMinus />
              </Button>
            </div>
          </div>
        </Col>
        <Col md={6} className='p-3 '>
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
            <Form.Group controlId='type' className='my-2 my-md-1 '>
              <Form.Label className='mb-3'>Type</Form.Label>
              <Form.Group>
                <Form.Check
                  inline
                  label='Dog'
                  name='type'
                  type='radio'
                  value='dog'
                  // checked={values.type.includes('dog') ? true : false}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label='Cat'
                  name='type'
                  type='radio'
                  value='cat'
                  // checked={values.type.includes('cat') ? true : false}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label='Rabbit'
                  name='type'
                  type='radio'
                  value='rabbit'
                  // checked={values.type.includes('rabbit') ? true : false}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form.Group>
            <Form.Group controlId='gender' className='my-2 my-md-1 '>
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
            </Form.Group>

            <Form.Group controlId='age' className='my-2 my-md-1 '>
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
                {errors.age}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3' controlId='info'>
              <Form.Label>Additional Information</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                value={values.info}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.info && !!errors.info}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.info}
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
        </Col>
      </Row>
    </Container>
  )
}
export default Pets

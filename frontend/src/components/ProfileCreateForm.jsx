import { useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'

function ProfileCreateForm() {
  return (
    <Container>
      <Form 
      >
        <Form.Group className='mb-3' controlId='firstName'>
          <Form.Label>First name</Form.Label>
          <Form.Control type='text' placeholder='Enter first name' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='lastName'>
          <Form.Label>
            Last <noscript></noscript>ame
          </Form.Label>
          <Form.Control type='text' placeholder='Enter last name' />
        </Form.Group>

        <Form.Check
          inline
          label='Male'
          name='male'
          type='radio'
          id={`inline-radio-1`}
        />
        <Form.Check
          inline
          label='Female'
          name='female'
          type='radio'
          id={`inline-radio-2`}
        />

        <Form.Label>Address</Form.Label>
        <Form.Group className='mb-3' controlId='street'>
          <Form.Label>Street</Form.Label>
          <Form.Control type='text' placeholder='Enter street' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='houseNumber'>
          <Form.Label>House number</Form.Label>
          <Form.Control type='number' placeholder='Enter house number' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='addition'>
          <Form.Label>Addition</Form.Label>
          <Form.Control type='text' placeholder='Enter addition' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control type='text' placeholder='Enter city' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='postcode'>
          <Form.Label>Postcode</Form.Label>
          <Form.Control type='text' placeholder='Enter postcode' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='phone'>
          <Form.Label>Phone number</Form.Label>
          <Form.Control type='number' placeholder='phone' />
        </Form.Group>

        <Form.Group controlId='formFile' className='mb-3'>
          <Form.Label>Default file input example</Form.Label>
          <Form.Control type='file' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control as='textarea' rows={3} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Accepted pets</Form.Label>
          <Form.Check
            inline
            label='Dog'
            name='dog'
            type='radio'
            id={`inline-radio-3`}
          />
          <Form.Check
            inline
            label='Cat'
            name='cat'
            type='radio'
            id={`inline-radio-4`}
          />
          <Form.Check
            inline
            label='Rabbit'
            name='rabbit'
            type='radio'
            id={`inline-radio-5`}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Provided services</Form.Label>
          <Form.Check
            inline
            label='Walking'
            name='walking'
            type='radio'
            id={`inline-radio-3`}
          />
          <Form.Check
            inline
            label='Sitting'
            name='sitting'
            type='radio'
            id={`inline-radio-4`}
          />
          <Form.Check
            inline
            label='Daycare'
            name='daycare'
            type='radio'
            id={`inline-radio-5`}
          />
        </Form.Group>
      </Form>
      <Button variant='primary' type='submit' className='text-center'>
        Submit
      </Button>
    </Container>
  )
}
export default ProfileCreateForm

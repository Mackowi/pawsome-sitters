import {
  Container,
  Row,
  Col,
  Tab,
  Button,
  ListGroup,
  Modal,
} from 'react-bootstrap'
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
import { useState } from 'react'
import { useFormik } from 'formik'
import { petSchema } from '../../validationSchemas'
import AddPetForm from './AddPetForm'
import EditPetForm from './EditPetForm'

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
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <Container className='py-5'>
      <Tab.Container id='list-group-pets' defaultActiveKey='#link1'>
        <Row className='border border-2 border-secondary bg-secondary-light pb-3'>
          <h2 className='text-center mt-3 text-primary fw-bold'>
            <FaPaw className='mb-1' /> Your Pets
          </h2>
          <Col sm={4}>
            <ListGroup className='mx-2 pets-box-list'>
              {pets.map((pet, index) => (
                <ListGroup.Item action href={`#link${index}`}>
                  <div className='d-flex gap-2'>
                    <span>
                      {pet.type === 'dog' ? (
                        <FaDog />
                      ) : pet.type === 'cat' ? (
                        <FaCat />
                      ) : (
                        <FaCarrot />
                      )}
                    </span>
                    <p className='mb-0 fw-bold lead'>
                      {pet.name.toUpperCase()}
                    </p>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <div className='text-center mt-3'>
              <Button className='btn-primary btn-lg' onClick={handleShow}>
                <FaSquarePlus /> Add Pet
              </Button>
            </div>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              {pets.map((pet, index) => (
                <Tab.Pane eventKey={'#link' + index}>
                  <EditPetForm pet={pet} />
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPetForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <Col className='p-3 '>
          <Tab.Container>
            <ListGroup>
              {pets.map((pet, index) => (
                <ListGroup.Item action href={`#link${index}`}>
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
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Tab.Content>
              <Tab.Pane eventKey='#link0'>Tab pane content 1</Tab.Pane>
              <Tab.Pane eventKey='#link1'>Tab pane content 2</Tab.Pane>
              <Tab.Pane eventKey='#link2'>Tab pane content 3</Tab.Pane>
            </Tab.Content>
          </Tab.Container>

        </Col> */}
    </Container>
  )
}
export default Pets

import { Container, Row, Col, Tab, Button, ListGroup } from 'react-bootstrap'
import {
  FaCarrot,
  FaCat,
  FaDog,
  FaPaw,
  FaSquarePlus,
  FaSquareMinus,
} from 'react-icons/fa6'
import { useState } from 'react'
import { useFormik } from 'formik'
import { petSchema } from '../../validationSchemas'
import EditPetForm from './EditPetForm'
import AddPetModal from './AddPetModal'
import ConfirmModal from '../../components/ConfirmModal'

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
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showAddPetModal, setShowAddPetModal] = useState(false)

  const openConfirmModal = () => setShowConfirmModal(true)
  const closeConfirmModal = () => setShowConfirmModal(false)

  const openAddPetModal = () => setShowAddPetModal(true)
  const closeAddPetModal = () => setShowAddPetModal(false)

  return (
    <Container className='py-5'>
      <Tab.Container id='list-group-pets' defaultActiveKey='#link1'>
        <Row className='border border-2 border-secondary bg-secondary-light p-3 '>
          <h2 className='text-center text-primary fw-bold mt-3 mt-md-0'>
            <FaPaw className='mb-1' /> Your Pets
          </h2>

          <Col
            sm={4}
            className='d-flex flex-column gap-3 justify-content-between mt-3 mt-md-0'
          >
            <ListGroup className='pets-box-list'>
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
            <div className='d-flex justify-content-around'>
              <Button
                variant='btn btn-outline-primary'
                onClick={openConfirmModal}
              >
                <FaSquareMinus className='mb-1' /> Remove Pet
              </Button>
              <Button className='btn-primary' onClick={openAddPetModal}>
                <FaSquarePlus className='mb-1' /> Add Pet
              </Button>
            </div>
          </Col>

          <Col sm={8} className='pe-3 mt-4 mt-md-0'>
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

      <ConfirmModal
        showConfirmModal={showConfirmModal}
        closeConfirmModal={closeConfirmModal}
        info={pets[0]}
      />

      <AddPetModal
        showAddPetModal={showAddPetModal}
        closeAddPetModal={closeAddPetModal}
      />
    </Container>
  )
}
export default Pets

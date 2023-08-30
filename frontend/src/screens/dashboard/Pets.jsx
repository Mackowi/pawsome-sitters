import { Container, Row, Col, Tab, Button, ListGroup } from 'react-bootstrap'
import {
  FaCarrot,
  FaCat,
  FaDog,
  FaPaw,
  FaSquarePlus,
  FaSquareMinus,
} from 'react-icons/fa6'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRemovePetMutation } from '../../slices/petOwnersApiSlice'
import { setPetOwnerInfo } from '../../slices/petOwnerSlice'
import { useFormik } from 'formik'
import { petSchema } from '../../validationSchemas'
import EditPetForm from './EditPetForm'
import AddPetModal from './AddPetModal'
import ConfirmModal from '../../components/ConfirmModal'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Pets() {
  const { petOwnerInfo } = useSelector((state) => state.petOwner)
  const [activePet, setActivePet] = useState(0)
  const [rerender, setRerender] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [removePet] = useRemovePetMutation()

  const confirmRemoval = async () => {
    try {
      const res = await removePet(petOwnerInfo.pets[activePet]._id).unwrap()
      dispatch(setPetOwnerInfo(res))
      navigate('/dashboard/pets')
      toast.success('Pet removed')
      // Calculate the new activePet index based on the removed pet
      const newActivePet = Math.min(activePet, petOwnerInfo.pets.length - 2)

      setActivePet(newActivePet) // Update the activePet state
      console.log(newActivePet)
    } catch (error) {
      toast.error(error?.data?.message || error?.error)
    }
  }

  // useEffect(() => {
  //   setRerender(!rerender)
  // }, [petOwnerInfo, setActivePet, activePet])

  // MODALS STUFF
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showAddPetModal, setShowAddPetModal] = useState(false)
  const openConfirmModal = () => setShowConfirmModal(true)
  const closeConfirmModal = () => setShowConfirmModal(false)
  const openAddPetModal = () => setShowAddPetModal(true)
  const closeAddPetModal = () => setShowAddPetModal(false)

  return (
    <Container className='py-5'>
      <Tab.Container id='list-group-pets' defaultActiveKey={`#${activePet}`}>
        <Row className='border border-2 border-secondary bg-secondary-light p-3 '>
          <h2 className='text-center text-primary fw-bold mt-3 mt-md-0'>
            <FaPaw className='mb-1' /> Your Pets
          </h2>
          {petOwnerInfo.pets.length ? (
            <>
              <Col
                sm={4}
                className='d-flex flex-column gap-3 justify-content-between mt-3 mt-md-0'
              >
                <ListGroup className='pets-box-list'>
                  {petOwnerInfo.pets.map((pet, index) => (
                    <ListGroup.Item
                      action
                      href={`#${index}`}
                      key={index}
                      onClick={() => setActivePet(index)}
                    >
                      <div className='d-flex gap-2'>
                        <span>
                          {pet.type === 'dog' ? (
                            <FaDog />
                          ) : pet.type === 'cat' ? (
                            <FaCat />
                          ) : (
                            <FaCarrot />
                          )}
                          {index}
                          {activePet}
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
                  {petOwnerInfo.pets.map((pet, index) => (
                    <Tab.Pane eventKey={'#' + index} key={index}>
                      <EditPetForm pet={pet} />
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Col>
            </>
          ) : (
            <div className='text-center mt-3'>
              <Button className='btn-primary w-50 ' onClick={openAddPetModal}>
                <FaSquarePlus className='mb-1' /> Add Pet
              </Button>
            </div>
          )}
        </Row>
      </Tab.Container>

      <ConfirmModal
        showConfirmModal={showConfirmModal}
        closeConfirmModal={closeConfirmModal}
        info={petOwnerInfo.pets.length && petOwnerInfo.pets[activePet]}
        confirmRemoval={confirmRemoval}
      />

      <AddPetModal
        showAddPetModal={showAddPetModal}
        closeAddPetModal={closeAddPetModal}
      />
    </Container>
  )
}
export default Pets

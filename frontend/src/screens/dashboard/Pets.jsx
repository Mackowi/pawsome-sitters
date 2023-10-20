import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap'
import {
  FaCarrot,
  FaCat,
  FaDog,
  FaPaw,
  FaSquarePlus,
  FaSquareMinus,
} from 'react-icons/fa6'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRemovePetMutation } from '../../slices/petOwnersApiSlice'
import { setPetOwnerInfo } from '../../slices/petOwnerSlice'
import EditPetForm from './EditPetForm'
import AddPetModal from './AddPetModal'
import DeletePetModal from '../../components/modals/DeletePetModal'
import { toast } from 'react-toastify'

function Pets() {
  const { petOwnerInfo } = useSelector((state) => state.petOwner)
  const [activePet, setActivePet] = useState(0)

  const dispatch = useDispatch()

  const [removePet] = useRemovePetMutation()

  const confirmRemoval = async () => {
    try {
      const res = await removePet(petOwnerInfo.pets[activePet]._id).unwrap()
      dispatch(setPetOwnerInfo(res))
      toast.success('Pet removed')
      setActivePet(0)
    } catch (error) {
      toast.error(error?.data?.message || error?.error)
    }
  }

  // MODALS STUFF
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showAddPetModal, setShowAddPetModal] = useState(false)
  const openConfirmModal = () => setShowConfirmModal(true)
  const closeConfirmModal = () => setShowConfirmModal(false)
  const openAddPetModal = () => setShowAddPetModal(true)
  const closeAddPetModal = () => setShowAddPetModal(false)

  return (
    <Container className='py-5'>
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
                    className={index === activePet && 'active'}
                    key={index}
                    onClick={() => {
                      setActivePet(index)
                    }}
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
              <EditPetForm pet={petOwnerInfo.pets[activePet]} />
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

      <DeletePetModal
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

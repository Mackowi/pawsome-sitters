import { Modal, Button } from 'react-bootstrap'

function DeletePetModal({
  showConfirmModal,
  closeConfirmModal,
  info,
  confirmRemoval,
}) {
  return (
    <Modal show={showConfirmModal} onHide={closeConfirmModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Pet Removal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete {info && info.name}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant='btn btn-outline-primary' onClick={closeConfirmModal}>
          Cancel
        </Button>
        <Button
          variant='primary'
          onClick={() => {
            confirmRemoval()
            closeConfirmModal()
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default DeletePetModal

import { Modal, Button } from 'react-bootstrap'

function ConfirmModal({ showConfirmModal, closeConfirmModal, info }) {
  return (
    <Modal show={showConfirmModal} onHide={closeConfirmModal}>
      <Modal.Header closeButton>
        <Modal.Title>Pet Removal</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete {info.name}?</Modal.Body>
      <Modal.Footer>
        <Button variant='btn btn-outline-primary' onClick={closeConfirmModal}>
          Cancel
        </Button>
        <Button variant='primary' onClick={closeConfirmModal}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ConfirmModal

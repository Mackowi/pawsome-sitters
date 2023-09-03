import { Modal, Button } from 'react-bootstrap'

function ContactModal({ showContactModal, closeContactModal, info }) {
  return (
    <Modal show={showContactModal} onHide={closeContactModal}>
      <Modal.Header closeButton>
        <Modal.Title>Contact with {info}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure</Modal.Body>
      <Modal.Footer>
        <Button variant='btn btn-outline-primary' onClick={closeContactModal}>
          Cancel
        </Button>
        <Button
          variant='primary'
          onClick={() => {
            closeContactModal()
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ContactModal

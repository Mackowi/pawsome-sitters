import { Modal, Button } from 'react-bootstrap'

function ContactModal({ showContactModal, closeContactModal, info }) {
  return (
    <Modal show={showContactModal} onHide={closeContactModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Request Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You're sending a service request to {<strong>{info}</strong>}. By
        confirming, you agree to the rules and confirm the request.
      </Modal.Body>
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
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ContactModal

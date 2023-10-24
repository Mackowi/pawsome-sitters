import { Modal, Button } from 'react-bootstrap'

function ConfirmServiceRequestModal({
  showConfirmServiceRequestModal,
  setShowConfirmServiceRequestModal,
  checkAvailability,
  info,
}) {
  return (
    <Modal
      show={showConfirmServiceRequestModal}
      onHide={() => setShowConfirmServiceRequestModal(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Request Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You're sending a service request to{' '}
        {<strong>{info.patron.firstName}</strong>}. By confirming, you agree to
        the rules and confirm the request.
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='btn btn-outline-primary'
          onClick={() => setShowConfirmServiceRequestModal(false)}
        >
          Cancel
        </Button>
        <Button
          variant='primary'
          onClick={() => {
            checkAvailability()
            setShowConfirmServiceRequestModal(false)
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ConfirmServiceRequestModal

import { Modal, Button } from 'react-bootstrap'

function ConfirmServiceRequestModal({
  showConfirmServiceRequestModal,
  closeConfirmServiceRequestModal,
  info,
  startTime,
  endTime,
  date,
}) {
  return (
    <Modal
      show={showConfirmServiceRequestModal}
      onHide={closeConfirmServiceRequestModal}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Request Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You're sending a service request to {<strong>{info}</strong>}. By
        confirming, you agree to the rules and confirm the request.
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='btn btn-outline-primary'
          onClick={closeConfirmServiceRequestModal}
        >
          Cancel
        </Button>
        <Button
          variant='primary'
          // onClick={() => formatDatesDb(startTime, endTime, date)}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ConfirmServiceRequestModal

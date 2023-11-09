import { Modal, Button } from 'react-bootstrap'

function ConfirmReviewModal({
  showConfirmReviewModal,
  closeConfirmReviewModal,
  submitHandler,
}) {
  return (
    <Modal
      show={showConfirmReviewModal}
      onHide={closeConfirmReviewModal}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm Review Submit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Press confirm to submit the review for selected service.
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='btn btn-outline-primary'
          onClick={closeConfirmReviewModal}
        >
          Cancel
        </Button>
        <Button
          variant='primary'
          onClick={() => {
            submitHandler()
            closeConfirmReviewModal()
          }}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ConfirmReviewModal

import { Card, Button } from 'react-bootstrap'
import { FaDog, FaHouseUser } from 'react-icons/fa'

function RoleChoser({ setRole }) {
  return (
    <>
      <Card className='bg-primary-light mt-5 text-center choice-card mx-auto'>
        <Card.Body>
          <Card.Title>
            <h4>Are you pet owner or patron?</h4>
          </Card.Title>
          <Card.Text>Choose a role:</Card.Text>
          <div className='d-flex justify-content-evenly'>
            <Button
              onClick={() => setRole('petOwner')}
              className='d-flex flex-column justify-content-center fw-bold choice-button'
            >
              <FaDog className='mx-auto' />
              <p className='mx-auto mb-0'>Pet Owner</p>
            </Button>
            <Button
              onClick={() => setRole('patron')}
              className='d-flex flex-column justify-content-center fw-bold choice-button'
            >
              <FaHouseUser className='mx-auto' />
              <p className='mx-auto mb-0'>Patron</p>
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}
export default RoleChoser

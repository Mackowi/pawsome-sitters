import { Card, Button } from 'react-bootstrap'
import Loader from '../Loader'
import { FaDog, FaHouseUser } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useUpdateMutation } from '../../slices/usersApiSlice'
import { setCredentials } from '../../slices/userSlice'
import { toast } from 'react-toastify'

function RoleCoser() {
  const dispatch = useDispatch()

  const [update, { isLoading }] = useUpdateMutation()

  const choiceHandler = async (role) => {
    const roleConfigured = true
    try {
      const res = await update({ role, roleConfigured }).unwrap()
      dispatch(setCredentials({ ...res }))
    } catch (error) {
      toast.error(error?.data?.message || error?.error)
    }
  }

  return (
    <>
      <Card className='bg-secondary-light mt-5 text-center choice-card mx-auto'>
        <Card.Body>
          <Card.Title>
            <h4>Are you pet owner or patron?</h4>
          </Card.Title>
          <Card.Text>Choose a role:</Card.Text>
          <div className='d-flex justify-content-evenly'>
            <Button
              onClick={() => choiceHandler('petOwner')}
              className='d-flex flex-column justify-content-center fw-bold choice-button'
            >
              <FaDog className='mx-auto' />
              <p className='mx-auto mb-0'>Pet Owner</p>
            </Button>
            <Button
              onClick={() => choiceHandler('patron')}
              className='d-flex flex-column justify-content-center fw-bold choice-button'
            >
              <FaHouseUser className='mx-auto' />
              <p className='mx-auto mb-0'>Patron</p>
            </Button>
          </div>
        </Card.Body>
      </Card>
      {isLoading && <Loader />}
    </>
  )
}
export default RoleCoser

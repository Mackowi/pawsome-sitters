import { Card, Row, Col, Button } from 'react-bootstrap'
import { FaDog, FaUserEdit, FaFileAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function EditBox() {
  const { userInfo } = useSelector((state) => state.user)

  return (
    <Card className='py-3 my-2 border-primary border-3 bg-primary-light'>
      <Row className='text-center'>
        {userInfo.role === 'petOwner' ? (
          <>
            <Col md={4} className='mb-4 mb-md-0'>
              <FaDog size={30} className='text-primary fw-bold' />
              <h4 className='text-primary fw-bold mb-3'>Pets</h4>
              <Link to='/dashboard/pets'>
                <Button variant='primary' className='fw-bold'>
                  Edit Pets
                </Button>
              </Link>
            </Col>
            <Col md={4} className='mb-4 mb-md-0'>
              <FaUserEdit size={30} className='text-primary fw-bold' />
              <h4 className='text-primary fw-bold mb-3'>Profile Settings</h4>
              <Link to='/dashboard/editprofile'>
                <Button variant='primary' className='fw-bold'>
                  Edit Profile
                </Button>
              </Link>
            </Col>
            <Col md={4} className='mb-4 mb-md-0'>
              <FaFileAlt size={30} className='text-primary fw-bold' />
              <h4 className='text-primary fw-bold mb-3'>Account Settings</h4>
              <Link to='/dashboard/editaccount'>
                <Button variant='primary' className='fw-bold'>
                  Edit Account
                </Button>
              </Link>
            </Col>
          </>
        ) : (
          <>
            <Col md={6} className='mb-4 mb-md-0'>
              <FaFileAlt size={30} className='text-primary fw-bold' />
              <h4 className='text-primary fw-bold mb-3'>Account Settings</h4>
              <Link to='/dashboard/editaccount'>
                <Button variant='primary' className='fw-bold'>
                  Edit Account
                </Button>
              </Link>
            </Col>
            <Col md={6} className='mb-md-0'>
              <FaUserEdit size={30} className='text-primary fw-bold' />
              <h4 className='text-primary fw-bold mb-3'>Profile Settings</h4>
              <Link to='/dashboard/editprofile'>
                <Button variant='primary' className='fw-bold'>
                  Edit Profile
                </Button>
              </Link>
            </Col>
          </>
        )}
      </Row>
    </Card>
  )
}
export default EditBox

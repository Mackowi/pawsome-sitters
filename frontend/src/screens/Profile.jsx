import { Container, Row, Col } from 'react-bootstrap'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import RoleCoserCard from '../components/RoleChoserCard'
import CreatePatronProfile from '../components/CreatePatronProfile'
import CreatePetOwnerProfile from '../components/CreatePetOwnerProfile'

function Profile() {
  const { userInfo } = useSelector((state) => state.user)
  const { patronInfo } = useSelector((state) => state.patron)

  const navigate = useNavigate()

  useEffect(() => {
    if (patronInfo) {
      navigate('/dashboard')
    }
  }, [navigate, patronInfo])

  return (
    <Container>
      {!userInfo.role ? (
        <RoleCoserCard></RoleCoserCard>
      ) : userInfo.role === 'petOwner' ? (
        <Row className='my-5'>
          <Col>
            <CreatePetOwnerProfile />
          </Col>
        </Row>
      ) : (
        <Row className='my-5'>
          <Col>
            <CreatePatronProfile />
          </Col>
        </Row>
      )}
    </Container>
  )
}
export default Profile

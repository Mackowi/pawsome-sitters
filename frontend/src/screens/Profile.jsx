import { Container, Row, Col } from 'react-bootstrap'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import RoleChoser from '../components/profile/RoleChoser'
import CreatePatronProfile from '../components/profile/CreatePatronProfile'
import CreatePetOwnerProfile from '../components/profile/CreatePetOwnerProfile'

function Profile() {
  const { userInfo } = useSelector((state) => state.user)
  const { patronInfo } = useSelector((state) => state.patron)
  const { petOwnerInfo } = useSelector((state) => state.petOwner)

  const navigate = useNavigate()

  useEffect(() => {
    if (patronInfo || petOwnerInfo) {
      navigate('/dashboard')
    } else {
    }
  }, [navigate])

  return (
    <Container>
      {!userInfo.role ? (
        <RoleChoser></RoleChoser>
      ) : userInfo.role === 'petOwner' ? (
        <Row>
          <Col>
            <CreatePetOwnerProfile />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <CreatePatronProfile />
          </Col>
        </Row>
      )}
    </Container>
  )
}
export default Profile

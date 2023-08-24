import { Container, Row, Col } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import RoleChoser from '../components/profile/RoleChoser'
import CreatePatronProfile from '../components/profile/CreatePatronProfile'
import CreatePetOwnerProfile from '../components/profile/CreatePetOwnerProfile'

function Profile() {
  const [role, setRole] = useState(null)
  const { userInfo } = useSelector((state) => state.user)

  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo.role) {
      navigate('/dashboard')
    }
  }, [userInfo, navigate])

  return (
    <Container>
      {!role ? (
        <RoleChoser setRole={setRole}></RoleChoser>
      ) : role === 'petOwner' ? (
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

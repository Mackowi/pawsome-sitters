import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import RoleCoserCard from '../components/RoleChoserCard'
import CreatePatronProfile from '../components/CreatePatronProfile'

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
            <>'PetOwner profile'</>
          </Col>
        </Row>
      ) : (
        <Row className='my-5'>
          <Col>
            <CreatePatronProfile></CreatePatronProfile>
          </Col>
        </Row>
      )}
    </Container>
  )
}
export default Profile

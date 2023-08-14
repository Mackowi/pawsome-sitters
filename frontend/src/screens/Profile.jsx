import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import ProfileChoiceCard from '../components/ProfileChoiceCard'
import ProfileCreateForm from '../components/ProfileCreateForm'
import patronFormPic from '../assets/images/patronFormPic.png'

function Profile() {
  const { userInfo } = useSelector((state) => state.user)

  return (
    <Container>
      {!userInfo.role ? (
        <ProfileChoiceCard></ProfileChoiceCard>
      ) : userInfo.role === 'petOwner' ? (
        <Row className='my-5'>
          <Col lg={4} className='d-flex flex-column justify-content-between'>
            <h3>Please fill the form</h3>
            <img
              src={patronFormPic}
              alt='dogcat'
              className='img-fluid d-none d-lg-flex me-3'
            />
            <div></div>
          </Col>
          <Col lg={8}>
            <ProfileCreateForm></ProfileCreateForm>
          </Col>
        </Row>
      ) : (
        <>'Patron profile'</>
      )}
    </Container>
  )
}
export default Profile

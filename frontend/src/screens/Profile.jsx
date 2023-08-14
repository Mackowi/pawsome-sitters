import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import ProfileChoiceCard from '../components/ProfileChoiceCard'

function Profile() {
  const { userInfo } = useSelector((state) => state.user)

  return (
    <Container>
      {!userInfo.role ? (
        <ProfileChoiceCard></ProfileChoiceCard>
      ) : userInfo.role === 'petOwner' ? (
        <>'Petowner profile'</>
      ) : (
        <>'Patron profile'</>
      )}
    </Container>
  )
}
export default Profile

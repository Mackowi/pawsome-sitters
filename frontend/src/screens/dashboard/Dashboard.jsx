import { Container, Row, Col } from 'react-bootstrap'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import RequestBox from '../../components/dashboard/RequestBox'
import SearchMap from '../../components/dashboard/SearchMap'
import EditBox from '../../components/dashboard/EditBox'
import HistoryBox from '../../components/dashboard/HistoryBox'
import ReviewsBox from '../../components/dashboard/ReviewsBox'

function Dashboard() {
  const { userInfo } = useSelector((state) => state.user)

  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo.role) {
      navigate('/profile')
    }
  }, [userInfo, navigate])

  return (
    <Container>
      {userInfo.role === 'patron' ? (
        <>
          <Row className='mt-3'>
            <Col>
              <RequestBox />
            </Col>
          </Row>
          <Row className='mt-3'>
            <Col>
              <ReviewsBox />
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row className='mt-3'>
            <Col>
              <SearchMap />
            </Col>
          </Row>
          <Row>
            <Col>
              <HistoryBox />
            </Col>
          </Row>
        </>
      )}
      <Row className='my-3'>
        <Col>
          <EditBox />
        </Col>
      </Row>
    </Container>
  )
}
export default Dashboard

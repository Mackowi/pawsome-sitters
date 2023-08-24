import { Container, Row, Col } from 'react-bootstrap'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MessageBox from '../../components/dashboard/MessageBox'
import RequestBox from '../../components/dashboard/RequestBox'
import SearchMap from '../../components/dashboard/SearchMap'
import EditBox from '../../components/dashboard/EditBox'
import HistoryBox from '../../components/dashboard/HistoryBox'

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
      <>
        <Row className='mt-3'>
          <Col>
            <MessageBox />
          </Col>
        </Row>
        {userInfo.role === 'patron' ? (
          <>
            <Row>
              <Col>
                <RequestBox></RequestBox>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row>
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
        <Row className='mb-3'>
          <Col>
            <EditBox />
          </Col>
        </Row>
      </>
    </Container>
  )
}
export default Dashboard
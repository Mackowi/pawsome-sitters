import { Container, Row, Col } from 'react-bootstrap'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import MessageBox from '../components/dashboard/MessageBox'
import SearchMap from '../components/dashboard/SearchMap'
import EditBox from '../components/dashboard/EditBox'
import HistoryBox from '../components/dashboard/HistoryBox'
import { useGetUserProfileQuery } from '../slices/usersApiSlice'
import { setPatronInfo } from '../slices/patronSlice'
import { setPetOwnerInfo } from '../slices/petOwnerSlice'

function Dashboard() {
  const { userInfo } = useSelector((state) => state.user)
  const { patronInfo } = useSelector((state) => state.patron)
  const { petOwnerInfo } = useSelector((state) => state.petOwner)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { data: role, isLoading, error } = useGetUserProfileQuery(userInfo.role)

  useEffect(() => {
    if (!userInfo) {
      navigate('/profile')
    }
    if (role) {
      if (userInfo.role === 'patron') {
        dispatch(setPatronInfo(role[0]))
      } else {
        dispatch(setPetOwnerInfo(role[0]))
      }
    }
  }, [role, userInfo, navigate, dispatch])

  return (
    <Container>
      {error ? (
        <h1>{error}</h1>
      ) : isLoading ? (
        <Loader />
      ) : (
        <>
          <Row className='mt-3'>
            <Col>
              <MessageBox />
            </Col>
          </Row>
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
          <Row className='mb-3'>
            <Col>
              <EditBox />
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
}
export default Dashboard

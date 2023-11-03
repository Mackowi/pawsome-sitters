import { Card, Row, Col } from 'react-bootstrap'
import { FaPersonCircleQuestion, FaBusinessTime } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useGetPatronsAvailabilityQuery } from '../../slices/patronsApiSlice'
import RequestBoxEntry from './RequestBoxEntry'

function RequestBox() {
  const { patronInfo } = useSelector((state) => state.patron)

  const [pendingRequests, setPendingRequests] = useState([])

  const { data: bookedServicesForPatron, refetch } =
    useGetPatronsAvailabilityQuery(patronInfo._id)

  useEffect(() => {
    if (bookedServicesForPatron && bookedServicesForPatron.length) {
      const requestsToAccept = bookedServicesForPatron.filter(
        (request) => request.accepted === null
      )
      setPendingRequests(requestsToAccept)
    }
  }, [bookedServicesForPatron])

  return (
    <Card className='p-3 my-2 border-primary bg-primary-light border-3 request-box text-center'>
      <h2 className='pb-1 text-primary fw-bold'>
        <FaBusinessTime className='mb-2' /> Upcoming service
      </h2>
      <Row className='text-start d-flex justify-content-center mb-1 '>
        <Col>
          <h1>Requuest bla bla</h1>
        </Col>
      </Row>
      <h2 className='pb-1 text-primary fw-bold'>
        <FaPersonCircleQuestion className='mb-2' /> Pending Requests
      </h2>
      <Row className='text-start d-flex justify-content-center mb-1 '>
        <Col>
          {pendingRequests.length ? (
            <div className='list-group request-box-list'>
              {pendingRequests.map((service, index) => (
                <RequestBoxEntry
                  key={index}
                  service={service}
                  refetch={refetch}
                />
              ))}
            </div>
          ) : (
            <h5 className='text-center my-3'>There are no requests to check</h5>
          )}
        </Col>
      </Row>
    </Card>
  )
}
export default RequestBox

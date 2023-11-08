import { Card, Row, Col } from 'react-bootstrap'
import { FaPersonCircleQuestion, FaBusinessTime } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useGetPatronsAvailabilityQuery } from '../../slices/patronsApiSlice'
import RequestBoxEntry from './RequestBoxEntry'
import { compareStartDates, formatDateTimeToDisplay } from '../../utils/date'
import CountdownTimer from './CountdownTimer'

function RequestBox() {
  const { patronInfo } = useSelector((state) => state.patron)

  const [pendingRequests, setPendingRequests] = useState([])
  const [upcomingService, setUpcomingService] = useState(null)

  const { data: bookedServicesForPatron, refetch } =
    useGetPatronsAvailabilityQuery(patronInfo._id)

  useEffect(() => {
    if (bookedServicesForPatron && bookedServicesForPatron.length) {
      const requestsToAccept = bookedServicesForPatron.filter(
        (request) => request.accepted === null
      )
      console.log(bookedServicesForPatron)
      setPendingRequests(requestsToAccept)
      const upcomingServices = bookedServicesForPatron.filter(
        (request) => request.accepted === true
      )
      const sortedServices = upcomingServices.slice().sort(compareStartDates)
      setUpcomingService(sortedServices[0])
    }
  }, [bookedServicesForPatron])

  return (
    <Card className='p-3 my-2 border-primary bg-primary-light border-3  text-center'>
      <h2 className='text-primary fw-bold'>
        <FaBusinessTime className='mb-2' /> Upcoming service
      </h2>
      {upcomingService ? (
        <Row className='mx-5 mb-1'>
          <Card className='p-3 text-center d-flex '>
            <div className='d-flex justify-content-around mt-3 gap-2'>
              <h5 className='border border-primary border-3 rounded-2 py-2 p-md-3'>
                Type of service: <strong>{upcomingService.service}</strong>
              </h5>
              <h5 className='border border-primary border-3 rounded-2 py-2 p-md-3'>
                {upcomingService.pets.length > 1 ? (
                  <span>
                    Pets: <strong>{upcomingService.pets.join(', ')}</strong>
                  </span>
                ) : (
                  <span>
                    Pet: <strong>{upcomingService.pets[0]}</strong>
                  </span>
                )}
              </h5>
            </div>
            <p className='text-center mb-0 mt-3'>
              Begining of service:{' '}
              <span className='fw-bold'>
                {formatDateTimeToDisplay(upcomingService.startDate)}
              </span>
            </p>
            <p className='text-center mb-0'>
              End of service:{' '}
              <span className='fw-bold'>
                {formatDateTimeToDisplay(upcomingService.endDate)}
              </span>
            </p>
            <p className='mb-0 d-flex justify-content-center'>
              Service is starting in:
              <CountdownTimer serviceStartTime={upcomingService.startDate} />
            </p>
          </Card>
        </Row>
      ) : (
        <h5 className='text-center '>You have no upcoming service</h5>
      )}
      <h2 className='text-primary fw-bold mt-3'>
        <FaPersonCircleQuestion className='mb-2' /> Pending Requests
      </h2>
      {pendingRequests.length ? (
        <Row className='mx-5'>
          <Card className='px-0 '>
            <div className='list-group request-box-list'>
              {pendingRequests.map((service, index) => (
                <RequestBoxEntry
                  key={index}
                  service={service}
                  refetch={refetch}
                />
              ))}
            </div>
          </Card>
        </Row>
      ) : (
        <h5 className='text-center'>There are no requests to check</h5>
      )}
    </Card>
  )
}
export default RequestBox

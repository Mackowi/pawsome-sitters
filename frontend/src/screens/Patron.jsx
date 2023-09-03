import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Stack,
} from 'react-bootstrap'
import { FaCarrot, FaCat, FaDog, FaMars, FaVenus } from 'react-icons/fa6'
import { useParams } from 'react-router-dom'
import { useGetPatronByIdQuery } from '../slices/patronsApiSlice'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ContactModal from '../components/ContactModal'
import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import TimeRangeSlider from '../components/TimeRangeSlider'

function Patron() {
  const { id: patronId } = useParams()
  const { petOwnerInfo } = useSelector((state) => state.petOwner)

  const {
    data: patron,
    refetch,
    isLoading,
    error,
  } = useGetPatronByIdQuery(patronId)

  // MODALS STUFF
  const [showContactModal, setShowContactModal] = useState(false)
  const openContactModal = () => setShowContactModal(true)
  const closeContactModal = () => setShowContactModal(false)

  const [value, onChange] = useState(new Date())

  const [startTime, setStartTime] = useState('12:00')
  const [endTime, setEndTime] = useState('14:00')

  // Handle start and end time changes
  const handleStartTimeChange = (time) => {
    setStartTime(time)
  }

  const handleEndTimeChange = (time) => {
    setEndTime(time)
  }

  // You can format the selected times as needed for your application
  const formattedStartTime = `${startTime}`
  const formattedEndTime = `${endTime}`

  const formatDate = (date) => {
    return date
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      .replace(/\//g, '.')
  }

  const formatDates = (dates) => {
    if (!dates) {
      return ''
    }

    if (Array.isArray(dates) && dates.length === 2) {
      const [startDate, endDate] = dates
      const formattedStartDate = formatDate(startDate)
      const formattedEndDate = formatDate(endDate)
      if (formattedStartDate === formattedEndDate) {
        return `${formattedStartDate}`
      }
      return `${formattedStartDate} - ${formattedEndDate}`
    } else if (dates instanceof Date) {
      return formatDate(dates)
    } else {
      return 'Invalid date format'
    }
  }

  const date = formatDates(value)

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={error}>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Row className='my-4'>
            <Col md={8}>
              <Card className='p-3 pt-4 p-md-4'>
                <Col>
                  <div className='d-flex justify-content-center mb-4'>
                    <img
                      src={patron.image}
                      style={{ height: '400px' }}
                      className='img-fluid'
                    />
                  </div>
                  <div className='d-flex justify-content-between align-items-center'>
                    <h2>
                      <strong>{patron.firstName}</strong>{' '}
                      <strong>{patron.lastName}</strong>
                    </h2>
                    <h4>
                      {patron.gender === 'male' ? (
                        <FaMars className='mb-1' />
                      ) : (
                        <FaVenus className='mb-1' />
                      )}{' '}
                      {patron.gender}
                    </h4>
                  </div>
                  <Row>
                    <div className='mt-4'>
                      <h4 className='mb-4'>Accepted pets:</h4>
                      {patron.acceptedPets.map((pet) => (
                        <div className='d-flex gap-2 ms-2'>
                          <p>{pet}</p>
                          {pet === 'dog' ? (
                            <FaDog />
                          ) : pet === 'cat' ? (
                            <FaCat />
                          ) : (
                            <FaCarrot />
                          )}
                        </div>
                      ))}
                    </div>
                  </Row>
                  <Row>
                    <div className='mt-2'>
                      <h4 className='mb-4'>Provided services:</h4>
                      {patron.service.map((service) => (
                        <div className='d-flex gap-2 ms-2'>
                          <p>{service}</p>
                        </div>
                      ))}
                    </div>
                  </Row>
                  <Row>
                    <h4 className='mt-2'>About {patron.firstName}</h4>
                    <p>{patron.description}</p>
                  </Row>
                  <Row>
                    <h3>Select Start and End Times</h3>
                    <Calendar
                      selectRange={true}
                      className='my-4'
                      onChange={onChange}
                      value={value}
                    />
                    <div className='my-4'>
                      <TimeRangeSlider
                        handleStartTimeChange={handleStartTimeChange}
                        handleEndTimeChange={handleEndTimeChange}
                      />
                    </div>
                    <div className='div'>
                      <p>{date}</p>
                      <p>
                        {startTime} - {endTime}
                      </p>
                    </div>
                  </Row>
                </Col>
              </Card>
            </Col>
            <Col className='d-none d-md-block' md={4}>
              <Card className='p-3 d-flex gap-4 sticky-top sticky-offset'>
                <Row className='pb-3 border-bottom'>
                  <Col xl={5} className='text-center mb-3'>
                    <img
                      src={patron.image}
                      style={{ width: '125px', height: '125px' }}
                      className='rounded-circle'
                    />
                  </Col>
                  <Col xl={7}>
                    <h4 className='mb-3'>
                      <strong>{patron.firstName}</strong>{' '}
                      <strong>{patron.lastName}</strong>
                    </h4>
                    <p className='mb-0'>{patron.address.street}</p>
                    <p>{patron.address.city}</p>
                  </Col>
                </Row>
                <Row className='pb-4'>
                  <Col>
                    <Stack direction='horizontal' gap={1}>
                      {patron.service.map((serv) => (
                        <Badge bg='secondary' key={serv}>
                          {serv}
                        </Badge>
                      ))}
                    </Stack>
                  </Col>
                </Row>
                <Row>
                  <Button
                    style={{ width: '300px' }}
                    className='mx-auto'
                    onClick={() => {
                      openContactModal()
                    }}
                  >
                    Contact {patron.firstName}
                  </Button>
                </Row>
              </Card>
            </Col>
          </Row>
          <ContactModal
            showContactModal={showContactModal}
            closeContactModal={closeContactModal}
            info={patron.firstName}
          />
        </>
      )}
    </Container>
  )
}
export default Patron

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Stack,
  Form,
} from 'react-bootstrap'
import { FaCarrot, FaCat, FaDog, FaMars, FaVenus } from 'react-icons/fa6'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetPatronByIdQuery } from '../slices/patronsApiSlice'
import Calendar from 'react-calendar'
import '../assets/styles/calendar.css'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ContactModal from '../components/ContactModal'
import DoubleTimeRangeSlider from '../components/DoubleTimeRangeSlider'
import SingleTimeRangeSlider from '../components/SingleTimeRangeSlider'

function Patron() {
  const { id: patronId } = useParams()
  const { petOwnerInfo } = useSelector((state) => state.petOwner)

  const {
    data: patron,
    refetch,
    isLoading,
    error,
  } = useGetPatronByIdQuery(patronId)

  const [startTime, setStartTime] = useState('12:00')
  const [endTime, setEndTime] = useState('14:00')
  const [date, setDate] = useState(new Date())
  const [pickedServices, setPickedServices] = useState([])
  const [pickedPets, setPickedPets] = useState([])
  const [recurringService, setRecurringService] = useState(false)

  const [showContactModal, setShowContactModal] = useState(false)
  const openContactModal = () => setShowContactModal(true)
  const closeContactModal = () => setShowContactModal(false)

  const handleStartTimeChange = (time) => {
    setStartTime(time)
  }
  const handleEndTimeChange = (time) => {
    setEndTime(time)
  }

  const handlePetChange = (petName) => {
    if (pickedPets.includes(petName)) {
      setPickedPets(pickedPets.filter((name) => name !== petName))
    } else {
      setPickedPets([...pickedPets, petName])
    }
  }

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

  const formattedDate = formatDates(date)

  // console.log(pickedPets)
  // console.log(pickedServices)

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={error}>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Row className='my-4'>
            <Col lg={8}>
              <Card className='p-3 pt-4 p-md-4'>
                <Col>
                  <div className='d-flex justify-content-center mb-4'>
                    <img
                      src={patron.image}
                      style={{ maxHeight: '500px' }}
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
                        <div className='d-flex gap-2 ms-2' key={pet}>
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
                        <div className='d-flex gap-2 ms-2' key={service}>
                          <p>{service}</p>
                        </div>
                      ))}
                    </div>
                  </Row>
                  <Row>
                    <h4 className='mt-2'>About {patron.firstName}</h4>
                    <p>{patron.description}</p>
                  </Row>
                  <Row className='mt-4'>
                    <h3>Select your pets </h3>
                    <div className='my-4'>
                      <ul className='list-unstyled d-flex gap-5 justify-content-center'>
                        {petOwnerInfo.pets.map((pet) => (
                          <Form.Check
                            key={pet.name}
                            inline
                            label={pet.name}
                            name={pet.name}
                            type='checkbox'
                            value={pet.name}
                            checked={pickedPets.includes(pet.name)}
                            onChange={() => handlePetChange(pet.name)}
                          />
                        ))}
                      </ul>
                    </div>
                    <h3>Select the type of service</h3>
                    <div className='my-4'>
                      <ul className='list-unstyled d-flex justify-content-center'>
                        {patron.service.map((service) => (
                          <Form.Check
                            key={service}
                            inline
                            label={service}
                            name={service}
                            type='radio'
                            value={service}
                            checked={service === pickedServices}
                            onChange={() => setPickedServices(service)}
                          />
                        ))}
                      </ul>
                    </div>
                    <h3>Select time range of the service</h3>
                    <div className='text-center mt-3 d-flex flex-column'>
                      {pickedServices !== 'sitting' && (
                        <Form.Check
                          className='mx-auto'
                          inline
                          key={'recurring'}
                          label={'Recurring Service Days'}
                          name={'recurring'}
                          type='checkbox'
                          checked={recurringService}
                          onChange={() =>
                            setRecurringService(!recurringService)
                          }
                        />
                      )}
                      <Calendar
                        selectRange={true}
                        className='my-4 mx-auto'
                        onChange={(newDates) => {
                          const range = formatDates(newDates)
                          if (range.match(/(.*) - (.*)/gi)) {
                            setRecurringService(true)
                          } else {
                            setRecurringService(false)
                          }
                          setDate(newDates)
                        }}
                        value={date}
                      />
                      <p className='text-center fw-bold border-bottom mx-auto border-primary border-2 mt-3'>{`${formatDates(
                        date
                      )}`}</p>
                    </div>
                    <div className='mb-4'>
                      {pickedServices !== 'sitting' ? (
                        <SingleTimeRangeSlider
                          handleStartTimeChange={handleStartTimeChange}
                          handleEndTimeChange={handleEndTimeChange}
                        />
                      ) : (
                        <DoubleTimeRangeSlider
                          handleStartTimeChange={handleStartTimeChange}
                          handleEndTimeChange={handleEndTimeChange}
                        />
                      )}
                    </div>
                  </Row>
                  <Card className='p-3 mt-5 d-flex gap-4 d-lg-none'>
                    <Row className='pb-3 border-bottom d-flex align-items-center'>
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
                    {pickedPets.length > 0 && (
                      <Row className='pb-4 border-bottom'>
                        <Col className='d-flex justify-content-between align-items-start'>
                          <h5 className='mb-0'>
                            {pickedPets.length > 1 ? 'Pets:' : 'Pet:'}
                          </h5>
                          <Stack direction='horizontal' gap={1}>
                            {pickedPets.map((pet) => (
                              <Badge bg='primary' key={pet}>
                                {pet}
                              </Badge>
                            ))}
                          </Stack>
                        </Col>
                      </Row>
                    )}
                    <Row className='pb-4 border-bottom'>
                      <Col className='d-flex justify-content-between align-items-start'>
                        <h5 className='mb-0'>Service:</h5>
                        <Stack direction='horizontal' gap={1}>
                          <Badge bg='secondary' key={pickedServices}>
                            {pickedServices}
                          </Badge>
                        </Stack>
                      </Col>
                    </Row>
                    <Row className='pb-4 border-bottom'>
                      <Col className='d-flex justify-content-between align-items-center'>
                        <h5 className='mb-0'>Time and Date:</h5>
                        <div className='d-flex flex-column align-items-center text-center'>
                          <p>
                            {startTime} - {endTime}
                          </p>
                          <p>{formattedDate}</p>
                          <p className='mb-0'>
                            {recurringService && 'Recurring Service'}
                          </p>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Button
                        style={{ width: '300px' }}
                        className='mx-auto fw-bold'
                        onClick={() => {
                          openContactModal()
                        }}
                      >
                        Send request to {patron.firstName}
                      </Button>
                    </Row>
                  </Card>
                </Col>
              </Card>
            </Col>
            <Col className='d-none d-lg-block' lg={4}>
              <Card className='p-3 d-flex gap-4 sticky-top sticky-offset'>
                <Row className='pb-3 border-bottom d-flex align-items-center'>
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
                {pickedPets.length > 0 && (
                  <Row className='pb-4 border-bottom'>
                    <Col className='d-flex justify-content-between align-items-start'>
                      <h5 className='mb-0'>
                        {pickedPets.length > 1 ? 'Pets:' : 'Pet:'}
                      </h5>
                      <Stack direction='horizontal' gap={1}>
                        {pickedPets.map((pet) => (
                          <Badge bg='primary' key={pet}>
                            {pet}
                          </Badge>
                        ))}
                      </Stack>
                    </Col>
                  </Row>
                )}
                <Row className='pb-4 border-bottom'>
                  <Col className='d-flex justify-content-between align-items-start'>
                    <h5 className='mb-0'>Service:</h5>
                    <Stack direction='horizontal' gap={1}>
                      <Badge bg='secondary' key={pickedServices}>
                        {pickedServices}
                      </Badge>
                    </Stack>
                  </Col>
                </Row>
                <Row className='pb-4 border-bottom'>
                  <Col className='d-flex justify-content-between align-items-center'>
                    <h5 className='mb-0'>Time and Date:</h5>
                    <div className='d-flex flex-column text-center'>
                      <p>
                        {startTime} - {endTime}
                      </p>
                      {recurringService ? (
                        <p>{formattedDate}</p>
                      ) : (
                        <p className='mb-0'>{formattedDate}</p>
                      )}
                      <p className='mb-0'>
                        {recurringService && 'Recurring Service'}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row></Row>
                <Row>
                  <Button
                    style={{ width: '300px' }}
                    className='mx-auto fw-bold'
                    onClick={() => {
                      openContactModal()
                    }}
                  >
                    Send request to {patron.firstName}
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

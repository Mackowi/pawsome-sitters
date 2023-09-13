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
import {
  FaCarrot,
  FaCat,
  FaDog,
  FaPersonWalking,
  FaHouse,
  FaSchool,
} from 'react-icons/fa6'
import { ReactComponent as Wave } from '../assets/wave.svg'
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
import Rating from '../components/Rating'
import { DateTime } from 'luxon'
import { formatDates, formatDatesDb } from '../utils/dates'

function Patron() {
  const { id: patronId } = useParams()
  const { petOwnerInfo } = useSelector((state) => state.petOwner)

  const { data: patron, isLoading, error } = useGetPatronByIdQuery(patronId)

  const [startTime, setStartTime] = useState('12:00')
  const [endTime, setEndTime] = useState('14:00')
  const [date, setDate] = useState(new Date())
  const [pickedServices, setPickedServices] = useState([])
  const [pickedPets, setPickedPets] = useState([])
  const [recurringService, setRecurringService] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const openContactModal = () => setShowContactModal(true)
  const closeContactModal = () => setShowContactModal(false)

  const handlePetChange = (petName) => {
    if (pickedPets.includes(petName)) {
      setPickedPets(pickedPets.filter((name) => name !== petName))
    } else {
      setPickedPets([...pickedPets, petName])
    }
  }

  const formattedDate = formatDates(date)

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
                      style={{ maxWidth: 'auto' }}
                      className='img-fluid'
                    />
                  </div>
                  <h2 className='text-center'>
                    <strong>{patron.firstName}</strong>{' '}
                    <strong>{patron.lastName}</strong>{' '}
                  </h2>

                  <Row className='mt-4'>
                    <Col>
                      <div className='d-flex flex-column align-items-center gap-4'>
                        <h4 className='mb-2'>Accepted pets:</h4>
                        {patron.acceptedPets.map((pet) => (
                          <div
                            className='d-flex gap-2 ms-2 align-items-center'
                            key={pet}
                          >
                            {pet === 'dog' ? (
                              <FaDog />
                            ) : pet === 'cat' ? (
                              <FaCat />
                            ) : (
                              <FaCarrot />
                            )}
                            <p className='mb-0'>{pet}</p>
                          </div>
                        ))}
                      </div>
                    </Col>
                    <Col>
                      <div className='d-flex flex-column align-items-center gap-4'>
                        <h4 className='mb-2'>Provided services:</h4>
                        {patron.service.map((service) => (
                          <div
                            className='d-flex gap-2 ms-2 align-items-center'
                            key={service}
                          >
                            {service === 'walking' ? (
                              <FaPersonWalking />
                            ) : service === 'sitting' ? (
                              <FaHouse />
                            ) : (
                              <FaSchool />
                            )}
                            <p className='mb-0'>{service}</p>
                          </div>
                        ))}
                      </div>
                    </Col>
                  </Row>
                  <Row className='mt-5'>
                    <Col className='d-flex justify-content-center'>
                      <h4 className='mt-1 me-2'>Rating: </h4>
                      <Rating view={true} avgRating={patron.avgRating} />
                    </Col>
                  </Row>
                  <Row className='text-center'>
                    <h4 className='mt-4 '>About {patron.firstName}</h4>
                    <p>{patron.description}</p>
                  </Row>

                  <Row className='mt-4 text-center border border-primary border-2 rounded-2'>
                    <div className='wave-container px-0'>
                      <Wave />
                      <p className='wave-text fw-bold fs-4 '>Service details</p>
                    </div>
                    <h4>Select your pets </h4>
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
                    <h4>Select the type of service</h4>
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
                    <h4>Select time range of the service</h4>
                    <div className='text-center mt-3 d-flex flex-column'>
                      <Calendar
                        selectRange={true}
                        className='my-3 mx-auto'
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
                      {pickedServices === 'sitting' ? (
                        <></>
                      ) : recurringService ? (
                        <p className='mb-0 fw-bold '>Reccuring Service</p>
                      ) : (
                        <></>
                      )}
                      <p className='text-center fw-bold border-bottom mx-auto border-primary border-2 my-3'>{`${formatDates(
                        date
                      )}`}</p>
                    </div>
                    <div className='mb-5'>
                      {pickedServices !== 'sitting' ? (
                        <SingleTimeRangeSlider
                          setStartTime={setStartTime}
                          setEndTime={setEndTime}
                        />
                      ) : (
                        <DoubleTimeRangeSlider
                          setStartTime={setStartTime}
                          setEndTime={setEndTime}
                        />
                      )}
                    </div>
                  </Row>
                  {/* PANEL AT THE BOTTOM FOR SMALL SCREENS */}
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
            {/* PANEL ON THE RIGHT SIDE FOR BIG SCREENS */}
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
                        {pickedServices === 'sitting' ? (
                          <></>
                        ) : recurringService ? (
                          <p className='mb-0 '>Reccuring Service</p>
                        ) : (
                          <></>
                        )}
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
          </Row>
          <ContactModal
            showContactModal={showContactModal}
            closeContactModal={closeContactModal}
            formatDatesDb={formatDatesDb}
            info={patron.firstName}
            startTime={startTime}
            endTime={endTime}
            date={date}
          />
        </>
      )}
    </Container>
  )
}
export default Patron

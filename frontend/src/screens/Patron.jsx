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
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  useGetPatronByIdQuery,
  useGetPatronsAvailabilityMutation,
} from '../slices/patronsApiSlice'
import { useAddServiceRequestMutation } from '../slices/petOwnersApiSlice'
import Calendar from 'react-calendar'
import '../assets/styles/calendar.css'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ConfirmServiceRequestModal from '../components/modals/ConfirmServiceRequestModal'
import DoubleTimeRangeSlider from '../components/sliders/DoubleTimeRangeSlider'
import SingleTimeRangeSlider from '../components/sliders/SingleTimeRangeSlider'
import Rating from '../components/Rating'
import {
  formatDatesToDisplay,
  processDates,
  checkIfCollide,
  reccuranceHelper,
} from '../utils/date'
import { getCurrentHour } from '../utils/time'
import { toast } from 'react-toastify'

function Patron() {
  const navigate = useNavigate()
  const { id: patronId } = useParams()
  const { petOwnerInfo } = useSelector((state) => state.petOwner)

  const { data: patron, isLoading, error } = useGetPatronByIdQuery(patronId)
  const [getPatronsAvailability] = useGetPatronsAvailabilityMutation()
  const [addServiceRequest] = useAddServiceRequestMutation()

  const [startTime, setStartTime] = useState(getCurrentHour())
  const [endTime, setEndTime] = useState(getCurrentHour(2))
  const [date, setDate] = useState(new Date())
  const [pickedServices, setPickedServices] = useState([])
  const [pickedPets, setPickedPets] = useState([])
  const [recurringService, setRecurringService] = useState(false)
  const [showConfirmServiceRequestModal, setShowConfirmServiceRequestModal] =
    useState(false)

  const handlePetChange = (petName) => {
    if (pickedPets.includes(petName)) {
      setPickedPets(pickedPets.filter((name) => name !== petName))
    } else {
      setPickedPets([...pickedPets, petName])
    }
  }

  const checkAvailability = async () => {
    if (!pickedServices.length) {
      toast.error('Please pick a service ')
      return
    } else if (!pickedPets.length) {
      toast.error('Please pick a pet')
      return
    }
    try {
      const bookedServices = await getPatronsAvailability({
        patronId,
      }).unwrap()
      const notAvailableDates = []
      bookedServices.forEach((service) => {
        const singleDate = {
          startDate: service.startDate,
          endDate: service.endDate,
        }
        notAvailableDates.push(singleDate)
      })
      const datesToCheck = processDates(
        startTime,
        endTime,
        date,
        recurringService
      )

      for (let i = 0; i < datesToCheck.length; i++) {
        const serviceRequest = {
          petOwner: petOwnerInfo._id,
          patron: patronId,
          service: pickedServices,
          pets: pickedPets,
          startDate: datesToCheck[i].startDate,
          endDate: datesToCheck[i].endDate,
        }
        try {
          await addServiceRequest(serviceRequest).unwrap()
          if (checkIfCollide(notAvailableDates, datesToCheck)) {
            toast.success(
              'Service request has been sent, but it needs to be confirmed by Patron due to service overlap.'
            )
          } else {
            toast.success('Service request has been sent')
          }
          navigate('/dashboard')
        } catch (error) {
          toast.error(error?.data?.message || error?.error)
        }
      }
    } catch (error) {
      toast.error(error)
    }
  }

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
                            onChange={() => {
                              setPickedServices(service)
                              if (service === 'sitting') {
                                setRecurringService(false)
                              } else {
                                setRecurringService(reccuranceHelper(date))
                              }
                            }}
                          />
                        ))}
                      </ul>
                    </div>
                    <h4>Select time range of the service</h4>
                    <div className='text-center mt-3 d-flex flex-column'>
                      <Calendar
                        selectRange={true}
                        className='mt-3 mb-4 mx-auto'
                        onChange={(newDates) => {
                          const range = formatDatesToDisplay(newDates)
                          if (
                            range.match(/(.*) - (.*)/gi) &&
                            pickedServices !== 'sitting'
                          ) {
                            setRecurringService(true)
                          } else {
                            setRecurringService(false)
                          }
                          setDate(newDates)
                        }}
                        // Disable all dates before the current date
                        tileDisabled={({ date }) => {
                          const currentDate = new Date()
                          currentDate.setHours(0, 0, 0, 0)
                          return date < currentDate
                        }}
                        value={date}
                      />
                      <div>
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

                      {pickedServices === 'sitting' ? (
                        <>
                          <p className='text-center fw-bold border-bottom mx-auto border-primary border-2 mb-3'>{`${formatDatesToDisplay(
                            date
                          )}`}</p>
                          <span className='mb-5'></span>
                        </>
                      ) : recurringService ? (
                        <>
                          <p className='text-center fw-bold border-bottom mx-auto border-primary border-2 mb-3'>{`${formatDatesToDisplay(
                            date
                          )}`}</p>
                          <p className='mb-5 fw-bold '>Reccuring Service</p>
                        </>
                      ) : (
                        <>
                          <p className='text-center fw-bold border-bottom mx-auto border-primary border-2 mb-5'>{`${formatDatesToDisplay(
                            date
                          )}`}</p>
                        </>
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
                          <p>{formatDatesToDisplay(date)}</p>
                          {pickedServices === 'sitting' ? (
                            <></>
                          ) : recurringService ? (
                            <p className='mb-0 '>Reccuring Service</p>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Button
                        style={{ width: '300px' }}
                        className='mx-auto fw-bold'
                        onClick={() => {
                          setShowConfirmServiceRequestModal(true)
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
                        <p>{formatDatesToDisplay(date)}</p>
                      ) : (
                        <p className='mb-0'>{formatDatesToDisplay(date)}</p>
                      )}
                      {pickedServices === 'sitting' ? (
                        <></>
                      ) : recurringService ? (
                        <p className='mb-0 '>Reccuring Service</p>
                      ) : (
                        <></>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Button
                    style={{ width: '300px' }}
                    className='mx-auto fw-bold'
                    onClick={() => {
                      setShowConfirmServiceRequestModal(true)
                    }}
                  >
                    Send request to {patron.firstName}
                  </Button>
                </Row>
              </Card>
            </Col>
          </Row>
          <ConfirmServiceRequestModal
            showConfirmServiceRequestModal={showConfirmServiceRequestModal}
            setShowConfirmServiceRequestModal={
              setShowConfirmServiceRequestModal
            }
            checkAvailability={checkAvailability}
            info={{ patron, pickedPets, pickedServices }}
          />
        </>
      )}
    </Container>
  )
}
export default Patron

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
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { serviceRequestSchema } from '../validationSchemas'
import {
  useGetPatronByIdQuery,
  useGetPatronsAvailabilityQuery,
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
  isOverlapping,
  reccuranceHelper,
} from '../utils/date'
import { getCurrentHour } from '../utils/time'
import { toast } from 'react-toastify'

function Patron() {
  const { id: patronId } = useParams()
  const { petOwnerInfo } = useSelector((state) => state.petOwner)

  const { data: patron, isLoading, error } = useGetPatronByIdQuery(patronId)

  const { data: bookedServicesForPatron } =
    useGetPatronsAvailabilityQuery(patronId)

  const [addServiceRequest] = useAddServiceRequestMutation()

  const [startTime, setStartTime] = useState(getCurrentHour())
  const [endTime, setEndTime] = useState(getCurrentHour(2))
  const [date, setDate] = useState(new Date())
  const [recurringService, setRecurringService] = useState(false)
  const [serviceOverlapping, setServiceOverlapping] = useState(false)
  const [serviceRequests, setServiceRequests] = useState([])
  const [showConfirmServiceRequestModal, setShowConfirmServiceRequestModal] =
    useState(false)

  const navigate = useNavigate()

  const submitHandler = async () => {
    try {
      for (let i = 0; i < serviceRequests.length; i++) {
        await addServiceRequest(serviceRequests[i]).unwrap()
      }
      if (serviceOverlapping) {
        toast.success(
          'Service request has been sent, but it needs to be confirmed by Patron due to service overlap.'
        )
      } else {
        toast.success('Service request has been sent')
      }
      window.scrollTo(0, 0)
      setTimeout(() => {
        navigate('/dashboard')
      }, 500) // Adjust the delay as needed
    } catch (error) {
      toast.error(error?.data?.message || error?.error)
    }
  }

  const checkAvailability = () => {
    const datesToCheck = processDates(
      startTime,
      endTime,
      date,
      recurringService
    )
    const requests = datesToCheck.map((dateToCheck) => ({
      petOwner: petOwnerInfo._id,
      patron: patronId,
      service: values.service,
      pets: values.pets,
      startDate: dateToCheck.startDate,
      endDate: dateToCheck.endDate,
    }))
    setServiceRequests(requests)
    const overlapping = isOverlapping(bookedServicesForPatron, datesToCheck)
    if (overlapping) {
      setServiceOverlapping(true)
    } else {
      setServiceOverlapping(false)
    }
    return overlapping
  }

  useEffect(() => {
    if (bookedServicesForPatron && bookedServicesForPatron.length) {
      checkAvailability()
    }
  }, [bookedServicesForPatron, date, startTime, endTime])

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        pets: [petOwnerInfo.pets[0].name],
        service: 'walking',
      },
      validationSchema: serviceRequestSchema,
      onSubmit: submitHandler,
    })

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
                    <Form noValidate onSubmit={handleSubmit} autoComplete='off'>
                      <Form.Group>
                        <Form.Label className='h4'>Select your pets</Form.Label>
                        <div className='mt-4 mb-5'>
                          <ul className='list-unstyled d-flex gap-5 justify-content-center'>
                            {petOwnerInfo.pets.map((pet) => (
                              <Form.Check
                                inline
                                key={pet.name}
                                label={pet.name}
                                name='pets'
                                type='checkbox'
                                value={pet.name}
                                checked={
                                  values.pets.includes(pet.name) ? true : false
                                }
                                // onChange={() => handlePetChange(pet.name)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.pets && !!errors.pets}
                              />
                            ))}
                          </ul>
                          <Form.Control.Feedback type='invalid'>
                            {errors.pets}
                          </Form.Control.Feedback>
                        </div>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label className='h4'>
                          Select the type of service
                        </Form.Label>
                        <div className='mt-4 mb-5'>
                          <ul className='list-unstyled d-flex justify-content-center'>
                            {patron.service.map((service) => (
                              <Form.Check
                                inline
                                key={service}
                                label={service}
                                name='service'
                                type='radio'
                                value={service}
                                checked={
                                  values.service === service ? true : false
                                }
                                onChange={(e) => {
                                  handleChange(e)
                                  if (e.target.value === 'sitting') {
                                    setRecurringService(false)
                                  } else {
                                    setRecurringService(reccuranceHelper(date))
                                  }
                                }}
                                isInvalid={touched.service && !!errors.service}
                              />
                            ))}
                          </ul>
                          <Form.Control.Feedback type='invalid'>
                            {errors.service}
                          </Form.Control.Feedback>
                        </div>
                      </Form.Group>
                    </Form>
                    <h4>Select time range of the service</h4>
                    <div className='text-center mt-3 d-flex flex-column'>
                      <Calendar
                        selectRange={true}
                        className='mt-3 mb-4 mx-auto'
                        onChange={(newDates) => {
                          const range = formatDatesToDisplay(newDates)
                          if (
                            range.match(/(.*) - (.*)/gi) &&
                            values.service !== 'sitting'
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
                        {values.service !== 'sitting' ? (
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

                      {values.service === 'sitting' ? (
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
                    {values.pets.length > 0 && (
                      <Row className='pb-4 border-bottom'>
                        <Col className='d-flex justify-content-between align-items-start'>
                          <h5 className='mb-0'>
                            {values.pets.length > 1 ? 'Pets:' : 'Pet:'}
                          </h5>
                          <Stack direction='horizontal' gap={1}>
                            {values.pets.map((pet) => (
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
                          <Badge bg='secondary' key={values.service}>
                            {values.service}
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
                          {values.service === 'sitting' ? (
                            <></>
                          ) : recurringService ? (
                            <p className='mb-0 '>Reccuring Service</p>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Col>
                    </Row>
                    {serviceOverlapping && (
                      <Row>
                        <Col className='text-center'>
                          <h5 className='fw-bold'>Services overlap</h5>
                          <p>Manual confirmation required by patron!</p>
                        </Col>
                      </Row>
                    )}
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
                {values.pets.length > 0 && (
                  <Row className='pb-4 border-bottom'>
                    <Col className='d-flex justify-content-between align-items-start'>
                      <h5 className='mb-0'>
                        {values.pets.length > 1 ? 'Pets:' : 'Pet:'}
                      </h5>
                      <Stack direction='horizontal' gap={1}>
                        {values.pets.map((pet) => (
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
                      <Badge bg='secondary' key={values.service}>
                        {values.service}
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
                      {values.service === 'sitting' ? (
                        <></>
                      ) : recurringService ? (
                        <p className='mb-0 '>Reccuring Service</p>
                      ) : (
                        <></>
                      )}
                    </div>
                  </Col>
                </Row>
                {serviceOverlapping && (
                  <Row>
                    <Col className='text-center'>
                      <h5 className='fw-bold'>Services overlap</h5>
                      <p>Manual confirmation required by patron!</p>
                    </Col>
                  </Row>
                )}
                <Row>
                  <Button
                    style={{ width: '250px' }}
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
            submitHandler={submitHandler}
            info={{ patron }}
          />
        </>
      )}
    </Container>
  )
}
export default Patron

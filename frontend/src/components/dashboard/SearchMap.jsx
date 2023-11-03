import { Card, Row, Col, Badge, Stack } from 'react-bootstrap'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css' // CHANGED TO LINK IN HEAD OF HTML FILE TO FIX MARKER ISSUE
import { FaMapMarkedAlt, FaArrowRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import Coords from './Coords'
import { useEffect, useState, useRef } from 'react'
import { homeIcon, primaryIcon, secondaryIcon } from './MapMarkers'
import { useGetPatronsInAreaMutation } from '../../slices/patronsApiSlice'
import { Link } from 'react-router-dom'

function SearchMap() {
  const [centerCoords, setCenterCoords] = useState(null)
  const [boundsCoords, setBoundsCoords] = useState(null)
  const [patrons, setPatrons] = useState(null)
  const [selectedPatron, setSelectedPatron] = useState(null)
  const [hoveredPatron, setHoveredPatron] = useState(null)

  const { petOwnerInfo } = useSelector((state) => state.petOwner)

  const mapRef = useRef(null)

  const [getPatronsInArea] = useGetPatronsInAreaMutation()

  useEffect(() => {
    const fetchData = async () => {
      if (centerCoords && boundsCoords) {
        try {
          const patronsInArea = await getPatronsInArea({
            centerCoords,
            boundsCoords,
          }).unwrap()
          setPatrons(patronsInArea.patrons)
        } catch (error) {
          console.error('Error fetching patrons:', error)
        }
      }
    }

    fetchData()
  }, [centerCoords, boundsCoords, setPatrons, getPatronsInArea])

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current

      const handleClick = () => {
        setSelectedPatron(null)
        setHoveredPatron(null)
      }

      map.addEventListener('click', handleClick)

      return () => {
        map.removeEventListener('click', handleClick)
      }
    }
  }, [setSelectedPatron, setHoveredPatron])

  const patronRefs = useRef({})

  const scrollToPatron = (patronId) => {
    const patronListContainer = document.getElementById('patronListContainer')
    if (patronListContainer && patronRefs.current[patronId]) {
      patronListContainer.scrollTop =
        patronRefs.current[patronId].offsetTop - patronListContainer.offsetTop
    }
  }

  return (
    <Card className='my-2 bg-primary-light border-primary border-3 search-map'>
      <Row className='p-3'>
        <Col>
          <h2 className='pt-2 text-primary fw-bold text-center'>
            <FaMapMarkedAlt className='mb-2' /> Find Patrons
          </h2>
        </Col>
      </Row>

      <Row className='px-3 mb-3'>
        <Col xl={4} className='d-flex'>
          <Card className='flex-fill'>
            <div
              id='patronListContainer'
              className='list-group search-map-list'
            >
              {patrons &&
                patrons.map((patron) => (
                  <div
                    key={patron._id}
                    ref={(el) => (patronRefs.current[patron._id] = el)}
                    onMouseEnter={() => {
                      setHoveredPatron(patron._id)
                    }}
                    onMouseLeave={() => setHoveredPatron(null)}
                    onClick={() => {
                      setSelectedPatron(patron._id)
                    }}
                    className={`list-group-item list-group-item-action ${
                      selectedPatron === patron._id ||
                      (hoveredPatron === patron._id && selectedPatron === null)
                        ? 'border border-primary border-3'
                        : ''
                    }`}
                  >
                    <div className='d-flex w-100 justify-content-between align-items-center'>
                      <div className='d-flex gap-3'>
                        <div className='my-auto'>
                          <img
                            src={patron.image}
                            alt='img'
                            className='rounded-circle'
                            style={{ height: '50px', width: '50px' }}
                          />
                        </div>
                        <div>
                          <h5 className='mb-1 fw-bold'>
                            {patron.firstName} {patron.lastName}
                          </h5>
                          <Stack
                            direction='horizontal'
                            gap={1}
                            className='mb-1'
                          >
                            {patron.service.map((serv) => (
                              <Badge bg='primary' key={serv}>
                                {serv}
                              </Badge>
                            ))}
                          </Stack>
                          <Stack direction='horizontal' gap={1}>
                            {patron.acceptedPets.map((pet) => (
                              <Badge bg='primary' key={pet}>
                                {pet}
                              </Badge>
                            ))}
                          </Stack>
                          <span>Rating: {patron.avgRating}</span>
                        </div>
                      </div>
                      <Link
                        to={`/patrons/${patron._id}`}
                        className='btn btn-primary btn-sm'
                        style={{ height: '30px' }}
                      >
                        <FaArrowRight className='mb-1' />
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </Col>
        <Col xl={8} className='mt-3 mt-xl-0'>
          <Card>
            <MapContainer
              center={[
                petOwnerInfo.address.coordinates[1],
                petOwnerInfo.address.coordinates[0],
              ]}
              scrollWheelZoom={true}
              zoom={13}
              style={{ width: '100%' }}
              className='search-map-container'
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              <Marker
                position={[
                  petOwnerInfo.address.coordinates[1],
                  petOwnerInfo.address.coordinates[0],
                ]}
                icon={homeIcon}
              ></Marker>
              {patrons &&
                patrons.map((patron, index) => (
                  <Marker
                    position={[
                      patron.address.coordinates[1],
                      patron.address.coordinates[0],
                    ]}
                    icon={
                      selectedPatron === patron._id
                        ? primaryIcon
                        : hoveredPatron === patron._id
                        ? primaryIcon
                        : secondaryIcon
                    }
                    key={index}
                    eventHandlers={{
                      mouseover: () => {
                        setHoveredPatron(patron._id)
                        scrollToPatron(patron._id)
                      },
                      mouseout: () => {
                        setHoveredPatron(null)
                      },
                      click: () => {
                        if (selectedPatron === patron._id) {
                          setSelectedPatron(null)
                        } else {
                          setSelectedPatron(patron._id)
                          scrollToPatron(patron._id)
                        }
                      },
                    }}
                  >
                    <Popup>
                      <Link
                        to={`/patrons/${patron._id}`}
                        style={{ color: 'black' }}
                      >
                        <p>Check {patron.firstName} profile</p>
                      </Link>
                    </Popup>
                  </Marker>
                ))}

              <Coords
                setCenterCoords={setCenterCoords}
                setBoundsCoords={setBoundsCoords}
              />
            </MapContainer>
          </Card>
        </Col>
      </Row>
    </Card>
  )
}
export default SearchMap

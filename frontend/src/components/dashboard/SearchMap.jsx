import { Card, Row, Col, Badge, Stack } from 'react-bootstrap'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css' // CHANGED TO LINK IN HEAD OF HTML FILE TO FIX MARKER ISSUE
import { FaMapMarkedAlt, FaRegAddressCard } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import Coords from './Coords'
import { useEffect, useState, useRef } from 'react'
import { homeIcon, primaryIcon, secondaryIcon } from '../mapIcons/icons'
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
  }, [centerCoords, boundsCoords, setPatrons])

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

  return (
    <Card className='my-2 bg-primary-light border-primary border-2 search-map'>
      <Row className='p-3'>
        <Col>
          <Card className='pt-2 bg-secondary-light border-primary border-2'>
            <h2 className=' text-primary fw-bold text-center'>
              <FaMapMarkedAlt className='mb-2' /> Find Patrons
            </h2>
          </Card>
        </Col>
      </Row>

      <Row className='px-3 mb-3'>
        <Col md={4} className='d-flex'>
          <Card className='flex-fill'>
            <div className='list-group search-map-list '>
              {patrons &&
                patrons.map((patron, index) => (
                  <div key={index}>
                    <div
                      href='#'
                      onMouseEnter={() => setHoveredPatron(patron._id)}
                      onMouseLeave={() => setHoveredPatron(null)}
                      onClick={() => {
                        setSelectedPatron(patron._id)
                      }}
                      className={`list-group-item list-group-item-action ${
                        selectedPatron === patron._id ||
                        (hoveredPatron === patron._id &&
                          selectedPatron === null)
                          ? 'bg-secondary-light'
                          : ''
                      }`}
                    >
                      <div className='d-flex w-100 justify-content-between align-items-center'>
                        <div>
                          <h5 className='mb-1 fw-bold'>
                            {patron.firstName} {patron.lastName}
                          </h5>
                          <Stack direction='horizontal' gap={1}>
                            {patron.service.map((serv) => (
                              <Badge bg='secondary'>{serv}</Badge>
                            ))}
                          </Stack>
                          <span>Rating: {patron.avgRating}</span>
                        </div>
                        <Link
                          to={`/${patron.id}`}
                          className='btn btn-primary btn-sm'
                          style={{ height: '30px' }}
                        >
                          Profile <FaRegAddressCard className='mb-1' />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </Col>
        <Col md={8} className='mt-3 mt-md-0'>
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
                      },
                      mouseout: () => {
                        setHoveredPatron(null)
                      },
                      click: () => {
                        if (selectedPatron === patron._id) {
                          setSelectedPatron(null)
                        } else {
                          setSelectedPatron(patron._id)
                        }
                      },
                    }}
                  >
                    <Popup>
                      <h1>{patron.lastName}</h1>
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

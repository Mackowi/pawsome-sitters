import { Card, Row, Col, Form, Button } from 'react-bootstrap'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css' // Import Leaflet CSS
import { FaMapMarkedAlt } from 'react-icons/fa'

function SearchMap() {
  const users = [
    {
      fullName: 'Joe Smith',
      address: '123 Main St, City',
      rating: 4.5,
    },
    {
      fullName: 'Alice Johnson',
      address: '456 Elm St, Town',
      rating: 5.0,
    },
    {
      fullName: 'Bob Anderson',
      address: '789 Oak Ave, Village',
      rating: 4.2,
    },
    {
      fullName: 'Emily Davis',
      address: '987 Pine Rd, Hamlet',
      rating: 4.8,
    },
    {
      fullName: 'Alex Wilson',
      address: '654 Maple Blvd, Suburb',
      rating: 4.6,
    },
    {
      fullName: 'Alice Johnson',
      address: '456 Elm St, Town',
      rating: 5.0,
    },
    {
      fullName: 'Bob Anderson',
      address: '789 Oak Ave, Village',
      rating: 4.2,
    },
    {
      fullName: 'Emily Davis',
      address: '987 Pine Rd, Hamlet',
      rating: 4.8,
    },
    {
      fullName: 'Alex Wilson',
      address: '654 Maple Blvd, Suburb',
      rating: 4.6,
    },
  ]

  const position = [52.35444153530397, 5.00180295828673] // Initial latitude and longitude
  return (
    <Card className='my-2 bg-primary-light border-primary border-2 search-map'>
      <Row className='p-3'>
        <Col>
          <Card className='py-3 bg-secondary-light border-primary border-2'>
            <h2 className='pb-1 text-primary fw-bold text-center'>
              <FaMapMarkedAlt className='mb-2' /> Find Patrons
            </h2>

            <Row className='d-flex align-items-start justify-content-around px-3'>
              <Col md={5} className='fw-bold mb-2'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your address'
                ></Form.Control>
              </Col>

              <Col md={5} className=' fw-bold mb-2'>
                <Form.Label>Distance</Form.Label>
                <Form.Range typeof='range' min={0} max={4} step={1} />
                <div className='d-flex justify-content-between '>
                  <p className='mb-0'>1</p>
                  <p className='mb-0'>2</p>
                  <p className='mb-0'>3</p>
                  <p className='mb-0'>4</p>
                  <p className='mb-0'>5</p>
                </div>
              </Col>
              <Col md={2} className='mt-4'>
                <Button className='d-block w-100' variant='primary'>
                  Search
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row className='px-3 mb-3'>
        <Col md={4} className='d-flex'>
          <Card className='flex-fill'>
            <div className='list-group search-map-list '>
              {users.map((user, index) => (
                <div key={index}>
                  <a
                    href='#'
                    className='list-group-item list-group-item-action'
                  >
                    <div className='d-flex w-100 justify-content-between'>
                      <h5 className='mb-1'>{user.fullName}</h5>
                      <small>x days ago</small>
                    </div>
                    <p className='mb-1'>{user.address}</p>
                  </a>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col md={8} className='mt-3 mt-md-0'>
          <Card>
            <MapContainer
              center={position}
              zoom={13}
              style={{ width: '100%' }}
              className='search-map-container '
            >
              <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            </MapContainer>
          </Card>
        </Col>
      </Row>
    </Card>
  )
}
export default SearchMap

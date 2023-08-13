import { Container, Row, Col, Button } from 'react-bootstrap'
import { useGetPatronsQuery } from '../slices/patronsApiSlice'
import PatronCard from '../components/PatronCard'
import Loader from '../components/Loader'

function Patrons() {
  const { data: patrons, isLoading, error } = useGetPatronsQuery()

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error?.data?.message || error?.error}</div>
      ) : (
        <>
          {' '}
          <Container>
            <Row className='text-center'>
              <Col md={6}>
                <h3 className='text-secondary fw-bold mb-5 pt-5'>
                  Our Patrons
                </h3>
                <ul className='list-group list-unstyled'>
                  {patrons.map((patron) => (
                    <li key={patron._id}>
                      <PatronCard patron={patron} />
                    </li>
                  ))}
                </ul>
                <Button className='mb-md-4'>Load more</Button>
              </Col>
              <Col md={6} className='mb-5'>
                <h3 className='text-primary fw-bold pt-5 mb-5'>Locations</h3>
                <iframe
                  title='map'
                  src='https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=52.3730796,4.8924534+(Amsterdam)&amp;t=&amp;z=11&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'
                  className='w-100'
                  height='500'
                  loading='lazy'
                ></iframe>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  )
}
export default Patrons

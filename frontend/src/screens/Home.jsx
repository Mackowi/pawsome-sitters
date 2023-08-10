import { Container, Row, Col } from 'react-bootstrap'
import {
  FaUserPlus,
  FaRegMap,
  FaRegHandshake,
  FaRegCalendarAlt,
  FaBusinessTime,
  FaWalking,
  FaHome,
  FaMapMarkerAlt,
} from 'react-icons/fa'
import HomeScreenCarousel from '../components/HomeScreenCarousel'
import { Link } from 'react-router-dom'

function HomeScreen() {
  return (
    <>
      <header className='header position-relative text-center'>
        <Container>
          <Row className='offset-md-6'>
            <Col md={12} className='pt-5 text-white mt-14 mt-md-10 px-5'>
              <h1 className='xl-text mt-5'>Welcome To Pawsome Sitters</h1>
              <p className='lead'>
                Connect with local sitters for dog walking, sitting, and
                daycare. Your pet's happiness is our priority!
              </p>
              <Link
                to='/register'
                className='btn btn-secondary d-block fw-bold'
              >
                Join Us
              </Link>
            </Col>
          </Row>
        </Container>
      </header>

      <section>
        <Container className='text-center pt-5'>
          <Row>
            <Col className='mb-4 p-3 text-primary mx-1 '>
              <h3 className='fw-bold'>How Pawsome Sitters Works:</h3>
            </Col>
          </Row>
          <Row>
            <ul className='list-unstyled mx-1'>
              <li className='border-bottom border-primary border-2 mb-3'>
                <h3>
                  1. Create Your Profile
                  <i className='ms-3'>
                    <FaUserPlus size={40} fill='#CF6320' />
                  </i>
                </h3>
                <p>
                  Pet owners and sitters sign up, sharing pet details and
                  services.
                </p>
              </li>
              <li className='border-bottom border-primary border-2 mb-3'>
                <h3>
                  2. Discover Sitters
                  <i className='ms-3'>
                    <FaRegMap size={40} fill='#CF6320' />
                  </i>
                </h3>
                <p>
                  Browse local profiles, reviews, and availability to find a
                  compatible match.
                </p>
              </li>
              <li className='border-bottom border-primary border-2 mb-3'>
                <h3>
                  3. Connect & Arrange
                  <i className='ms-3'>
                    <FaRegCalendarAlt size={40} fill='#CF6320' />
                  </i>
                </h3>
                <p>
                  Chat with sitters to discuss pet care details and finalize
                  arrangements.
                </p>
              </li>
              <li className='border-bottom border-primary border-2 mb-5'>
                <h3>
                  4. Book with Confidence
                  <i className='ms-3'>
                    <FaRegHandshake size={40} fill='#CF6320' />
                  </i>
                </h3>
                <p>
                  Securely book through the platform for reliable, hassle-free
                  pet care experiences.
                </p>
              </li>
            </ul>
          </Row>
        </Container>
      </section>

      <section className='reviews bg-secondary-light '>
        <Container className='py-4 text-center px-3'>
          <Row>
            <h2>Satisfaction Assured</h2>
            <p>
              Chill out and unwind! Your furry buddy is in the care of their
              devoted, skilled pet sitter
            </p>
          </Row>
          <Row className='text-primary my-3 fw-bold'>
            <Col md={4}>
              <h1>97%</h1>
              <p>5-star reviews</p>
            </Col>
            <Col md={4}>
              <h1>3,500+</h1>
              <p>Trusted and vetted pet sitters</p>
            </Col>
            <Col md={4}>
              <h1>150,000+</h1>
              <p>Days booked</p>
            </Col>
          </Row>
          <Row>
            <p>
              Did you know: Pawsome Sitters accepts only 15% of pet sitter
              applications? Our Trust and Safety Team has a strict vetting
              process to maintain high safety standards. We also work closely
              with a local provider to offer national police checks for sitters
              - because you and your pets deserve the best.
            </p>
          </Row>
        </Container>
      </section>

      <section className='map'>
        <Container className='pt-5 text-center'>
          <Row>
            <Col md={6} className='d-flex flex-column justify-content-center'>
              <h2 className='mb-5 lh-base'>
                Find Trusted Caregivers in Your Area{' '}
                <i className=''>
                  <FaMapMarkerAlt size={30} fill='#CF6320' />
                </i>
              </h2>
              <p>
                Explore our interactive map to connect with reliable pet sitters
                nearby. Whether you need a dog walker, cat sitter, or day care
                services, our platform makes it easy to find the perfect match
                for your pet's needs. Scroll through local neighborhoods, read
                reviews, and ensure your furry friend gets the attention they
                deserve.
              </p>
              <Link to='/patrons' className='btn btn-primary mb-5 w-50 mx-auto'>
                Try It Out
              </Link>
            </Col>
            <Col md={6}>
              <iframe
                title='map'
                src='https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=52.3730796,4.8924534+(Amsterdam)&amp;t=&amp;z=11&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'
                className='w-100'
                height='400'
                loading='lazy'
              ></iframe>
            </Col>
          </Row>
        </Container>
      </section>

      <section className='bg-primary text-center pt-5 lh-lg mt-5 text-light'>
        <Container>
          <Row className='lh-base'>
            <Col lg={4} className='mb-3 '>
              <i>
                <FaWalking size={60} />
              </i>
              <h2>Pet Walking</h2>
              <p>
                Enjoy peace of mind as our skilled walkers provide tailored
                exercise and stimulation for your dog's well-being
              </p>
            </Col>

            <Col lg={4} className='mb-3'>
              <i>
                <FaHome size={60} />
              </i>
              <h2>Pet Sitting</h2>
              <p>
                Leave your pet in caring hands with our attentive sitters,
                ensuring routines and comfort are maintained
              </p>
            </Col>

            <Col lg={4} className='mb-3'>
              <i>
                <FaBusinessTime size={60} />
              </i>
              <h2>Daycare</h2>
              <p>
                Enrich your pet's day with supervised play, socializing, and
                engaging activities in a safe and fun environment
              </p>
            </Col>
          </Row>
          <Row className='px-3'>
            <Link
              to='/about'
              className='btn btn-lg btn-secondary mb-5 w-50 mx-auto'
            >
              Read more
            </Link>
          </Row>
        </Container>
      </section>

      <section className='carousel'>
        <HomeScreenCarousel />
      </section>
    </>
  )
}
export default HomeScreen
